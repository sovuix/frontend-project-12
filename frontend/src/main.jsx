import { StrictMode } from "react";
import { Provider } from "react-redux";
import store from "./state/store";
import { I18nextProvider } from "react-i18next";
import { createI18nInstance } from "./i18n";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

const initApp = async () => {
  const i18nInstance = await createI18nInstance();
  const root = createRoot(document.getElementById("root"));
  root.render(
    <StrictMode>
      <Provider store={store}>
        <I18nextProvider i18n={i18nInstance}>
          <App />
        </I18nextProvider>
      </Provider>
    </StrictMode>,
  );
};

initApp();
