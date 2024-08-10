import '../styles/globals.css';
import Head from 'next/head';
import Header from "../components/Header/Header";
import { Provider } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';
import {combineReducers, combineReucers, configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';

import user from "../reducers/user";


const reducers = combineReducers({user});

const persistConfig = { key: "yayawebapp", storage};

const store = configureStore({
  reducer: persistReducer( persistConfig, reducers),
  middleware: (getDefaultMiddleware)=>
    getDefaultMiddleware( { serializableCheck : false}),
});

const persistor = persistStore(store);




function App({ Component, pageProps }) {
  return (
     <Provider store={store}>
       <PersistGate persistor={persistor}>
    <>
    <Head>
        <title>YAYA SPICY JUICE</title>
      </Head>
      <Header/>
      <main>
      <Component {...pageProps} />
      </main>
      
    </>
      
       </PersistGate>
      
     </Provider>
  );
}
import { format } from 'path';

export default App;
