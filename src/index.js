import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';

import { App } from 'components/App/App';
import './index.css';
import { PersistGate } from 'redux-persist/integration/react';
import { Header } from 'components/Header/Header';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <BrowserRouter basename="goit-react-hw-08-phonebook">
          <ChakraProvider>
            <Header></Header>
            <App />
          </ChakraProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
