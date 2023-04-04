import { ref, child, push, update, getDatabase } from "firebase/database";
import { db } from "../firebase";

const writeNewPost = (user, file) => {
  // Get a key for a new Post.
  const newPostKey = push(child(ref(db), "files")).key;

  file.uid = newPostKey;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  const updates = {};
  updates["/users/" + user.uid + "/files/" + newPostKey] = file;

  update(ref(db), updates).then().catch();

  return newPostKey;
};

export default writeNewPost;
