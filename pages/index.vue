<script setup>
const resultsCount = ref(-1);
const keyword = ref("");
const news = ref([]);
const newsHistory = useState("newsHistory", () => []);
const newsCount = ref(0);
const pendingItems = ref([]);

const newsWithHistory = computed(() => {
  return news.value.map((item) => {
    return {
      ...item,
      history:
        newsHistory.value?.filter((el) => {
          return el.item === item.article_id;
        }) || [],
    };
  });
});

const getNews = async () => {
  const { data } = await useFetch("/api/news", {
    method: "post",
    body: { qInTitle: keyword.value },
  });

  news.value = data.value.response.results;
  resultsCount.value = data.value.response.totalResults;
};

const getCountHistory = async () => {
  const { data } = await useFetch("/api/immudb/documents.count", {
    method: "post",
    body: { query: {} },
  });

  newsCount.value = data.value?.response?.count || 0;
};

const getNewsFullHistory = async () => {
  const { data } = await useFetch("/api/immudb/documents.search", {
    method: "post",
    body: { page: 1, perPage: 100 },
  });

  newsHistory.value = data.value?.response?.revisions?.map(({ document }) => {
    return {
      item: document.item,
      favourite: !!document.favourite,
      reported: !!document.reported,
      ts: document._vault_md.ts,
    };
  });
};

const toggleStatus = async (item, status) => {
  pendingItems.value.push(item);

  const body = {
    item,
    ...status,
  };

  const { data } = await useFetch("/api/immudb/document", {
    method: "put",
    body,
  });

  newsHistory.value.push({ ...body, ts: Math.floor(Date.now() / 1000) });

  const index = pendingItems.value.indexOf(item);
  if (index > -1) {
    pendingItems.value.splice(index, 1);
  }
};

onMounted(async () => {
  await nextTick(async () => {
    await getNews();
    await getCountHistory();

    if (newsCount.value > 0) {
      await getNewsFullHistory();
    }
  });
});
</script>

<template>
  <div class="container mx-auto my-3">
    <h1 class="text-5xl text-gray-600 mb-3">News</h1>
    <form class="flex gap-2" @submit.prevent="getNews()">
      <input
        v-model="keyword"
        class="p-2 rounded border-4 border-indigo-200"
        placeholder="Enter keyword(s)"
      />
      <button
        class="bg-indigo-100 p-2 rounded border-4 border-indigo-200 text-gray-600"
      >
        Search by keyword
      </button>
    </form>

    <div class="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
      <NewsItem
        v-for="item in newsWithHistory"
        :key="item.article_id"
        v-bind="item"
        :actions-disabled="pendingItems.includes(item.article_id)"
        @toggle-status="toggleStatus(item.article_id, $event)"
      />
    </div>

    <p class="text-gray-600" v-show="resultsCount === 0">
      Sorry, there are no results for given keyword.
    </p>
  </div>
</template>
