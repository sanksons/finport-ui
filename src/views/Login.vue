
<script setup>
import { getCookie, setCookie } from '../utils/cookie.js'
import { getInvestor } from '../utils/common.js'
import { useRouter } from 'vue-router'
import { inject } from 'vue'

const router = useRouter()

const investor = inject('investor')

function setInvestorCookie(investorId) {
    setCookie("investor", investorId, 1);
    investor.value = getInvestor()
    router.push({ name: "Home" })
}
</script>

<template>
    <div class="mt-8">
        <button @click="setInvestorCookie(1)"
            class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
            <span
                class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Login as Sankalp
            </span>
        </button>

        <button @click="setInvestorCookie(2)"
            class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
            <span
                class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Login as Swati
            </span>
        </button>
    </div>
</template>
