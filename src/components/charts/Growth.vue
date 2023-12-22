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

        let last = 0
        if (result.length > 0) {
            last = result.slice(-1)[0]
        }

        //console.log(last)
        // if year exists in YoY get Investment.Price else push last 
        if (folio.YoY[year] !== undefined) {
            result.push(Math.round(folio.YoY[year].Investment.Price + last))
        } else {
            result.push(last)
        }
    }

    // console.log(result)
    return result
}

const getValue = (folio) => {
    var result = []
    for (let year of labels(folio)) {

        let last = 0
        if (result.length > 0) {
            last = result.slice(-1)[0]
        }

        //console.log(last)
        // if year exists in YoY get Investment.Price else push last 
        if (folio.YoY[year] !== undefined) {
            result.push(Math.round(
                folio.YoY[year].Investment.Price + folio.YoY[year].Profit.Realized + folio.YoY[year].Profit.UnRealized + last
            ))
        } else {
            result.push(last)
        }
    }

    // console.log(result)
    return result
}

const data = {
    labels: labels(props.folio),
    datasets: [
        {
            label: 'Purchase',
            data: getPurchases(props.folio),
            backgroundColor: CHART_COLORS.blue,
            borderWidth: 2,
            borderColor: CHART_COLORS.blue,

        },
        {
            label: 'Value',
            data: getValue(props.folio),
            backgroundColor: CHART_COLORS.green,
            borderWidth: 2,
            borderColor: CHART_COLORS.green,
            stepped: false,
        },

    ]

}

const config = {
    type: 'line',
    data: data,
    options: {
        plugins: {
            title: {
                display: true,
                text: 'Growth'
            },
        },
        responsive: true,
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
    