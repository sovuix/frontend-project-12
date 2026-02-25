import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ROUTES } from '../../services/routes'

const Header = ({ children }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const handleLogoClick = (e) => {
    e.preventDefault()
    navigate(ROUTES.HOME)
  }

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href="/" onClick={handleLogoClick}>
          {t('common.chatname')}
        </a>
        {children}
      </div>
    </nav>
  )
}

export default Header
