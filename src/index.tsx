import { translationService } from "@react3l/react3l/services";
import vi from "i18n/vi.json";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import addReactNDevTools from "reactn-devtools";
import * as serviceWorker from "service-worker";
import "styles";
import nameof from "ts-nameof.macro";

if (process.env.NODE_ENV === "development") {
  addReactNDevTools();
}

const App = React.lazy(async () => {
  await translationService.initTranslation();
  await translationService.changeLanguage(nameof(vi), vi);

  return import("App/App");
});

ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
    <React.Suspense fallback={null}>
      <App />
    </React.Suspense>
  </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
