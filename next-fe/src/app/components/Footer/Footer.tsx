import React from "react";
import styles from "./Footer.module.scss";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <p>&copy; {`${currentYear} Your Company. All rights reserved.`}</p>
    </footer>
  );
}

export default Footer;
