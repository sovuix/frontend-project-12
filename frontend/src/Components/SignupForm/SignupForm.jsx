import { useFormik } from 'formik';
import './SignupForm.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUpForm = ({ children }) => {
  const navigate = useNavigate();
  const [hasError, setHasError] = useState(false);
  const getToken = async (username, password) => {
    try {
      const response = await fetch('/api/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.token;
    } catch (error) {
      console.error('Error getting token:', error);
      throw error;
    }
  };

  const formik = useFormik({
    initialValues: {
      userLogin: '',
      password: '',
    },
    onSubmit: async (values, { setSubmitting }) => {
      try {
        console.log(values);
        const token = await getToken(values.userLogin, values.password);
        localStorage.setItem('jwtToken', token);
        console.log('Token saved successfully');
        setHasError(false);
        navigate('/');
      } catch (error) {
        setHasError(true);
        console.error('Login failed:', error);
        console.log(hasError);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <form
      className="col-12 col-md-6 mt-3 mt-md-0 w-100"
      onSubmit={formik.handleSubmit}
    >
      <div className="form-floating mb-3">
        <input
          className={`form-control ${hasError ? 'is-invalid' : ''}`}
          id="userLogin"
          name="userLogin"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.userLogin}
          required
          placeholder="Ваш ник"
        />
        <label htmlFor="userLogin">Ваш ник</label>
      </div>

      <div className="form-floating mb-4">
        <input
          className={`form-control ${hasError ? 'is-invalid' : ''}`}
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          required
          placeholder="Пароль"
        />
        {hasError && (
          <div className="invalid-tooltip">
            Неверные имя пользователя или пароль
          </div>
        )}
        <label htmlFor="password">Пароль</label>
      </div>
      {children}
    </form>
  );
};

export default SignUpForm;
