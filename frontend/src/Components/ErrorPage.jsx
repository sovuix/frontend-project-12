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
                            src='./public/404.svg'
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;
