import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { UserProvider } from './context/UserContext.jsx';
import { AdminProvider } from './context/adminContext.jsx';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      {' '}
      <AdminProvider>
        {' '}
        <App />
      </AdminProvider>
    </UserProvider>
  </StrictMode>,
);
