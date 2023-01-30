import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { QuizData } from "./Quiz/Quiz";

const useFirebaseData = () => {
  const [firebaseData, setFirebaseData] = useState<QuizData[]>([]);
  const [firebaseError, setFirebaseError] = useState<string>("");
  const [firebaseLoading, setFirebaseLoading] = useState<boolean>(false);

  // Effect hook to fetch data from Firebase on component mount
  useEffect(() => {
    const getData = async () => {
      setFirebaseLoading(true);
      try {
        // Fetch data from Firebase Firestore
        const querySnapshot = await getDocs(collection(db, "test1"));
        // Loop through documents in snapshot
        querySnapshot.forEach((doc) => {
          // Set firebaseData state to data from Firestore
          setFirebaseData(doc.data().quizData);
          setFirebaseLoading(false);
        });
      } catch (error: any) {
        console.error(error);
        setFirebaseError(error);
        setFirebaseLoading(false);
      }
    };
    getData();
  }, []);

  // Return data, error, and loading status
  return { firebaseData, firebaseError, firebaseLoading };
};

export default useFirebaseData;
