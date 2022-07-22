import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

window.renderApp2 = (containerId, history) => {
  const root = ReactDOM.createRoot(
    containerId
      ? document.getElementById(containerId)
      : document.getElementById("root_app2")
  );
  root.render(<App history={history} />);
  // unregister();
};

window.unmountApp2 = (containerId) => {
  ReactDOM.unmountComponentAtNode(document.getElementById(containerId));
};

if (!document.getElementById("root")) {
  window.renderApp2("root_app2", window.history);
}
