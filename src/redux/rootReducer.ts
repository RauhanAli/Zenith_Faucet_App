import { AnyAction, combineReducers, configureStore } from "@reduxjs/toolkit";

import walletReducer from "./Wallet"

const reducer = combineReducers({
  walletReducer,
});

// reset state on logout
const rootReducer = (state: any, action: AnyAction) => {
  return reducer(state, action);
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStateType = ReturnType<typeof reducer>;
export interface SerializedError {
  name?: string;
  message?: string;
  code?: string;
  stack?: string;
}

export default store;
