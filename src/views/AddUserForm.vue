<template>
    <div class="form-container">
      <h2>{{ isEditMode ? 'Chỉnh sửa người dùng' : 'Thêm người dùng mới' }}</h2>
  
      <form @submit.prevent="handleSubmit">
        <label for="name">Tên:</label>
        <input id="name" v-model="formData.name" type="text" required />
  
        <label for="gender">Giới tính:</label>
        <select id="gender" v-model="formData.gender" required>
          <option value="Male">Nam</option>
          <option value="Female">Nữ</option>
        </select>
  
        <label for="dob">Ngày sinh:</label>
        <input id="dob" v-model="formData.dateOfBirth" type="date" required />
  
        <label for="email">Email:</label>
        <input id="email" v-model="formData.email" type="email" required />
  
        <div class="button-group">
          <button type="submit">{{ isEditMode ? 'Cập nhật' : 'Thêm' }}</button>
          <button type="button" @click="$emit('closeForm')">Đóng</button>
        </div>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, watch, defineEmits, defineProps } from 'vue';
  
  const props = defineProps({
    isEditMode: Boolean,
    editUser: Object,
  });
  
  const emit = defineEmits(['closeForm', 'submitUser']);
  
  const formData = ref({
    name: '',
    gender: 'Male',
    dateOfBirth: '',
    email: '',
  });
  
  watch(
    () => props.editUser,
    (newUser) => {
      if (newUser) {
        formData.value = { ...newUser };
      }
    },
    { immediate: true }
  );
  
  // Xử lý gửi form
  const handleSubmit = () => {
    const userToSubmit = { ...formData.value };
    if (props.isEditMode) {
      userToSubmit.id = props.editUser.id; 
    }
    emit('submitUser', userToSubmit);
    emit('closeForm'); 
  };
  </script>
  
  <style scoped>
  .form-container {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  }
  
  h2 {
    margin-bottom: 20px;
    text-align: center; 
  }
  
  form {
    display: flex;
    flex-direction: column;
  }
  
  label {
    margin-bottom: 10px;
    font-weight: bold; 
  }
  
  input,
  select {
    margin-bottom: 20px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px; 
  }
  
  .button-group {
    display: flex;
    justify-content: flex-end; 
  }
  
  button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-right: 10px; 
  }
  
  button[type="submit"] {
    background-color: rgb(72, 180, 188); 
    color: white;
  }
  
  button[type="button"] {
    background-color: #dc3545; 
    color: white;
  }
  </style>
  