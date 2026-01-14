import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../state/slices/authSlice';

const RegistrationForm = ({ children }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const registerUser = async (username, password) => {
        const response = await fetch('/api/v1/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    };

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            confirmPassword: '',
        },
        validate: (values) => {
            const errors = {};

            if (!values.username.trim()) {
                errors.username = 'Обязательное поле';
            } else if (values.username.length < 3) {
                errors.username = 'Не менее 3 символов';
            }

            if (!values.password) {
                errors.password = 'Обязательное поле';
            } else if (values.password.length < 6) {
                errors.password = 'Не менее 6 символов';
            }

            if (!values.confirmPassword) {
                errors.confirmPassword = 'Подтвердите пароль';
            } else if (values.password !== values.confirmPassword) {
                errors.confirmPassword = 'Пароли должны совпадать';
            }

            return errors;
        },
        onSubmit: async (values, { setSubmitting, setStatus }) => {
            try {
                const data = await registerUser(
                    values.username,
                    values.password
                );

                localStorage.setItem('jwtToken', data.token);
                dispatch(
                    setUser({
                        username: data.username,
                        token: data.token,
                    })
                );
                localStorage.setItem('username', data.username);

                navigate('/');
            } catch (error) {
                setStatus({ 
                    error: 'Ошибка регистрации. Возможно, пользователь уже существует.' 
                });
                console.error('Registration failed:', error);
            } finally {
                setSubmitting(false);
            }
        },
    });

    console.log(formik);
    

    return (
        <form className="w-50" onSubmit={formik.handleSubmit} noValidate>
            <h1 className="text-center mb-4">Регистрация</h1>
            
            {formik.status?.error && (
                <div className="alert alert-danger" role="alert">
                    {formik.status.error}
                </div>
            )}

            <div className="mb-3">
                <div className="form-floating">
                    <input
                        className={`form-control ${
                            formik.touched.username && formik.errors.username ? 'is-invalid' : ''
                        }`}
                        id="username"
                        name="username"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.username}
                        required
                    />
                    <label htmlFor="username">Имя пользователя</label>
                    {formik.touched.username && formik.errors.username && (
                        <div className="invalid-feedback">
                            {formik.errors.username}
                        </div>
                    )}
                </div>
            </div>

            <div className="mb-3">
                <div className="form-floating">
                    <input
                        className={`form-control ${
                            formik.touched.password && formik.errors.password ? 'is-invalid' : ''
                        }`}
                        id="password"
                        name="password"
                        type="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        required
                    />
                    <label htmlFor="password">Пароль</label>
                    {formik.touched.password && formik.errors.password && (
                        <div className="invalid-feedback">
                            {formik.errors.password}
                        </div>
                    )}
                </div>
            </div>

            <div className="mb-4">
                <div className="form-floating">
                    <input
                        className={`form-control ${
                            formik.touched.confirmPassword && formik.errors.confirmPassword ? 'is-invalid' : ''
                        }`}
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.confirmPassword}
                        required
                    />
                    <label htmlFor="confirmPassword">Подтвердите пароль</label>
                    {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                        <div className="invalid-feedback">
                            {formik.errors.confirmPassword}
                        </div>
                    )}
                </div>
            </div>
            
            {children}
        </form>
    );
};

export default RegistrationForm;