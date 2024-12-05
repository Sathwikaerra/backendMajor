import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {userReducer,cartReducer,adminReducer} from './reducers'

const userPersistConfig = {
  key: 'user',
  storage,
};

const adminPersistConfig = {
  key: 'admin',
  storage,
};

const cartPersistConfig = {
  key: 'cart',
  storage,
};

const persistedUserReducer = persistReducer(userPersistConfig, userReducer);
const persistedAdminReducer = persistReducer(adminPersistConfig, adminReducer);
const persistedCartReducer = persistReducer(adminPersistConfig, cartReducer);


export const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    admin: persistedAdminReducer,
    cart:persistedCartReducer
  },
});

export const persistor = persistStore(store);
