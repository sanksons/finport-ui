<script setup>

import { useRoute } from 'vue-router'

import { ref, onMounted, inject } from 'vue'

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';


const investor = inject('investor')

const stocks = ref([]);

onMounted(() => {
    const route = useRoute();

    fetch('http://localhost:8080/stock/consolidated?investor=' + investor.value.id, { method: 'GET' })
        .then((response) => response.json())
        .then(apiData => {
            stocks.value = apiData
        })
})

</script>

<template>
    <div class="mt-8">

        <div class="block ml-4">
            <DataTable :value="stocks" stripedRows paginator :rows="20" :rowsPerPageOptions="[5, 10, 20, 50]"
                tableStyle="min-width: 50rem">
                <Column field="Name" header="Name" sortable></Column>
                <Column field="MismatchQuantity" header="MismatchQ" sortable></Column>
                <Column field="TotalInvestment" header="Total Investment" sortable></Column>
                <Column field="InflightQuantity" header="InflightQ" sortable></Column>
                <Column field="InflightInvestment" header="Inflight Investment" sortable></Column>
                <Column field="ProfitBooked" header="Profit Realized" sortable></Column>
                <Column field="ReturnPercentage" header="Return % Abs" sortable>
                    <template #body="slotProps">
                        {{ slotProps.data.ReturnPercentage }} %
                    </template>
                </Column>
                <Column header="Action">
                    <template #body="slotProps">
                        <RouterLink :to="{ name: 'StockDetail', params: { id: slotProps.data.Id } }">
                            <svg class="w-[18px] h-[18px] text-gray-800 dark:text-white" aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                                <path
                                    d="M17 0h-5.768a1 1 0 1 0 0 2h3.354L8.4 8.182A1.003 1.003 0 1 0 9.818 9.6L16 3.414v3.354a1 1 0 0 0 2 0V1a1 1 0 0 0-1-1Z" />
                                <path
                                    d="m14.258 7.985-3.025 3.025A3 3 0 1 1 6.99 6.768l3.026-3.026A3.01 3.01 0 0 1 8.411 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V9.589a3.011 3.011 0 0 1-1.742-1.604Z" />
                            </svg>
                        </RouterLink>
                    </template>
                </Column>

                <!-- <Column field="Date" header="Date" sortable>
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
                    </Column> -->
            </DataTable>
        </div>
    </div>
</template>


