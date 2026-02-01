import { useUserStore } from "@/stores/user";

export default defineNuxtRouteMiddleware((to) => {
  if (process.server) return;

  const userStore = useUserStore();

  if (
    !userStore.isAuthenticated &&
    to.path !== "/login" &&
    to.path !== "/register"
  ) {
    return navigateTo("/login");
  } else if (
    userStore.isAuthenticated &&
    (to.path === "/login" || to.path === "/register")
  ) {
    return navigateTo("/" || "/profile");
  }

  // const user = localStorage.getItem("user");

  // if (!user && to.path !== "/login" && to.path !== "/register") {
  //   return navigateTo("/login");
  // } else if (user && (to.path === "/login" || to.path === "/register")) {
  //   return navigateTo("/" || "/profile");
  // }
});
