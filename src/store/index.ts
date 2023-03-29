import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { userReducer } from "./slice/userSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { assetsQueries } from "services/assets/assets";
import { unitsQueries } from "services/units/units";
import { companiesQueries } from "services/companies/companies";
import { usersQueries } from "services/users/users";
import { workOrdersQueries } from "services/workOrders/workOrders";
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
