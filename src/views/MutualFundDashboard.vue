<script setup>
import InvestmentYoY from '../components/charts/InvestmentYoY.vue'
import UnitsBar from '../components/charts/UnitsBar.vue'
import FundGrowthYoY from '../components/charts/FundGrowthYoY.vue'
import Xirr from '../components/charts/mf/xirr.vue'
import Investment from '../components/charts/mf/investment.vue'

import { useRoute } from 'vue-router'

import { ref, onMounted, inject } from 'vue'

const investor = inject('investor')

const folios = ref([]);

onMounted(() => {
    const route = useRoute();

    fetch('http://localhost:8080/mf/details?investor=' + investor.value.id, { method: 'GET' })
        .then((response) => response.json())
        .then(apiData => {
            folios.value = apiData
        })
})



</script>

<template>
    <div class="mt-8">


        <div class="ml-4 mb-4">
            <p class="font-normal text-2xl text-gray-600">Mutual Fund Dashboard</p>
        </div>

        <div class="block mb-16">
            <div v-if="folios.length > 0">
                <div class="inline-block m-2 p-4 border border-gray-200 rounded-lg shadow h-72 w-2/12">
                    <Investment id="folios-total" :folios="folios" chart="total" label="Total Investment"></Investment>
                </div>
                <div class="inline-block m-2 p-4 border border-gray-200 rounded-lg shadow h-72 w-3/12">
                    <Xirr id="folios-xirr" :folios="folios"></Xirr>
                </div>

                <div class="block m-2 p-4 border border-gray-200 rounded-lg shadow h-72 w-3/4">
                    <Investment id="folios-investment" :folios="folios" chart="byfolio" label="Investment Distribution">
                    </Investment>
                </div>
            </div>
        </div>

        <div v-for="folio in folios" class="block mb-4">

            <div class="ml-4 mb-4">
                <RouterLink :to="{ name: 'MFDetail', params: { id: folio.Id } }">
                    <p class="font-normal text-xl text-gray-600">{{ folio.DisplayName }}
                        <span class="text-lg ml-8">xirr: {{ folio.XIRR }} %</span>
                    </p>

                </RouterLink>
            </div>
            <hr />
            <div>
                <div class="inline-block m-2 p-4 border border-gray-200 rounded-lg shadow h-72 w-2/12">
                    <Investment :id="folio.Id + '-total'" :folios="folio" chart="total" label="Investment"></Investment>
                </div>

                <div class="inline-block m-2 p-4 border border-gray-200 rounded-lg shadow h-72 w-3/12">
                    <InvestmentYoY :id="folio.Id + '-purchases'" :folio="folio"></InvestmentYoY>
                </div>

                <div class="inline-block m-2 p-4 border border-gray-200 rounded-lg shadow h-72 w-2/12">
                    <UnitsBar :id="folio.Id + '-units'" :folio="folio"></UnitsBar>
                </div>


                <div class="inline-block m-2 p-4 border border-gray-200 rounded-lg shadow h-72 w-3/12">
                    <FundGrowthYoY :id="folio.Id + '-growth'" :folio="folio"></FundGrowthYoY>
                </div>




            </div>
        </div>
    </div>
</template>


