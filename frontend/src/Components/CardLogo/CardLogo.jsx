import cn from 'classnames'
const Logo = ({ className, variant = 'login' }) => {
  const variants = {
    login: {
      src: '/chat-logo.jpg',
      classes: 'col-12 col-md-6 d-flex align-items-center justify-content-center'
    },
    signUp: {
      src: '/signup-logo.jpg',
      classes: ''
    }
  };

  const { src, classes } = variants[variant];

  return (
    <div className={cn(classes, className)}>
      <img 
        src={src} 
        className="rounded-circle"
        alt="App logo"
      />
    </div>
  );
};

export default Logo;
