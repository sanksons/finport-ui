<script setup>
import { onMounted } from 'vue'
import { GetChart, CHART_COLORS, colorize } from '../../../utils/chart.js'
import { ToIndianNumber } from '../../../utils/common.js'

const TYPE_BYFOLIO = "byfolio"
const TYPE_TOTAL = "total"

const props = defineProps({
    id: String,
    chart: String,
    label: String,
    folios: Object,
})

const labels = (folios, chartType) => {
    var result = []

    if (chartType == TYPE_TOTAL) {
        return [""]
    }

    if (chartType == TYPE_BYFOLIO) {
        for (let folio of folios) {
            result.push(folio.DisplayName)
        }
        return result
    }

    return result
}

const getInvestmentValues = (folios, chartType) => {
    var result = []

    if (chartType == TYPE_TOTAL) {
        let total = 0
        if (!Array.isArray(folios)) {
            total = folios.Purchase.Price

        } else {
            for (let folio of folios) {
                total += folio.Purchase.Price
            }
        }
        result.push(total)
        return result
    }

    if (chartType == TYPE_BYFOLIO) {
        for (let folio of folios) {
            result.push(folio.Purchase.Price)
        }
        return result
    }
    return result
}

const getURProfitValues = (folios, chartType) => {
    var result = []
    if (chartType == TYPE_TOTAL) {
        let total = 0
        if (!Array.isArray(folios)) {
            total = folios.Profit.UnRealized

        } else {
            for (let folio of folios) {
                total += folio.Profit.UnRealized
            }
        }
        result.push(total)
        return result
    }

    if (chartType == TYPE_BYFOLIO) {
        for (let folio of folios) {
            result.push(folio.Profit.UnRealized)
        }
        return result
    }
    return result
}

const getRProfitValues = (folios, chartType) => {
    var result = []
    if (chartType == TYPE_TOTAL) {
        let total = 0
        if (!Array.isArray(folios)) {
            total = folios.Profit.Realized

        } else {
            for (let folio of folios) {
                total += folio.Profit.Realized
            }
        }
        result.push(total)
        return result
    }

    if (chartType == TYPE_BYFOLIO) {
        for (let folio of folios) {
            result.push(folio.Profit.Realized)

        }
        return result
    }
    return result
}


const data = {
    labels: labels(props.folios, props.chart),
    datasets: [
        {
            label: 'Investment',
            data: getInvestmentValues(props.folios, props.chart),
            backgroundColor: CHART_COLORS.blue,
            borderWidth: 1,
            stack: 'stack 0',
        },
        {
            label: 'Profit (UR)',
            data: getURProfitValues(props.folios, props.chart),
            backgroundColor: colorize(CHART_COLORS.green),
            borderWidth: 1,
            stack: 'stack 1',
        },
        {
            label: 'Profit (R)',
            data: getRProfitValues(props.folios, props.chart),
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
                text: props.label,
            },
            legend: {
                labels: {
                    usePointStyle: true,
                },
            }
        },
        responsive: true,
        // aspectRatio: 1,
        maintainAspectRatio: false,
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
                type: 'linear',
                ticks: {
                    // Include a dollar sign in the ticks
                    callback: function (value, index, ticks) {
                        return ToIndianNumber(value);
                    }
                }
            }
        }
    }
}


onMounted(() => GetChart(props.id, config))


</script>



<template>
    <canvas :id=id></canvas>
</template>
    

    
    
<style scoped></style>
    