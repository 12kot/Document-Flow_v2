import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";

const getUserByName = async (name: string): Promise<string> => {
  const q = query(collection(db, "users"), where("name", "==", name));

  const querySnapshot = await getDocs(q);

  const emails: string[] = [];
  querySnapshot.forEach((doc) => {
    emails.push(doc.id.toLowerCase());
  });

  return emails[0];
};

export default getUserByName;
