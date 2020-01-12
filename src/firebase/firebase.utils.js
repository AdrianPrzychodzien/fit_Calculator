import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
  apiKey: "AIzaSyDQoCc87Tqm4SY-ICEw3vRc0HR8YeEUB4Q",
  authDomain: "fit-calc-3a560.firebaseapp.com",
  databaseURL: "https://fit-calc-3a560.firebaseio.com",
  projectId: "fit-calc-3a560",
  storageBucket: "fit-calc-3a560.appspot.com",
  messagingSenderId: "375741247446",
  appId: "1:375741247446:web:846ff51b4a37ddc5efbe77"
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return

  const userRef = firestore.doc(`users/${userAuth.uid}`)

  const snapShot = await userRef.get()

  if (!snapShot.exists) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message)
    }
  }

  return userRef
}

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase
