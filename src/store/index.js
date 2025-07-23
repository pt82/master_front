import Vue from "vue";
import Vuex from "vuex";

import Layout from "./Layout";
import Authorization from "src/store/Authorization";
import EntriesHaircut from "src/store/EntriesHaircut";
import Reviews from "src/store/Reviews";
import Profile from "src/store/Profile";


Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      Layout,
      Authorization,
      EntriesHaircut,
      Reviews,
      Profile
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
  });

  return Store;
}
