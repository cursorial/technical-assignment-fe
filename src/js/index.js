/* eslint-disable no-unused-vars */

import "core-js/stable";
import "regenerator-runtime/runtime";

import logger from './logger';

import '../css/index.scss';
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(<App />)

logger('it works well!');
