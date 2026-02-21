import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './Components/LoginPage'
import ErrorPage from './Components/ErrorPage'
import HomePage from './Components/HomePage'
import SignupPage from './Components/SignupPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route
          path="*"
          element={(
            <ErrorPage
              titleKey="common.pageNoFind"
              showLink={true}
            />
          )}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
