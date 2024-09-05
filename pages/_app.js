import '../styles/globals.css';
import styles from '../styles/AppLayout.module.css';
import Head from 'next/head';
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { Provider } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';
import {combineReducers, combineReucers, configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import { injectStore } from '../api/axios'

import user from "../reducers/user";
import cart from "../reducers/cart";
import { useState } from 'react';


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
  const [modalRegisterOpen, setModalRegisterOpen] = useState(false);
  const toggleModalRegister = () => {
    setModalRegisterOpen(!modalRegisterOpen);
  }
  return (
     <Provider store={store}>
       <PersistGate persistor={persistor}>
        <>
          <Head>
            <title>YAYA SPICY JUICE</title>
          </Head>
          {modalRegisterOpen && <Header open={modalRegisterOpen} toggleModalRegister={toggleModalRegister} />}
          {!modalRegisterOpen && <Header />}
          <main className={styles.contentContainer}>
            <Component { ...pageProps} toggleModalRegister={toggleModalRegister} />
          </main>
          <Footer />
        </>
      </PersistGate>
     </Provider>
  );
}

export default App;
