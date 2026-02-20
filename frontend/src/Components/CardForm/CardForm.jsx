import { useTranslation } from 'react-i18next';

const CardForm = ({ children }) => {
  const { t } = useTranslation();
  return (
    <div className="col-12 col-md-6 mt-3 mt-md-0">
      <h1 className="text-center mb4">{t('auth.login')}</h1>
      {children}
    </div>
  );
};

export default CardForm;
