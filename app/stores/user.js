import { defineStore } from "pinia";
import { auth } from "../plugins/firebase.client";
import { ref } from "vue";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { updateProfile } from "firebase/auth";

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
        displayName: userCredential.user.displayName,
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
        displayName: userCredential.user.displayName,
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

  const updateProfileInfo = async (displayName) => {
    if (!auth.currentUser) return;
    await updateProfile(auth.currentUser, { displayName });

    user.value = {
      ...user.value,
      displayName,
    };

    localStorage.setItem(
      "user",
      JSON.stringify({
        ...user.value,
      }),
    );
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
