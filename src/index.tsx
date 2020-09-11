import React from "reactn";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { GlobalState, initialGlobalState } from "config/global-state";
import { translationService } from "@react3l/react3l/services";
import * as serviceWorker from "service-worker";
import nameof from "ts-nameof.macro";
import addReactNDevTools from "reactn-devtools";
import vi from "i18n/vi.json";
import "styles";

if (process.env.NODE_ENV === "development") {
  addReactNDevTools();
}

const App = React.lazy(async () => {
  await React.setGlobal<GlobalState>(initialGlobalState);

  await translationService.initTranslation();
  await translationService.changeLanguage(nameof(vi), vi);

  return import("views/App/App");
});

ReactDOM.render(
  <BrowserRouter>
    <React.Suspense fallback={null}>
      <App />
    </React.Suspense>
  </BrowserRouter>,
  document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
