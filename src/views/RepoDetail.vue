<template>
    <div class=" h-screen p-4">
      <div v-if="error" class="q-alert q-alert--dense q-alert--bordered text-red-600">{{ error }}</div>
      <QSpinner v-if="loading" color="primary" />
      <div v-else>
        <QCard class=" min-h-screen flex column q-gutter-m justify-between ">
          <QCardSection class=" flex column space-y-5 ">
            <div class="text-h3 text-purple-500">{{ repo.name }}</div>
            <div class="text-h5 text-purple-900">Description: {{ repo.description }}</div>
            <div class="text-h5 text-purple-900">Stars: {{ repo.stargazers_count }}</div>
            <div class="text-h5 text-purple-900">Forks: {{ repo.forks_count }}</div>

            <div class="text-h5 text-purple-900">Owner: {{ repo.owner?repo.owner.login : "Unknown" }}</div>
            <div class="text-h5 text-purple-900">Language: {{ repo.language || 'N/A' }}</div>
            <div class="text-h5 text-purple-900">Creation Date: {{ new Date(repo.created_at).toLocaleDateString() }}</div>
            <div class="text-h5 text-purple-900">Last Updated: {{ new Date(repo.pushed_at).toLocaleDateString()}}</div>
            <div class="text-h5 text-purple-900">Link to repository on github: {{" "}} 
            <a :href= "repo.html_url" target="_blank" rel="noopener noreferrer"> {{repo.html_url}} </a></div>
            <div class="text-h5 text-purple-900">Issues: {{ repo.open_issues }}</div>


          </QCardSection>
          <QCardActions class="flex justify-between">
            <QBtn @click="showEditModal" color="primary">Update</QBtn>
            <QBtn @click="deleteRepo" color="negative">Delete</QBtn>
          </QCardActions>
        </QCard>
        <QDialog v-model="showModal">
          <QCard>
            <QCardSection>
              <div class="text-h6 text-teal-500">Edit Repository</div>
            </QCardSection>
            <QCardSection>
              <QInput v-model="editRepo.name" placeholder="Repository Name" filled />
              <QInput v-model="editRepo.description" placeholder="Description" filled type="textarea" />
            </QCardSection>
            <QCardActions align="right">
              <QBtn flat label="Cancel" color="primary" v-close-popup />
              <QBtn label="Save" color="primary" @click="updateRepo" />
            </QCardActions>
          </QCard>
        </QDialog>
        <QBtn color="teal" class="mt-2" @click="goBack">Go Back</QBtn>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { getRepoDetails, updateRepo, deleteRepo } from '../Services/githubService'
import { QBtn, QCard, QCardActions, QCardSection, QDialog, QInput, QSpinner } from 'quasar';
  
  export default {
  components: {
    QBtn,
  QInput,
    QDialog,
    QCard,
    QCardSection,
    QCardActions,


    QSpinner,
  },
    setup() {
      const repo = ref({})
      const loading = ref(true)
      const error = ref(null)
      const showModal = ref(false)
      const editRepo = ref({ name: '', description: '' })
      const route = useRoute()
      const router = useRouter()

      const goBack = () => {
        router.back();
      }
  
      const fetchRepoDetails = async () => {
        loading.value = true
        error.value = null
        try {
          const response = await getRepoDetails(route.params.owner, route.params.id)
          repo.value = response.data
          editRepo.value = { name: repo.value.name, description: repo.value.description }
        } catch (err) {
          error.value = 'Failed to fetch repository details'
        } finally {
          loading.value = false
        }
      }
  
      const showEditModal = () => {
        showModal.value = true
      }
  
      const updateRepo = async () => {
        try {
          await updateRepo(route.params.owner, route.params.id, editRepo.value)
          showModal.value = false
          fetchRepoDetails()
        } catch (err) {
          error.value = 'Failed to update repository'
        }
      }
  
      const deleteRepo = async () => {
        try {
          await deleteRepo(route.params.owner, route.params.id)
          router.push('/')
        } catch (err) {
          error.value = 'Failed to delete repository'
        }
      }
  
      onMounted(fetchRepoDetails)
  
      return {
        repo,
        loading,
        error,
        showModal,
        editRepo,
        showEditModal,
        updateRepo,
        deleteRepo,
        goBack
      }
    }
  }
  </script>
  
  <style scoped>
  .spinner {
    width: 12px;
    /* Custom spinner styling */
  }
  </style>