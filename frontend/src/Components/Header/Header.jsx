import Button from '../Button/Button';

const Header = ({children}) => {
  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href="/">
          Sovuix Chat
        </a>
        {children}
      </div>
    </nav>
  );
};

export default Header;
