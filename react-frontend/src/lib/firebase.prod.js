import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
};

const firebase = Firebase.initializeApp(firebaseConfig);

export { firebase };
