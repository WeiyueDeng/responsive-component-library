<template>
  <div class="component-doc">
    <h2>WholePageErrorPopup</h2>
    <DemoBlock id="whole-page-error-popup" title="Basic Usage" :code="basicCode">
      <div class="live">
        <button @click="show_popup=true">Click to show WholePageErrorPopup</button>
        <WholePageErrorPopup v-if="show_popup" @retry="hidePopup">
          <template #content>
            <div>
              <p>This is a test</p>
            </div>
          </template>
        </WholePageErrorPopup>
      </div>
    </DemoBlock>
  </div>
</template>

<script>
import WholePageErrorPopup from '@/components/WholePageErrorPopup.vue';
import DemoBlock from '@/componentsDemo/DemoBlock.vue';
export default{
  components: {
    WholePageErrorPopup,
    DemoBlock
  },
  data(){
    return{
      show_popup:false,
    }
  },
  computed:{
    basicCode(){
      return `<template>\n  <button @click=\"() => (show = true)\">Click to show WholePageErrorPopup</button>\n  <WholePageErrorPopup v-if=\"show\" @retry=\"() => (show = false)\">\n    <template #content>\n      <div><p>This is a test</p></div>\n    </template>\n  </WholePageErrorPopup>\n</template>\n\n<script setup>\nimport { ref } from 'vue'\nimport { WholePageErrorPopup } from 'pns-component-library'\nconst show = ref(false)\n<\/script>`
    }
  },
  methods:{
    showPopup(){ this.show_popup = true },
    hidePopup(){ this.show_popup = false }
  }
}
</script>

<style scoped>
.component-doc{ max-width: 900px; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; }
.live{ border: 1px dashed #e5e7eb; padding: 12px; border-radius: 8px; background: #fff; display:flex; flex-direction: column; gap: 8px; }
</style>