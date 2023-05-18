<script lang="ts" setup>

const user = useSupabaseUser();

onMounted(() => {
  if (user) {
    console.log(user.value?.id);
  }
})

</script>


<template>
  <div class="flex items-center justify-center text-center">
    <div>
      <h1 class="text-center text-6xl mt-48 leading-snug tracking-wide">The shorter, the better.</h1>
      <p class="text-3xl py-2">make your links short.</p>
      <NuxtLink :to="{ name: 'dashboard' }"
        class="tracking-wide shadow-md inline-block text-white text-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-6 py-3 text-center mt-6  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Try
        Now</NuxtLink>
    </div>
  </div>
</template>