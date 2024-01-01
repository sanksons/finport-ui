
<script setup>

import { useRoute } from 'vue-router'

import { ref, onMounted, inject } from 'vue'
import { ToIndianNumber } from '../utils/common.js'

const investor = inject('investor')

const dashboard = ref(null);

onMounted(() => {
    const route = useRoute();
    console.warn("route", route.params)

    fetch('http://localhost:8080/investment/dashboard?investor=' + investor.value.id, { method: 'GET' })
        .then((response) => response.json())
        .then(apiData => {
            console.log("voila")
            let total = {}
            for (let i in apiData) {
                if (i != "Broker") {
                    let t = prepareDashboardValues(apiData[i])
                    total[i] = t
                }
            }
            //console.log(apiData)
            dashboard.value = { 'data': apiData, 'total': total }
            console.log(dashboard.value)
        })
})

function prepareDashboardValues(data) {

    let total = 0
    for (let d in data) {
        data[d].Amount = Math.round(data[d].Amount)
        total += data[d].Amount
    }
    for (let d in data) {
        data[d].Percentage = Math.round((data[d].Amount / total) * 100)
    }
    return total
}


</script>

<template>
    <div class="mt-8" v-if="dashboard">
        <div
            class=" my-4 block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

            <h5 class="mb-2 text-2xl  font-bold tracking-tight text-gray-900 dark:text-white">Investment</h5>


            <ul class="max-w-md w-full divide-y divide-gray-200 dark:divide-gray-700 mt-4">

                <li class="pb-3 sm:pb-4" v-for="data in dashboard['data']['Investment']">
                    <div class="flex items-center space-x-8 rtl:space-x-reverse">

                        <div class="flex-1 min-w-0 mr-20">
                            <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                {{ data.Name }}
                            </p>
                        </div>

                        <div class="inline-flex items-center text-base text-gray-900 dark:text-white">
                            {{ ToIndianNumber(data.Amount) }}
                        </div>
                        <div class="inline-flex items-center text-base text-gray-900 dark:text-white">
                            {{ data.Percentage }} %
                        </div>
                    </div>
                </li>
            </ul>
            <p class="mt-8 font-normal text-lg space-x-reverse" style="text-align: center;">
                {{ ToIndianNumber(dashboard['total']['Investment']) }}
            </p>

        </div>

        <div class="inline-flex items-center justify-center w-full">
            <hr class="w-64 h-px my-8 bg-gray-200 border-0 dark:bg-gray-700">
            <span class="absolute px-3 font-medium text-gray-900  bg-white dark:text-white dark:bg-gray-900">
                By Segment
            </span>
        </div>

        <div class="my-4 space-x-8 space-y-8">

            <div
                class="inline-block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

                <h5 class="mb-2 text-2xl  font-bold tracking-tight text-gray-900 dark:text-white">
                    <a href="#" class="hover:text-blue-600"> Equity</a>
                </h5>


                <ul class="max-w-md w-full divide-y divide-gray-200 dark:divide-gray-700 mt-4">

                    <li class="pb-3 sm:pb-4" v-for="data in dashboard['data']['Equity']">
                        <div class="flex items-center space-x-8 rtl:space-x-reverse">

                            <div class="flex-1 min-w-0 mr-20">
                                <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                    {{ data.Name }}
                                </p>
                            </div>

                            <div class="inline-flex items-center text-base text-gray-900 dark:text-white">
                                {{ ToIndianNumber(data.Amount) }}
                            </div>
                            <div class="inline-flex items-center text-base text-gray-900 dark:text-white">
                                {{ data.Percentage }} %
                            </div>
                        </div>
                    </li>
                </ul>
                <p class="mt-8 font-normal text-lg space-x-reverse" style="text-align: center;">
                    {{ ToIndianNumber(dashboard['total']['Equity']) }}
                </p>

            </div>

            <div
                class="inline-block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

                <h5 class="mb-2 text-2xl  font-bold tracking-tight text-gray-900 dark:text-white">Commodity</h5>


                <ul class="max-w-md w-full divide-y divide-gray-200 dark:divide-gray-700 mt-4">

                    <li class="pb-3 sm:pb-4" v-for="data in dashboard['data']['Comodity']">
                        <div class="flex items-center space-x-8 rtl:space-x-reverse">

                            <div class="flex-1 min-w-0 mr-20">
                                <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                    {{ data.Name }}
                                </p>
                            </div>

                            <div class="inline-flex items-center text-base text-gray-900 dark:text-white">
                                {{ ToIndianNumber(data.Amount) }}
                            </div>
                            <div class="inline-flex items-center text-base text-gray-900 dark:text-white">
                                {{ data.Percentage }} %
                            </div>
                        </div>
                    </li>

                    <li class="pb-3 sm:pb-4">
                        <div class="flex items-center space-x-8 rtl:space-x-reverse">

                            <div class="flex-1 min-w-0 mr-20">
                                <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                    .
                                </p>
                            </div>

                            <div class="inline-flex items-center text-base text-gray-900 dark:text-white">

                            </div>
                            <div class="inline-flex items-center text-base text-gray-900 dark:text-white">

                            </div>
                        </div>
                    </li>



                </ul>
                <p class="mt-8 font-normal text-lg space-x-reverse" style="text-align: center;">
                    {{ ToIndianNumber(dashboard['total']['Comodity']) }}
                </p>

            </div>

            <div
                class="inline-block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

                <h5 class="mb-2 text-2xl  font-bold tracking-tight text-gray-900 dark:text-white">Bank Deposits</h5>


                <ul class="max-w-md w-full divide-y divide-gray-200 dark:divide-gray-700 mt-4">


                    <li class="pb-3 sm:pb-4" v-for="data in dashboard['data']['Deposits']">
                        <div class="flex items-center space-x-8 rtl:space-x-reverse">

                            <div class="flex-1 min-w-0 mr-20">
                                <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                    {{ data.Name }}
                                </p>
                            </div>

                            <div class="inline-flex items-center text-base text-gray-900 dark:text-white">
                                {{ ToIndianNumber(data.Amount) }}
                            </div>
                            <div class="inline-flex items-center text-base text-gray-900 dark:text-white">
                                {{ data.Percentage }} %
                            </div>
                        </div>
                    </li>


                    <li class="pb-3 sm:pb-4">
                        <div class="flex items-center space-x-8 rtl:space-x-reverse">

                            <div class="flex-1 min-w-0 mr-20">
                                <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                    .
                                </p>
                            </div>

                            <div class="inline-flex items-center text-base text-gray-900 dark:text-white">

                            </div>
                            <div class="inline-flex items-center text-base text-gray-900 dark:text-white">

                            </div>
                        </div>
                    </li>



                </ul>
                <p class="mt-8 font-normal text-lg space-x-reverse" style="text-align: center;">
                    {{ ToIndianNumber(dashboard['total']['Deposits']) }}
                </p>

            </div>



        </div>

        <div class="inline-flex items-center justify-center w-full">
            <hr class="w-64 h-px my-8 bg-gray-200 border-0 dark:bg-gray-700">
            <span class="absolute px-3 font-medium text-gray-900 bg-white dark:text-white dark:bg-gray-900">
                By Broker
            </span>
        </div>


        <div class="my-4 space-x-8 space-y-8">

            <div
                class="inline-block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

                <h5 class="mb-2 text-2xl  font-bold tracking-tight text-gray-900 dark:text-white">
                    <a href="#" class="hover:text-blue-600"> ICICI Direct</a>
                </h5>


                <ul class="max-w-md w-full divide-y divide-gray-200 dark:divide-gray-700 mt-4">

                    <li class="pb-3 sm:pb-4">
                        <div class="flex items-center space-x-8 rtl:space-x-reverse">

                            <div class="flex-1 min-w-0 mr-20">
                                <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                    Shares
                                </p>
                            </div>

                            <div class="inline-flex items-center text-base text-gray-900 dark:text-white">
                                40L
                            </div>
                            <div class="inline-flex items-center text-base text-gray-900 dark:text-white">
                                70%
                            </div>
                        </div>
                    </li>

                    <li class="pb-3 sm:pb-4 hover:bg-gray-100">
                        <a href="/mf/dashboard/1" class="hover:bg-blue-100">
                            <div class="flex items-center space-x-8 rtl:space-x-reverse ">

                                <div class="flex-1 min-w-0 mr-20">
                                    <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                        Mutual Fund
                                    </p>
                                </div>

                                <div class="inline-flex items-center text-base text-gray-900 dark:text-white">
                                    40L
                                </div>
                                <div class="inline-flex items-center text-base text-gray-900 dark:text-white">
                                    70%
                                </div>
                            </div>
                        </a>
                    </li>
                    <li class="pb-3 sm:pb-4">
                        <div class="flex items-center space-x-8 rtl:space-x-reverse">

                            <div class="flex-1 min-w-0 mr-20">
                                <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                    ETFs
                                </p>
                            </div>

                            <div class="inline-flex items-center text-base text-gray-900 dark:text-white">
                                40L
                            </div>
                            <div class="inline-flex items-center text-base text-gray-900 dark:text-white">
                                70%
                            </div>
                        </div>
                    </li>



                </ul>
                <p class="mt-8 font-normal text-lg space-x-reverse" style="text-align: center;">
                    55.56L
                </p>

            </div>

            <div
                class="inline-block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

                <h5 class="mb-2 text-2xl  font-bold tracking-tight text-gray-900 dark:text-white">Zerodha</h5>


                <ul class="max-w-md w-full divide-y divide-gray-200 dark:divide-gray-700 mt-4">

                    <li class="pb-3 sm:pb-4">
                        <div class="flex items-center space-x-8 rtl:space-x-reverse">

                            <div class="flex-1 min-w-0 mr-20">
                                <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                    Gold
                                </p>
                            </div>

                            <div class="inline-flex items-center text-base text-gray-900 dark:text-white">
                                <div class="flex-1 items-center text-base text-gray-900 dark:text-white">
                                    <p>40L</p>

                                </div>
                            </div>
                            <div class="inline-flex items-center text-base text-gray-900 dark:text-white">
                                70%
                            </div>
                        </div>
                    </li>

                    <li class="pb-3 sm:pb-4">
                        <div class="flex items-center space-x-8 rtl:space-x-reverse">

                            <div class="flex-1 min-w-0 mr-20">
                                <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                    Silver
                                </p>
                            </div>

                            <div class="inline-flex items-center text-base text-gray-900 dark:text-white">
                                40L
                            </div>
                            <div class="inline-flex items-center text-base text-gray-900 dark:text-white">
                                70%
                            </div>
                        </div>
                    </li>
                    <li class="pb-3 sm:pb-4">
                        <div class="flex items-center space-x-8 rtl:space-x-reverse">

                            <div class="flex-1 min-w-0 mr-20">
                                <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                    .
                                </p>
                            </div>

                            <div class="inline-flex items-center text-base text-gray-900 dark:text-white">

                            </div>
                            <div class="inline-flex items-center text-base text-gray-900 dark:text-white">

                            </div>
                        </div>
                    </li>



                </ul>
                <p class="mt-8 font-normal text-lg space-x-reverse" style="text-align: center;">
                    55.56L
                </p>

            </div>




        </div>
    </div>
</template>
