import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import store from './state/store';
import { I18nextProvider } from 'react-i18next';
import { createI18nInstance } from './i18n';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

import { rollbarConfig } from './services/rollbar.js';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';

const initApp = async () => {
  const i18nInstance = await createI18nInstance();
  const root = createRoot(document.getElementById('root'));
  root.render(
    <StrictMode>
      <RollbarProvider config={rollbarConfig}>
        <ErrorBoundary>
          <Provider store={store}>
            <I18nextProvider i18n={i18nInstance}>
              <App />
            </I18nextProvider>
          </Provider>
        </ErrorBoundary>
      </RollbarProvider>
    </StrictMode>,
  );
};

initApp();
