import { defineStore } from "pinia";
import { auth } from "../plugins/firebase.client";
import { ref } from "vue";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { updateProfile } from "firebase/auth";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "../plugins/firebase.client";

export const useUserStore = defineStore("user", () => {
  const user = ref(null);
  const isAuthenticated = ref(false);

  // ✅ client only
  const initAuth = () => {
    if (process.client) {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        user.value = JSON.parse(savedUser);
        isAuthenticated.value = true;
      }
    }
  };

  const login = async ({ email, password }) => {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );

    user.value = userCredential.user;
    isAuthenticated.value = true;

    localStorage.setItem(
      "user",
      JSON.stringify({
        uid: userCredential.user.uid,
        email: userCredential.user.email,
      }),
    );
  };

  const register = async ({ email, password }) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );

    user.value = userCredential.user;
    isAuthenticated.value = true;

    localStorage.setItem(
      "user",
      JSON.stringify({
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName,
        photoURL,
      }),
    );
  };

  const setUser = (userData) => {
    user.value = userData;
    isAuthenticated.value = !!userData;
  };

  const logout = () => {
    user.value = null;
    isAuthenticated.value = false;
    localStorage.removeItem("user");
  };

  const updateProfileInfo = async ({ displayName, photoFile }) => {
    if (!auth.currentUser) return;
    let photoURL = auth.currentUser.photoURL;
    if (photoFile) {
      photoURL = await uploadProfileImage(photoFile);
    }
    await updateProfile(auth.currentUser, {
      displayName,
      photoURL,
    });

    user.value = {
      ...user.value,
      displayName,
      photoURL,
    };

    localStorage.setItem(
      "user",
      JSON.stringify({
        ...user.value,
      }),
    );
  };

  const uploadProfileImage = async (file) => {
    const imageRef = storageRef(storage, `avatars/${auth.currentUser.uid}`);
    await uploadBytes(imageRef, file);
    return await getDownloadURL(imageRef);
  };

  return {
    user,
    isAuthenticated,
    updateProfileInfo,
    initAuth,
    login,
    register,
    logout,
    setUser,
  };
});
