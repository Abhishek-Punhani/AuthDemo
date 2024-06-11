import "../styles/globals.css";
import React from "react";
import { Provider } from "react-redux";
import store from "../store";
function MyApp({ Component, pageProps }) {
  return (
    <>
      <div className="dark">
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </div>
    </>
  );
}

export default MyApp;
