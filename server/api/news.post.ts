import { response } from "./news.json";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody(event);
  
  if (config.NEWSDATA_API_URL && config.NEWSDATA_API_KEY) {
    const prepareTitle = (q: string): string => {
      let str = ''
  
      if (q.length) {
        str = `(happy OR positive OR helpful) AND ${q}`
      } else {
        str = 'happy OR positive OR helpful'
      }
      return str;
    };
  
    const data = await $fetch(config.NEWSDATA_API_URL, {
      query: {
        apiKey: config.NEWSDATA_API_KEY,
        qInTitle: prepareTitle(body.qInTitle),
        language: 'en',
      },
    });
    return { response: data, qInTitle: body.qInTitle };
  } else {
    return { response, qInTitle: body.qInTitle };
  }
});
