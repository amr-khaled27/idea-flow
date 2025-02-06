import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "@/app/firebase";

const handleSignUpWithGoogle = async () => {
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  try {
    await signInWithPopup(auth, provider);
    window.location.href = "/dashboard";
  } catch (e) {
    console.error(e);
  }
};

export { handleSignUpWithGoogle };
