import styles from "./styles/Banner.module.css";


const Banner = (props) => {
  const backgroundColor = props.backgroundColor || 'var(--yaya-prime)';
  const color = props.color || '#FFF';
  const fontSize = props.fontSize || null;
  const id = props.id || null;

  const style = { 
    color,
    backgroundColor
  }
  if(fontSize) style.fontSize = fontSize;

  const className = props.className ? [styles.banner, props.className].join(' ') : styles.banner;

  const handleClick = () => {
    props.onClick();
  };

  return (
    <div className={className} style={style} id={id}>
        <div className={styles.bannerInner}>
            {props.children}
        </div>
    </div>
  )
}

export default Banner