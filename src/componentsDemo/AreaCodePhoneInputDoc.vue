<template>
    <div class = "area-code-phone-input-doc">
        <h1>Samples Display for AreaCodePhoneInputBox.vue</h1> <br />
        <div @click = "(event)=>{target_input_box.focus(); event.stopPropagation()}">click to focus</div>
        <div @click = "(event)=>{target_input_box.blur(); event.stopPropagation()}">click to blur</div>
        <div @click = "target_input_box.alert('alert msg 123123123 123123 123')">click to show alert</div>
        <div @click = "target_input_box.error('error msg 123123123 12312 123 1231')">click to show error</div>
        <div @click = "target_input_box.removeAlertOrErrorEffect()">click to remove alert or error</div>
        <AreaCodePhoneInput ref ='target_input_box' v-model = "test_phone" @focus = "triggerFocus" @blur = "triggerBlur"/>
        <div>Typed phone number: {{ computed_phone_number }}</div>
        <br />
        <h2>Disabled Input</h2>
        <AreaCodePhoneInput v-model = "test_phone" :disabled = "true"/>
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
    :`${test_phone.value.area_code}-${test_phone.value.phone_number}`;
}); 

const triggerFocus = () => {
    console.log('triggerFocus');
}
const triggerBlur = () => {
    console.log('triggerBlur');
}
</script>

<style scoped>
.area-code-phone-input-doc {
    width: 500px; 
    border: 1px pink solid; 
    border-radius: 4px; 
    padding:10px
}

@media only screen and (max-width: 767px) {
    .area-code-phone-input-doc {
        width: 50vw;
    }
}
</style>