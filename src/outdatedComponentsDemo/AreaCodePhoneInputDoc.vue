<template>
  <div class="component-doc legacy">
    <h2>AreaCodePhoneInput (Legacy)</h2>
    <p class="desc">
      Legacy demo. Behavior and styles may differ from the latest version.
    </p>

    <!-- Basic Usage (Legacy) -->
    <section class="demo-section" id="acpi-basic-legacy">
      <div class="section-header">
        <h3>Basic Usage</h3>
        <button class="copy-btn" @click="copyCode(basicUsageCode)">Copy</button>
      </div>
      <div class="live-demo">
        <AreaCodePhoneInput
          v-model="test_phone"
          @focus="triggerFocus"
          @blur="triggerBlur"
        />
        <div class="note">Typed phone number: {{ computed_phone_number }}</div>
      </div>
      <pre class="code"><code>{{ basicUsageCode }}</code></pre>
    </section>

    <!-- Programmatic Control (Legacy) -->
    <section class="demo-section" id="acpi-programmatic-legacy">
      <div class="section-header">
        <h3>Programmatic Control</h3>
        <button class="copy-btn" @click="copyCode(programmaticCode)">Copy</button>
      </div>
      <div class="live-demo stack">
        <div class="actions">
          <button @click="(e)=>{target_input_box.focus(); e.stopPropagation()}">Focus</button>
          <button @click="(e)=>{target_input_box.blur(); e.stopPropagation()}">Blur</button>
          <button @click="target_input_box.alert('Legacy alert message')">Show Alert</button>
          <button @click="target_input_box.error('Legacy error message')">Show Error</button>
          <button @click="target_input_box.removeAlertOrErrorEffect()">Clear Messages</button>
        </div>
        <AreaCodePhoneInput ref='target_input_box' v-model="test_phone" />
      </div>
      <pre class="code"><code>{{ programmaticCode }}</code></pre>
    </section>

    <!-- Disabled State (Legacy) -->
    <section class="demo-section" id="acpi-disabled-legacy">
      <div class="section-header">
        <h3>Disabled State</h3>
        <button class="copy-btn" @click="copyCode(disabledCode)">Copy</button>
      </div>
      <div class="live-demo">
        <AreaCodePhoneInput v-model="test_phone" :disabled="true" />
      </div>
      <pre class="code"><code>{{ disabledCode }}</code></pre>
    </section>
  </div>
</template>

<script setup>
import AreaCodePhoneInput from '@/components/AreaCodePhoneInput.vue';
import { ref, computed } from 'vue';

const target_input_box = ref(null);

const test_phone = ref({
  area_code: '',
  phone_number: '1234567890'
});

const computed_phone_number = computed(() => {
  return typeof test_phone.value == 'string'
    ? test_phone.value
    : `${test_phone.value.area_code}-${test_phone.value.phone_number}`;
});

const triggerFocus = () => { console.log('triggerFocus'); };
const triggerBlur = () => { console.log('triggerBlur'); };

const basicUsageCode = `<template>
  <AreaCodePhoneInput v-model="phone" />
</template>

<script setup>
import { ref } from 'vue'
import { AreaCodePhoneInput } from 'pns-component-library'
const phone = ref({ area_code: '', phone_number: '' })
<\/script>`;

const programmaticCode = `<template>
  <div>
    <button @click="() => acpiRef.focus()">Focus</button>
    <button @click="() => acpiRef.blur()">Blur</button>
    <button @click="() => acpiRef.alert('Legacy alert message')">Show Alert</button>
    <button @click="() => acpiRef.error('Legacy error message')">Show Error</button>
    <button @click="() => acpiRef.removeAlertOrErrorEffect()">Clear</button>
    <AreaCodePhoneInput ref="acpiRef" v-model="phone" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { AreaCodePhoneInput } from 'pns-component-library'
const acpiRef = ref(null)
const phone = ref({ area_code: '', phone_number: '' })
<\/script>`;

const disabledCode = `<template>
  <AreaCodePhoneInput v-model="phone" :disabled="true" />
</template>

<script setup>
import { ref } from 'vue'
import { AreaCodePhoneInput } from 'pns-component-library'
const phone = ref({ area_code: '', phone_number: '' })
<\/script>`;

const copyCode = async (code) => {
  try{ await navigator.clipboard.writeText(code); }
  catch(e){ console.warn('Clipboard not available'); }
}
</script>

<style scoped>
.component-doc{ max-width: 900px; border: 1px solid #fde68a; border-radius: 8px; padding: 16px; background:#fffbeb; color:#92400e; }
.desc{ margin-bottom: 12px; }
.demo-section{ margin-top: 20px; }
.section-header{ display:flex; align-items:center; justify-content:space-between; margin-bottom:8px; }
.copy-btn{ border: 1px solid #fde68a; background: #fff7ed; border-radius: 6px; padding: 4px 8px; cursor: pointer; }
.copy-btn:hover{ background: #ffedd5; }
.live-demo{ border: 1px dashed #fcd34d; padding: 12px; border-radius: 8px; background: #fff; }
.live-demo.stack .actions{ display:flex; flex-wrap:wrap; gap:8px; margin-bottom:8px; }
.note{ margin-top: 8px; }
.code{ background: #0b1020; color: #e5e7eb; border-radius: 8px; padding: 12px; overflow:auto; margin-top:8px; }
</style>