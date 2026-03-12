import CardBody from './CardBody'
import LoginForm from './LoginForm'
import Button from './Button'
import Container from './Container'
import Card from './Card'
import Logo from './CardLogo'
import CardForm from './CardForm'
import Header from './Header'
import { useTranslation } from 'react-i18next'
import { ROUTES } from '../services/routes'

const LoginPage = () => {
  const { t } = useTranslation()
  return (
    <div className="h-100 bg-light">
      <div className="h-100" id="chat">
        <div className="d-flex flex-column h-100">
          <Header />
          <Container>
            <Card>
              <CardBody variant="login">
                <Logo />
                <div className="col-12 col-md-6 mt-3 mt-md-0">
                  <h1 className="text-center mb4">{t('auth.login')}</h1>
                  <LoginForm>
                    <Button
                      text={t('auth.login')}
                      className="w-100 mb-3 btn btn-outline-primary"
                      type="submit"
                    />
                  </LoginForm>
                </div>
              </CardBody>

              <div className="card-footer p-4">
                <div className="text-center">
                  <span>{t('auth.noAccount')}</span>
                  <a href={ROUTES.SIGNUP}>
                    {t('auth.register')}
                  </a>
                </div>
              </div>

            </Card>
          </Container>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
