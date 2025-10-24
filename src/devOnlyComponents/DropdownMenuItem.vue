<template>
    <div :class = "['dropdown-menu-item-wrapper', size]">
        <!-- show menu item itself, if:
        web version or first nested dropdown regarding to its own nested dropdown history stack (non-web version) -->
        <div v-if = "show_menu_item"
        :class = "['dropdown-menu-item', {'disabled': disabled}, {'focus': show_dropdown && is_web_version}]" 
        @click = "handleClick()"
        @mouseenter = "handleMouseEnter()"
        ref = "dropdown_menu_item">
            <div class = "dropdown-menu-item-content">
                <!-- Show Back arrow as prefix if a nested dropdown is shown in non-web version. (All other prefixes will be ignored) -->
                <div v-if = "!is_web_version && has_dropdown && show_dropdown" :class = "['prefix-wrapper']">
                    <svg class = "rotate-180" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M10 17V7L15 12L10 17Z" fill="currentColor"/>
                    </svg>
                </div>
                <!-- Priority: prefix slot > prefix slot raw html content prop > prefix prop -->
                <div v-else-if = "$slots.prefix || prefix_slot_raw_html_content || prefix" :class = "['prefix-wrapper']">
                    <slot name = "prefix">
                        <div v-if = "prefix_slot_raw_html_content" v-html = "prefix_slot_raw_html_content" />
                        <img v-else :src = "prefix" />
                    </slot>
                </div>

                <div :class = "['text']">{{ label }}</div>
            </div>
            
            <div v-if = "$slots.suffix || suffix_slot_raw_html_content || suffix || has_dropdown" :class = "['suffix-wrapper']">
                <!-- Priority: suffix slot > suffix slot raw html content prop > suffix prop > default dropdown icon -->
                <slot name = "suffix">
                    <div v-if = "suffix_slot_raw_html_content" v-html = "suffix_slot_raw_html_content" />
                    <img v-else-if = "suffix" :src = "suffix" />
                    <svg v-else-if = "has_dropdown && !show_dropdown" 
                    :class = "['dropdown-icon']" 
                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M10 17V7L15 12L10 17Z" fill="#434956"/>
                    </svg>
                </slot>
            </div>
        </div>
        <div v-if = "show_divider" :class = "['dropdown-menu-item-divider']"></div>
        

        <div v-if = "show_dropdown" 
        :class = "[
            'dropdown-menu-item-dropdown-wrapper',
            {'web-version': is_web_version},
            {'non-web-version': !is_web_version}
        ]"
        ref = "dropdown_menu_item_dropdown_wrapper"
        :style = "getDropdownPositionData()">
            <!-- web version or first nested dropdown regarding to its own nested dropdown history stack (non-web version) -->
            <DropdownMenu
            :width_type = "dropdown_menu_item_dropdown_width_type"
            :options = "options"
            :with_box_shadow = "is_web_version ? $attrs.with_box_shadow : false"
            :size = "size"
            :dropdown_level = "in_dropdown_level + 1"
            :outest_nested_dropdown_history_stack = "attrs.nested_dropdown_history_stack"
            @select-dropdown-option = "(value, in_dropdown_level) => handleDropdownMenuSelect(value, in_dropdown_level)"
            @add-new-shown-nested-dropdown = "(targert_item_props, trigger) => handleAddNewShownNestedDropdown(targert_item_props, trigger)"
            @remove-shown-nested-dropdown = "(targert_item_props) => handleRemoveShownNestedDropdown(targert_item_props)"
            @update-shown-nested-dropdown = "(targert_item_props) => handleUpdateShownNestedDropdown(targert_item_props)"
            />
        </div>
    </div>
</template>

<script setup>
import { ref, computed, useAttrs, watch } from 'vue';
import DropdownMenu from '@/devOnlyComponents/DropdownMenu.vue';
import { useWindowSize } from '@/composables/useWindowSize.js';

const props = defineProps({
    has_divider:{
        type: Boolean,
        default: false
    },
    prefix:{
        type: String,
        default: ''
    },
    suffix:{
        type: String,
        default: ''
    },
    prefix_slot_raw_html_content:{
        // ?: Optional
        // Priority: prefix slot > prefix slot raw html content prop > prefix prop
        type: String,
        default: ''
    },
    suffix_slot_raw_html_content:{
        // ?: Optional
        // Priority: suffix slot > suffix slot raw html content prop > suffix prop > default dropdown icon
        type: String,
        default: ''
    },
    value:{
        type: String,
        default: ''
    },
    label:{
        type: String,
        default: ''
    },
    in_dropdown_level:{
        type: Number,
        default: 0
    }, 
    size:{
        type: String,
        default: 'small'
    },
    disabled:{
        type: Boolean,
        default: false
    },
    options:{
        // ?: Optional
        // Options structure:
        // [
        //     {
        //         value: String,
        //         label: String,
        //         prefix?: String,
        //         suffix?: String,
        //         prefix_slot_raw_html_content?: String, -> To auto adapt the color change due to interaction state, recommended: inline svg content with currentColor 
        //         suffix_slot_raw_html_content?: String, -> To auto adapt the color change due to interaction state, recommended: inline svg content with currentColor
        //         options?: Array<Option>
        //     }
        // ]
        // where Option:
        // {
        //     value: String,
        //     label: String,
        //     prefix?: String,
        //     suffix?: String,
        //     prefix_slot_raw_html_content?: String,
        //     suffix_slot_raw_html_content?: String,
        //     options?: Array<Option>
        // }
        type: Array,
        default: () => [],
    }
});

const emit = defineEmits([
    'select-dropdown-option',
    'add-new-shown-nested-dropdown',
    'remove-shown-nested-dropdown',
    'update-shown-nested-dropdown',
]);
const dropdown_menu_item = ref(null);
const dropdown_menu_item_dropdown_wrapper = ref(null);
const dropdown_menu_item_dropdown_width_type = ref('fit-content');
const attrs = useAttrs();

const {width} = useWindowSize();

const is_web_version = computed(() => {
    return width.value > 1024;
});
const has_dropdown = computed(() => {
    return props.options?.length > 0;
});
const nested_dropdown_history_stack = computed(() => {
    return attrs.nested_dropdown_history_stack || [];
});
const show_menu_item = computed(() => {
    // if web version: no matter what, always show the menu item
    // if non-web version: 
    // 1. If the current menu item is in the dropdown of the (last nested/root) dropdown, always show the menu item (nested_dropdown_history_stack.value.length == props.in_dropdown_level)
    // e.g. if the menu item is in the root dropdown menu, always show: nested_dropdown_history_stack.value.length == 0
    // e.g. if the menu item is in the first nested dropdown, always show: nested_dropdown_history_stack.value.length == 1
    // 2. only show the menu item if it is the last item in the nested dropdown history stack or if it is the sub-menu item of the last item in the nested dropdown history stack.
    if(is_web_version.value){
        return true;
    }else{
        if(nested_dropdown_history_stack.value.length == 0 || nested_dropdown_history_stack.value.length == props.in_dropdown_level){
            // if the current menu item is in the (last nested/root) dropdown, always show the menu item
            return true;
        }else{
            const last_item_in_nested_dropdown_history_stack = nested_dropdown_history_stack.value[nested_dropdown_history_stack.value.length-1];

            const is_current_menu_item_last_item_in_nested_dropdown_history_stack = (last_item_in_nested_dropdown_history_stack.in_dropdown_level == props.in_dropdown_level 
            && last_item_in_nested_dropdown_history_stack.value == props.value 
            && JSON.stringify(last_item_in_nested_dropdown_history_stack.options) == JSON.stringify(props.options));
            
            return is_current_menu_item_last_item_in_nested_dropdown_history_stack;
        }
    }    
});
const show_dropdown = computed(() => {
    // show dropdown, if the current menu item has dropdown
    // and the item at the corresponding level of the nested dropdown history stack is the same as the current menu item

    if(!has_dropdown.value || props.disabled){
        return false;
    }
    if(nested_dropdown_history_stack.value.length== 0 || nested_dropdown_history_stack.value.length <= props.in_dropdown_level){
        // if the current menu item's in_dropdown_level is greater than the last index of the nested dropdown history stack,
        // it is definitely out of range, so return false
        return false;
    }

    if(nested_dropdown_history_stack.value.length > props.in_dropdown_level){
        const item_at_corresponding_level_of_nested_dropdown_history_stack = nested_dropdown_history_stack.value[props.in_dropdown_level];

        const is_current_menu_item_same_as_item_at_corresponding_level_of_nested_dropdown_history_stack = (item_at_corresponding_level_of_nested_dropdown_history_stack.in_dropdown_level == props.in_dropdown_level 
        && item_at_corresponding_level_of_nested_dropdown_history_stack.value == props.value 
        && JSON.stringify(item_at_corresponding_level_of_nested_dropdown_history_stack.options) == JSON.stringify(props.options));

        return is_current_menu_item_same_as_item_at_corresponding_level_of_nested_dropdown_history_stack;
    }
    return false;
    
});
const show_divider = computed(() => {
    return (props.has_divider && show_menu_item.value) || (!is_web_version.value && show_dropdown.value);
});

const handleClick = () => {
    // When click the current dropdown menu item:
    if(props.disabled){
        return;
    }
    // If it has dropdown:
    if(has_dropdown.value){
        if(is_web_version.value){
            emit('add-new-shown-nested-dropdown', props, 'click');
        }else{
            if(show_dropdown.value){
                emit('remove-shown-nested-dropdown', props);
            }else{
                emit('add-new-shown-nested-dropdown', props, 'click');
            }
        }        
    }else{
    // else emit select-dropdown-option event to notice parent component which option is selected and close the dropdown
        emit('select-dropdown-option', props.value, props.in_dropdown_level);
    }
}
const handleMouseEnter = () => {
    if(props.disabled){
        return;
    }
    // if web version, show the dropdown
    if(is_web_version.value){
        if(has_dropdown.value){
            emit('add-new-shown-nested-dropdown', props, 'hover');
        }else{
            // trigger when hover an option without dropdown in web version
            // For the event, the parent DropdownMenu.vue will clear the nested dropdown history stack after the clicked dropdown level index
            // BUT WON'T ADD this option to the nested dropdown history stack
            emit('update-shown-nested-dropdown', props);
        }
    }
}
const getDropdownPositionData = () => {
    var style_output = {};

    if(is_web_version.value){
        // if menu item's right has enough space, show the dropdown on the right
        // else show the dropdown on the left
        if(dropdown_menu_item.value && dropdown_menu_item_dropdown_wrapper.value){
            const menu_item_right_edge_to_window_right_edge = window.innerWidth - dropdown_menu_item.value.getBoundingClientRect().right;
            const menu_item_left_edge_to_window_left_edge = dropdown_menu_item.value.getBoundingClientRect().left;
            const dropdown_width = dropdown_menu_item_dropdown_wrapper.value.offsetWidth;

            if(menu_item_right_edge_to_window_right_edge > dropdown_width + 4){
                // Show at right
                style_output.left = 'calc(100% + 4px)';
                // Set the width to fit-content since the available space is enough to fit the original width of the nested dropdown menu 
                style_output.width = 'fit-content';
                // Set the width type to fit-content, since we don't want the text inside the dropdown menu item to be wrapped to multiple lines while the space is enough
                dropdown_menu_item_dropdown_width_type.value = 'fit-content';
            }else if(menu_item_left_edge_to_window_left_edge > dropdown_width + 4){
                // Show at left
                style_output.right = 'calc(100% + 4px)';
                // Set the width to fit-content since the available space is enough to fit the original width of the nested dropdown menu 
                style_output.width = 'fit-content';
                // Set the width type to fit-content, since we don't want the text inside the dropdown menu item to be wrapped to multiple lines while the space is enough
                dropdown_menu_item_dropdown_width_type.value = 'fit-content';
            }else{
                // Both sides are not enough space, pick the side with more space
                const horizontal_available_space = Math.max(menu_item_right_edge_to_window_right_edge, menu_item_left_edge_to_window_left_edge);
                if(horizontal_available_space === menu_item_right_edge_to_window_right_edge){
                    // Show at right
                    style_output.left = 'calc(100% + 4px)';
                }else{
                    // Show at left
                    style_output.right = 'calc(100% + 4px)';
                }
                // Set the width to the available space minus 15px for leaving space from the window edge
                style_output.width = (horizontal_available_space - 15) + 'px';
                // Set the width type to fill-whole since the text inside the dropdown menu item might be wrapped to multiple lines
                dropdown_menu_item_dropdown_width_type.value = 'fill-whole';
            }

            const menu_item_top_edge_to_window_bottom_edge = window.innerHeight - dropdown_menu_item.value.getBoundingClientRect().top;
            const menu_item_bottom_edge_to_window_top_edge = dropdown_menu_item.value.getBoundingClientRect().bottom;
            const dropdown_height = dropdown_menu_item_dropdown_wrapper.value.offsetHeight;

            if(menu_item_top_edge_to_window_bottom_edge > dropdown_height){
                style_output.top = '0px';
            }else if(menu_item_bottom_edge_to_window_top_edge > dropdown_height){
                style_output.bottom = show_divider.value ? '17px' : '0px';
            }else{
                const vertical_available_space = Math.max(menu_item_top_edge_to_window_bottom_edge, menu_item_bottom_edge_to_window_top_edge);
                if(vertical_available_space === menu_item_top_edge_to_window_bottom_edge){
                    style_output.top = '0px';
                }else{
                    style_output.bottom = show_divider.value ? '17px' : '0px';
                }
            }
        
        }
    }else{
        // Non-web version
        style_output.width = '100%';
        dropdown_menu_item_dropdown_width_type.value = 'fill-whole';
    }
    return style_output;
}
const handleDropdownMenuSelect = (value, in_dropdown_level) => {
    emit('select-dropdown-option', value, in_dropdown_level);
}
const handleAddNewShownNestedDropdown = (target_item_props, trigger) => {
    emit('add-new-shown-nested-dropdown', target_item_props, trigger);
}
const handleRemoveShownNestedDropdown = (target_item_props) => {
    emit('remove-shown-nested-dropdown', target_item_props);
}
const handleUpdateShownNestedDropdown = (target_item_props) => {
    emit('update-shown-nested-dropdown', target_item_props);
}
</script>

<style scoped>
.dropdown-menu-item-wrapper{
    position: relative;
}
.dropdown-menu-item{
    height: fit-content;

    display: flex;
    align-items: center;
    column-gap: 12px;
    justify-content: space-between;
    background: transparent;

    color: #17181C;
    font-family: Roboto;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px; 
    letter-spacing: 0.5px;  
    cursor: pointer; 
}
.small .dropdown-menu-item{
    min-height: 40px;
    height: fit-content;
    padding: 8px 12px;
}
.medium .dropdown-menu-item{
    min-height: 48px;
    height: fit-content;
    padding: 12px 12px;
}
.large .dropdown-menu-item{
    min-height: 56px;
    height: fit-content;
    padding: 16px 12px;
}

.dropdown-menu-item:hover{
    background: var(--State-Layers-On-Surface-Opacity-08, rgba(23, 24, 28, 0.08));
    color: #2E466B;
}
.dropdown-menu-item.focus{
    background: var(--State-Layers-On-Surface-Opacity-10, rgba(23, 24, 28, 0.10));
    color: #2E466B;
}
.dropdown-menu-item:active{
    background: var(--Schemes-Secondary-Container, #DBE3F0);
    color: #2E466B;
}
.dropdown-menu-item.disabled{
    color: var(--disabled-color--) !important;
    cursor: not-allowed !important;
}
.dropdown-menu-item.disabled:hover{
    color: var(--disabled-color--) !important;
    cursor: not-allowed !important;
}
.dropdown-menu-item-content{
    display: flex;
    align-items: center;
    column-gap: 12px;
    white-space: nowrap;
}
.prefix-wrapper{
    color: #434956;
    width: 24px;
    height: 24px;
}
.disabled .prefix-wrapper{
    color: var(--disabled-color--) !important;
}
.suffix-wrapper{
    color: #434956;
    width: 24px;
    height: 24px;
}
.disabled .suffix-wrapper{
    color: var(--disabled-color--) !important;
}
.prefix-wrapper > img{
    width: 100%;
    height: 100%;
}
.suffix-wrapper > img{
    width:100%;
    height: 100%;
}
.dropdown-icon{
    width: 100%;
    height: 100%;

    transform: rotate(0deg);
    transition: all 0.3s;
}
.rotate-180{
    transform: rotate(180deg);
}
.dropdown-menu-item-dropdown-wrapper{
    min-width: 90px;
}
.dropdown-menu-item-dropdown-wrapper.web-version{
    position: absolute;
    z-index: 999;
}
.dropdown-menu-item-divider{
    padding:8px 0px;
    box-sizing: border-box;
}
.dropdown-menu-item-divider:after{
    content: '';
    display: block;
    width: 100%;
    height: 1px;
    background: var(--Schemes-Outline-Variant, #C6CAD2);
}
</style>
