import styles from "./styles/Button.module.css";


const Button = (props) => {
  const backgroundColor = props.backgroundColor || '#F27C00';
  const color = props.color || '#FFF';
  const type = props.type || null;
  const disabled = props.disabled || null;
  const fontSize = props.fontSize || null;
  const minWidth = props.minWidth || null;
  const id = props.id || null;

  const style = { 
    color,
    backgroundColor
  }
  if(disabled) style.backgroundColor = 'rgba(var(--yaya-neutral-rgbval), 50%)';
  if(fontSize) style.fontSize = fontSize;
  if(minWidth) style.minWidth = minWidth;

  const className = props.className ? [styles.button, props.className].join(' ') : styles.button;

  const handleClick = () => {
    props.onClick();
  };

  return (
    <button className={className} style={style} onClick={() => handleClick()} disabled={disabled} type={type} id={id}>{props.children}</button>
  )
}

export default Button