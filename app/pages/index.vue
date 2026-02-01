<template>
  <div class="contain">
    <div>Home</div>

    <template v-if="!userStore.isAuthenticated">
      <NuxtLink class="link" to="/login">Login</NuxtLink> |
      <NuxtLink class="link" to="/register">Register</NuxtLink> |
    </template>
    <template v-else>
      <NuxtLink class="link" to="/profile">Profile</NuxtLink>

      <br />
      <button>
        <span @click="logout">Logout</span>
      </button>
    </template>
  </div>
</template>

<script setup>
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();

const logout = () => {
  userStore.logout();
  router.push("/login");
  console.log("User logged out");
};
</script>

<style scoped>
.contain {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
}
button {
  width: 50%;
  padding: 0.7rem;
  margin-top: 1rem;
  background-color: #00d5ff;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
.link {
  margin-top: 1rem;
  font-size: 1.2rem;
  color: #00d5ff;
  text-decoration: none;
}
.link:hover {
  color: #007bff;
}
</style>
