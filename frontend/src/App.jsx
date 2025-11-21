// import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './Components/LoginPage';
import ErrorPage from './Components/ErrorPage';
import HomePage from './Components/HomePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
