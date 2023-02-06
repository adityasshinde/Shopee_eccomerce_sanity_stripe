import '@/styles/globals.css';
import React from 'react';
import { Layout } from '@/components';
import { Provider } from 'react-redux';
import store from '@/store';

export default function App({ Component, pageProps }) {
  return <Provider store={store}>
    <Layout>
     <Component {...pageProps} />
  </Layout>
  </Provider>
}
