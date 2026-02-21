const Button = ({ text, children, className, type = 'button', onClick }) => {
  return (
    <button type={type} className={className} onClick={onClick}>
      {text || children}
    </button>
  )
}
export default Button
