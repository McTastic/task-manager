import Image from "next/image";
import Link from "next/link";
import LaptopImage from "../public/images/laptop-image.png";
import Login from "./components/login";
import styles from "../public/css/homepage.module.css";

export default function Home() {
  return (
    <div className={styles.flex}>
      <div className={styles.leftSide}>
        <h1 className={styles.homeText}>This is home</h1>
        <Image className={styles.homeImage}src={LaptopImage} alt="laptop" />
        </div>
      <div className={styles.rightSide}>
        <div className={styles.container}>
          <Link className={styles.link} href="/dashboard">
            Dashboard
          </Link>
          <Login />
        </div>
      </div>
    </div>
  );
}
