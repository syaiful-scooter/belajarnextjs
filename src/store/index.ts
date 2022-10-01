import create from "zustand";
import createAuthSlice from "store/authSlice";
import { persist } from "zustand/middleware";

const store: any = persist(
  (set: any, get: any) => ({
    ...createAuthSlice(set, get),
  }),
  {
    name: "onlinePOS",
    partialize: (state: any) => ({
      token: state.token,
      auth: state.auth,
    }),
  }
);

const createStore = create(store);
export default createStore;
