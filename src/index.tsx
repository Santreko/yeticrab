import React from 'react';
import ReactDOM from 'react-dom/client';
import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';
import './styles/globals.scss';
import App from './App';
import {Provider} from 'react-redux';
import orderStore from './store/store';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <Provider store={orderStore}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </Provider>,
);
