export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  if (config.IMMUDB_API_URL && config.IMMUDB_API_KEY) {
    const body = await readBody(event);

    const data = await $fetch(`${config.IMMUDB_API_URL}/documents/count`, {
      headers: {
        "X-API-Key": config.IMMUDB_API_KEY,
      },
      method: "post",
      body
    });

    return { response: data };
  } else {
    return { response: { count: 0 } };
  }
});
