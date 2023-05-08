export default defineNuxtRouteMiddleware((to, from) => {

  const user = useSupabaseUser();


  if (!user.value && to.name !== 'login') {
    return navigateTo('/login');
  }

  if ((to.name == 'login' || to.name == 'signup') && user.value) {
    return navigateTo('/dashboard');
  }

})

