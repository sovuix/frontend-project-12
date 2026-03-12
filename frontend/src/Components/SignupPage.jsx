import CardBody from './CardBody'
import Button from './Button'
import Container from './Container'
import Card from './Card'
import Logo from './CardLogo'
import Header from './Header'
import RegistrationForm from './RegistrationForm'
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
              <CardBody variant="signUp">
                <Logo variant="signUp" />
                <RegistrationForm>
                  <Button
                    text={t('reg.registration')}
                    className="w-100 btn btn-outline-primary"
                    type="submit"
                  />
                </RegistrationForm>
              </CardBody>
            </Card>
          </Container>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
