<template>
    <div class = "area-code-phone-input-unit-wrapper">
        <div :class = "[
            'area-code-phone-input',
            {'is-focus': is_focus},
            {'disabled': disabled},
            {'error': show_error},
            {'alert': show_alert},
        ]"
        @mouseenter = "is_hovered = true"
        @mouseleave = "is_hovered = false">
            <div class = "country-area-code-selector-wrapper">
                <SingleSelector
                    ref = "countryAreaCodeSelector"
                    v-model = "selected_country"
                    :options="available_country_options"
                    placeholder="Country"
                    :disabled="disabled"
                    :filterable="country_filterable"
                    @change = "handleSelectCountry"
                    @focus = "is_country_area_code_selector_focused = true"
                    @blur = "is_country_area_code_selector_focused = false"
                >
                    <template #prefix v-if = "selected_country">
                        <img :src = "`https://hatscripts.github.io/circle-flags/flags/${selected_country.toLowerCase()}.svg`" class = "country-selector-prefix"/>
                    </template>
                </SingleSelector>
            </div>
            <div :class = "['area-code-container', {'not-selected': !area_code}]">
                +{{ selected_country ? `${area_code}` : '__' }}
            </div>
            <div class = "phone-number-input-wrapper">
                <InputBox
                    ref = "phoneNumberInput"
                    v-model = "phone_number"
                    placeholder = "Phone Number"
                    :disabled="disabled"
                    @focus = "is_phone_number_input_focused  = true"
                    @blur = "is_phone_number_input_focused = false"
                />
            </div>
            <!-- suffix part -->
            <div :class = "[
                'suffix-wrapper',
            ]">
                <!-- clear icon part -->
                <img src = "@/assets/icons/input_clear_icon.svg" 
                :class = "[
                    'clear-icon',
                    {'hide': !show_clear_icon}
                ]"
                @click="handleClickClearIcon"/>
                <!-- clear icon part end -->
            </div>
            <!-- suffix part end -->
        </div>
        
        <!-- message notification part -->
        <div v-if = "(show_alert || show_error) && message_notification_text" 
        :class = "[
            'message-container',
            {'error': show_error},
            {'alert':show_alert}
        ]">
            {{ message_notification_text }}
        </div>
        <!-- message notification part end -->
    </div>
</template>

<script setup>
import SingleSelector from '@/components/SingleSelector.vue';
import InputBox from '@/components/InputBox.vue';
import { defineExpose, ref, computed, watch, onMounted } from 'vue';
import { country_code_to_area_code_map } from '@/data/countryCodeToAreaCodeMap.js';
import { backup_country_options } from '@/data/backupCountryList.js';

//props
const props = defineProps({
    modelValue: {
        //eg.{area_code:"1", phone_number:"2"}
        type:Object,
        default: ()=>{}
    },
    country_options: {
        //eg. [{country_name:"USA", country_code:'US'}]
        //NOTES: country_code is 2 bytes, and all uppercase
        type: Array,
        default: () => []
    },
    enable_backup_country_options: {
        type: Boolean,
        default: true
    },
    country_filterable: {
        type: Boolean,
        default: true
    },
    disabled:{
        type: Boolean,
        default: false
    }
});

//refs
const countryAreaCodeSelector = ref(null);
const phoneNumberInput = ref(null);

//data
const selected_country = ref('');
const phone_number = ref('');
const is_hovered = ref(false);
const is_country_area_code_selector_focused = ref(false);
const is_phone_number_input_focused = ref(false);
const show_alert = ref(false);
const show_error = ref(false);
const message_notification_text = ref('');

//emits
const emits = defineEmits(['update:modelValue', 'change', 'focus', 'blur', 'clear']);

//methods
const getSelectedCountryByAreaCode = (area_code) => {
    // NOTES: used when want to convert area_code to country code
    // 1. if area_code is empty/null/undefined, return empty string
    if(!area_code) return '';
    // 2. find the country by area_code
    const country_code = area_code == "1" 
    ? 'US' // NOTES: though US is not the only country with area code 1, but we use US as default country for area code 1 when initialize.
    : Object.entries(country_code_to_area_code_map).find(country => country[1] == area_code)?.[0];
    // 3. if found, return the country code, otherwise return empty string
    // NOTES: country code in country_code_to_area_code_map are all uppercase, so we return the country code directly
    return country_code ? country_code : '';
};
const assignSelectedCountryAndPhoneNumberViaModelValue = (modelValue) => {
    selected_country.value = getSelectedCountryByAreaCode(modelValue?.area_code ?? '');
    phone_number.value = modelValue?.phone_number ?? '';
};
const handleSelectCountry = () => {
    // NOTES: need to triggered by SingleSelector's @change event
    // NOTES: since after select a selector option, the SingleSelector will assign the selected_item which emits a change event first
    // NOTES: and then the SingleSelector will emit a blur event by assigning is_focus to be false after next tick
    // NOTES: we want make sure the phone number input is focused BEFORE the selector is blurred
    //After select a country:
    //if has selected_country and no phone number, Auto Focus 'phoneNumberInput'
    if(selected_country.value && !phone_number.value){
        phoneNumberInput?.value?.focus();
    }
}
const handleClickClearIcon = () => {
    if(!props.disabled){
        clear();
        emits('clear', {
            area_code: area_code.value,
            phone_number: phone_number.value
        });
    }
};
const focus = () => {
    //if empty selected_country: auto focus the country selector
    if(!selected_country.value){
        countryAreaCodeSelector?.value?.focus();
    }else{
    //if has selected_country: auto focus the phone number input
        phoneNumberInput?.value?.focus();
    }
};
const blur = () => {
    countryAreaCodeSelector?.value?.blur();
    phoneNumberInput?.value?.blur();
};
const clear = () => {
    selected_country.value = '';
    phone_number.value = '';
    message_notification_text.value = '';
    show_alert.value = false;
    show_error.value = false;
};
const alert = (msg) => {
    show_alert.value = true;
    message_notification_text.value = msg;
};
const error = (msg) => {
    show_error.value = true;
    message_notification_text.value = msg;
};
const removeAlertOrErrorEffect = () => {
    show_alert.value = false;
    show_error.value = false;
    message_notification_text.value = '';
};

//exposes
defineExpose({focus, blur, clear, alert, error, removeAlertOrErrorEffect});

//computed
const available_country_options = computed(() => {
    const output = props.country_options?.length > 0 
    ? props.country_options.filter(country => country_code_to_area_code_map[country?.country_code?.toUpperCase()]).map(country => {
        return {
            label:`${country.country_name} (${country.country_code.toUpperCase()}) +${country_code_to_area_code_map[country.country_code.toUpperCase()]}`,
            value: country.country_code.toUpperCase(),
        };
    })
    : (
        props.enable_backup_country_options 
        ? backup_country_options.filter(country => country_code_to_area_code_map[country?.countryNameTwoBytes]).map(country => {
            return {
                label:`${country.countryName} (${country.countryNameTwoBytes}) +${country_code_to_area_code_map[country.countryNameTwoBytes]}`,
                value: country.countryNameTwoBytes,
            };
        })
        : []
    );
    return output;
});
const area_code = computed(() => {
    return country_code_to_area_code_map?.[selected_country.value] ?? '';
});
const concate_phone_number = computed(() => {
    return `${area_code.value}-${phone_number.value}`;
});
const show_clear_icon = computed(() => {
    return (selected_country.value || phone_number.value) && !props.disabled && (is_hovered.value || is_focus.value);
});
const is_focus = computed(() => {
    return is_country_area_code_selector_focused.value || is_phone_number_input_focused.value;
});

//onMounted
onMounted(() => {
    //set the selected_country and phone_number based on modelValue
    assignSelectedCountryAndPhoneNumberViaModelValue(props.modelValue);
});

//watch
watch(()=>props.modelValue, (newVal) => {
    // assign selected_country and phone_number based on modelValue if modelValue is changed and the area_code or phone_number fields is not equal to the current values
    // **NOTES: used in purpose of avoiding infinite loop when modelValue is an object for v-model binding
    if(newVal?.area_code != area_code.value || newVal?.phone_number != phone_number.value){
        //if modelValue is an object, assign selected_country and phone_number
        assignSelectedCountryAndPhoneNumberViaModelValue(newVal);
    }
});
watch(concate_phone_number, () => {
    // if concate_phone_number is changed and the current modelValue is not equal to the new concate_phone_number:
    // emit update:modelValue with updated area_code and phone_number
    // **NOTES: used in purpose of avoiding infinite loop when modelValue is an object for v-model binding
    if(props.modelValue?.area_code != area_code.value || props.modelValue?.phone_number != phone_number.value){
        emits('update:modelValue', {
            area_code: area_code.value,
            phone_number: phone_number.value
        });
        // emit change event with area_code and phone_number at the same time
        // NOTES: this is to notify the parent component that the phone number is changed
        emits('change',{
            area_code: area_code.value,
            phone_number: phone_number.value
        })
    }

});
watch(is_phone_number_input_focused, (newVal) => {
    if(!newVal){
        //if no selected_country and has phone number, auto focus 'countryAreaCodeSelector'
        if(!selected_country.value && phone_number.value){
            countryAreaCodeSelector?.value?.focus();
        }
    }
});
watch(is_focus, (newVal) => {
    if(newVal){
        emits('focus', {
            area_code: area_code.value,
            phone_number: phone_number.value
        });
    }else{
        emits('blur', {
            area_code: area_code.value,
            phone_number: phone_number.value
        });
    }
})


</script>

<style scoped>
.area-code-phone-input-unit-wrapper{
    display: flex;
    flex-direction: column;
    row-gap:8px;
}
.area-code-phone-input{
    padding:1px 11px 1px 1px;

    display: flex;
    align-items: center;
    box-shadow: inset 0 0 0 1px #BCCCDC;
    /* use box-shadow instead of border, as border will occupy 2px spaces to cause dropdown is 2px less wide than the input */
    border-radius: 4px;
    position: relative;
}
.area-code-phone-input:hover{ 
    box-shadow: inset 0 0 0 1px #DEE6ED;
    /* use box-shadow instead of border, as border will occupy 2px spaces to cause dropdown is 2px less wide than the input */
}
.area-code-phone-input.is-focus{
    box-shadow: inset 0 0 0 1px #9BB2CA;
}
.area-code-phone-input.error:hover,
.area-code-phone-input.error.is-focus,
.area-code-phone-input.error{
    box-shadow: inset 0 0 0 1px #DE583F;
}
.area-code-phone-input.alert:hover,
.area-code-phone-input.alert.is-focus,
.area-code-phone-input.alert{
    box-shadow: inset 0 0 0 1px #E0961E;
}
.area-code-phone-input.disabled:hover,
.area-code-phone-input.disabled.is-focus,
.area-code-phone-input.disabled{
    /* border: 1px solid #BCCCDC; */
    box-shadow: inset 0 0 0 1px #BCCCDC !important;
    /* use box-shadow instead of border, as border will occupy 2px spaces to cause dropdown is 2px less wide than the input */
    background: #F2F2F2;
    cursor: not-allowed;
}
.country-area-code-selector-wrapper{
    max-width: 114px;
}
.phone-number-input-wrapper{
    flex: 1;
}
:deep(.single-selector-unit-wrapper){
    --input-box-border-color--: transparent !important;
}
:deep(.single-selector.disabled:hover),
:deep(.single-selector.has-prefix),
:deep(.single-selector:hover),
:deep(.single-selector.is-focus),
:deep(.single-selector){
    border: none;
    column-gap: 4px;
}
:deep(.single-selector-unit-wrapper){
    position: static;
}
:deep(.single-selector.has-prefix .selected-content.content-text){
    display: none;
}
:deep(.single-selector.has-prefix.is-focus .selected-content.content-text){
    display: block;
}
:deep(.single-selector.has-prefix.is-focus .prefix-wrapper){
    display: none;
}
:deep(.single-selector .selected-content){
    letter-spacing: 0.25px;
}
.country-selector-prefix{
    width: 100%;
    height: 100%;
}
.area-code-container{
    height:26px;
    width:fit-content;
    padding-left: 11px;
    display: flex;
    align-items: center;
    border-left: 1px solid #BCCCDC;

    color: #1C1B1F;
    font-family: Roboto;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px; 
    letter-spacing: 0.5px;
}
.area-code-container.not-selected{
    color: #979797;
}
:deep(.input-box-unit){
    --input-box-border-color--: transparent !important;
}
:deep(.input-box-unit.disabled:hover),
:deep(.input-box-unit:hover),
:deep(.input-box-unit.is-focus),
:deep(.input-box-unit){
    border: none;
}
.suffix-wrapper{
    display: flex;
    align-items: center;
    column-gap:4px;
    flex-shrink:0;
    height:24px;
}
.clear-icon{
    flex-shrink:0;
    width: 20px;
    height: 20px;
    opacity: 0.7;
    cursor: pointer;
}
.clear-icon:hover{
    opacity: 1;
}
.hide{
    display: none;
}
.message-container{
    width:100%;
    box-sizing: border-box;

    font-family: 'Roboto';
    font-size: 16px;
    font-weight: 400;
    line-height: 19px;
}
.message-container.error{
    color: #DE583F;
}
.message-container.alert{
    color: #E0961E;
}
@media only screen and (max-width: 767px) {
    .area-code-phone-input-unit-wrapper{
        row-gap:4px;
    }
    .country-area-code-selector-wrapper{
        max-width: 89px;
    }
    :deep(.single-selector.disabled:hover),
    :deep(.single-selector.has-prefix),
    :deep(.single-selector:hover),
    :deep(.single-selector.is-focus),
    :deep(.single-selector){
        box-shadow: none;
        column-gap: 2px;
    }
    .suffix-wrapper{
        height:20px;
        column-gap: 0px;
    }
    .clear-icon{
        width: 36px;
        height: 36px;
        box-sizing: border-box;
        padding: 10px;
    }
    .message-container{
        font-size: 14px;
        line-height: 16px;
    }
}

</style>