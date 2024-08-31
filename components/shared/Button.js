import styles from "./styles/Button.module.css";


const Button = (props) => {
  const backgroundColor = props.backgroundColor || '#F27C00';
  const color = props.color || '#FFF';
  const type = props.type || 'button';

  const style = { 
    color,
    backgroundColor
  }

  const handleClick = () => {
    props.onClick();
  };

  return (
    <button className={styles.button} style={style} onClick={() => handleClick()}>{props.children}</button>
  )
}

export default Button