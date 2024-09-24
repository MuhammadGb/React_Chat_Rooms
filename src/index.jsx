import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import Router from "./router";
import store from "./redux/store";

import "antd/dist/antd.css";
import "./index.css";

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </Provider>
);

const root = createRoot(document.getElementById("root"));
if (root) {
  root.render(<App />);
}
