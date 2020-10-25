import './app.scss';
import 'leaflet/dist/leaflet.css';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import Routes from './routes';
import { toast, ToastContainer } from 'react-toastify';

export const App = (props) => {

  const paddingTop = '60px';
  return (
    <div className="app-container" style={{ paddingTop }}>
      <ToastContainer
        position={toast.POSITION.TOP_LEFT}
        className="toastify-container"
        toastClassName="toastify-toast"
      />
      <Routes />
    </div>
  );
};

export default App
