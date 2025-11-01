<template>
    <div :class = "[
        'input-box-unit-wrapper',
        theme_type,
        label_type,
        {'disabled': disabled},
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
        
        <div :class = "[
            'input-box-unit',
            {'is-focus': is_focus},
            {'has-prefix': has_prefix},
            {'has-suffix': has_suffix},
            {'disabled': disabled},
            {'error': show_error},
            {'alert': show_alert},
        ]" 
        ref = "input-box-unit"
        @mouseenter="hovered = true"
        @mouseleave="hovered = false"
        @click = "handleClickInputBoxUnit($event)">
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

            <div class = "input-box-wrapper">
                <!-- inside label part -->
                <div v-if = "label && label_type == 'inside'" class = "label-inside">
                    <span class = "label-text">{{ label }}</span> <span v-if = "required" class = "required-icon">*</span>
                </div>
                <!-- inside label part end -->

                <!-- input box part -->
                <input v-model = "value"
                :class = "[
                    'input-box',
                ]" 
                ref = "input-box"
                :disabled = "disabled"
                :type="type" :placeholder="placeholder"
                :autocomplete = "autocomplete"
                @keydown = "handleKeydown($event)">
                <!-- input box part end -->
            </div>
            

            <!-- suffix part -->
            <div v-if = "$slots.suffix || show_clear_icon || show_alert || show_error"
            ref = "suffix_wrapper"
            :class = "[
                'suffix-wrapper',
                {'only-clear-icon': show_clear_icon && !$slots.suffix},
                {'with-date-icon': type == 'date'}
            ]">
                <!-- clear icon part -->    
                <DynamicColorResponsiveButton
                v-if = "show_clear_icon" 
                :has_interaction_effect = "false"
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
                @click="handleClearValue"
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
                @click="handleClearValue"
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
                v-if = "$slots.suffix"
                :has_interaction_effect = "false"
                button_type = "text"
                :customized_theme_color = "regular_inline_svg_icon_color"
                width_type = "fit-content"
                :disabled = "disabled"
                @click="handleClearValue"
                >
                    <template #prefix>
                        <!-- recommended: inline svg with currentColor, the color will inherit from the parent -->
                        <slot name = "suffix"></slot>
                    </template>
                </DynamicColorResponsiveButton>
                <!-- customized suffix icon(s) part end -->
            </div>
            <!-- suffix part end -->
        </div>

        
        <div v-if = "$slots.supportingText || ((show_alert || show_error) && message_notification_text)" 
        :class = "[
            'message-container',
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
    </div>
</template>

<script>
import DynamicColorResponsiveButton from '@/components/DynamicColorResponsiveButton.vue';
import { ref } from 'vue';

export default{
    components:{
        DynamicColorResponsiveButton
    },
    setup(){
        const prefix_wrapper = ref(null);
        const suffix_wrapper = ref(null);

        return {
            prefix_wrapper,
            suffix_wrapper
        }
    },
    props:{
        modelValue:{
            type: [String, Number],
            default: ""
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
            default: "filled"
        },
        customized_theme_color:{
            type: String,
            default: ""
        },
        type:{
            //ENUM: all type values of the raw input tag work
            // some of the values works without using <form></form> and <button type = "submit"></button> are:
            // text, date, time, datetime-local, month, week
            // password, tel, number, search, color etc. 
            type: String,
            default: "text"
        },
        placeholder:{
            type: String,
            default: "Enter"
        },
        required:{
            type: Boolean,
            default: false
        },
        clearable:{
            type: Boolean,
            default: false
        },
        disabled:{
            type: Boolean,
            default: false
        },
        autocomplete:{
            //ENUM: the values of the raw input tag work
            type: String,
            default: 'off'
        }
    },
    mounted(){
        document.addEventListener('click', (e)=>this.blurWhenClickOutside(e));
    },
    unmounted(){
        document.removeEventListener('click', (e)=>this.blurWhenClickOutside(e));
    },
    data(){
        return{
            value: this.modelValue,

            hovered:false,
            is_focus:false,

            show_alert: false,
            show_error: false,
            message_notification_text: "",
        }
    },
    computed:{
        show_clear_icon(){
            return this.clearable && this.value && !this.disabled && (this.hovered || this.is_focus);
        },
        has_prefix(){
            return this.prefix_wrapper;
        },
        has_suffix(){
            return this.suffix_wrapper;
        },
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
    },
    emits:[
        'update:modelValue', 
        'input', // press any key
        'change', //press Enter Key or Blur
        'focus',
        'blur',
        'clear',
    ],
    watch:{
        modelValue(newVal){
            this.value = newVal;
        },
        value(newVal){
            // console.log('value: ', this.clearable && newVal && !this.disabled);
            this.$emit('update:modelValue', newVal);
            this.$emit('input', newVal);
        },
        is_focus(newVal){
            if(newVal){
                this.$refs['input-box'].focus();
                // console.log('focus');
                this.$emit('focus');
            }else{
                this.$refs['input-box'].blur();
                // console.log('blur');
                this.$emit('blur');
            }
        }
    },
    methods:{
        handleClickInputBoxUnit(event){
            this.is_focus = true;
            if(document.activeElement != this.$refs['input-box']){
                this.$refs['input-box'].focus();
            }
        },
        blurWhenClickOutside(event){
            if(this.is_focus && this.$refs['input-box-unit'] && !this.$refs['input-box-unit'].contains(event.target)){
                this.is_focus = false;
            }
        },
        handleKeydown($event){
            if($event.key === 'Enter'){
                this.$emit('change', this.value);
            }
        },
        handleClearValue(){
            this.value = "";
            this.$emit('clear');
        },
        // expose methods
        focus(){
            this.is_focus = true;
        },
        blur(){
            this.is_focus = false;
        },
        alert(message){
            this.show_alert = true;
            this.show_error = false;
            this.message_notification_text = message;
        },
        error(message){
            this.show_error = true;
            this.show_alert = false;
            this.message_notification_text = message;
        },
        removeAlertOrErrorEffect(){
            this.show_alert = false;
            this.show_error = false;
            this.message_notification_text = '';
        },
    },
    expose:['focus','blur','alert','error','removeAlertOrErrorEffect'],
}
</script>

<style scoped>
.input-box-unit-wrapper{
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
.input-box-unit{
    height: 48px;
    width: 100%;
    box-sizing: border-box;
    padding: 0px 16px;
    
    display: flex;
    align-items: center;
    column-gap: 4px;

    cursor: pointer;

    position: relative;
}
.input-box-unit.has-prefix{
    padding-left: 0px;
}
.input-box-unit.has-suffix{
    padding-right: 0px;
}

.filled .input-box-unit{
    background: var(--input-box-background-color--);
    border-radius: 4px 4px 0px 0px;
    /* border-bottom: 1px solid #434956; */
    box-shadow: inset 0 var(--input-box-border-width--) 0 var(--input-box-border-color--);
}
.outlined .input-box-unit{
    border-radius: 4px;
    /* border: 1px solid #434956; */
    box-shadow: inset 0 0 0 var(--input-box-border-width--) var(--input-box-border-color--);
}
.input-box-unit.disabled{
    cursor: not-allowed;
}
.filled .input-box-unit.disabled{
    background: var(--disabled-button-background-color--);
}
.input-box-wrapper{
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
.input-box{
    width:100%;
    padding:0px;
    background-color: transparent;
    border:none;
    outline: none;

    color: #17181C;
    font-family: 'Roboto';
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0.5px;
    height:24px;
}
.input-box::placeholder{
    color: var(--disabled-color--);

    font-family: 'Roboto';
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0.5px;
}
.input-box::-webkit-calendar-picker-indicator {
    background: url("@/assets/icons/black_calendar_icon.svg") no-repeat center;
    height:24px;
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
    .input-box-unit{
        height: 56px;
    }
    .message-container{
        font-size: 14px;
        line-height: 16px;
    }
}
</style>