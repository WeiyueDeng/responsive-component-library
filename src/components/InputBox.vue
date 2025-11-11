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
       //    caret color is the same as the border color
       '--caret-color--': regular_border_color,
       '--inside-label-color--': inside_label_color
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
                v-if = "$slots.suffix"
                :has_interaction_effect = "false"
                button_type = "text"
                :customized_theme_color = "regular_inline_svg_icon_color"
                width_type = "fit-content"
                :disabled = "disabled"
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
            default: "outlined"
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
        caret_color(){
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
        }
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
    height: 44px;
    width: 100%;
    box-sizing: border-box;
    padding: 0px 16px;
    caret-color: var(--caret-color--);
    
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
    box-shadow: inset 0 var(--input-box-border-width--) 0 var(--input-box-border-color--);
}
.outlined .input-box-unit{
    border-radius: 4px;
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
.disabled .input-box{
    color: var(--disabled-color--);
}
.input-box::placeholder{
    color: hsla(220, 12%, 60%, 1);

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
        height: 44px;
    }
}
</style>