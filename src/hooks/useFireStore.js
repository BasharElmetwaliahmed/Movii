import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { useCallback, useState } from "react";
import { db } from "../services/firebase";

function useFireStore() {
  const [isLoading, setLoading] = useState();
  const addToWatchList = async (userId, dataId, data) => {
    setLoading(true);
    try {
      await setDoc(
        doc(db, "users", `${userId}`, "watchlist", `${dataId}`),
        data
      );
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const checkInWatchList = async (userId, dataId) => {
    const docRef = doc(
      db,
      "users",
      userId?.toString(),
      "watchlist",
      dataId?.toString()
    );
    setLoading(true);
    try {
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const removeFromWatchlist = async (userId, dataId) => {
    try {
      await deleteDoc(doc(db, "users", userId, `watchlist`, dataId));
    } catch (error) {
      console.log(error, "Error while deleting doc");
    }
  };

  const getWatchlist = useCallback(async (userId) => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(
        collection(db, "users", userId, "watchlist")
      );
      const data = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
      }));
      return data;
    } catch (err) {
      console.log(err);
    }
    finally{
      setLoading(false);
    }
  }, []);
  return {
    addToWatchList,
    isLoading,
    checkInWatchList,
    removeFromWatchlist,
    getWatchlist,
  };
}

export default useFireStore;
