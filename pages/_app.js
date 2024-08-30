import '../styles/globals.css';
import styles from '../styles/AppLayout.module.css';
import Head from 'next/head';
import Header from "../components/Header/Header";
import { Provider } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';
import {combineReducers, combineReucers, configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import { injectStore } from '../api/axios'

import user from "../reducers/user";
import cart from "../reducers/cart";


const reducers = combineReducers({user, cart});

const persistConfig = { key: "yayawebapp", storage};

const store = configureStore({
  reducer: persistReducer( persistConfig, reducers),
  middleware: (getDefaultMiddleware)=>
    getDefaultMiddleware( { serializableCheck : false}),
});

const persistor = persistStore(store);

injectStore(store)

function App({ Component, pageProps }) {
  return (
     <Provider store={store}>
       <PersistGate persistor={persistor}>
        <>
          <Head>
            <title>YAYA SPICY JUICE</title>
          </Head>
          <Header/>
          <main className={styles.contentContainer}>
            <Component {...pageProps} />
          </main>
        </>
      </PersistGate>
     </Provider>
  );
}

export default App;
