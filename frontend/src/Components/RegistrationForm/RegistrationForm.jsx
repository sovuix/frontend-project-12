import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../state/slices/authSlice";
import { registrationSchema } from "../../validationSchemas/authSchemas";
import { useRef, useEffect } from "react";

const RegistrationForm = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const usernameRef = useRef(null);

  useEffect(() => {
    usernameRef.current?.focus();
  }, []);

  const registerUser = async (username, password) => {
    const response = await fetch("/api/v1/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registrationSchema,
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      try {
        const data = await registerUser(values.username, values.password);

        localStorage.setItem("jwtToken", data.token);
        dispatch(
          setUser({
            username: data.username,
            token: data.token,
          }),
        );
        localStorage.setItem("username", data.username);

        navigate("/");
      } catch (error) {
        setStatus({
          error: "Такой пользователь уже существует.",
        });
        console.error("Registration failed:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleUsernameChange = (e) => {
    formik.handleChange(e);
    if (formik.status?.error) {
      formik.setStatus(null);
    }
  };

  return (
    <form className="w-50" onSubmit={formik.handleSubmit} noValidate>
      <h1 className="text-center mb-4">Регистрация</h1>
      <div className="form-floating mb-3">
        <input
          ref={usernameRef}
          className={`form-control ${
            (formik.touched.username && formik.errors.username) ||
            formik.status?.error
              ? "is-invalid"
              : ""
          }`}
          id="username"
          name="username"
          type="text"
          onChange={handleUsernameChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
          required
          placeholder="От 3 до 20 символов"
        />
        <label htmlFor="username">Имя пользователя</label>
        {formik.touched.username && formik.errors.username && (
          <div className="invalid-tooltip">{formik.errors.username}</div>
        )}
      </div>

      <div className="form-floating mb-3">
        <input
          className={`form-control ${
            (formik.touched.password && formik.errors.password) ||
            formik.status?.error
              ? "is-invalid"
              : ""
          }`}
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          required
          placeholder="Не менее 6 символов"
        />
        <label htmlFor="password">Пароль</label>
        <div placement="right" className="invalid-feedback"></div>
        {formik.touched.password && formik.errors.password && (
          <div className="invalid-tooltip">{formik.errors.password}</div>
        )}
      </div>

      <div className="form-floating mb-4">
        <input
          className={`form-control ${
            (formik.touched.confirmPassword && formik.errors.confirmPassword) ||
            formik.status?.error
              ? "is-invalid"
              : ""
          }`}
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.confirmPassword}
          required
          placeholder="Подтвердите пароль"
        />
        <label htmlFor="confirmPassword">Подтвердите пароль</label>
        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
          <div className="invalid-tooltip">{formik.errors.confirmPassword}</div>
        )}
        {formik.status?.error && (
          <div className="invalid-tooltip">{formik.status.error}</div>
        )}
      </div>

      {children}
    </form>
  );
};

export default RegistrationForm;
