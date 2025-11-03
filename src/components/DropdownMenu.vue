<template>
    <!-- dropdown menu will not be exposed as public component, ONLY for development use -->
    <!-- Other public components might depend on DropdownMenu.vue. -->
    <div :class = "['dropdown-menu', size, {'with-box-shadow':with_box_shadow}, width_type]" ref="dropdown_menu">
        <div v-if = "!options || options.length == 0" class = "no-data-notes">
            {{ is_loading ? loading_text : no_data_text}}
        </div>
        <div v-else-if = "is_web_version || nested_dropdown_history_stack.length == 0">
            <DropdownMenuItem v-for = "(option, index) in options" 
            :key = "`${JSON.stringify(option.value)}-${index}-${option.label}`" 
            v-bind = "option"
            :has_divider = "index == options.length - 1 ? false : option.has_divider" 
            :size = "size"
            :in_dropdown_level = "dropdown_level"
            :nested_dropdown_history_stack = "dropdown_level == 0 ? nested_dropdown_history_stack : $attrs.outest_nested_dropdown_history_stack"
            :with_box_shadow="with_box_shadow"
            :parent_dropdown_menu_with_type="width_type"
            @select-dropdown-option = "(value, label, in_dropdown_level) => handleSelectDropdownOption(value, label, in_dropdown_level)"
            @add-new-shown-nested-dropdown = "(target_item_props, trigger) => handleAddNewShownNestedDropdown(target_item_props, trigger)"
            @remove-shown-nested-dropdown = "(target_item_props) => handleRemoveShownNestedDropdown(target_item_props)"
            @update-shown-nested-dropdown = "(target_item_props) => handleUpdateShownNestedDropdown(target_item_props)"
            />
        </div>
        <div v-else>
            <DropdownMenuItem
            v-bind = "last_item_in_nested_dropdown_history_stack"
            :size = "size"
            :nested_dropdown_history_stack = "dropdown_level == 0 ? nested_dropdown_history_stack : $attrs.outest_nested_dropdown_history_stack"
            :with_box_shadow="with_box_shadow"
            :parent_dropdown_menu_with_type="width_type"
            @select-dropdown-option = "(value, label, in_dropdown_level) => handleSelectDropdownOption(value, label, in_dropdown_level)"
            @add-new-shown-nested-dropdown = "(target_item_props, trigger) => handleAddNewShownNestedDropdown(target_item_props, trigger)"
            @remove-shown-nested-dropdown = "(target_item_props) => handleRemoveShownNestedDropdown(target_item_props)"
            @update-shown-nested-dropdown = "(target_item_props) => handleUpdateShownNestedDropdown(target_item_props)"
            />
        </div>
    </div>
</template>

<script setup>
import DropdownMenuItem from '@/devOnlyComponents/DropdownMenuItem.vue';
import { ref, computed, watch, useAttrs, onMounted, onUnmounted } from 'vue';
import { useWindowSize } from '@/composables/useWindowSize.js';

const props = defineProps({
    width_type:{
        type: String,
        // ENUM: fill-whole, fit-content
        default: 'fill-whole'
    },
    options:{
        // ?: Optional
        // Options structure: see README DropdownMenu for full schema
        // [
        //     {
        //         value: [String, Number, Boolean, Object],
        //         label: String,
        //         prefix?: String,
        //         suffix?: String,
        //         prefix_slot_raw_html_content?: String,
        //         suffix_slot_raw_html_content?: String,
        //         options?: Array<Option>,
        //         has_divider?: Boolean
        //         disabled?: Boolean
        //         is_selected?: Boolean
        //     }
        // ]
        // where Option: (DropdownMenuItem.vue props)
        // {
        //     value: [String, Number, Boolean, Object],
        //     label: String,
        //     prefix?: String,
        //     suffix?: String,
        //     prefix_slot_raw_html_content?: String,
        //     suffix_slot_raw_html_content?: String,
        //     options?: Array<Option>,
        //     has_divider?: Boolean
        //     disabled?: Boolean
        //     is_selected?: Boolean
        // }
        type: Array,
        default: () => []
    },
    size:{
        type: String,
        // ENUM: small, medium, large
        default: 'small'
    },
    dropdown_level:{
        // ?: Optional
        // The level of the dropdown menu
        // 0: root dropdown menu
        // 1: first nested dropdown menu
        // 2: second nested dropdown menu
        // ...
        type: Number,
        default: 0,
    },
    with_box_shadow:{
        type: Boolean,
        default: true
    },
    is_loading:{
        type: Boolean,
        default: false
    },
    loading_text:{
        type: String,
        default: 'Loading...'
    },
    no_data_text:{
        type: String,
        default: 'No data'
    }
});

const emit = defineEmits([
    'select-dropdown-option',
    'add-new-shown-nested-dropdown',
    'remove-shown-nested-dropdown',
    'update-shown-nested-dropdown',
    'click-outside-dropdown-menu'
]);

const attrs = useAttrs();
const {width} = useWindowSize();
const dropdown_menu = ref(null);
const nested_dropdown_history_stack = ref([]);

const outest_nested_dropdown_history_stack = computed(() => attrs.outest_nested_dropdown_history_stack);
const is_web_version = computed(() => width.value > 1024);

const last_item_in_nested_dropdown_history_stack = computed(() => {
    return props.dropdown_level != 0 
    ? (outest_nested_dropdown_history_stack.value.length > 0 ? outest_nested_dropdown_history_stack.value[outest_nested_dropdown_history_stack.value.length-1] : null)
    : (nested_dropdown_history_stack.value.length > 0 ? nested_dropdown_history_stack.value[nested_dropdown_history_stack.value.length-1] : null);
});

const handleSelectDropdownOption = (value, label, in_dropdown_level) => {
    // triggered when one of the sub-dropdown menu items which DON'T have nested dropdown is selected

    // Pass select-dropdown-option event to parent component
    emit('select-dropdown-option', value, label, in_dropdown_level);
}
const handleAddNewShownNestedDropdown = (target_item_props, trigger) => {
    // triggered when one of the sub-dropdown menu items which have nested dropdown is clicked(non-web version & web version) or hovered(web version)

    // Pass add-new-shown-nested-dropdown event until the root dropdown menu
    if(props.dropdown_level == 0){
        // if already at the root dropdown menu:
        // clear the nested dropdown history stack after the clicked dropdown level index and add the new shown nested dropdown
        nested_dropdown_history_stack.value.splice(target_item_props.in_dropdown_level);
        nested_dropdown_history_stack.value.push(target_item_props);
    }else{
        emit('add-new-shown-nested-dropdown', target_item_props, trigger);
    }
}
const handleRemoveShownNestedDropdown = (target_item_props) => {

    // Pass remove-shown-nested-dropdown event until the root dropdown menu
    if(props.dropdown_level == 0){
        nested_dropdown_history_stack.value.pop();
    }else{
        emit('remove-shown-nested-dropdown', target_item_props);
    }
}
const handleUpdateShownNestedDropdown = (target_item_props) => {
    // Pass update-shown-nested-dropdown event until the root dropdown menu
    if(props.dropdown_level == 0){
        // if already at the root dropdown menu:
        // clear the nested dropdown history stack after the clicked dropdown level index and add the new shown nested dropdown
        nested_dropdown_history_stack.value.splice(target_item_props.in_dropdown_level);
    }else{
        emit('update-shown-nested-dropdown', target_item_props);
    }
}
const closeWhenClickOutsideDropdownButton = (e) => {
    if( dropdown_menu.value && !dropdown_menu.value.contains(e.target)) {
        emit('click-outside-dropdown-menu', e);
    }
}

onMounted(() => {
    if(props.dropdown_level == 0){
        document.addEventListener('click', (e)=>closeWhenClickOutsideDropdownButton(e), true);
    }
});
onUnmounted(() => {
    if(props.dropdown_level == 0){
        document.removeEventListener('click', (e)=>closeWhenClickOutsideDropdownButton(e), true);
    }
});
</script>

<style scoped>
.dropdown-menu.with-box-shadow{
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.30), 0 2px 6px 2px rgba(0, 0, 0, 0.15);
}
.dropdown-menu.fill-whole{
    width: 100%;
}
.dropdown-menu.fit-content{
    width: fit-content;
}
.dropdown-menu{
    padding: 8px 0px;
    border-radius: 4px;
    background: #EEEFF1;
    min-width:90px;
}
.no-data-notes{
    width: 100%;
    box-sizing: border-box;
    padding:12px 8px;
    border-radius: 4px;

    color: #17181C;

    font-family: Roboto;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 24px; /* 150% */
    letter-spacing: 0.5px;
    text-align: center;
}
</style>