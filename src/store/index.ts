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
import { assetsQueries } from "services/assets/assets";
import { companiesQueries } from "services/companies/companies";
import { unitsQueries } from "services/units/units";
import { usersQueries } from "services/users/users";
import { workOrdersQueries } from "services/workOrders/workOrders";

import { configureStore } from "@reduxjs/toolkit";

import { userReducer } from "./slice/userSlice";
import { workOrdersReducer } from "./slice/workOrdersSlice";

const persistConfig = {
  key: "root",
  storage,
};

const userPersistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: {
    user: userPersistedReducer,
    workOrders: workOrdersReducer,
    [assetsQueries.reducerPath]: assetsQueries.reducer,
    [unitsQueries.reducerPath]: unitsQueries.reducer,
    [companiesQueries.reducerPath]: companiesQueries.reducer,
    [usersQueries.reducerPath]: usersQueries.reducer,
    [workOrdersQueries.reducerPath]: workOrdersQueries.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      assetsQueries.middleware,
      unitsQueries.middleware,
      companiesQueries.middleware,
      usersQueries.middleware,
      workOrdersQueries.middleware
    ),
});

export const persistor = persistStore(store);
