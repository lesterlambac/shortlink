<script lang="ts" setup>

import { Database } from "types/supabase"

definePageMeta({
  middleware: ['auth'],
})

const user = useSupabaseUser();
const client = useSupabaseClient<Database>();
const config = useRuntimeConfig();

const form = reactive<any>({
  originalLink: "",
  shortLink: "",
  userId: "",
})

let { data: linkList, refresh: refreshLinkList } = useAsyncData('links', async () => {
  let { data, error } = await client.from("links").select("*").eq("user_id", user.value?.id);
  return { data, error };
})


const handleShortenLink = async () => {
  try {

    const { data, error } = await client.from('links').insert({
      original_link: form.originalLink,
      short_link: form.shortLink,
      user_id: user.value?.id,
    })

    if (data) {
    }

    if (error) {
    }

    await refreshLinkList();
  } catch (e) {
  }
}

const handleClipboard = (shortLink: string | null) => {
  if (shortLink) {
    navigator.clipboard.writeText(`${config.public.baseUrl}${shortLink}`);
  }
}

const getOriginalUrl = (shortLink: string | null) => {
  return `${config.public.baseUrl}${shortLink}`;
}

onMounted(() => {
  if (user) {
    refreshLinkList();
  }
})

</script>


<template>
  <div class="px-4 max-w-4xl mx-auto">
    <div>
      <h1 class="text-lg mt-12 leading-snug tracking-wide font-semibold text-gray-600 mb-4">Dashboard</h1>

      <form class="mb-8" action="" @submit.prevent="handleShortenLink()">

        <div
          class="flex items-between justify-between gap-4 bg-gray-100 shadow-md rounded-xl border border-solid border-gray-200 p-6 ">
          <div class="w-2/3">
            <label for="websiteUrl" class="text-sm font-semibold text-gray-500 leading-none">Original Link</label>
            <input v-model="form.originalLink" id="websiteUrl" placeholder=""
              class="w-full text-md block px-3 py-2 rounded-lg bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none">

          </div>

          <div class="w-2/3">
            <label for="websiteUrl" class="text-sm font-semibold text-gray-500 leading-none">Short Link</label>
            <input v-model="form.shortLink" id="websiteUrl" placeholder=""
              class="w-full text-md block px-3 py-2 rounded-lg bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none">
            <span class="text-xs text-gray-500">https://example.com/{{ form.shortLink }}</span>
          </div>

          <button type="submit"
            class="self-center whitespace-nowrap text-white text-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-6 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        </div>
      </form>
      <template v-if="linkList?.data?.length">

        <div v-for="list in linkList.data" :key="list?.id"
          class="flex items-center justify-between gap-4 border border-solid border-gray-100 bg-gray-50 p-6 mb-4">
          <div class="flex flex-col">
            <span class="text-lg font-semibold mb-1">
              /{{ list?.short_link }}
            </span>
            <span class="text-sm">
              {{ list?.original_link }}
            </span>
          </div>
          <div class="flex items-center justify-center">

            <NuxtLink :to="getOriginalUrl(list.short_link)" target="_blank"
              class="inline-block rounded-full text-blue-800 text-lg font-medium p-2 text-center align-center ">
              <svg class="w-6 h-6 hover:text-blue-300"
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </NuxtLink>

            <button @click="handleClipboard(list.short_link)"
              class="rounded-full text-blue-800 text-lg font-medium p-2 text-center ">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-6 h-6 hover:text-blue-300">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
              </svg>
            </button>

            <button class="rounded-full text-blue-800 text-lg font-medium p-2 text-center ">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-6 h-6 hover:text-blue-300">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
              </svg>

            </button>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>