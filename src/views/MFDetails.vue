<script setup>

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';


import InvestmentYoY from '../components/charts/InvestmentYoY.vue'
import UnitsBar from '../components/charts/UnitsBar.vue'
import FundGrowthYoY from '../components/charts/FundGrowthYoY.vue'
import Investment from '../components/charts/mf/investment.vue'

import { useRoute } from 'vue-router'

import { ref, onMounted, inject } from 'vue'

const investor = inject('investor')

const folio = ref(null);
const folioPurchases = ref(null);

function dateformat(datestr) {
    let date = new Date(datestr);
    return date.toLocaleDateString()

}

function dateDiffInDays(a, b) {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

function dateDiffInDaysTextual(a, b) {
    const days = dateDiffInDays(a, b)
    let years = Math.floor(days / 365)
    let remdays = days - (years * 365)
    return years + " years " + remdays + " days"
}

function prepareStatus(units, sold) {
    if (sold == 0) {
        return "unsold"
    }

    if (units == sold) {
        return "sold"
    }
    return Math.round((units - sold) * 1000) / 1000
}

function prepareAge(datestr) {
    let purchaseDate = new Date(datestr);
    let today = new Date()
    return dateDiffInDaysTextual(purchaseDate, today)
}

onMounted(() => {
    console.log("I am called")
    const route = useRoute();
    console.warn("route", route.params)

    fetch('http://localhost:8080/mf/details?investor=' + investor.value.id, { method: 'GET' })
        .then((response) => response.json())
        .then(apiData => {
            for (let f of apiData) {
                if (f.Id == route.params.id) {
                    folio.value = f
                }
            }

            //foliodetail.value = apiData[0]
            //console.log("folio1", foliodetail)
        })

    fetch('http://localhost:8080/mf/folio/purchases?folio=' + route.params.id, { method: 'GET' })
        .then((response) => response.json())
        .then(apiData => {
            folioPurchases.value = apiData
            console.log("foliopurchases", apiData)
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
                <div class="inline-block m-2 p-4 border border-gray-200 rounded-lg shadow h-72 w-2/12">
                    <Investment :id="folio.Id + '-total'" :folios="folio" chart="total" label="Total Investment">
                    </Investment>
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



                <hr />
            </div>
        </div>

        <div>
            <div class="block ml-4">
                <DataTable :value="folioPurchases" stripedRows paginator :rows="20" :rowsPerPageOptions="[5, 10, 20, 50]"
                    tableStyle="min-width: 50rem">
                    <Column field="Units" header="Units" sortable>

                    </Column>
                    <Column field="NAV" header="NAV" sortable></Column>
                    <Column field="Amount" header="Amount" sortable></Column>
                    <Column field="Date" header="Date" sortable>
                        <template #body="slotProps">
                            {{ dateformat(slotProps.data.Date) }}
                        </template>
                    </Column>
                    <Column field="SoldUnits" header="Status" sortable>
                        <template #body="slotProps">
                            {{ prepareStatus(slotProps.data.Units, slotProps.data.SoldUnits) }}
                        </template>
                    </Column>
                    <Column field="Date" header="Age" sortable>
                        <template #body="slotProps">
                            {{ prepareAge(slotProps.data.Date) }}
                        </template>
                    </Column>
                </DataTable>
            </div>

        </div>

    </div>
</template>
