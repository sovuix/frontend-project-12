import { useTranslation } from 'react-i18next';

const CardFooter = () => {
  const { t } = useTranslation();
  return (
    <div className="card-footer p-4">
      <div className="text-center">
        <span>{t('auth.noAccount')}</span>
        <a href="/signup"> {t('auth.register')} </a>
      </div>
    </div>
  );
};

export default CardFooter;
