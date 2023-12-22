<script setup>
import { onMounted } from 'vue'
import { GetChart, CHART_COLORS, colorize } from '../../utils/chart.js'

const props = defineProps({
    id: String,
    folio: Object,
})

const getShortTermUnits = (folio) => {
    var result = []
    result.push(folio.RemainingUnits.ShortTerm)
    return result
}

const getLongTermUnits = (folio) => {
    var result = []
    result.push(folio.RemainingUnits.LongTerm)
    return result
}

const labels = ['']

const data = {
    labels: labels,
    datasets: [
        {
            label: 'LongTerm',
            data: getLongTermUnits(props.folio),
            backgroundColor: CHART_COLORS.green,
            borderWidth: 1
        },
        {
            label: 'ShortTerm',
            data: getShortTermUnits(props.folio),
            backgroundColor: CHART_COLORS.yellow,
            borderWidth: 1
        },


    ]

}

const config = {
    type: 'bar',
    data: data,
    options: {
        plugins: {
            title: {
                display: true,
                text: 'Remaining Units'
            },
        },
        responsive: true,
        aspectRatio: 0.8,
        scales: {
            x: {
                stacked: false,
            },
            y: {
                stacked: false,
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
    