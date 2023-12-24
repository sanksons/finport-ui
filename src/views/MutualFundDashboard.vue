<script setup>
import InvestmentYoY from '../components/charts/InvestmentYoY.vue'
import TotalValue from '../components/charts/TotalValue.vue'
import UnitsBar from '../components/charts/UnitsBar.vue'
import FundGrowthYoY from '../components/charts/FundGrowthYoY.vue'

import { useRoute } from 'vue-router'

import { ref, onMounted, inject } from 'vue'

const investor = inject('investor')

const mutualFundFolios = ref([]);

onMounted(() => {
    console.log("I am called")
    const route = useRoute();
    console.warn("route", route.params)

    fetch('http://localhost:8080/mf/details?investor=' + investor.value.id, { method: 'GET' })
        .then((response) => response.json())
        .then(apiData => {
            mutualFundFolios.value = apiData
        })
})


</script>

<template>
    <div v-for="folio in mutualFundFolios" class="block mx-full w-full">

        <div>
            <h5 class="text-3xl font-bold">{{ folio.DisplayName }}</h5>
            xirr: {{ folio.XIRR }} %
        </div>
        <div>
            <div class="inline-block m-2 p-4 border border-gray-200 rounded-lg shadow h-72">
                <TotalValue :id="folio.Id + '-total'" :folio="folio"></TotalValue>
            </div>

            <div class="inline-block m-2 p-4 border border-gray-200 rounded-lg shadow h-72 min-w-80">
                <InvestmentYoY :id="folio.Id + '-purchases'" :folio="folio"></InvestmentYoY>
            </div>


            <div class="inline-block m-2 p-4 border border-gray-200 rounded-lg shadow h-72">
                <UnitsBar :id="folio.Id + '-units'" :folio="folio"></UnitsBar>
            </div>

            <div class="inline-block m-2 p-4 border border-gray-200 rounded-lg shadow h-72 min-w-80">
                <FundGrowthYoY :id="folio.Id + '-growth'" :folio="folio"></FundGrowthYoY>
            </div>



            <hr />
        </div>
    </div>
</template>


