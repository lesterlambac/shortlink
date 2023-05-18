<script lang="ts" setup>

  import useExternalRedirect from "~/composables/useExternalRedirect"
  import { Database } from "~/types/supabase";

  const params = useRoute().params;

  const client = useSupabaseClient<Database>();

  let { data, refresh } = useAsyncData('clicks', async () => {
    let { data } = await client.from('links').select('*').eq('short_link', params.id).single();
    return data;
  });

</script>