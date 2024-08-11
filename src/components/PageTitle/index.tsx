import React from "react";
import styles from "./pageTitle.module.scss";
import { useNavigate } from "react-router-dom";
import { MdArrowBackIosNew } from "react-icons/md";

interface IPageTitle {
  title: string;
  redirect?: string | null;
}

const PageTitle: React.FC<IPageTitle> = ({ title, redirect = null }) => {
  const navigate = useNavigate();
  return (
    <div className={styles.row}>
      {redirect ? (
        <MdArrowBackIosNew
          className={styles.backIcon}
          onClick={() => navigate(redirect)}
        />
      ) : null}
      <h1 className={styles.title}>{title}</h1>
    </div>
  );
};

export default PageTitle;
