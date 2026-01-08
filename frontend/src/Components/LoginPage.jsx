import CardBody from './CardBody/CardBody';
import SignUpForm from './SignupForm/SignupForm';
import Button from './Button/Button';
import Container from './Container/Container';
import Card from './Card/Card';
import Logo from './CardLogo/CardLogo';
import CardForm from './CardForm/CardForm';
import Header from './Header/Header';
import CardFooter from './CardFooter/CardFooter';

const LoginPage = () => {
  return (
    <div className="h-100 bg-light">
      <div className="h-100" id="chat">
        <div className="d-flex flex-column h-100">
          <Header />
          <Container>
            <Card>
              <CardBody>
                <Logo />
                <CardForm>
                  <SignUpForm>
                    <Button
                      text="Войти"
                      className="w-100 mb-3 btn btn-outline-primary"
                      type='submit'
                    />
                  </SignUpForm>
                </CardForm>
              </CardBody>
              <CardFooter />
            </Card>
          </Container>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
