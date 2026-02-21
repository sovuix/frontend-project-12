import Header from './Header/Header'
import { useTranslation } from 'react-i18next'

const ErrorPage = ({ title, showLink = true }) => {
  const { t } = useTranslation()
  return (
    <div className="h-100 bg-light">
      <div className="h-100" id="chat">
        <div className="d-flex flex-column h-100">
          <Header />
          <div className="text-center">
            <img
              alt={t(title)}
              className="img-fluid h-25"
              src="./public/404.svg"
            />
            <h1 className="h4 text-muted">{t(title)}</h1>
            {showLink && (
              <p className="text-muted">
                {t('common.canMove')}
                <a href="/">{t('common.mainPage')}</a>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ErrorPage
