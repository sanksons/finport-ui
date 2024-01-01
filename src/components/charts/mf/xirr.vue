<script setup>
import { onMounted } from 'vue'
import { GetChart, CHART_COLORS } from '../../../utils/chart.js'

const props = defineProps({
    id: String,
    folios: Object,
})

const colorize = () => {
    return (ctx) => {
        const v = ctx.parsed.y;
        if (v <= 0) {
            return CHART_COLORS.red
        }
        if (v <= 7) {
            return CHART_COLORS.yellow
        }
        if (v <= 12) {
            return CHART_COLORS.greenlight
        }
        if (v <= 20) {
            return CHART_COLORS.green
        }
        return CHART_COLORS.greendark
    };
}

const labels = (folios) => {
    var result = []
    for (let folio of folios) {
        result.push(folio.DisplayName)
    }
    console.log("labels", result)
    return result
}

const values = (folios) => {
    var result = []
    for (let folio of folios) {
        result.push(folio.XIRR)
    }
    console.log("values", result)
    return result
}



const data = {
    labels: labels(props.folios),
    datasets: [
        {
            label: "Return %",
            data: values(props.folios),
            backgroundColor: colorize(),
            borderWidth: 1,
            stack: "stack 1"
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
                text: 'ROI xirr'
            },
        },
        responsive: true,
        //aspectRatio: 1.2,
        maintainAspectRatio: false,
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true
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
    