import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../../state/slices/authSlice';
import { setLoading } from '../../state/slices/channelsSlice';
import { useTranslation } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import { useRef, useEffect } from 'react';

const LoginForm = ({ children }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const userloginRef = useRef(null);

    useEffect(() => {
        userloginRef.current?.focus();
    }, []);

    const { loading } = useSelector((state) => state.chat);

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
        },
        onSubmit: async (values, { setSubmitting, setStatus }) => {
            try {
                dispatch(setLoading());
                const data = await getToken(values.userLogin, values.password);
                localStorage.setItem('jwtToken', data.token);
                dispatch(
                    setUser({
                        username: data.username,
                        token: data.token,
                    }),
                );
                localStorage.setItem('username', data.username);
                setStatus(null);
                navigate('/');
            } catch (error) {
                if (!navigator.onLine) {
                    toast.error(t('common.connectionError'));
                } else if (error.message === 'Failed to fetch') {
                    toast.error(t('common.loading'));
                } else {
                    setStatus({ error: t('auth.error') });
                    toast.error(t('common.serverError'));
                }
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <>
            <ToastContainer />
            <form
                className="col-12 col-md-6 mt-3 mt-md-0 w-100"
                onSubmit={formik.handleSubmit}
            >
                <div className="form-floating mb-3">
                    <input
                        ref={userloginRef}
                        className={`form-control ${formik.status?.error ? 'is-invalid' : ''}`}
                        id="userLogin"
                        name="userLogin"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.userLogin}
                        required
                        placeholder={t('auth.nickname')}
                        disabled={loading}
                    />
                    <label htmlFor="userLogin">{t('auth.nickname')}</label>
                </div>

                <div className="form-floating mb-4">
                    <input
                        className={`form-control ${formik.status?.error ? 'is-invalid' : ''}`}
                        id="password"
                        name="password"
                        type="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        required
                        placeholder={t('auth.pass')}
                        disabled={loading}
                    />
                    {formik.status?.error && (
                        <div className="invalid-tooltip">{t('auth.error')}</div>
                    )}
                    <label htmlFor="password">{t('auth.pass')}</label>
                </div>
                {children}
            </form>
        </>
    );
};

export default LoginForm;
