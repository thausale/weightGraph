<script>
  import Chart from "chart.js/auto";
  import { supabase } from "$lib/supabaseClient";
  import { triggerQuery } from "$lib/store";
  import { onMount } from "svelte";

  let chart = $state();
  let finalData = $state([]);

  //   $effect(() => {
  //     if ($triggerQuery === true) {
  //       console.log("reload time!");
  //       console.log($triggerQuery, "before set false");
  //       triggerQuery.set(false);
  //       console.log($triggerQuery, "after set false");
  //     }
  //   });

  const renderGraph = async () => {
    const { data } = await supabase
      .from("weight_tracking")
      .select("id, weight, date_recorded,user_id,users (name)");

    // ... handle your data ...
    const filteredData = [];

    if (data) {
      data.forEach((record) => {
        filteredData.push({
          y: record.weight,
          x: record.date_recorded,
          name: record.users.name,
        });
      });

      let reducedData = filteredData.reduce((acc, record) => {
        // Check if the user's name is already a key in the accumulator
        if (!acc[record.name]) {
          // If not, create a new entry for this user
          acc[record.name] = {
            label: record.name,
            data: [],
          };
        }

        // Append the current record's x and y to the user's data array
        acc[record.name].data.push({
          x: record.x,
          y: record.y,
        });

        return acc; // Return the accumulator for the next iteration
      }, {});

      const keys = Object.keys(reducedData);
      finalData = keys.map((name) => ({
        label: name,
        data: reducedData[name].data,
        // parsing: false,
      }));

      //   console.log(reducedData);
      console.log("final", finalData);

      const dateLabels = [...new Set(data.map((item) => item.date_recorded))];

      const ctx = document.getElementById("myChart");
      if (ctx && ctx instanceof HTMLCanvasElement) {
        chart = new Chart(ctx, {
          type: "line", // Example: 'line' for a line chart
          data: {
            label: dateLabels,
            datasets: finalData,
          }, // Start with empty data or some default
          options: {
            scales: {
              x: {
                // type: "time",
                // time: {
                //   unit: "day", // or 'month', 'year', etc., depending on your data
                //   // other time scale options as needed
                // },
              },
            },
          }, // Your chart's options
        });
      } else {
        console.log("error not canvas element");
        return;
      }
      // });
    }

    chart.update();
  };

  onMount(() => {
    renderGraph();
  });
</script>

<div id="chartHolder">
  <canvas id="myChart"></canvas>
</div>
<div>
  <table class="table-auto border-collapse border border-slate-400">
    <thead>
      <tr>
        <th class="border border-slate-300 px-12">Naam</th>
        <th class="border border-slate-300 px-5">StartGewicht</th>
        <th class="border border-slate-300 px-5">Laatste gewicht</th>
        <th class="border border-slate-300">Verschil</th>
      </tr>
    </thead>
    <tbody>
      {#each finalData as entry}
        <tr>
          <td>{entry.label}</td>
          <td>{entry.data[0].y}</td>
          <td>{entry.data[entry.data.length - 1].y}</td>
          <td
            >{(entry.data[entry.data.length - 1].y - entry.data[0].y).toFixed(
              2
            )}</td
          >
        </tr>
      {/each}
    </tbody>
  </table>
</div>
