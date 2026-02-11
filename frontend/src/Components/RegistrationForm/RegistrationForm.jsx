// import { useFormik } from 'formik';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { setUser } from '../../state/slices/authSlice';
// import { registrationSchema } from '../../validationSchemas/authSchemas';

// const RegistrationForm = ({ children }) => {
//     const navigate = useNavigate();
//     const dispatch = useDispatch();

//     const registerUser = async (username, password) => {
//         const response = await fetch('/api/v1/signup', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ username, password }),
//         });

//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         return await response.json();
//     };

//     const formik = useFormik({
//         initialValues: {
//             username: '',
//             password: '',
//             confirmPassword: '',
//         },
//         // validate: (values) => {
//         //     const errors = {};

//         //     if (!values.username.trim()) {
//         //         errors.username = 'Обязательное поле';
//         //     } else if (values.username.length < 3) {
//         //         errors.username = 'Не менее 3 символов';
//         //     }

//         //     if (!values.password) {
//         //         errors.password = 'Обязательное поле';
//         //     } else if (values.password.length < 6) {
//         //         errors.password = 'Не менее 6 символов';
//         //     }

//         //     if (!values.confirmPassword) {
//         //         errors.confirmPassword = 'Подтвердите пароль';
//         //     } else if (values.password !== values.confirmPassword) {
//         //         errors.confirmPassword = 'Пароли должны совпадать';
//         //     }

//         //     return errors;
//         // },
//         validationSchema: registrationSchema,
//         onSubmit: async (values, { setSubmitting, setStatus }) => {
//             try {
//                 const data = await registerUser(
//                     values.username,
//                     values.password
//                 );

//                 localStorage.setItem('jwtToken', data.token);
//                 dispatch(
//                     setUser({
//                         username: data.username,
//                         token: data.token,
//                     })
//                 );
//                 localStorage.setItem('username', data.username);

//                 navigate('/');
//             } catch (error) {
//                 setStatus({
//                     error: 'Такой пользователь уже существует.',
//                 });
//                 console.error('Registration failed:', error);
//             } finally {
//                 setSubmitting(false);
//             }
//         },
//     });

//     // console.log(formik);

//     return (
//         <form className="w-50" onSubmit={formik.handleSubmit} noValidate>
//             <h1 className="text-center mb-4">Регистрация</h1>

//             <div className="mb-3">
//                 <div className="form-floating">
//                     <input
//                         className={`form-control ${
//                             formik.touched.username && formik.errors.username
//                                 ? 'is-invalid'
//                                 : ''
//                         }`}
//                         id="username"
//                         name="username"
//                         type="text"
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                         value={formik.values.username}
//                         required
//                     />
//                     <label htmlFor="username">Имя пользователя</label>
//                     {formik.touched.username && formik.errors.username && (
//                         <div className="invalid-feedback">
//                             {formik.errors.username}
//                         </div>
//                     )}
//                 </div>
//             </div>

//             <div className="mb-3">
//                 <div className="form-floating">
//                     <input
//                         className={`form-control ${
//                             formik.touched.password && formik.errors.password
//                                 ? 'is-invalid'
//                                 : ''
//                         }`}
//                         id="password"
//                         name="password"
//                         type="password"
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                         value={formik.values.password}
//                         required
//                     />
//                     <label htmlFor="password">Пароль</label>
//                     {formik.touched.password && formik.errors.password && (
//                         <div className="invalid-feedback">
//                             {formik.errors.password}
//                         </div>
//                     )}
//                 </div>
//             </div>

//             <div className="mb-4">
//                 <div className="form-floating">
//                     <input
//                         className={`form-control ${
//                             formik.touched.confirmPassword &&
//                             formik.errors.confirmPassword
//                                 ? 'is-invalid'
//                                 : ''
//                         }`}
//                         id="confirmPassword"
//                         name="confirmPassword"
//                         type="password"
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                         value={formik.values.confirmPassword}
//                         required
//                     />
//                     <label htmlFor="confirmPassword">Подтвердите пароль</label>
//                     {formik.touched.confirmPassword &&
//                         formik.errors.confirmPassword && (
//                             <div className="invalid-feedback">
//                                 {formik.errors.confirmPassword}
//                             </div>
//                         )}
//                 </div>
//             </div>

//             {children}

//             {/* {formik.status?.error && (
//         <div className="alert alert-danger" role="alert">
//           {formik.status.error}
//         </div>
//       )} */}
//             {formik.status?.error && (
//                 <div className="text-danger text-center mb-3">
//                     {formik.status.error}
//                 </div>
//             )}
//         </form>
//     );
// };

// export default RegistrationForm;




// import { useFormik } from 'formik';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { setUser } from '../../state/slices/authSlice';
// import { registrationSchema } from '../../validationSchemas/authSchemas';
// import { useRef, useEffect } from 'react';

// const RegistrationForm = ({ children }) => {
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const usernameRef = useRef(null);

//         useEffect(() => {
//         usernameRef.current?.focus();
//     }, []);


//     const registerUser = async (username, password) => {
//         const response = await fetch('/api/v1/signup', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ username, password }),
//         });

//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         return await response.json();
//     };

//     const formik = useFormik({
//         initialValues: {
//             username: '',
//             password: '',
//             confirmPassword: '',
//         },
//         validationSchema: registrationSchema,
//         onSubmit: async (values, { setSubmitting, setStatus }) => {
//             try {
//                 const data = await registerUser(
//                     values.username,
//                     values.password
//                 );

//                 localStorage.setItem('jwtToken', data.token);
//                 dispatch(
//                     setUser({
//                         username: data.username,
//                         token: data.token,
//                     })
//                 );
//                 localStorage.setItem('username', data.username);

//                 navigate('/');
//             } catch (error) {
//                 setStatus({
//                     error: 'Такой пользователь уже существует.',
//                 });
//                 console.error('Registration failed:', error);
//             } finally {
//                 setSubmitting(false);
//             }
//         },
//     });

//     return (
//         <form className="w-50" onSubmit={formik.handleSubmit} noValidate>
//             <h1 className="text-center mb-4">Регистрация</h1>
//             <div className="mb-3">
//                 <div className="form-floating">
//                     <input
//                     ref={usernameRef}
//                         className={`form-control ${
//                             (formik.touched.username &&
//                                 formik.errors.username) ||
//                             formik.status?.error 
//                                 ? 'is-invalid'
//                                 : ''
//                         }`}
//                         id="username"
//                         name="username"
//                         type="text"
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                         value={formik.values.username}
//                         required
//                     />
//                     <label htmlFor="username">Имя пользователя</label>
//                     <div placement="right" className='invalid-feedback'></div>
//                     {formik.touched.username && formik.errors.username && (
//                         <div className="invalid-feedback">
//                             {formik.errors.username}
//                         </div>
//                     )}
//                 </div>
//             </div>

//             <div className="mb-3">
//                 <div className="form-floating">
//                     <input
//                         className={`form-control ${
//                             (formik.touched.password &&
//                                 formik.errors.password) ||
//                             formik.status?.error // ← ДОБАВИТЬ ЭТО!
//                                 ? 'is-invalid'
//                                 : ''
//                         }`}
//                         id="password"
//                         name="password"
//                         type="password"
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                         value={formik.values.password}
//                         required
//                     />
//                     <label htmlFor="password">Пароль</label>
//                     <div placement="right" className='invalid-feedback'></div>
//                     {formik.touched.password && formik.errors.password && (
//                         <div className="invalid-feedback">
//                             {formik.errors.password}
//                         </div>
//                     )}
//                 </div>
//             </div>

//             <div className="mb-4">
//                 <div className="form-floating">
//                     <input
//                         className={`form-control ${
//                             (formik.touched.confirmPassword &&
//                                 formik.errors.confirmPassword) ||
//                             formik.status?.error 
//                                 ? 'is-invalid'
//                                 : ''
//                         }`}
//                         id="confirmPassword"
//                         name="confirmPassword"
//                         type="password"
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                         value={formik.values.confirmPassword}
//                         required
//                     />
//                     <label htmlFor="confirmPassword">Подтвердите пароль</label>
//                     {formik.touched.confirmPassword &&
//                         formik.errors.confirmPassword && (
//                             <div className="invalid-feedback">
//                                 {formik.errors.confirmPassword}
//                             </div>
//                         )}
//                     {formik.status?.error && (
//                         <div className="invalid-feedback">
//                             {formik.status.error}
//                         </div>
//                     )}
//                 </div>
//             </div>

//             {children}
//         </form>
//     );
// };

// export default RegistrationForm;


import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../state/slices/authSlice';
import { registrationSchema } from '../../validationSchemas/authSchemas';
import { useRef, useEffect } from 'react';

const RegistrationForm = ({ children }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const usernameRef = useRef(null);

    useEffect(() => {
        usernameRef.current?.focus();
    }, []);

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
        validationSchema: registrationSchema,
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
                    error: 'Такой пользователь уже существует.',
                });
                console.error('Registration failed:', error);
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
            {/* <div className="mb-3"> */}
                <div className="form-floating mb-3">
                    <input
                        ref={usernameRef}
                        className={`form-control ${
                            (formik.touched.username &&
                                formik.errors.username) ||
                            formik.status?.error 
                                ? 'is-invalid'
                                : ''
                        }`}
                        id="username"
                        name="username"
                        type="text"
                        onChange={handleUsernameChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.username}
                        required
                    />
                    <label htmlFor="username">Имя пользователя</label>
                    {/* <div placement="right" className='invalid-tooltip'></div> */}
                    {formik.touched.username && formik.errors.username && (
                        <div className="invalid-tooltip">
                            {formik.errors.username}
                        </div>
                    )}
                {/* </div> */}
            </div>

            {/* <div className="mb-3"> */}
                <div className="form-floating mb-3">
                    <input
                        className={`form-control ${
                            (formik.touched.password &&
                                formik.errors.password) ||
                            formik.status?.error
                                ? 'is-invalid'
                                : ''
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
                    <div placement="right" className='invalid-feedback'></div>
                    {formik.touched.password && formik.errors.password && (
                        <div className="invalid-feedback">
                            {formik.errors.password}
                        </div>
                    )}
                {/* </div> */}
            </div>

            {/* <div className="mb-4"> */}
                <div className="form-floating mb-4">
                    <input
                        className={`form-control ${
                            (formik.touched.confirmPassword &&
                                formik.errors.confirmPassword) ||
                            formik.status?.error
                                ? 'is-invalid'
                                : ''
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
                    {formik.touched.confirmPassword &&
                        formik.errors.confirmPassword && (
                            <div className="invalid-feedback">
                                {formik.errors.confirmPassword}
                            </div>
                        )}
                    {formik.status?.error && (
                        <div className="invalid-feedback">
                            {formik.status.error}
                        </div>
                    )}
                </div>
            {/* </div> */}

            {children}
        </form>
    );
};

export default RegistrationForm;


//-------------

// import { useFormik } from 'formik';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { setUser } from '../../state/slices/authSlice';
// import { registrationSchema } from '../../validationSchemas/authSchemas';
// import { useRef, useEffect } from 'react';

// const RegistrationForm = ({ children }) => {
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const usernameRef = useRef(null);

//     useEffect(() => {
//         usernameRef.current?.focus();
//     }, []);

//     const registerUser = async (username, password) => {
//         const response = await fetch('/api/v1/signup', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ username, password }),
//         });

//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         return await response.json();
//     };

//     const formik = useFormik({
//         initialValues: {
//             username: '',
//             password: '',
//             confirmPassword: '',
//         },
//         validationSchema: registrationSchema,
//         validateOnBlur: false,
//         validateOnChange: false,
//         validateOnMount: false,
//         onSubmit: async (values, { setSubmitting, setStatus }) => {
//             try {
//                 const data = await registerUser(
//                     values.username,
//                     values.password
//                 );

//                 localStorage.setItem('jwtToken', data.token);
//                 dispatch(
//                     setUser({
//                         username: data.username,
//                         token: data.token,
//                     })
//                 );
//                 localStorage.setItem('username', data.username);

//                 navigate('/');
//             } catch (error) {
//                 setStatus({
//                     error: 'Такой пользователь уже существует.',
//                 });
//                 console.error('Registration failed:', error);
//             } finally {
//                 setSubmitting(false);
//             }
//         },
//     });

//     const handleUsernameChange = (e) => {
//         formik.handleChange(e);
//         if (formik.status?.error) {
//             formik.setStatus(null);
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
        
//         formik.setTouched({});
//         formik.setErrors({});
        
//         try {
//             await registrationSchema.validateAt('username', formik.values);
//         } catch (error) {
//             formik.setTouched({ username: true });
//             formik.setErrors({ username: error.message });
//             usernameRef.current?.focus();
//             return;
//         }
        
//         try {
//             await registrationSchema.validateAt('password', formik.values);
//         } catch (error) {
//             formik.setTouched({ password: true });
//             formik.setErrors({ password: error.message });
//             document.getElementById('password')?.focus();
//             return;
//         }
        
//         try {
//             await registrationSchema.validateAt('confirmPassword', formik.values);
//         } catch (error) {
//             formik.setTouched({ confirmPassword: true });
//             formik.setErrors({ confirmPassword: error.message });
//             document.getElementById('confirmPassword')?.focus();
//             return;
//         }
        
//         formik.handleSubmit();
//     };

 
//     return (
//     <form className="w-50" onSubmit={handleSubmit} noValidate>
//         <h1 className="text-center mb-4">Регистрация</h1>
        
//         {/* username С form-floating */}
//         <div className="form-floating mb-3">
//             <input
//                 ref={usernameRef}
//                 className={`form-control ${
//                     (formik.touched.username && formik.errors.username) ||
//                     formik.status?.error 
//                         ? 'is-invalid'
//                         : ''
//                 }`}
//                 id="username"
//                 name="username"
//                 type="text"
//                 onChange={handleUsernameChange}
//                 onBlur={formik.handleBlur}
//                 value={formik.values.username}
//                 required
//                 placeholder="От 3 до 20 символов"
//             />
//             <label htmlFor="username">Имя пользователя</label>
//             <div placement="right" className="invalid-tooltip"></div>
//             {formik.touched.username && formik.errors.username && (
//                 <div className="invalid-tooltip">
//                     {formik.errors.username}
//                 </div>
//             )}
//         </div>

//         {/* password С form-floating */}
//         <div className="form-floating mb-3">
//             <input
//                 className={`form-control ${
//                     (formik.touched.password && formik.errors.password) ||
//                     formik.status?.error
//                         ? 'is-invalid'
//                         : ''
//                 }`}
//                 id="password"
//                 name="password"
//                 type="password"
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 value={formik.values.password}
//                 required
//                 placeholder="Не менее 6 символов"
//             />
//             <label htmlFor="password">Пароль</label>
//             {formik.touched.password && formik.errors.password && (
//                 <div className="invalid-tooltip">
//                     {formik.errors.password}
//                 </div>
//             )}
//         </div>

//         <div className="form-floating mb-4">
//             <input
//                 className={`form-control ${
//                     (formik.touched.confirmPassword &&
//                         formik.errors.confirmPassword) ||
//                     formik.status?.error
//                         ? 'is-invalid'
//                         : ''
//                 }`}
//                 id="confirmPassword"
//                 name="confirmPassword"
//                 type="password"
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 value={formik.values.confirmPassword}
//                 required
//                 placeholder="Подтвердите пароль"
//             />
//             <label htmlFor="confirmPassword">Подтвердите пароль</label>
//             {formik.touched.confirmPassword &&
//                 formik.errors.confirmPassword && (
//                     <div className="invalid-feedback">
//                         {formik.errors.confirmPassword}
//                     </div>
//                 )}
//             {formik.status?.error && (
//                 <div className="invalid-feedback">
//                     {formik.status.error}
//                 </div>
//             )}
//         </div>

//         {children}
//     </form>
// );
// };

// export default RegistrationForm;




