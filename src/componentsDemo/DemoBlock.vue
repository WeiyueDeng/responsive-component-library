<template>
  <section class="demo-block">
    <div class="header">
      <h3 class="title">{{ title }}</h3>
      <div class="actions">
        <button class="btn" @click="copyCode">Copy</button>
        <button class="btn" @click="toggle">{{ expanded ? 'Hide' : 'Show' }} Code</button>
      </div>
    </div>
    <p v-if="note" class="note">{{ note }}</p>
    <div class="live">
      <slot />
    </div>
    <transition name="collapse">
      <pre v-show="expanded" class="code"><code>{{ code }}</code></pre>
    </transition>
  </section>
</template>

<script setup>
import { ref, watchEffect } from 'vue'

const props = defineProps({
  title: { type: String, required: true },
  code: { type: String, required: true },
  note: { type: String, default: '' },
  defaultExpanded: { type: Boolean, default: false },
})

const expanded = ref(!!props.defaultExpanded)

function toggle(){
  expanded.value = !expanded.value
}

async function copyCode(){
  try{
    await navigator.clipboard.writeText(props.code)
  }catch(e){
    console.warn('Clipboard not available')
  }
}
</script>

<style scoped>
.demo-block{ margin-top: 20px; }
.header{ display:flex; align-items:center; justify-content:space-between; gap: 8px; }
.title{ margin: 0; font-size: 16px; }
.actions{ display:flex; gap: 6px; }
.btn{ border: 1px solid #e5e7eb; background: #f9fafb; border-radius: 6px; padding: 4px 8px; cursor: pointer; }
.btn:hover{ background: #f3f4f6; }
.note{ color:#374151; margin: 6px 0 8px; }
.live{ border: 1px dashed #e5e7eb; padding: 12px; border-radius: 8px; background: #fff; }
.code{ background: #0b1020; color: #e5e7eb; border-radius: 8px; padding: 12px; overflow:auto; margin-top:8px; }

.collapse-enter-active, .collapse-leave-active { transition: max-height .22s ease, opacity .22s ease; }
.collapse-enter-from, .collapse-leave-to { max-height: 0; opacity: 0; }
.collapse-enter-to, .collapse-leave-from { max-height: 480px; opacity: 1; }
</style>
