<template>
  <div class="component-doc">
    <h2>Composables</h2>
    <p class="desc">Utility functions to be used across components. See also FloatingNotification usage in the SimplifiedNotification section.</p>

    <DemoBlock id="use-window-size" title="useWindowSize" :code="useWindowSizeCode">
      <div class="live">
        <div class="row">
          <strong>Viewport:</strong>
          <span>{{ width }} x {{ height }}</span>
        </div>
        <div class="note">Resize the browser window to see values update reactively.</div>
      </div>
    </DemoBlock>
  </div>
</template>

<script>
import { useWindowSize } from '@/composables/useWindowSize.js';
import DemoBlock from '@/componentsDemo/DemoBlock.vue';
export default{
  components:{ DemoBlock },
  setup(){
    const { width, height } = useWindowSize();
    return { width, height };
  },
  computed:{
    useWindowSizeCode(){
      return `<template>\n  <div>Viewport: {{ width }} x {{ height }}</div>\n</template>\n\n<script setup>\nimport { useWindowSize } from 'pns-component-library/composables'\nconst { width, height } = useWindowSize()\n<\/script>`
    }
  }
}
</script>

<style scoped>
.component-doc{ max-width: 900px; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; }
.desc{ color:#4b5563; margin-bottom: 12px; }
.live{ border: 1px dashed #e5e7eb; padding: 12px; border-radius: 8px; background: #fff; display:flex; flex-direction: column; gap: 8px; }
.row{ display:flex; gap: 8px; align-items: center; }
.note{ color:#374151; }
</style>
