<script setup>
import { onMounted } from 'vue'
import { GetChart, CHART_COLORS, colorize } from '../../utils/chart.js'

const props = defineProps({
    id: String,
    folio: Object,
})

const data = {
    labels: [''],
    datasets: [
        {
            label: 'Investment',
            data: [Math.round(props.folio.Purchase.Price)],
            backgroundColor: CHART_COLORS.blue,
            borderWidth: 1,
            stack: 'stack 0',
        },
        {
            label: 'Profit (UR)',
            data: [Math.round(props.folio.Profit.UnRealized)],
            backgroundColor: colorize(CHART_COLORS.green),
            borderWidth: 1,
            stack: 'stack 1',
        },
        {
            label: 'Profit (R)',
            data: [Math.round(props.folio.Profit.Realized)],
            backgroundColor: CHART_COLORS.greendark,
            borderWidth: 1,
            stack: 'stack 1',
        }


    ]

}

const config = {
    type: 'bar',
    data: data,
    options: {
        plugins: {
            title: {
                display: true,
                text: 'Total Value'
            },
            legend: {
                labels: {
                    usePointStyle: true,
                },
            }
        },
        responsive: true,
        aspectRatio: 0.8,
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
                type: 'linear',
            }
        }
    }
}


onMounted(() => GetChart(props.id, config))


</script>



<template>
    <canvas :id=id></canvas>
</template>
    

    
    
<style scoped>
div {
    display: inline-block;
    border: 1px dashed;
    margin: 10px;
    padding: 10px;
}
</style>
    