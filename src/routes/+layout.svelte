<script>
  import "../app.css";
  import Modal from "$lib/modal.svelte";
  import { supabase } from "$lib/supabaseClient";
  import WeightGraph from "$lib/chartjs/weightGraph.svelte";

  let refreshData = $state(false);
  /**
   * @type {{ id: any; name: any; }[]}
   */
  let names = $state([]);

  (async () => {
    const { data } = await supabase.from("users").select("id, name");
    if (data) {
      data.forEach((entry) => {
        names.push(entry);
      });
      // console.log(names);
    }
  })();
  let openModal = $state(false);
</script>

<Modal {openModal} {names} />
<button
  on:mousedown={() => (openModal = true)}
  class="btn bg-blue-500 rounded-sm px-2 m-5">Weging toevoegen</button
>
<WeightGraph />

<slot />
