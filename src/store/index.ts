import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { userReducer } from "./slice/userSlice";
import { persistStore, persistReducer } from "redux-persist";
import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: {
    user: persistedReducer,
  },
  middleware: [thunk],
});

export const persistor = persistStore(store);
