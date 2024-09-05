import styles from "./styles/Button.module.css";


const Button = (props) => {
  const backgroundColor = props.backgroundColor || '#F27C00';
  const color = props.color || '#FFF';
  const type = props.type || 'button';
  const disabled = props.disabled || null;

  const style = { 
    color,
    backgroundColor
  }
  if(disabled) {
    style.backgroundColor = 'rgba(var(--yaya-neutral-rgbval), 50%)';
  }

  const handleClick = () => {
    props.onClick();
  };

  return (
    <button className={styles.button} style={style} onClick={() => handleClick()} disabled={disabled}>{props.children}</button>
  )
}

export default Button