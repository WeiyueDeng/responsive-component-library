<template>
    <div :class = "[
    'single-selector-unit-wrapper',
    theme_type,
    label_type,
    {'disabled':disabled},
    ]"
    :style = "{
        '--input-box-border-color--': regular_border_color,
        '--input-box-border-width--': border_width_in_box_shadow,
        '--input-box-background-color--': background_color,
        //    caret color is the same as the border color
        '--caret-color--': regular_border_color,
        '--inside-label-color--': inside_label_color,
    }">
        <!-- outside label part -->
        <div v-if = "label && label_type == 'outside'" class = "label-outside">
            <span class = "label-text">{{ label }}</span> <span v-if = "required" class = "required-icon">*</span>
        </div>
        <!-- outside label part end -->

        <div ref = "single_selector"
        :class = "[
            'single-selector',
            {'error':show_error},
            {'alert':show_alert},
            {'disabled':disabled},
            {'is-focus':is_focus},
            {'has-prefix': has_prefix},
            {'has-suffix': has_suffix},
            {'show-clear-icon':show_clear_icon},
        ]" 
        @click = "handleClickSingleSelector"
        @mouseenter="hovered = true"
        @mouseleave="hovered = false">
            <!-- prefix part -->
            <div v-if = "$slots.prefix" 
            class = "prefix-wrapper"
            ref = "prefix_wrapper">
                <DynamicColorResponsiveButton
                :has_interaction_effect = "false"
                button_type = "text"
                :customized_theme_color = "regular_inline_svg_icon_color"
                width_type = "fit-content"
                :disabled = "disabled"
                >
                    <template #prefix>
                        <!-- recommended: inline svg with currentColor, the color will inherit from the parent -->
                        <slot name = "prefix"></slot>
                    </template>
                </DynamicColorResponsiveButton>
            </div>
            <!-- prefix part end -->

            <div class = "selected-content-wrapper">
                <!-- inside label part -->
                <div v-if = "label && label_type == 'inside'" class = "label-inside">
                    <span class = "label-text">{{ label }}</span> <span v-if = "required" class = "required-icon">*</span>
                </div>
                <!-- inside label part end -->

                <!-- show selected item / type filter_keyword part -->
                <div
                :class = "[
                    'selected-content',
                    selected_item ? 'content-text':'placeholder',
                ]">
                    <span :class = "[{'hide':is_focus && filterable}]">{{ selected_item ? selected_item_label : placeholder }}</span>
                    <input :class = "['filter-input',{'hide':!(is_focus && filterable)}]" ref = "filter_input" v-model = "filter_keyword"/>
                </div>
                <!-- show selected item / type filter_keyword part end-->
            </div>

            <!-- suffix part -->
            <div :class = "[
                'suffix-wrapper',
            ]"
            ref = "suffix_wrapper">
                <!-- clear icon part -->
                <DynamicColorResponsiveButton
                v-if = "show_clear_icon" 
                button_type = "text"
                :customized_theme_color = "regular_inline_svg_icon_color"
                width_type = "fit-content"
                :disabled = "disabled"
                @click="handleClearValue"
                >
                    <template #prefix>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M6.4 15L10 11.4L13.6 15L15 13.6L11.4 10L15 6.4L13.6 5L10 8.6L6.4 5L5 6.4L8.6 10L5 13.6L6.4 15ZM10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.3125 6.1 0.7875C7.31667 0.2625 8.61667 0 10 0C11.3833 0 12.6833 0.2625 13.9 0.7875C15.1167 1.3125 16.175 2.025 17.075 2.925C17.975 3.825 18.6875 4.88333 19.2125 6.1C19.7375 7.31667 20 8.61667 20 10C20 11.3833 19.7375 12.6833 19.2125 13.9C18.6875 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6875 13.9 19.2125C12.6833 19.7375 11.3833 20 10 20ZM10 18C12.2333 18 14.125 17.225 15.675 15.675C17.225 14.125 18 12.2333 18 10C18 7.76667 17.225 5.875 15.675 4.325C14.125 2.775 12.2333 2 10 2C7.76667 2 5.875 2.775 4.325 4.325C2.775 5.875 2 7.76667 2 10C2 12.2333 2.775 14.125 4.325 15.675C5.875 17.225 7.76667 18 10 18Z" fill="currentColor"/>
                        </svg>
                    </template>
                </DynamicColorResponsiveButton>
                <!-- clear icon part end -->

                <!-- error icon part -->
                <DynamicColorResponsiveButton
                v-else-if = "show_error"
                :has_interaction_effect = "false"
                button_type = "text"
                :customized_theme_color = "'var(--semantic-error-color--)'"
                width_type = "fit-content"
                :disabled = "disabled"
                >
                    <template #prefix>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M10 15C10.2833 15 10.5208 14.9042 10.7125 14.7125C10.9042 14.5208 11 14.2833 11 14C11 13.7167 10.9042 13.4792 10.7125 13.2875C10.5208 13.0958 10.2833 13 10 13C9.71667 13 9.47917 13.0958 9.2875 13.2875C9.09583 13.4792 9 13.7167 9 14C9 14.2833 9.09583 14.5208 9.2875 14.7125C9.47917 14.9042 9.71667 15 10 15ZM9 11H11V5H9V11ZM10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.3125 6.1 0.7875C7.31667 0.2625 8.61667 0 10 0C11.3833 0 12.6833 0.2625 13.9 0.7875C15.1167 1.3125 16.175 2.025 17.075 2.925C17.975 3.825 18.6875 4.88333 19.2125 6.1C19.7375 7.31667 20 8.61667 20 10C20 11.3833 19.7375 12.6833 19.2125 13.9C18.6875 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6875 13.9 19.2125C12.6833 19.7375 11.3833 20 10 20Z" fill="currentColor"/>
                        </svg>
                    </template>
                </DynamicColorResponsiveButton>
                <!-- error icon part end -->

                <!-- alert icon part -->
                <DynamicColorResponsiveButton
                v-else-if = "show_alert"
                :has_interaction_effect = "false"
                button_type = "text"
                :customized_theme_color = "'var(--semantic-alert-color--)'"
                width_type = "fit-content"
                :disabled = "disabled"
                >
                    <template #prefix>
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="19" viewBox="0 0 22 19" fill="none">
                            <path d="M0 19L11 0L22 19H0ZM3.45 17H18.55L11 4L3.45 17ZM11 16C11.2833 16 11.5208 15.9042 11.7125 15.7125C11.9042 15.5208 12 15.2833 12 15C12 14.7167 11.9042 14.4792 11.7125 14.2875C11.5208 14.0958 11.2833 14 11 14C10.7167 14 10.4792 14.0958 10.2875 14.2875C10.0958 14.4792 10 14.7167 10 15C10 15.2833 10.0958 15.5208 10.2875 15.7125C10.4792 15.9042 10.7167 16 11 16ZM10 13H12V8H10V13Z" fill="currentColor"/>
                        </svg>
                    </template>
                </DynamicColorResponsiveButton>
                <!-- alert icon part end -->

                <!--  customized suffix icon(s) part -->
                <DynamicColorResponsiveButton
                :has_interaction_effect = "false"
                button_type = "text"
                :customized_theme_color = "regular_inline_svg_icon_color"
                width_type = "fit-content"
                :disabled = "disabled"
                >
                    <template #prefix>
                        <!-- recommended: inline svg with currentColor, the color will inherit from the parent -->
                        <slot name = "suffix">
                            <!-- default dropdown arrow part  -->
                            <svg :class = "['rotate-0',{'rotate-180':is_focus && !disabled}]" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 11.2L14.6 6.6L16 8L10 14L4 8L5.4 6.6L10 11.2Z" fill="currentColor"/>
                            </svg>
                            <!-- default dropdown arrow part end -->
                        </slot>
                    </template>
                </DynamicColorResponsiveButton>
                <!-- customized suffix icon(s) part end -->
            </div>
            <!-- suffix part end -->
        </div>

        <!--selector dropdown part -->
        <DropdownMenu
        class = "single-selector-dropdown"
        v-if = "is_focus && options_shown && options_shown.length>0"
        :is_loading = "is_loading"
        :loading_text = "loading_text"
        :no_data_text = "no_data_text"
        :options = "options_shown"
        size = "medium"
        :with_box_shadow = "true"
        width_type = "fill-whole"
        @click-outside-dropdown-menu = "handleClickOutsideDropdownMenu"
        @select-dropdown-option = "(value, label, in_dropdown_level) => handleSelectDropdownOption(value, label, in_dropdown_level)"
        />
        <DropdownMenu
        class = "single-selector-dropdown"
        v-else-if = "is_focus"
        :is_loading = "is_loading"
        :loading_text = "loading_text"
        :no_data_text = "no_data_text"
        :options = "options_shown"
        size = "medium"
        :with_box_shadow = "true"
        width_type = "fill-whole"
        @click-outside-dropdown-menu = "handleClickOutsideDropdownMenu"
        @select-dropdown-option = "(value, label, in_dropdown_level) => handleSelectDropdownOption(value, label, in_dropdown_level)"
        />
        <!--selector dropdown part end -->

        <!-- message notification part -->
        <div v-if = "$slots.supportingText || ((show_alert || show_error) && message_notification_text)" 
        :class = "[
            'message-container'
        ]">
            <div v-if = "$slots.supportingText" 
            class = "customized-supporting-text">
                <slot name = "supportingText"></slot>
            </div>
            <div :class = "[
                {'error': show_error},
                {'alert': show_alert}
            ]">
                {{ message_notification_text }}
            </div>
        </div>
        <!-- message notification part end -->
    </div>
</template>

<script>
import { ref } from 'vue';

import DynamicColorResponsiveButton from '@/components/DynamicColorResponsiveButton.vue';
import DropdownMenu from '@/components/DropdownMenu.vue';

export default{
    components:{
        DynamicColorResponsiveButton,
        DropdownMenu
    },
    setup(){
        const prefix_wrapper = ref(null);
        const suffix_wrapper = ref(null);
        const filter_input = ref(null);
        const single_selector = ref(null);
        return {
            prefix_wrapper,
            suffix_wrapper, 
            filter_input,
            single_selector,
        }
    },
    props:{
        modelValue:{
            type: [String, Number, Boolean, Object, Array],
            default:''
        },
        label:{
            type: String,
            default: ""
        },
        label_type:{
            type: String,
            // ENUM: inside, outside
            // NOTES: 
            // 1. inside: the label will be inside the input box
            // 2. outside: the label will be outside the input box
            default: "outside"
        },            
        theme_type:{
            type: String,
            // ENUM: filled, outlined
            default: "outlined"
        },
        customized_theme_color:{
            type: String,
            default: ""
        },
        required:{
            type: Boolean,
            default: false
        },
        options:{
            // structure: [{value: string | number | boolean | object, label: string}]
            type:Array,
            default:()=>[],
        },
        filterable:{
            type:Boolean,
            default:false,
        },
        remote_search:{
            type:Boolean,
            default:false,
        },
        disabled:{
            type:Boolean,
            default:false,
        },
        placeholder:{
            type:String,
            default:'Select',
        },
        clearable:{
            type:Boolean,
            default:false,
        },
        loading:{
            type:Boolean,
            default:false,
        },
        loading_text:{
            type:String,
            default:"Loading",
        },
        no_data_text:{
            type:String,
            default:"No data",
        },
        // NOTES: filter_only_among_options_value and filter_only_among_options_label cannot be true at the same time
        // NOTES: If both true, filter_only_among_options_value==true will override filter_only_among_options_label's logic
        filter_only_among_options_value:{
            type:Boolean,
            default:false,
        },
        filter_only_among_options_label:{
            type:Boolean,
            default:false,
        }
    },
    // mounted(){
    //     document.addEventListener('click', (e)=>this.closeWhenClickOutsideSelector(e));
    // },
    // unmounted(){
    //     document.removeEventListener('click', (e)=>this.closeWhenClickOutsideSelector(e));
    // },
    data(){
        return {
            selected_item: this.modelValue,
            selected_item_label: this.findCorrespondingLabelViaValue(this.modelValue),
            filter_keyword:'',
            is_focus:false,
            hovered:false,
            show_error:false,
            show_alert:false,
            message_notification_text:'',
            is_loading:this.loading,
        }
    },
    computed:{
        regular_inline_svg_icon_color(){
            if(this.disabled){
                return 'var(--disabled-color--)';
            }
            return '#434956';
        },
        regular_border_color(){
            if(this.disabled){
                return 'var(--disabled-color--)';
            }else if(this.show_error){
                return 'var(--semantic-error-color--)';
            }else if(this.show_alert){
                return 'var(--semantic-alert-color--)';
            }else if(this.is_focus){
                return this.customized_theme_color || 'var(--Schemes-primary)';
            }else if (this.hovered){
                return '#17181C';
            }
            return '#434956';
        },
        border_width_in_box_shadow(){
            if(this.is_focus){
                return this.theme_type == 'filled' ? '-3px' : '3px';
            }
            return this.theme_type == 'filled' ? '-1px' : '1px';
        },
        background_color(){
            if(this.theme_type == 'outlined'){
               return 'transparent';
            }

            if(this.disabled){
                return 'var(--disabled-button-background-color--)';
            }else if(this.is_focus){
                return 'color-mix(in srgb, #EEEFF1, rgb(23, 24, 28) 10%)';
            }else if(this.hovered){
                return 'color-mix(in srgb, #EEEFF1, rgb(23, 24, 28) 8%)';
            }
            return '#EEEFF1';
        },
        inside_label_color(){
            if(this.disabled){
                return 'var(--disabled-color--)';
            }else if(this.show_error){
                return 'var(--semantic-error-color--)';
            }else if(this.show_alert){
                return 'var(--semantic-alert-color--)';
            }else if(this.is_focus){
                return this.customized_theme_color || 'var(--Schemes-primary)';
            }
            return '#434956';
        },
        has_prefix(){
            return this.prefix_wrapper;
        },
        has_suffix(){
            return this.suffix_wrapper;
        },
        options_shown(){
            //if not remote_search: directly filter options according to filter_keyword
            if(!this.remote_search){
                //if has filter_keyword: directly filter here.
                if(this.filter_keyword){
                    this.is_loading = true;
                    const filtered_options = this.options.filter((item)=>{
                        //if selected_item is in the options, mark it as selected
                        if(item.value == this.selected_item && item.label == this.selected_item_label){
                            item.is_selected = true;
                        }else{
                            delete item.is_selected;
                        }

                        if(this.filter_only_among_options_value){
                            return JSON.stringify(item.value).toLowerCase().includes(this.filter_keyword.toLowerCase());
                        }else if(this.filter_only_among_options_label){
                            return JSON.stringify(item.label).toLowerCase().includes(this.filter_keyword.toLowerCase());
                        }else{
                            //return true, if the option's value or label includes the filter_keyword
                            return JSON.stringify(item.value).toLowerCase().includes(this.filter_keyword.toLowerCase())
                            ||
                            JSON.stringify(item.label).toLowerCase().includes(this.filter_keyword.toLowerCase());
                        }
                    });
                    this.is_loading = false;
                    return filtered_options;
                }else{
                //if no filter_keyword: directly return this.options
                    return this.options.map((item)=>{
                        //if selected_item is in the options, mark it as selected
                        if(item.value == this.selected_item && item.label == this.selected_item_label){
                            item.is_selected = true;
                        }else{
                            delete item.is_selected;
                        }
                        return item;
                    });
                }
            }else{
            //if use remote_search: users will filter options outside the component via @remote-search
            //so directly return this.options;
                return this.options.map((item)=>{
                    //if selected_item is in the options, mark it as selected
                    if(item.value == this.selected_item && item.label == this.selected_item_label){
                        item.is_selected = true;
                    }else{
                        delete item.is_selected;
                    }
                    return item;
                });
            }
        },
        show_clear_icon(){
            //both pre-requisite: clearable and has a selected_item and not disabled
            //for web and non-web: focus/hover show clear icon 
            //(but no hover effect for non-web(tablet and mobile), so ingore hover for non-web version)
            return this.clearable && this.selected_item && !this.disabled && (this.hovered || this.is_focus);
            // return this.clearable && this.selected_item && !this.disabled && ((this.web_version && this.hovered) || !this.web_version);
        }
    },
    emits:[
        'update:modelValue',
        'change',
        'remote-search',
        'filter-change',
        'visible-change',
        'focus',
        'blur',
        'clear',
    ],
    watch:{
        modelValue(newVal){
            // console.log('single selector modelValue change', newVal);
            this.selected_item = newVal;
        },
        selected_item(newVal){
            // console.log('single selector value change', newVal);
            this.$emit('update:modelValue', newVal);
            this.$emit('change', newVal);
            this.selected_item_label = this.findCorrespondingLabelViaValue(newVal);
            this.filter_keyword = '';
        },
        filter_keyword(newVal){
            this.$emit('filter-change', newVal);
            if(this.remote_search){
                this.$emit('remote-search', newVal);
            }
        },
        is_focus(newVal){
            // console.log('is_focus change', newVal);
            //pass dropdown visibility to parent
            this.$emit('visible-change', newVal);
            //pass focus and blur event to parent
            if(newVal){
                this.$emit('focus');
                if(this.filterable){
                    this.$nextTick(()=>{
                        this.filter_input?.focus();
                    })
                }
                // //check overflow to set padding
                // this.$nextTick(()=>{
                //     this.checkWhetherDropdownIsOverflow();
                // })
            }else{
                this.filter_keyword = '';
                this.$emit('blur');
            }
        },
        loading(newVal){
            this.is_loading = newVal;
        }
    },
    methods:{
        handleClickOutsideDropdownMenu(e){
            if(this.single_selector && !this.single_selector.contains(e.target)) {
                e.stopPropagation();
                this.is_focus = false;
            }
        },
        handleSelectDropdownOption(value, label, in_dropdown_level){
            this.selected_item = value;
            this.selected_item_label = label;
            // blur after assigning selected option's value in next tick
            // to avoid the blur event being triggered before the value is updated
            this.$nextTick(() =>{
                this.is_focus = false;
            });
        },
        // checkWhetherDropdownIsOverflow(){
        //     // if(this.$refs['single-selector-dropdown'].scrollHeight > this.$refs['single-selector-dropdown'].clientHeight){
        //     //     this.$refs['single-selector-dropdown'].style.padding = "8px 1px 8px 8px";
        //     // }else{
        //     //     this.$refs['single-selector-dropdown'].style.padding = "8px";
        //     // }
        // },
        findCorrespondingLabelViaValue(value){
            //if not find the corresponding label, return the value itself
            var output = value;
            for(const item of this.options){
                if(JSON.stringify(item.value) == JSON.stringify(value)){
                    output = item.label;
                }
                // console.log('item.value == value',item, value, item.value == value);
            }
            return output;
        },
        handleClickSingleSelector(){
            // console.log('handleClickSingleSelector');
            if(!this.disabled){
                this.is_focus=!this.is_focus;
            }
        },
        handleSelectOption(e, item){
            e.stopPropagation();
            // console.log('handleSelectOption',item);
            this.selected_item = item.value;
            this.selected_item_label = item.label;
            // blur after assigning selected option's value in next tick
            // to avoid the blur event being triggered before the value is updated
            this.$nextTick(() =>{
                this.is_focus = false;
            });
        },
        // closeWhenClickOutsideSelector(e){
        //     // console.log('closeWhenClickOutsideSelector', e.target,this.$refs['single-selector'].contains(e.target));
        //     // const normalizedTarget = e.target.nodeType === Node.TEXT_NODE ? e.target.parentElement : e.target;
        //     if(this.is_focus && this.$refs['single-selector'] && !this.$refs['single-selector'].contains(e.target)) {
        //         this.is_focus = false;
        //     }
        // },
        checkWhetherIsSelected(item){
            if(item.value == this.selected_item){
                return true;
            }
        },
        handleClearValue(e){
            e.stopPropagation();
            this.selected_item = "";
            this.$emit('clear');
        },
        // Define a method you want to expose
        focus(){
            //focus selector manually
            //if has filter feature: auto focus filter input as well
            if(!this.disabled){
                // if(this.filterable){
                //     this.$refs['filter-input']?.focus();
                // }
                this.is_focus = true;
            }
        },
        blur(){
            //blur selector manually
            //if has filter feature: auto blur filter input as well
            if(this.filterable){
                this.filter_input?.blur();
            }
            this.is_focus = false;
        },
        alert(message){
            //close all other notification type: set all other notification type to be false
            this.show_error = false;
            //tell component the current notification type is error
            this.show_alert = true;
            this.message_notification_text = message;
        },
        error(message){
            //close all other notification type: set all other notification type to be false
            this.show_alert = false;
            //tell component the current notification type is error
            this.show_error = true;
            this.message_notification_text = message;
        },
        removeAlertOrErrorEffect(){
            this.show_alert = false;
            this.show_error = false;
            this.message_notification_text = '';
        },
        setDropdownContentLoading(val){
            this.is_loading = val;
        },
    },
    expose:['focus','blur','alert','error','removeAlertOrErrorEffect','setDropdownContentLoading'],
}
</script>

<style scoped>
.dropdown{
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 999;
}
.single-selector-unit-wrapper{
    width: 100%;
    display: flex;
    flex-direction: column;
    row-gap: 4px;

    position: relative;
}
.label-outside{
    width:100%;
}
.label-outside .label-text{
    color: #434956;
    /* M3/body/large */
    font-family: Roboto;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px; /* 150% */
    letter-spacing: 0.5px;
}
.label-outside .required-icon{
    color: var(--semantic-error-color--);
    font-family: Roboto;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0.5px;
}
.single-selector{
    height: 44px;
    width: 100%;
    box-sizing: border-box;
    padding: 0px 16px;

    display: flex;
    align-items: center;
    justify-content: space-between;
    column-gap: 4px;

    cursor: pointer;
}
.single-selector.has-prefix{
    padding-left: 0px;
}
.single-selector.has-suffix{
    padding-right: 0px;
}
.filled .single-selector{
    background: var(--input-box-background-color--);
    border-radius: 4px 4px 0px 0px;
    box-shadow: inset 0 var(--input-box-border-width--) 0 var(--input-box-border-color--);
}
.outlined .single-selector{
    border-radius: 4px;
    box-shadow: inset 0 0 0 var(--input-box-border-width--) var(--input-box-border-color--);
}
.single-selector.disabled{
    cursor: not-allowed;
}
.filled .single-selector.disabled{
    background: var(--disabled-button-background-color--);
}
.selected-content-wrapper{
    flex: 1;
    padding:4px 0px;
}
.label-inside{
    width:fit-content; 
}
.outlined .label-inside{
    padding: 0px 4px;
    background: #F9F9FA;

    position: absolute;
    top: -8px;
    left: 16px;
    z-index: 1;
}
.label-inside .label-text{
    color: var(--inside-label-color--);
    /* M3/body/small */
    font-family: Roboto;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px; /* 133.333% */
    letter-spacing: 0.4px;
}
.label-inside .required-icon{
    color: var(--semantic-error-color--);
    font-family: Roboto;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
    letter-spacing: 0.4px;
}
.disabled .label-inside .required-icon{
    color: var(--disabled-color--);
}
.selected-content{
    width:100%;
    
    font-family: 'Roboto';
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0.5px;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.hide{
    display: none;
}
.selected-content.content-text{
    color: #17181C;
}
.disabled .selected-content.content-text{
    color: var(--disabled-color--);
}
.selected-content.placeholder{
    color: var(--disabled-color--);
}

.filter-input {
    width:100%;
    background: transparent;
    border: none;
    outline: none; /* Removes the default focus outline */
    color: #17181C;
    font-family: 'Roboto';
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0.5px;
    height: 24px;
    padding:0px;
    caret-color: var(--caret-color--);
}
.prefix-wrapper{
    flex-shrink:0;

    display: flex;
    align-items: center;

    width:fit-content;
    height: fit-content;
}
.suffix-wrapper{
    flex-shrink:0;

    display: flex;
    align-items: center;

    width:fit-content;
    height: fit-content;
}
.rotate-0{
    transform: rotate(0deg);
    transition: all 0.3s;
}
.rotate-180{
    transform: rotate(180deg);
}
.single-selector-dropdown{
    width: 100%;
    height: fit-content;
    box-sizing: border-box;

    max-height: 400px;
    overflow-y: hidden;

    position: absolute;
    z-index: 1000;
    top: 100%;
    left: 0px;
}
.single-selector-dropdown:hover{
    overflow-y: auto;
}
.single-selector-dropdown::-webkit-scrollbar{
    width: 12px;
}
.single-selector-dropdown::-webkit-scrollbar-track{
    background: transparent;
    margin-top: 4px;
    margin-bottom: 4px;
}
.single-selector-dropdown::-webkit-scrollbar-thumb{
    background: #79747E;
    border-radius: 100px;
    border: 4px solid #EEEFF1; 
}
.single-selector-dropdown.no-data{
    padding: 8px 12px;
    border-radius: 4px;
    background: #EEEFF1;
    min-width: 90px;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.30), 0 2px 6px 2px rgba(0, 0, 0, 0.15);
}
.message-container{
    width:100%;
    box-sizing: border-box;
    padding: 0px 16px;

    font-family: Roboto;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px; /* 133.333% */
    letter-spacing: 0.4px;
}
.disabled .message-container{
    color: var(--disabled-color--) !important;
}
.message-container .customized-supporting-text{
    color: #434956;
}
.message-container .error{
    color: var(--semantic-error-color--);
}
.message-container .alert{
    color: var(--semantic-alert-color--);
}
@media only screen and (max-width:767px){
    .single-selector{
        height: 44px;
    }
}
</style>