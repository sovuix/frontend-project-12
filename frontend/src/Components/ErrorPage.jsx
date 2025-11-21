import Header from './Header/Header';

const ErrorPage = () => {
  return (
    <div className="h-100 bg-light">
      <div className="h-100" id="chat">
        <div className="d-flex flex-column h-100">
          <Header />
          <div className="text-center">
            <img
              alt="Страница не найдена"
              className="img-fluid h-25"
              src="./public/404.svg"
            />
            <h1 className="h4 text-muted">Страница не найдена</h1>
            <p className="text-muted">
              Но вы можете перейти <a href="/">на главную страницу сайта </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
