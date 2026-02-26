import { useDispatch} from 'react-redux'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { setUser } from '../../state/slices/authSlice'
import { useTranslation } from 'react-i18next'
import { ToastContainer, toast } from 'react-toastify'
import { useRef, useEffect } from 'react'
import { authStorage } from '../../services/authStorage'
import { ROUTES } from '../../services/routes'
import { useLoginMutation } from '../../state/chatApi'

const LoginForm = ({ children }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const userloginRef = useRef(null)

  useEffect(() => {
    userloginRef.current?.focus()
  }, [])

  const [login, { isLoading }] = useLoginMutation()

  const formik = useFormik({
    initialValues: {
      userLogin: '',
      password: '',
    },
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      try {
        if (!navigator.onLine) {
          toast.error(t('common.connectionError'))
          return
        }

        const data = await login({
          username: values.userLogin,
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

        setStatus(null)
        navigate(ROUTES.HOME)
      }
      catch (error) {
        if (!navigator.onLine) {
          toast.error(t('common.connectionError'))
        }
        else if (error?.status >= 500) {
          toast.error(t('common.notResponding'))
        }
        else {
          setStatus({ error: t('auth.error') })
        }
      }
      finally {
        setSubmitting(false)
      }
    },
  })

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
            disabled={isLoading}
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
            disabled={isLoading}
          />
          {formik.status?.error && (
            <div className="invalid-tooltip">{t('auth.error')}</div>
          )}
          <label htmlFor="password">{t('auth.pass')}</label>
        </div>

        {children}
      </form>
    </>
  )
}

export default LoginForm
