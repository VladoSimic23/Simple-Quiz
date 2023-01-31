import React from "react";
import styles from "../../GlobalStyles/index.module.css";

interface IntroI {
  setIntro: React.Dispatch<React.SetStateAction<boolean>>;
}

const Intro: React.FC<IntroI> = ({ setIntro }) => {
  return (
    <div className={styles.Intro}>
      <h2>Uputstva</h2>
      <p>
        Test sadrži 40 pitanja, te za uspješno polaganje testa potrebno je
        minimalno 108 od 120 mogućih bodova. Na kraju testa bit će izlistana
        pitanja na koja ste pogrešno odgovorili ako takvih bude.
      </p>
      <h3>Sistem Bodovanja: </h3>
      <ul>
        <li>1 - 20 (2 boda svako pitanje)</li>
        <li>21 - 30 (3 boda svako pitanje)</li>
        <li>31 - 40 (5 bodova svako pitanje)</li>
      </ul>

      <button className={styles.btn} onClick={() => setIntro(false)}>
        Razumijem
      </button>
    </div>
  );
};

export default Intro;
