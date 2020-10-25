import './app.scss';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import Routes from './routes';

export const App = (props) => {

  const paddingTop = '60px';
  return (
    <div className="app-container" style={{ paddingTop }}>
      <Routes />
    </div>
  );
};

export default App
