<script setup>
import InvestmentYoY from '../components/charts/InvestmentYoY.vue'
import TotalValue from '../components/charts/TotalValue.vue'
import UnitsBar from '../components/charts/UnitsBar.vue'
import FundGrowthYoY from '../components/charts/FundGrowthYoY.vue'

import { useRoute } from 'vue-router'

import { ref, onMounted, onBeforeMount } from 'vue'

const folio = ref(null);

onMounted(() => {
    console.log("I am called")
    const route = useRoute();
    console.warn("route", route.params)

    fetch('http://localhost:8080/mf/details?investor=' + route.params.investor, { method: 'GET' })
        .then((response) => response.json())
        .then(apiData => {
            folio.value = apiData[0]
            //foliodetail.value = apiData[0]
            //console.log("folio1", foliodetail)
        })
})


</script>

<template>
    <div class="p-8 m-4 block mx-full w-full">


        <div v-if="folio">
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

    </div>
</template>
