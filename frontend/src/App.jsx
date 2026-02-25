import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './Components/LoginPage'
import ErrorPage from './Components/ErrorPage'
import HomePage from './Components/HomePage'
import SignupPage from './Components/SignupPage'
import {ROUTES} from './services/routes'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.SIGNUP} element={<SignupPage />} />
        <Route
          path={ROUTES.ANY}
          element={(
            <ErrorPage
              title="common.pageNoFind"
              showLink={true}
            />
          )}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
