import { registerApplication, start } from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";
import microfrontendLayout from "./microfrontend-layout.html";

import * as singleSpa from 'single-spa';

const routes = constructRoutes(microfrontendLayout);
const applications = constructApplications({
  routes,
  loadApp({ name }) {
  console.log(name)

    return System.import(name);
  },
});
const layoutEngine = constructLayoutEngine({ routes, applications });


registerApplication(
  'ng-parcel',
  () => System.import('ng-parcel'),
  location => location.pathname.startsWith('/ng-parcel')
);

registerApplication(
  'vue-parcel',
  () => System.import('vue-parcel'),
  location => location.pathname.startsWith('/vue-parcel')
);

// singleSpa.registerApplication({
//   name: 'vue-parcel',
//   app: () => System.import('vue-parcel'),
//   activeWhen: '/vue-parcel',
//   // Dynamic custom props that can change based on route
//   // customProps(appName, location) {
//   //     return {
//   //         authToken: 'xc67f6as87f7s9d'
//   //     }
//   // }
// })

applications.forEach(registerApplication);
layoutEngine.activate();
start();


