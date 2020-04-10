"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_dom_1 = require("react-dom");
var App_1 = require("./App");
var react_redux_1 = require("react-redux");
var store_1 = require("./redux/store");
var react_2 = require("redux-persist/integration/react");
var serviceWorker = require("./serviceWorker");
require("bootstrap/dist/css/bootstrap.min.css");
react_dom_1.default.render(<react_redux_1.Provider store={store_1.store}>
    <react_2.PersistGate persistor={store_1.persistor}>
      <App_1.default />
    </react_2.PersistGate>
  </react_redux_1.Provider>, document.getElementById('root'));
serviceWorker.unregister();
