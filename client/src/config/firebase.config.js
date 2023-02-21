//getApp will help me to get the information about the app
//getApps will help me to get the complete list of the app 

import { getApp,getApps,initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage" ;

const firebaseConfig = {
  apiKey: "AIzaSyBbg5HWFJsWfigY8DYKghKKeYtJTsFFzyo",
  authDomain: "musicapp-project-514db.firebaseapp.com",
  projectId: "musicapp-project-514db",
  storageBucket: "musicapp-project-514db.appspot.com",
  messagingSenderId: "1039712731708",
  appId: "1:1039712731708:web:d9bc7ea2f1c13c0a067939"
  };

  const app = getApps.length>0 ? getApp() : initializeApp(firebaseConfig);
  const storage = getStorage(app);

  
  
export {app , storage};