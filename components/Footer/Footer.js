import React from 'react';
import Link from "next/link"; 
import styles from './styles/Footer.module.css'; 

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContainer}>
                <div className={styles.footerLogo}>
                    <img src="/icons/logo.png" alt="YAYA Logo" />
                </div>

                <div className={styles.footerLinks}>
                    <ul>
                        <li><Link href="/concept"><a>Concept</a></Link></li>
                        <li><Link href="/myjuice"><a>Nos Jus</a></Link></li>
                        <li><Link href="/blog"><a>Blog</a></Link></li>
                        <li><Link href="/contact"><a>Contact</a></Link></li>
                        <li><Link href="/mentions-legales"><a>Mentions Légales</a></Link></li>
                    </ul>
                </div>

                <div className={styles.footerSocial}>
                    <ul>
                        <li>
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                                <img src="/icons/fb.png" alt="Facebook" className={styles.socialIcon} />
                            </a>
                        </li>
                        <li>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                                <img src="/icons/Instagram_icon.png" alt="Instagram" className={styles.socialIcon} />
                            </a>
                        </li>
                        <li>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                                <img src="/icons/linkedin.png" alt="LinkedIn" className={styles.socialIcon} />
                            </a>
                        </li>
                    </ul>
                </div>

                <div className={styles.footerContact}>
                    <p><strong>YAYA SPICY JUICE SAS</strong></p>
                    <p>49 rue de Ponthieu<br />75008 Paris</p>
                    <p>Email: <a href="mailto:contact@yaya-spicyjuice.com">contact@yaya-spicyjuice.com</a></p>
                    <p>Tel: 01 44 74 09 88</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
