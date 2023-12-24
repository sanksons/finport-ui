<script setup>
import NavBar from './components/NavBar.vue'
import SideBar from './components/SideBar.vue'
import { isUserAuthenticated, getInvestor } from './utils/common.js'

import { onMounted, ref, provide } from 'vue'
import { initFlowbite } from 'flowbite'

const investor = ref({})


// initialize components based on data attribute selectors
onMounted(() => {
  initFlowbite();
  investor.value = getInvestor()
})

provide("investor", investor)

function isAuthenticated() {
  console.log("investor", investor.value)
  if (investor.value == null) {
    return false
  }
  return true
}

</script>

<template>
  <div class="">

    <NavBar></NavBar>

    <template v-if="isAuthenticated()">
      <SideBar></SideBar>
    </template>

    <div class="p-4 sm:mt-8 sm:ml-64">
      <RouterView></RouterView>
    </div>
  </div>


  <footer class="bg-white shadow m-4 dark:bg-gray-800">
    <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
      <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://flowbite.com/"
          class="hover:underline">Flowbite™</a>. All Rights Reserved.
      </span>
      <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
        <li>
          <a href="#" class="hover:underline me-4 md:me-6">About</a>
        </li>
        <li>
          <a href="#" class="hover:underline me-4 md:me-6">Privacy Policy</a>
        </li>
        <li>
          <a href="#" class="hover:underline me-4 md:me-6">Licensing</a>
        </li>
        <li>
          <a href="#" class="hover:underline">Contact</a>
        </li>
      </ul>
    </div>
  </footer>
</template>

<style scoped></style>
