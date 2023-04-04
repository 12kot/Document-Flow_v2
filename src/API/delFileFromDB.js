import {doc, deleteDoc, getFirestore} from "firebase/firestore"


const delFileFromDB = async (userUID, fileUID) => {
    
    const db = getFirestore();
    const userFile = doc(db, "users", `${userUID}/files/${fileUID}`); 
    
    await deleteDoc(userFile).then(console.log).catch(console.log);
} 

export default delFileFromDB;