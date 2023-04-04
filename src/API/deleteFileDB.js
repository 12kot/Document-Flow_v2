import {doc, deleteDoc, getFirestore} from "firebase/firestore"


const deleteFileDB = async (userUID, fileID) => {
    const db = getFirestore();
    const userFile = doc(db, "users", `${userUID}/files/`, fileID); 
    
    await deleteDoc(userFile);
} 

export default deleteFileDB;