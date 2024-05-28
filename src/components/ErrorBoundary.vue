<template>
    <div>
      <slot v-if="!error" />
      <div v-else class="q-alert q-alert--dense q-alert--bordered text-red-600">
        <h2>An error occurred:</h2>
        <p>{{ error.message }}</p>
        <QBtn @click="resetError" color="primary">Try Again</QBtn>
      </div>
    </div>
  </template>
  
  <script>
import { QBtn } from 'quasar';

  export default {
    components: {
      QBtn,
    },
    data() {
      return {
        error: null
      }
    },
    errorCaptured(err) {
      this.error = err
      return false
    },
    methods: {
      resetError() {
        this.error = null
        this.$forceUpdate()
      }
    }
  }
  </script>