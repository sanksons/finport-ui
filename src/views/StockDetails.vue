<script setup>

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

import { dateFormat, dateDiffInDaysTextual } from '../utils/common.js'

import { useRoute } from 'vue-router'

import { ref, onMounted } from 'vue'




const stocktransactions = ref([]);


onMounted(() => {
    console.log("I am called")
    const route = useRoute();
    console.warn("route", route.params)

    fetch('http://localhost:8080/stock/transactions?share=' + route.params.id, { method: 'GET' })
        .then((response) => response.json())
        .then(apiData => {
            stocktransactions.value = apiData

        })

})
function prepareAge(datestr) {
    let purchaseDate = new Date(datestr);
    let today = new Date()
    return dateDiffInDaysTextual(purchaseDate, today)
}

</script>

<template>
    <div class="p-8 m-4 block mx-full w-full">


        <div v-if="stocktransactions.Share">
            <h2 class="bold">{{ stocktransactions.Share.Name }}</h2>
        </div>

        <div>
            <div class="block ml-4">
                <DataTable :value="stocktransactions.Transactions" stripedRows paginator :rows="20"
                    :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem">
                    <Column field="Price" header="NAV" sortable></Column>
                    <Column field="Quantity" header="Quantity" sortable></Column>
                    <Column field="TotalPrice" header="Amount" sortable></Column>
                    <Column field="TradeType" header="Type" sortable></Column>
                    <Column field="Status" header="Status" sortable></Column>
                    <Column field="OrderExecutionDate" header="Date" sortable>
                        <template #body="slotProps">
                            {{ dateFormat(slotProps.data.OrderExecutionDate) }}
                        </template>
                    </Column>
                    <Column field="OrderExecutionDate" header="Age" sortable>
                        <template #body="slotProps">
                            {{ prepareAge(slotProps.data.OrderExecutionDate) }}
                        </template>
                    </Column>

                </DataTable>
            </div>

        </div>

    </div>
</template>
