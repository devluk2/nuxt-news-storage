import { response } from "./documents.search.json";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  if (config.IMMUDB_API_URL && config.public.IMMUDB_API_KEY) {
    const body = await readBody(event);

    const data = await $fetch(`${config.IMMUDB_API_URL}/documents/search`, {
      headers: {
        "X-API-Key": config.public.IMMUDB_API_KEY,
      },
      method: "post",
      body,
    });

    return { response: data };
  } else {
    return { response };
  }
});
