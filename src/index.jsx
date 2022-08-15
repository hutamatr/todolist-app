import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import ContextProvider from './hooks/useContextProvider';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ContextProvider>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </ContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
