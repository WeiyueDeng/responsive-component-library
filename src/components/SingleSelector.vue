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
                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                            <path d="M5.33333 12.5L8.33333 9.5L11.3333 12.5L12.5 11.3333L9.5 8.33333L12.5 5.33333L11.3333 4.16667L8.33333 7.16667L5.33333 4.16667L4.16667 5.33333L7.16667 8.33333L4.16667 11.3333L5.33333 12.5ZM8.33333 16.6667C7.18056 16.6667 6.09722 16.4479 5.08333 16.0104C4.06944 15.5729 3.1875 14.9792 2.4375 14.2292C1.6875 13.4792 1.09375 12.5972 0.65625 11.5833C0.21875 10.5694 0 9.48611 0 8.33333C0 7.18056 0.21875 6.09722 0.65625 5.08333C1.09375 4.06944 1.6875 3.1875 2.4375 2.4375C3.1875 1.6875 4.06944 1.09375 5.08333 0.65625C6.09722 0.21875 7.18056 0 8.33333 0C9.48611 0 10.5694 0.21875 11.5833 0.65625C12.5972 1.09375 13.4792 1.6875 14.2292 2.4375C14.9792 3.1875 15.5729 4.06944 16.0104 5.08333C16.4479 6.09722 16.6667 7.18056 16.6667 8.33333C16.6667 9.48611 16.4479 10.5694 16.0104 11.5833C15.5729 12.5972 14.9792 13.4792 14.2292 14.2292C13.4792 14.9792 12.5972 15.5729 11.5833 16.0104C10.5694 16.4479 9.48611 16.6667 8.33333 16.6667ZM8.33333 15C10.1944 15 11.7708 14.3542 13.0625 13.0625C14.3542 11.7708 15 10.1944 15 8.33333C15 6.47222 14.3542 4.89583 13.0625 3.60417C11.7708 2.3125 10.1944 1.66667 8.33333 1.66667C6.47222 1.66667 4.89583 2.3125 3.60417 3.60417C2.3125 4.89583 1.66667 6.47222 1.66667 8.33333C1.66667 10.1944 2.3125 11.7708 3.60417 13.0625C4.89583 14.3542 6.47222 15 8.33333 15Z" fill="currentColor"/>
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
                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                            <path d="M8.33333 12.5C8.56944 12.5 8.76736 12.4201 8.92708 12.2604C9.08681 12.1007 9.16667 11.9028 9.16667 11.6667C9.16667 11.4306 9.08681 11.2326 8.92708 11.0729C8.76736 10.9132 8.56944 10.8333 8.33333 10.8333C8.09722 10.8333 7.89931 10.9132 7.73958 11.0729C7.57986 11.2326 7.5 11.4306 7.5 11.6667C7.5 11.9028 7.57986 12.1007 7.73958 12.2604C7.89931 12.4201 8.09722 12.5 8.33333 12.5ZM7.5 9.16667H9.16667V4.16667H7.5V9.16667ZM8.33333 16.6667C7.18056 16.6667 6.09722 16.4479 5.08333 16.0104C4.06944 15.5729 3.1875 14.9792 2.4375 14.2292C1.6875 13.4792 1.09375 12.5972 0.65625 11.5833C0.21875 10.5694 0 9.48611 0 8.33333C0 7.18056 0.21875 6.09722 0.65625 5.08333C1.09375 4.06944 1.6875 3.1875 2.4375 2.4375C3.1875 1.6875 4.06944 1.09375 5.08333 0.65625C6.09722 0.21875 7.18056 0 8.33333 0C9.48611 0 10.5694 0.21875 11.5833 0.65625C12.5972 1.09375 13.4792 1.6875 14.2292 2.4375C14.9792 3.1875 15.5729 4.06944 16.0104 5.08333C16.4479 6.09722 16.6667 7.18056 16.6667 8.33333C16.6667 9.48611 16.4479 10.5694 16.0104 11.5833C15.5729 12.5972 14.9792 13.4792 14.2292 14.2292C13.4792 14.9792 12.5972 15.5729 11.5833 16.0104C10.5694 16.4479 9.48611 16.6667 8.33333 16.6667Z" fill="currentColor"/>
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
    height: 48px;
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

    /* max-height: 300px;
    overflow: auto; */

    position: absolute;
    z-index: 1000;
    top: 100%;
    left: 0px;
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
        height: 48px;
    }
}
</style>