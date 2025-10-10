<template>
  <div class="component-doc">
    <h2>Directives</h2>
    <p class="desc">Utility directives for loading states at component-level and app-level.</p>
    <DemoBlock id="directive-component-loading" title="v-component-loading" :code="componentLoadingCode">
      <p class="note">Applies a loading overlay to the bound element while the value is true.</p>
      <div class="live-demo stack">
        <button @click="dummy_component_loading = !dummy_component_loading">
          Toggle component loading ({{ dummy_component_loading ? 'on' : 'off' }})
        </button>
        <div class="dummy" v-component-loading="dummy_component_loading">Dummy Component</div>
      </div>
    </DemoBlock>

    <DemoBlock id="directive-whole-page-loading" title="v-whole-page-loading" :code="wholePageLoadingCode">
      <p class="note">Displays a full-page loading overlay while the value is true.</p>
      <div class="live-demo stack">
        <button @click="whole_page_loading = !whole_page_loading" v-whole-page-loading="whole_page_loading">
          Toggle whole-page loading ({{ whole_page_loading ? 'on' : 'off' }})
        </button>
      </div>
    </DemoBlock>
  </div>
</template>

<script>
import DemoBlock from '@/componentsDemo/DemoBlock.vue';
export default{
  components:{ DemoBlock },
  data(){
    return{
      dummy_component_loading:false,
      whole_page_loading:false,
    }
  },
  computed:{
    componentLoadingCode(){
      return `<template>
  <button @click="() => (loading = !loading)">Toggle</button>
  <div class="card" v-component-loading="loading">Content</div>
</template>

<script setup>
import { ref } from 'vue'
const loading = ref(false)
<\/script>`
    },
    wholePageLoadingCode(){
      return `<template>
  <button @click="() => (loading = !loading)" v-whole-page-loading="loading">Toggle page loading</button>
</template>

<script setup>
import { ref } from 'vue'
const loading = ref(false)
<\/script>`
    }
  },
  methods:{}
}
</script>

<style scoped>
.component-doc{ max-width: 900px; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; }
.desc{ color:#4b5563; margin-bottom: 12px; }
.live-demo.stack{ display:flex; flex-direction: column; gap: 8px; }
.note{ color:#374151; }
.dummy{ margin-top:10px; width: 250px; height:250px; background-color: #E8F4FD; border-radius: 4px; padding:10px; display:flex; align-items:center; justify-content:center; }
</style>