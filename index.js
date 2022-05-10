import React from 'react'
import ReactDOM from 'react-dom'
import App from './app/app';
import "core-js/stable";
import "regenerator-runtime/runtime";
import './app/css/app.scss';

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('app')
);