import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import { filterAssetReducer, filterReceiptReducer } from "./slices/filter";
import {
  selectedAssetReducer,
  selectedReceiptReducer,
} from "./slices/selected";
import { authReducer } from "./slices";

export const persistConfig = {
  key: "root",
  version: 1,
  storage: storage,
  whitelist: ["auth"],
};

export const rootReducer = combineReducers({
  auth: authReducer,
  selectedReceipt: selectedReceiptReducer,
  filterReceipt: filterReceiptReducer,
  selectedAsset: selectedAssetReducer,
  filterAsset: filterAssetReducer,
});

export const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: true,
});

export const persistor = persistStore(store);

export type IRootState = ReturnType<typeof rootReducer>;
