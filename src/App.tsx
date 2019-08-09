import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Provider } from "react-redux";
import { store } from "./store/configureStore";
import AppRouter from "./router";
import { startFetchPosts } from './actions/posts';

const App: React.FC = () => {
  return (
    <Provider store={store}>
        <AppRouter />
    </Provider>
  );
}

export default App;
