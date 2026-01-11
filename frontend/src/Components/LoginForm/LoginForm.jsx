import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../state/slices/authSlice';

const LoginForm = ({ children }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const [hasError, setHasError] = useState(false);
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

            return data;
        } catch (error) {
            console.error('Error getting token:', error);
            throw error;
        }
    };

    const formik = useFormik({
        initialValues: {
            userLogin: '',
            password: '',
            hasError: false,
        },
        onSubmit: async (values, { setSubmitting, setValues }) => {
            try {
                // console.log(values);
                const data = await getToken(values.userLogin, values.password);
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
                setValues({ hasError: true });
                console.error('Login failed:', error);
            } finally {
                setSubmitting(false);
            }
        },
    });

    console.log(formik);

    return (
        <form
            className="col-12 col-md-6 mt-3 mt-md-0 w-100"
            onSubmit={formik.handleSubmit}
        >
            <div className="form-floating mb-3">
                <input
                    className={`form-control ${
                        formik.values.hasError ? 'is-invalid' : ''
                    }`}
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
                    className={`form-control ${
                        formik.values.hasError ? 'is-invalid' : ''
                    }`}
                    id="password"
                    name="password"
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    required
                    placeholder="Пароль"
                />
                {formik.values.hasError && (
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

export default LoginForm;
