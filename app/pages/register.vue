<template>
  <div class="container">
    <div class="card">
      <h2>إنشاء حساب</h2>

      <form @submit.prevent="handleRegister">
        <div class="form-group">
          <label>البريد الإلكتروني</label>
          <input type="email" v-model="email" placeholder="email" required />
        </div>

        <div class="form-group">
          <label>كلمة المرور</label>
          <input
            type="password"
            v-model="password"
            placeholder="password"
            required
          />
        </div>

        <div class="form-group">
          <label>تأكيد كلمة المرور</label>
          <input
            type="password"
            v-model="confirmPassword"
            placeholder="password"
            required
          />
        </div>

        <button type="submit">تسجيل</button>
      </form>

      <p class="switch">
        لديك حساب؟
        <NuxtLink to="/login">تسجيل الدخول</NuxtLink>
      </p>

      <p v-if="error" class="error">{{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const error = ref(null);

const userStore = useUserStore();
const router = useRouter();

const handleRegister = async () => {
  error.value = null;
  if (password.value !== confirmPassword.value) {
    error.value = "كلمتا المرور غير متطابقتين.";
    return;
  }
  try {
    await userStore.register({ email: email.value, password: password.value });
    console.log("User registered successfully");
    router.push("/login");
  } catch (err) {
    error.value = err.message || "حدث خطأ أثناء إنشاء الحساب.";
  }
};
</script>

<style scoped>
.container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f3f3f3;
}

.card {
  background-color: #fff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

h2 {
  margin-bottom: 1.5rem;
  color: #333;
}

.form-group {
  margin-bottom: 1rem;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 0.3rem;
  color: #555;
}

input {
  width: 100%;
  padding: 0.5rem 0.8rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
}

input:focus {
  outline: none;
  border-color: #28a745;
}

button {
  width: 100%;
  padding: 0.7rem;
  margin-top: 1rem;
  background-color: #28a745;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
}

button:hover {
  background-color: #1e7e34;
}

.switch {
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #555;
}

.switch a {
  color: #28a745;
  text-decoration: none;
}

.switch a:hover {
  text-decoration: underline;
}

.error {
  color: red;
  margin-top: 1rem;
}
</style>
