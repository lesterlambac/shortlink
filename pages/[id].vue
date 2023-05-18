
<script lang="ts" setup>

import useExternalRedirect from "~/composables/useExternalRedirect"
import { Database } from "~/types/supabase"
import { useUserAgent } from "~/composables/useUserAgent";

definePageMeta({
  layout: 'loading',
})

const params = useRoute().params;
const client = useSupabaseClient<Database>();
const config = useRuntimeConfig();
const userAgent = useUserAgent();


const getGeoData = async () => {

  const API_KEY = config.public.geoApiKey;
  let API_URL = `https://ipgeolocation.abstractapi.com/v1/?api_key=${API_KEY}`;

  if (userAgent?.ip) {
    API_URL = `https://ipgeolocation.abstractapi.com/v1/?api_key=${API_KEY}&ip_address=${userAgent.ip}`;
  }

  const res = await fetch(API_URL);
  const data = await res.json();

  return data;
}

let { data: linkData } = useAsyncData('links', async () => {
  let { data } = await client.from('links').select('*').eq('short_link', params.id).single();
  return data;
})


if (linkData) {
  if (linkData.value?.original_link) {

    const userData = <any>{};

    if (userAgent) {
      userData.user_agent = userAgent.userAgent;
    }

    const geoData = await getGeoData();
    if (geoData) {
      userData.city = geoData.city;
      userData.country = geoData.country;
      userData.ip = geoData.ip_address;
    }

    await client.from('clicks').insert({
      link_id: linkData.value?.id,
      ...userData,
    })


    useExternalRedirect(linkData.value?.original_link, 302);

  }
} else {
  throw createError({
    statusCode: 404,
    message: "Link not found"
  })
}


</script>
<template></template>