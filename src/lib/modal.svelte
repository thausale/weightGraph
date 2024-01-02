<script>
  import { supabase } from "./supabaseClient";
  import { DateInput } from "date-picker-svelte";
  import { goto } from "$app/navigation";
  import { triggerQuery } from "./store";

  let { openModal, names } = $props();
  let data = "test";
  let selectedName = $state("");
  let weight = $state("");
  let date = $state(new Date());
  $inspect(triggerQuery);

  const formHandler = async () => {
    if (weight && selectedName && date) {
      console.log("inserting");
      const { data, error } = await supabase
        .from("weight_tracking")
        .insert({ user_id: selectedName, weight, date_recorded: date })
        .select();

      console.log(data, error);
      openModal = false;
      //   triggerQuery.set(true);
    } else {
      console.log("error");
    }
  };
</script>

{#if openModal}
  <div
    class="fixed inset-0 bg-black/60 flex flex-col justify-center items-center"
  >
    <div class="bg-white rounded-2xl p-6 max-w-md mx-auto w-full">
      <h1>Gewicht ingeven</h1>
      <form on:submit={formHandler}>
        <div class="flex flex-row">
          <input
            type="float"
            class="bg-gray-50 border border-black my-2"
            bind:value={weight}
          />
          <p class="my-2 mx-2">kg</p>
        </div>
        <select
          bind:value={selectedName}
          id="namesDropdown"
          class="bg-gray-50 border border-black my-2"
        >
          {#each names as name}
            <option value={name.id}>{name.name}</option>
          {/each}
        </select>

        <DateInput bind:value={date} class="my-3" format="dd-MM-yyyy" />
        <div>
          <button
            type="submit"
            class="btn bg-blue-500 text-white font-bold rounded px-2"
            >Submit</button
          >
          <button
            class="btn bg-red-500 text-white font-bold rounded px-2"
            type="reset"
            on:click={() => {
              openModal = false;
              triggerQuery.set(true);
              console.log(triggerQuery);
            }}>Cancel</button
          >
        </div>
      </form>

      <slot />
    </div>
  </div>
{/if}
