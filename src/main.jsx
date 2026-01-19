import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "bootstrap/dist/css/bootstrap.min.css";
// Your global styles
import "./styles/global.css";
import "./styles/layout.css";
import "./styles/cards.css";
import "./styles/tables.css";
import "./styles/forms.css";

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
