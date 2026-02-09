import Button from "../Button/Button";
import { useTranslation } from "react-i18next";

const Header = ({ children }) => {
  const { t } = useTranslation();
  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href="/">
          {t("common.chatname")}
        </a>
        {children}
      </div>
    </nav>
  );
};

export default Header;
