import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore ,collection, addDoc ,getDocs,orderBy , doc, deleteDoc , updateDoc} from "firebase/firestore";

const firebaseConfig = {
 
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);



export {db , collection, addDoc ,getDocs,orderBy, doc, deleteDoc,updateDoc }