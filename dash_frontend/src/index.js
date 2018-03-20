import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {createStore, applyMiddleware} from 'redux'
// import {combineReducers} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers/rootReducer'
import {BrowserRouter} from 'react-router-dom';
// import userReducer from './reducers/userReducer'
// import eventReducer from './reducers/eventReducer'

// const reducer = combineReducers({
//   user: userReducer,
//   event: eventReducer
// })

const store = createStore(rootReducer, applyMiddleware(thunk))

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>, document.getElementById('root'));
registerServiceWorker();
