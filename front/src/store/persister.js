import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Uses localStorage

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

const persistedUserReducer = persistReducer(userPersistConfig, userSlice.reducer);
const persistedAdminReducer = persistReducer(adminPersistConfig, adminSlice.reducer);
const persistedCartReducer=persistReducer(cartPersistConfig,cartSlice.reducer);

export const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    admin: persistedAdminReducer,
    cart: persistedCartReducer,
  },
});

export const persistor = persistStore(store);
