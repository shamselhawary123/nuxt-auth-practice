<template>
  <ClientOnly>
    <div class="container" v-if="user">
      <div class="card">
        <NuxtLink class="link" to="/">Home</NuxtLink>
        <h2>الملف الشخصي</h2>

        <!-- Profile Image -->
        <div class="avatar-section">
          <img
            :src="previewImage || photoURL || defaultAvatar"
            class="avatar"
          />
          <input type="file" accept="image/*" @change="updatePhotoURL" />
        </div>

        <!-- User Info -->
        <div class="form-group">
          <label>الاسم</label>
          <input v-model="displayName" type="text" />
        </div>

        <div class="form-group">
          <label>البريد الإلكتروني</label>
          <input :value="user.email" disabled />
        </div>

        <div class="form-group">
          <label>الرقم التعريفي</label>
          <input :value="user.uid" disabled />
        </div>

        <button @click="updateProfileInfo">حفظ التعديلات</button>

        <button class="logout">
          <span @click="logout">Logout</span>
        </button>
        <p v-if="message" class="success">{{ message }}</p>
        <p v-if="error" class="error">{{ error }}</p>
      </div>
    </div>
  </ClientOnly>
</template>
<script setup>
import { ref, computed } from "vue";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();
const user = computed(() => userStore.user);

const defaultAvatar = "/default-avatar.png";
const displayName = ref(user.value?.displayName || "");

const message = ref("");
const error = ref("");

const updateProfileInfo = async () => {
  try {
    await userStore.updateProfileInfo(displayName.value);
    message.value = "تم تحديث الملف الشخصي بنجاح!";
  } catch (err) {
    error.value = err.message || "حدث خطأ أثناء التحديث.";
  }
};

const logout = () => {
  userStore.logout();
  router.push("/login");
  console.log("User logged out");
};
</script>

<style scoped>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f4f4f4;
}

.card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  width: 100%;
  max-width: 450px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
}
.link {
  /* display: block; */
  margin-bottom: 1rem;
  color: #00d5ff;
  text-decoration: none;
  font-weight: bold;
  font-size: 20px;
}
.link:hover {
  color: #007bff;
}
h2 {
  margin-bottom: 1.5rem;
  color: #333;
}

.avatar-section {
  margin-bottom: 1.5rem;
}

.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #00d5ff;
  margin-bottom: 0.5rem;
}

input[type="file"] {
  font-size: 0.9rem;
}

.form-group {
  text-align: left;
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.3rem;
  color: #555;
}

input {
  width: 100%;
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 6px;
}

input:disabled {
  background: #eee;
}

button {
  width: 100%;
  padding: 0.7rem;
  background: #00d5ff;
  border: none;
  color: white;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
}
button:hover {
  background: #0056b3;
}
.logout {
  margin-top: 1rem;
  background: #dc3545;
}
.logout:hover {
  background: #a71d2a;
}
.success {
  color: green;
  margin-top: 1rem;
}

.error {
  color: red;
  margin-top: 1rem;
}
</style>
