import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from './util';


ReactDOM.render(
  <Provider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

