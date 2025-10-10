<template>
  <div class="component-doc">
    <h2>AreaCodePhoneInput</h2>
    <p class="desc">
      International phone input with country selector and smart focus. Emits full value on change,
      and exposes helper methods to programmatically focus, blur, show alerts/errors, and clear.
    </p>
    <!-- Basic Usage -->
    <DemoBlock id="acpi-basic" title="Basic Usage" :code="basicUsageCode">
      <div class="live-demo">
        <AreaCodePhoneInput
          v-model="test_phone"
          @focus="triggerFocus"
          @blur="triggerBlur"
        />
        <div class="note">Typed phone number: {{ computed_phone_number }}</div>
      </div>
    </DemoBlock>

    <!-- Programmatic Control & Messages -->
    <DemoBlock id="acpi-programmatic" title="Programmatic Control & Messages" :code="programmaticCode">
      <div class="live-demo stack">
        <div class="actions">
          <button @click="(e)=>{target_input_box.focus(); e.stopPropagation()}">Focus</button>
          <button @click="(e)=>{target_input_box.blur(); e.stopPropagation()}">Blur</button>
          <button @click="target_input_box.alert('Please review your number')">Show Alert</button>
          <button @click="target_input_box.error('Invalid number format')">Show Error</button>
          <button @click="target_input_box.removeAlertOrErrorEffect()">Clear Messages</button>
        </div>
        <AreaCodePhoneInput
          ref="target_input_box"
          v-model="test_phone"
        />
      </div>
    </DemoBlock>

    <!-- Disabled State -->
    <DemoBlock id="acpi-disabled" title="Disabled State" :code="disabledCode">
      <div class="live-demo">
        <AreaCodePhoneInput v-model="test_phone" :disabled="true" />
      </div>
    </DemoBlock>
  </div>
</template>

<script setup>
import AreaCodePhoneInput from '@/components/AreaCodePhoneInput.vue';
import DemoBlock from '@/componentsDemo/DemoBlock.vue';
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

const triggerFocus = () => {
  console.log('triggerFocus');
};
const triggerBlur = () => {
  console.log('triggerBlur');
};

const basicUsageCode = `<template>
  <AreaCodePhoneInput
    v-model="phone"
    @focus="onFocus"
    @blur="onBlur"
  />
</template>

<script setup>
import { ref } from 'vue'
import { AreaCodePhoneInput } from 'pns-component-library'

const phone = ref({ area_code: '', phone_number: '' })
const onFocus = () => {}
const onBlur = () => {}
<\/script>`;

const programmaticCode = `<template>
  <div>
    <button @click="() => acpiRef.focus()">Focus</button>
    <button @click="() => acpiRef.blur()">Blur</button>
    <button @click="() => acpiRef.alert('Please review your number')">Show Alert</button>
    <button @click="() => acpiRef.error('Invalid number format')">Show Error</button>
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

</script>

<style scoped>
.component-doc{ max-width: 900px; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; }
.desc{ color: #4b5563; margin-bottom: 12px; }
.live-demo{ border: 1px dashed #e5e7eb; padding: 12px; border-radius: 8px; background: #fff; }
.live-demo.stack .actions{ display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 8px; }
.note{ color: #374151; margin-top: 8px; }
</style>