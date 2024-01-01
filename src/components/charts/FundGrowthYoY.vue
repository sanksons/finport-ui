<script setup>
import { ref, onMounted, onBeforeMount } from 'vue'
import { GetChart, CHART_COLORS } from '../../utils/chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels';

const props = defineProps({
    id: String,
    folio: Object,
})

const loaded = ref(true);

onMounted(() => {
    fetch('http://localhost:8080/mf/folio?folio=' + props.folio.Id, { method: 'GET' })
        .then((response) => response.json())
        .then(apiData => {
            loaded.value = true
            GetChart(props.id, getConfig(apiData))
        })
})

const labels = (navData) => {
    var result = []

    for (var year in navData.NavYoY) {
        result.push(year)
    }

    return result
}

const getReturns = (navData) => {
    var result = []
    for (let year of labels(navData)) {
        // if year exists in YoY get Investment.Price else mark 0
        if (navData.NavYoY[year] !== undefined) {
            result.push(Math.round(navData.NavYoY[year].YearReturns * 10) / 10)
        } else {
            result.push(0)
        }
    }
    return result
}

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

const getDataLabels = () => {
    return {
        color: function (context) {
            var v = context.dataset.data[context.dataIndex]
            if (v > 5 || v < -3) {
                return 'white'
            }
            return 'grey'
        },
        font: {
            weight: 'bold'
        },
        formatter: function (value, context) {
            return Math.round(value) + '%';
        },
        anchor: function (context) {
            var v = context.dataset.data[context.dataIndex]
            if (v > 5 || v < -3) {
                return 'center'
            }
            return 'end'
        },
    }
}

const getConfig = (navData) => {

    const data = {
        labels: labels(navData),
        datasets: [
            {
                label: 'Return %',
                data: getReturns(navData),
                backgroundColor: colorize(),
                borderWidth: 1,
                stack: "stack 1"
            },

        ]

    }

    const config = {
        type: 'bar',
        data: data,
        plugins: [ChartDataLabels],
        options: {
            legend: false,
            plugins: {
                datalabels: getDataLabels(),
                title: {
                    display: true,
                    text: 'Fund Growth YoY'
                },
            },
            responsive: true,
            // aspectRatio: 1.2,
            maintainAspectRatio: false,
            scales: {
                x: {
                    stacked: true,
                },
                y: {
                    stacked: true,
                }
            }
        }
    }
    return config
}


</script>


<template>
    <!-- <canvas :id=id></canvas> -->
    <div v-show="loaded" class="h-full w-full">
        <canvas :id=id class="h-auto w-auto"></canvas>
    </div>
    <div v-show="!loaded" class="">Loading {{ loaded }}</div>
</template>
    
    
<style scoped></style>
    