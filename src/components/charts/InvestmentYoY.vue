<script setup>
import { onMounted } from 'vue'
import { GetChart, CHART_COLORS, colorize } from '../../utils/chart.js'

const props = defineProps({
    id: String,
    folio: Object,
})


const labels = (folio) => {
    var result = []
    for (let i = folio.Period.Start; i <= folio.Period.End; i++) {
        result.push(i)
    }
    return result
}

const getPurchases = (folio) => {
    var result = []
    for (let year of labels(folio)) {
        // if year exists in YoY get Investment.Price else mark 0
        if (folio.YoY[year] !== undefined) {
            result.push(Math.round(folio.YoY[year].Investment.Price))
        } else {
            result.push(0)
        }
    }
    return result
}
function numDifferentiation(num, format) {
    const formatter = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
        notation: 'compact',
        compactDisplay: 'long',
    })
    return formatter.format(num)
}

const getRealizedProfit = (folio) => {
    var result = []
    for (let year of labels(folio)) {
        // if year exists in YoY get Investment.Price else mark 0
        if (folio.YoY[year] !== undefined) {
            result.push(Math.round(folio.YoY[year].Profit.Realized))
        } else {
            result.push(0)
        }
    }
    return result
}

const getUnRealizedProfit = (folio) => {
    var result = []
    for (let year of labels(folio)) {
        // if year exists in YoY get Investment.Price else mark 0
        if (folio.YoY[year] !== undefined) {
            result.push(Math.round(folio.YoY[year].Profit.UnRealized))
        } else {
            result.push(0)
        }
    }
    return result
}


const data = {
    labels: labels(props.folio),
    datasets: [
        {
            label: 'Purchase',
            data: getPurchases(props.folio),
            backgroundColor: CHART_COLORS.blue,
            borderWidth: 1,
            stack: "stack 1"
        },
        {
            label: 'Profit (UR)',
            data: getUnRealizedProfit(props.folio),
            backgroundColor: colorize(CHART_COLORS.green),
            borderWidth: 1,
            stack: "stack 0",
        },
        {
            label: 'Profit (R)',
            data: getRealizedProfit(props.folio),
            backgroundColor: colorize(CHART_COLORS.greendark),
            borderWidth: 1,
            stack: "stack 0"
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
                text: 'Investment YoY'
            },
        },
        responsive: true,
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
    