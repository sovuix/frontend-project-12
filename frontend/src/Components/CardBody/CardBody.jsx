import cn from 'classnames'

const CardBody = ({ children, className, variant = 'login' }) => {
  const baseClasses = {
    login: 'cb card-body row p-5',
    signUp: 'card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5'
  }
  return <div className={cn(baseClasses[variant], className)}>{children}</div>
}

export default CardBody
