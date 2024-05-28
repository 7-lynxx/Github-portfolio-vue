<template>
  <div class="p-4">
    <div class="flex justify-between mb-4">
      <QInput v-model="search" @input="fetchRepos" placeholder="Search..." filled class="w-1/2 bg-zinc-500 " />
      <QBtn @click="showCreateModal" color="primary">Create Repo</QBtn>
    </div>
    <div v-if="error" class="q-alert q-alert--dense q-alert--bordered text-red-600">{{ error }}</div>
    <QSpinner v-if="loading" color="primary" />
    <div v-else class="flex column justify-between" >
      <QList bordered class="rounded-md shadow-2xl" clickable>
        <QItem v-for="repo in filteredRepos" :key="repo.id" clickable @click="navigateToRepo(repo)" class="mb-10 ">
          <QItemSection class="shadow-lg" >{{ repo.name }}</QItemSection>
        </QItem>
      </QList>
      <div class="pagination flex justify-between mt-4">
        <QBtn @click="prevPage" :disable="page === 1">Prev</QBtn>
        <QBtn @click="nextPage" :disable="!hasMore">Next</QBtn>
      </div>
    </div>
    <QDialog v-model="showModal">
      <QCard>
        <QCardSection>
          <div class="text-h6">Create Repository</div>
        </QCardSection>
        <QCardSection>
          <QInput v-model="newRepo.name" placeholder="Repository Name" filled />
          <QInput v-model="newRepo.description" placeholder="Description" filled type="textarea" />
        </QCardSection>
        <QCardActions align="right">
          <QBtn flat label="Cancel" color="primary" v-close-popup />
          <QBtn label="Create" color="primary" @click="createRepo" />
        </QCardActions>
      </QCard>
    </QDialog>
   
  </div>
</template>

<script>
import {
  QBtn,
  QInput,
  QDialog,
  QCard,
  QCardSection,
  QCardActions,
  QList,
  QItem,
  QItemSection,
  QSpinner,
} from 'quasar';
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { getRepos, createRepo as createNewRepo} from '../Services/githubService';

export default {
  components: {
    QBtn,
    QInput,
    QDialog,
    QCard,
    QCardSection,
    QCardActions,
    QList,
    QItem,
    QItemSection,
    QSpinner,
  },
  setup() {
    const username = '7-lynxx';
    const repos = ref([]);
    const page = ref(1);
    const perPage = ref(3);
    const search = ref('');
    const loading = ref(true);
    const error = ref(null);
    const showModal = ref(false);
    const newRepo = ref({ name: '', description: '' });
    const hasMore = ref(true);
    const router = useRouter();

    const fetchRepos = async () => {
      loading.value = true;
      error.value = null;
      try {
        const response = await getRepos(username, page.value, perPage.value);
        repos.value = response.data;
        
        hasMore.value = response.data.length === perPage.value;
      } catch (err) {
        error.value = 'Failed to fetch repositories';
      } finally {
        loading.value = false;
      }
    };


    const filteredRepos = computed(() => {
      if (!search.value) return repos.value;
      return repos.value.filter(repo => repo.name.includes(search.value));
    });

    const prevPage = () => {
      if (page.value > 1) {
        page.value -= 1;
        fetchRepos();
      }
    };

    const nextPage = () => {
      if (hasMore.value) {
        page.value += 1;
        fetchRepos();
      }
    };

    const showCreateModal = () => {
      showModal.value = true;
    };

    const createRepo = async () => {
      try {
        await createNewRepo(newRepo.value)
        console.log(newRepo.value);
        showModal.value = false;
        fetchRepos();
      } catch (err) {
        error.value = 'Failed to create repository';
      }
    };

    const navigateToRepo = (repo) => {
      router.push(`/repo/${repo.owner.login}/${repo.name}`);
    };

    onMounted(fetchRepos);

    return {
      repos,
      page,
      perPage,
      search,
      loading,
      error,
      showModal,
      newRepo,
      filteredRepos,
      prevPage,
      nextPage,
      showCreateModal,
      createRepo,
      hasMore,
      navigateToRepo,
      fetchRepos,
    };
  },
};
</script>

<style scoped>
.spinner {
  width: 12px;
  /* Custom spinner styling */
}
.pagination {
  display: flex;
  justify-content: space-between;
}
</style>