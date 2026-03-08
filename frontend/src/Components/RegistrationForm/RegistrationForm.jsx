import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUser } from '../../state/slices/authSlice'
import { createRegistrationSchema } from '../../validationSchemas/authSchemas'
import { useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { authStorage } from '../../services/authStorage'
import { ROUTES } from '../../services/routes'
import { useSignupMutation } from '../../state/chatApi'
import { HTTP_STATUS } from '../../services/httpStatus'

const RegistrationForm = ({ children }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const usernameRef = useRef(null)

  useEffect(() => {
    usernameRef.current?.focus()
  }, [])

  const [signup, { isLoading }] = useSignupMutation()

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: createRegistrationSchema(t),
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      try {
        if (!navigator.onLine) {
          setStatus({ error: t('common.connectionError') })
          return
        }

        const data = await signup({
          username: values.username,
          password: values.password,
        }).unwrap()

        authStorage.setToken(data.token)
        authStorage.setUsername(data.username)

        dispatch(
          setUser({
            username: data.username,
            token: data.token,
          }),
        )

        navigate(ROUTES.HOME)
      }
      catch (error) {
        if (error?.status >= HTTP_STATUS.INTERNAL_SERVER) {
          setStatus({ error: t('common.notResponding') })
          return
        }

        setStatus({ error: t('reg.userExists') })
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
          disabled={isLoading}
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
          disabled={isLoading}
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
          disabled={isLoading}
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
