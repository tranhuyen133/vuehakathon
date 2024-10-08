<template>
  <div id="app">
    <header>
      <nav>
        <router-link to="/admin" exact-active-class="active-link">Dashboard</router-link>
        <router-link to="/admin/manager-user" exact-active-class="active-link">Manager User</router-link>
        <router-link to="/admin/manager-product" exact-active-class="active-link">Manager Product</router-link>
      </nav>
    </header>
    <router-view></router-view>
  </div>
</template>

<script setup>
</script>

<style scoped>
#app {
  font-family: 'Arial', sans-serif;
}

header {
  background-color: #1e88e5; 
  padding: 15px 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

nav {
  display: flex;
  justify-content: space-around; 
  align-items: center; 
}

router-link {
  color: white; 
  text-decoration: none;
  padding: 10px 20px; 
  border-radius: 5px;
  transition: background-color 0.3s ease, transform 0.2s; 
}

router-link:hover {
  background-color: #3949ab; 
  transform: scale(1.05); 
}

.active-link {
  background-color: #283593; 
  color: white; 
  font-weight: bold; 
}

a {
  color: white;
  text-decoration: none;
}
</style>
