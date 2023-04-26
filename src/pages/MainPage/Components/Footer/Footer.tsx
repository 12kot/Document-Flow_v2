import React, { ReactElement } from "react";
import styles from "./Footer.module.css";

const Footer = (): ReactElement => {
    return(<footer className={`${styles.footer}`}> <p>Nikitoshas devs studio</p> </footer>)
}

export default Footer;