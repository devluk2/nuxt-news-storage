export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const config = useRuntimeConfig();

  if(config.IMMUDB_API_URL && config.IMMUDB_API_KEY) {
    const response = await $fetch(`${config.IMMUDB_API_URL}/document`, {
      headers: {
        "X-API-Key": config.IMMUDB_API_KEY,
      },
      method: "put",
      body,
    });
  
    return { response };
  } else {
    return 'Error: missing IMMUDB_API_URL and IMMUDB_API_URL in .env'
  }

});
