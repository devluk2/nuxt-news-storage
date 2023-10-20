<script setup>
const emit = defineEmits(["toggle-status"]);
const props = defineProps({
  actionsDisabled: {
    type: Boolean,
    default: false,
  },
  article_id: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    default: "",
  },
  link: {
    type: String,
    default: "",
  },
  keywords: {
    type: Array,
    default: [],
  },
  creator: {
    type: Array,
    default: [],
  },
  video_url: {
    type: String,
    default: null,
  },
  description: {
    type: String,
    default: "",
  },
  content: {
    type: String,
    default: "",
  },
  pubDate: {
    type: String,
    default: "",
  },
  image_url: {
    type: String,
    default: "",
  },
  source_id: {
    type: String,
    default: "",
  },
  source_priority: {
    type: Number,
    default: 0,
  },
  country: {
    type: Array,
    default: [],
  },
  category: {
    type: Array,
    default: [],
  },
  language: {
    type: String,
    default: "",
  },
  history: {
    type: Array,
    default: () => [],
  },
});
const toggleShowHistory = ref(false);

const lastHistoryEntry = computed(() => props.history?.slice(-1)?.[0] || []);
const isFavourite = computed(() => !!lastHistoryEntry.value.favourite);
const isReported = computed(() => !!lastHistoryEntry.value.reported);
</script>

<template>
  <div class="bg-indigo-100 p-4 rounded text-gray-600">
    <h2 class="text-3xl truncate" :title="props.title">{{ props.title }}</h2>

    <p class="text-gray-400 text-sm">{{ props.pubDate }}</p>
    <div class="flex gap-3 text-sm">
      <p class="text-gray-400">by: {{ props.creator?.join(",") }}</p>
      <p class="text-sm text-gray-400">
        category: {{ props.category?.join(",") }}
      </p>
    </div>

    <a
      class="underline text-blue-600 text-sm"
      :href="props.link"
      target="_blank"
    >
      source
    </a>
    <div class="mt-2">
      <img
        v-show="props.image_url"
        class="w-32 h-32 object-cover float-left mr-2"
        :src="props.image_url"
      />
      <p class="line-clamp-5">{{ props.content }}</p>
    </div>
    <div class="clear-left pt-4 flex gap-2 text-sm">
      <button
        type="button"
        :disabled="props.actionsDisabled"
        @click="
          emit('toggle-status', {
            favourite: !isFavourite,
            reported: isReported,
          })
        "
      >
        <Icon
          :name="isFavourite ? 'mdi:heart' : 'mdi:heart-outline'"
          size="2em"
        />{{ !isFavourite ? "Add to" : "Remove from" }} favourite
      </button>
      <button
        type="button"
        :disabled="props.actionsDisabled"
        @click="
          emit('toggle-status', {
            favourite: isFavourite,
            reported: !isReported,
          })
        "
      >
        <Icon
          :name="
            isReported
              ? 'material-symbols:report'
              : 'material-symbols:report-outline'
          "
          size="2em"
        />
        {{ !isReported ? "Report" : "Clear report" }}
      </button>

      <button
        :disabled="props.actionsDisabled"
        v-show="!!history.length"
        type="button"
        @click="toggleShowHistory = !toggleShowHistory"
      >
        <Icon name="material-symbols:history" size="2em" />
        {{ toggleShowHistory ? "Hide history" : "Show history" }}
      </button>
    </div>
    <ul v-show="toggleShowHistory" class="text-xs">
      <li v-for="entry in history" :key="entry.ts">
        <span class="pr-3">{{
          new Date(Math.floor(entry.ts * 1000))?.toLocaleString("en-GB", {
            timeZone: "UTC",
          })
        }}</span>
        <span class="pr-3">
          Favourite has been set to
          <span class="font-bold">{{ entry.favourite }}</span>
        </span>
        <span class="pr-3">
          Reported has been set to
          <span class="font-bold">{{ entry.reported }}</span>
        </span>
      </li>
    </ul>
  </div>
</template>
