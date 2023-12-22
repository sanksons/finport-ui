<script setup>
import InvestmentYoY from '../components/charts/InvestmentYoY.vue'
import TotalValue from '../components/charts/TotalValue.vue'
import UnitsBar from '../components/charts/UnitsBar.vue'
import FundGrowthYoY from '../components/charts/FundGrowthYoY.vue'

import { useRoute } from 'vue-router'

import { ref, onMounted, onBeforeMount } from 'vue'

const mutualFundFolios = ref([]);

onMounted(() => {
    console.log("I am called")
    const route = useRoute();
    console.warn("route", route.params)

    fetch('http://localhost:8080/mf/details?investor=' + route.params.investor, { method: 'GET' })
        .then((response) => response.json())
        .then(apiData => {
            mutualFundFolios.value = apiData
        })
})


</script>

<template>
    <div v-for="folio in mutualFundFolios">

        <div>
            <h1 class="text-3xl font-bold underline">{{ folio.DisplayName }}</h1>
            xirr: {{ folio.XIRR }} %
        </div>
        <div>
            <div class="chart-container" style="height:300px;width:300px; display:inline-block">
                <TotalValue :id="folio.Id + '-total'" :folio="folio"></TotalValue>
            </div>

            <div class="chart-container" style="height:300px;width:550px; display:inline-block">
                <InvestmentYoY :id="folio.Id + '-purchases'" :folio="folio"></InvestmentYoY>
            </div>


            <div class="chart-container" style="height:300px;width:300px; display:inline-block">
                <UnitsBar :id="folio.Id + '-units'" :folio="folio"></UnitsBar>
            </div>

            <div class="chart-container" style="height:300px;width:550px; display:inline-block">
                <FundGrowthYoY :id="folio.Id + '-growth'" :folio="folio"></FundGrowthYoY>
            </div>



            <hr />
        </div>
    </div>
</template>

<style scoped>
.chart-container {
    border: 1px dashed;
    margin: 10px;
    padding: 10px;
}
</style>
