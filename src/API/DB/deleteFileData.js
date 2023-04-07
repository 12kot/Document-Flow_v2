import {doc, deleteDoc, getFirestore} from "firebase/firestore"


const deleteFileDB = async (userEmail, fileID) => {
    const db = getFirestore();
    const userFile = doc(db, "users", `${userEmail}/files/`, fileID); 
    
    await deleteDoc(userFile);
} 

export default deleteFileDB;