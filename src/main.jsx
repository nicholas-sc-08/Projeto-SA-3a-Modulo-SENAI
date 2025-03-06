import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from './router/routes.jsx';
import { GlobalContextProvider } from './contexts/GlobalContext.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';

const id_cliente = '666226823266-vq0pdqtmm458seut3m8tjhledn1h0972.apps.googleusercontent.com';

createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId={id_cliente}>
    <GlobalContextProvider>
      <RouterProvider router={router} />
    </GlobalContextProvider>
  </GoogleOAuthProvider>
);
