import CardBody from './CardBody/CardBody'
import LoginForm from './LoginForm/LoginForm'
import Button from './Button/Button'
import Container from './Container/Container'
import Card from './Card/Card'
import Logo from './CardLogo/CardLogo'
import CardForm from './CardForm/CardForm'
import Header from './Header/Header'
import CardFooter from './CardFooter/CardFooter'
import { useTranslation } from 'react-i18next'

const LoginPage = () => {
  const { t } = useTranslation()
  return (
    <div className="h-100 bg-light">
      <div className="h-100" id="chat">
        <div className="d-flex flex-column h-100">
          <Header />
          <Container>
            <Card>
              <CardBody variant='login'>
                <Logo />
                <CardForm>
                  <LoginForm>
                    <Button
                      text={t('auth.login')}
                      className="w-100 mb-3 btn btn-outline-primary"
                      type='submit'
                    />
                  </LoginForm>
                </CardForm>
              </CardBody>
              <CardFooter />
            </Card>
          </Container>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
