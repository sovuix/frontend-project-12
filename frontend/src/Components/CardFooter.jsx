import { useTranslation } from 'react-i18next'
import { ROUTES } from '../services/routes'

const CardFooter = () => {
  const { t } = useTranslation()
  return (
    <div className="card-footer p-4">
      <div className="text-center">
        <span>{t('auth.noAccount')}</span>
        <a href={ROUTES.SIGNUP}>
          {t('auth.register')}
        </a>
      </div>
    </div>
  )
}

export default CardFooter
