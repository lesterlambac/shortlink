<script lang="ts" setup>

  definePageMeta({
    middleware: ['auth'],
  })

  const client = useSupabaseClient();

  const show = ref<Boolean>(true);

  const form = reactive({
    email: "",
    password: "",
    error: "",
  })

  const handleSignUpWithEmail = async () => {
    try{ 
      const {data , error} = await client.auth.signUp({
        email: form.email,
        password: form.password,
      });

      if (error) {
      form.error = error.message;
      return;
    }
console.log(data)
    console.log(error)

    if (data) {
      form.error = "";
      // useRouter().push("/dashboard");
    }
    } catch (e) {
      alert("Something went wrong.")
    }
  }

</script>

<template>
  <div class="container max-w-full mx-auto py-24 px-6">
    <div class="font-sans">
      <div class="max-w-sm mx-auto px-6">
        <div class="relative flex flex-wrap">
          <div class="w-full relative">
            <div class="mt-6">

              <div class="flex items-center justify-center">

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="w-8 h-8 inline-block leading-none mr-1">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
                <h1 class="text-2xl text-center align-baseline font-semibold text-black leading-none">
                  Sign Up
                </h1>

              </div>

              <form class="mt-8" @submit.prevent="handleSignUpWithEmail">
                <div class="mx-auto max-w-lg">
                  <div class="py-2">
                    <span class="px-1 text-sm text-gray-600">Email</span>
                    <input v-model="form.email"  placeholder="" type="email"
                      class="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none">
                  </div>
                  <div class="py-2">
                    <span class="px-1 text-sm text-gray-600">Password</span>
                    <div class="relative">
                      <input v-model="form.password" placeholder="" :type="show ? 'password' : 'text'"
                        class="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none">
                      <div class="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                          stroke="currentColor" class="w-6 h-6" @click="show = !show"
                          :class="{ 'hidden': !show, 'block': show }">
                          <path stroke-linecap="round" stroke-linejoin="round"
                            d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                        </svg>

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                          stroke="currentColor" class="w-6 h-6" @click="show = !show"
                          :class="{ 'block': !show, 'hidden': show }">
                          <path stroke-linecap="round" stroke-linejoin="round"
                            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                          <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>


                      </div>
                    </div>
                  </div>

                  <button
                    class="mt-3 text-lg font-semibold w-full rounded-lg px-6 py-3 block shadow-xl bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 text-white hover:text-white">
                    SignUp
                  </button>

                  <div v-if="form.error" class="block text-red-500 font-bold my-6 text-center">
                    <span class="font-normal">{{ form.error }}</span>
                  </div>

                  <div class="block text-gray-500 font-bold my-6 text-center">
                    <span class="font-normal">Already have an account? </span>
                    <NuxtLink :to="{ name: 'login' }"
                      class="cursor-pointer tracking-tighter text-black border-b-2 border-gray-200 hover:border-gray-400">
                      Login
                    </NuxtLink>
                  </div>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>