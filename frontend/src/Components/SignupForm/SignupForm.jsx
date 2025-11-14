import { useFormik } from 'formik';
import './SignupForm.css';

const SignUpForm = ({ children }) => {
  const formik = useFormik({
    initialValues: {
      userLogin: '',
      password: '',
    },
    onSubmit: (values, { setSubmitting }) => {
      console.log(values);
      setSubmitting(false);
    },
  });

  return (
    <form
      className="col-12 col-md-6 mt-3 mt-md-0 w-100"
      onSubmit={formik.handleSubmit}
    >
      <div className="form-floating mb-3">
        <input
          className="form-control"
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
          className="form-control"
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          required
          placeholder="Пароль"
        />
        <label htmlFor="password">Пароль</label>
      </div>
      {children}
    </form>
  );
};

export default SignUpForm;
