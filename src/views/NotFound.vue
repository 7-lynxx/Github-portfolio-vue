<template>
    <div class="p-4">
      <div class="q-alert q-alert--dense q-alert--bordered text-red-600">
        <h2>404 - Not Found</h2>
        <p>The page you are looking for does not exist.</p>
        <QBtn @click="redirectToHome" color="primary">Go to Home</QBtn>
      </div>
    </div>
  </template>
  
  <script>
  import { useRouter } from 'vue-router'
  
  export default {
    setup() {
      const router = useRouter()
  
      const redirectToHome = () => {
        router.push('/')
      }
  
      return {
        redirectToHome
      }
    }
  }
  </script>