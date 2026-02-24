import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUser } from '../../state/slices/authSlice'
import { createRegistrationSchema } from '../../validationSchemas/authSchemas'
import { useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { authStorage } from '../../services/authStorage'

const RegistrationForm = ({ children }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const usernameRef = useRef(null)

  useEffect(() => {
    usernameRef.current?.focus()
  }, [])

  const registerUser = async (username, password) => {
    const response = await fetch('/api/v1/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  }

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: createRegistrationSchema(t),
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      try {
        const data = await registerUser(values.username, values.password)

        authStorage.setToken(data.token)
        dispatch(
          setUser({
            username: data.username,
            token: data.token,
          }),
        )
        authStorage.setUsername(data.username)

        navigate('/')
      }
      catch (error) {
        setStatus({
          error: t('reg.userExists'),

        })
        console.error('Registration failed:', error)
      }
      finally {
        setSubmitting(false)
      }
    },
  })

  const handleUsernameChange = (e) => {
    formik.handleChange(e)
    if (formik.status?.error) {
      formik.setStatus(null)
    }
  }

  return (
    <form className="w-50" onSubmit={formik.handleSubmit} noValidate>
      <h1 className="text-center mb-4">{t('auth.register')}</h1>
      <div className="form-floating mb-3">
        <input
          ref={usernameRef}
          className={`form-control ${
            (formik.touched.username && formik.errors.username)
            || formik.status?.error
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
          placeholder={t('reg.usernameCondition')}
        />
        <label htmlFor="username">{t('reg.username')}</label>
        {formik.touched.username && formik.errors.username && (
          <div className="invalid-tooltip">{formik.errors.username}</div>
        )}
      </div>

      <div className="form-floating mb-3">
        <input
          className={`form-control ${
            (formik.touched.password && formik.errors.password)
            || formik.status?.error
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
          placeholder={t('reg.passCondition')}
        />
        <label htmlFor="password">{t('reg.pass')}</label>
        <div className="invalid-feedback"></div>
        {formik.touched.password && formik.errors.password && (
          <div className="invalid-tooltip">{formik.errors.password}</div>
        )}
      </div>

      <div className="form-floating mb-4">
        <input
          className={`form-control ${
            (formik.touched.confirmPassword && formik.errors.confirmPassword)
            || formik.status?.error
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
          placeholder={t('reg.confPass')}
        />
        <label htmlFor="confirmPassword">{t('reg.confPass')}</label>
        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
          <div className="invalid-tooltip">{formik.errors.confirmPassword}</div>
        )}
        {formik.status?.error && (
          <div className="invalid-tooltip">{formik.status.error}</div>
        )}
      </div>

      {children}
    </form>
  )
}

export default RegistrationForm
