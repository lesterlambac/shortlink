<script lang="ts" setup>

import { Database } from "~/types/supabase"
import useExternalRedirect from "~/composables/useExternalRedirect"

const params = useRoute().params;
const client = useSupabaseClient<Database>();

let { data } = useAsyncData('links', async () => {
  let { data } = await client.from('links').select('*').eq('short_link', params.id).single();
  return data;
})

onMounted(() => {
  if (data) {
    if (data.value?.original_link) {
      useExternalRedirect(data.value?.original_link, 302);
    }
  }
})

</script>