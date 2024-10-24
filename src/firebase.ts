import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCxOfSd4CVLqRqa-VWf44eU2dtBNtSVrCc",
  authDomain: "test-d40fb.firebaseapp.com",
  projectId: "test-d40fb",
  storageBucket: "test-d40fb.appspot.com",
  messagingSenderId: "313013510186",
  appId: "1:313013510186:web:125e035c5a0fa1024f2353",
  measurementId: "G-VMZP9X5YY3",
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const requestFirebaseNotificationPermission = async (): Promise<
  string | null
> => {
  try {
    const currentToken = await getToken(messaging, {
      vapidKey:
        "BB4RqxfMWd8C1hevOO7feEo8Np6lT45_2AAzlgSGxpJ6AS6-ZbxCMcqfrkZYb5ixckgDm6gWwTr-5BFmUN5aLrA", // Get from Firebase Console under Cloud Messaging
    });
    if (currentToken) {
      return currentToken;
    } else {
      console.warn("No Firebase token available");
      return null;
    }
  } catch (error) {
    console.error("An error occurred while retrieving token.", error);
    return null;
  }
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
