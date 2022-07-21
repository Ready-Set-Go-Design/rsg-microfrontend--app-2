import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

window.renderApp2 = (containerId, history) => {
  const root = ReactDOM.createRoot(
    containerId
      ? document.getElementById(containerId)
      : document.getElementById("root")
  );
  root.render(<App history={history} />);
  // unregister();
};

window.unmountApp2 = (containerId) => {
  ReactDOM.unmountComponentAtNode(document.getElementById(containerId));
};
