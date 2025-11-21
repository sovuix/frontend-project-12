import { useFormik } from 'formik';
import './SignupForm.css';

const SignUpForm = ({ children }) => {
    const getToken = async (username, password) => {
        try {
            const response = await fetch('/api/v1/auth/login', {
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
                
                // Используем данные из формы вместо 'admin','admin'
                const token = await getToken(values.userLogin, values.password);
                localStorage.setItem('jwtToken', token);
                console.log('Token saved successfully');
                
            } catch (error) {
                console.error('Login failed:', error);
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
            {/* Остальная разметка без изменений */}
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
