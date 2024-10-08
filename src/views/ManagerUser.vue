<template>
  <div class="main-content">
    <h2>Quản lý người dùng</h2>

    <button class="add-user-btn" @click="openAddForm">Thêm mới người dùng</button>

    <AddUserForm
      v-if="isFormVisible"
      :isEditMode="isEditMode"
      :editUser="currentUser"
      @closeForm="toggleForm"
      @submitUser="handleSaveUser"
    />

    <input
      type="text"
      v-model="keySearch"
      placeholder="Tìm kiếm theo tên hoặc email..."
      class="search-input"
    />

    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên</th>
            <th>Giới tính</th>
            <th>Ngày sinh</th>
            <th>Email</th>
            <th>Chức năng</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in filteredUsers" :key="user.id">
            <td>{{ index + 1 }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.gender }}</td>
            <td>{{ user.dateOfBirth }}</td>
            <td>{{ user.email }}</td>
            <td>
              <button class="btn btn-edit" @click="openEditForm(user)">Sửa</button>
              <button class="btn btn-delete" @click="handleDelete(user.id)">Xóa</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive, computed } from 'vue';
import AddUserForm from './AddUserForm.vue';

const managerUser = reactive([]);
const keySearch = ref('');

const saveUsersToLocal = () => {
  localStorage.setItem('managerUsers', JSON.stringify(managerUser));
};

const loadUsersFromLocal = () => {
  const users = localStorage.getItem('managerUsers');
  if (users) {
    const parsedUsers = JSON.parse(users);
    parsedUsers.forEach(user => managerUser.push(user));
  }
};

onMounted(() => {
  loadUsersFromLocal();
});

const isFormVisible = ref(false);
const isEditMode = ref(false);
const currentUser = ref(null);

const openAddForm = () => {
  isEditMode.value = false;
  currentUser.value = null;
  isFormVisible.value = true;
};

const openEditForm = (user) => {
  isEditMode.value = true;
  currentUser.value = { ...user };
  isFormVisible.value = true;
};

const toggleForm = () => {
  isFormVisible.value = !isFormVisible.value;
};

const handleSaveUser = (user) => {
  if (isEditMode.value) {
    const index = managerUser.findIndex(u => u.id === user.id);
    if (index !== -1) {
      managerUser[index] = user;
    }
  } else {
    managerUser.push({ ...user, id: Date.now() });
  }
  saveUsersToLocal();
  toggleForm();
};

const handleDelete = (userId) => {
  const index = managerUser.findIndex(user => user.id === userId);
  if (index !== -1) {
    managerUser.splice(index, 1);
    saveUsersToLocal();
  }
};

const filteredUsers = computed(() => {
  return managerUser.filter(user => {
    return user.name.toLowerCase().includes(keySearch.value.toLowerCase()) ||
           user.email.toLowerCase().includes(keySearch.value.toLowerCase());
  });
});
</script>

<style scoped>
.main-content {
  flex-grow: 1;
  padding: 20px;
}

h2 {
  margin-bottom: 20px;
}

.add-user-btn {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 20px;
}

.search-input {
  padding: 10px;
  width: 350px; 
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
  margin-bottom: 20px;
  transition: border 0.3s ease; 
}

.search-input:focus {
  border-color: #007bff; 
  outline: none; 
}

.table-container {
  margin-top: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
}

table,
th,
td {
  border: 1px solid #ddd;
}

th,
td {
  padding: 12px;
  text-align: left;
}

th {
  background-color: #f2f2f2; 
}

.btn {
  padding: 8px 12px;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

.btn-edit {
  background-color: #007bff; 
}

.btn-delete {
  background-color: #dc3545; 
}
</style>
