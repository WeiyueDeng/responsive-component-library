<template>
    <div class = "group-checkbox-container">
        <slot></slot>
    </div>
</template>

<script setup>
import { ref, provide, watch } from 'vue'

const props = defineProps({
    modelValue: {
        type: Array,
        default: () => []
    }
})

const emit = defineEmits(['update:modelValue', 'change'])

// Reactive data
const checkboxes_status_map = ref({})

// Initialize the checkboxes status map
const updateCheckedCheckboxesArrayToMap = (checkboxesLabels) => {
    const checkboxes_status_map_value = {}
    checkboxesLabels.forEach(item => {
        checkboxes_status_map_value[item] = true
    })
    return checkboxes_status_map_value
}
checkboxes_status_map.value = updateCheckedCheckboxesArrayToMap(props.modelValue);

// Function to be provided to children checkboxes
const toggleCheckbox = (label, is_checked) => {
    if (is_checked) {
        checkboxes_status_map.value[label] = is_checked
    } else {
        delete checkboxes_status_map.value[label]
    }
}

// Watch for modelValue changes
watch(() => props.modelValue, (newVal) => {
    // avoid unnecessary updates if modelValue's change is caused by the component's update itself
    if (
        newVal.length === Object.keys(checkboxes_status_map.value).length
        && !newVal.some(item => checkboxes_status_map.value[item] !== true)
    ) {
        return;
    }

    // console.log('group checkbox modelValue changed', newVal);

    checkboxes_status_map.value = updateCheckedCheckboxesArrayToMap(newVal);
}, { deep: true });

watch(() => checkboxes_status_map.value, (newVal) => {
    const current_checked_checkboxes_array = Object.keys(newVal);
    //check whether need to update modelValue
    if(
        props.modelValue.length != current_checked_checkboxes_array.length
        || props.modelValue.some(item => checkboxes_status_map.value[item] !== true)
    ) {
        // console.log('group checkbox checkboxes_status_map changed', newVal, current_checked_checkboxes_array);  
        emit("change", current_checked_checkboxes_array)
        emit('update:modelValue', current_checked_checkboxes_array)
    }

    
}, { deep: true })

// Provide to child components
provide('toggleCheckbox', toggleCheckbox)
provide('groupCheckboxContext', checkboxes_status_map)
</script>

<style scoped>
.group-checkbox-container{
    width:fit-content;
}
</style>