<template>
    <div class = "checkbox-unit-wrapper" :style = "{'--checkbox-theme-color--':getCheckboxThemeColor()}">
        <label :class = "[
        'checkbox-container',
        size,
        {'error': show_error},
        customized_class,
        {'disabled': disabled},
        ]"
        ref = "checkbox-container">
            <div :class = "[
                'checkbox-input',
                {'checked': checked},
                {'indeterminate': indeterminate},
            ]">
                <input type = 'checkbox' v-model = "checked" 
                class = "checkbox-input-original" 
                ref = "checkbox-input-original" 
                :disabled = "disabled" 
                :autofocus = "autofocus">
                <div class = 'checkbox-input-shown'>
                    <div v-if = "indeterminate" class = "indeterminate-mark"></div>
                    <div v-else-if = "checked" class = "checkmark"></div>
                    <div class = "checkbox-input-shown-checkbox"></div>
                </div>
            </div>
            <div v-if = "$slots.default || label" class = "checkbox-container-label-wrapper">
                <slot>
                    {{ label }}
                </slot>
            </div>
        </label>
        <div v-if = "show_error && message_notification_text" 
        ref = "message-container"
        :class = "[
            'message-container',
            {'has-message-min-width': !$slots.default && !label},
            {'error': show_error},
        ]"
        :style = "{'--message-container-width--':checkbox_container_width}">
            {{ message_notification_text }}
        </div>
    </div>
</template>

<script>
export default{
    props:{
        modelValue:{
            type: Boolean,
            default: false,
        },
        label:{
            type:String,
            default:''
        },
        size:{
            // ENUM: small, medium
            // small in web -> small in mobile, medium in web -> small in mobile
            type:String,
            default:'medium'
        },
        built_in_theme:{
            // ENUM: green, primary-blue, secondary-blue
            type:String,
            default:"green"
        },
        customized_theme_color:{
            // OPTIONAL when built_in_theme is used
            // NOTES: Can be any valid CSS color value
            // NOTES: When both built_in_theme and customized_theme_color are used, customized_theme_color will override the built_in_theme
            // NOTES: The theme color is the color used for the checkbox background when it is checked or indeterminate and the interaction effects
            // NOTES: When the theme color is used, the unchecked checkbox's border color is always hsl(226, 8%, 10%).
            type:String,
            default:''
        },
        customized_class:{
            // Used if user don't want to obey our dynamic color rules, and want to define their own rules of color and interaction effects.
            type:String,
            default:''
        },
        disabled:{
            type: Boolean,
            default:false,
        },
        autofocus:{
            type: Boolean,
            default:false,
        },
        indeterminate:{
            type: Boolean,
            default:false,
        }
    },
    created(){
        if(this.groupCheckboxContext){
            this.checked = this.whether_checked_in_group_checkbox;
        }else{
            this.checked = this.modelValue;
        }
    },
    mounted(){
        //initiate width used for error message if the initial value of show_error is true
        if(this.show_error){
            const cur_width = this.getCheckboxContainerWidth();
            this.checkbox_container_width = cur_width ? `${cur_width}px`:'100%';
        }
    },
    data(){
        return{
            checked: false,
            show_error:false,
            message_notification_text:"",
            checkbox_container_width: '100%',
        }
    },
    inject:{
        toggleCheckbox: {
            default: null
        },
        groupCheckboxContext: {
            default: null
        }
    },
    emits:[
        //for sync v-model
        'update:modelValue',
        //triggered when the checkbox is checked or unchecked
        'change'
    ],
    computed:{
        whether_checked_in_group_checkbox(){
            return this.groupCheckboxContext?.[this.label];
        },
    },
    watch:{
        modelValue(newVal){
            this.checked = newVal;
        },
        checked(newVal){
            // console.log('checked', newVal);
            this.$emit('update:modelValue', newVal);
            this.$emit('change', newVal);
            this.$refs['checkbox-input-original']?.blur();
            if(this.groupCheckboxContext){
                this.toggleCheckbox(this.label, newVal);
            }
        },
        indeterminate(newVal){
            if(newVal){
                this.checked = false;
            }
        },
        show_error(newVal){
            if(newVal){
                const cur_width = this.getCheckboxContainerWidth();
                this.checkbox_container_width = cur_width ? `${cur_width}px`:'100%';
            }
        },
        whether_checked_in_group_checkbox(newVal){
            if(this.groupCheckboxContext){
                this.checked = newVal;
            }
        }
    },
    methods:{
        getCheckboxThemeColor(){
            // Priority: error > customized_theme_color > built_in_theme
            
            //if show_error is true, regardless the customized_theme_color and built_in_theme, return semantic error color
            if(this.show_error){
                return 'var(--semantic-error-color--)';
            }

            //if customized_theme_color is provided, return customized_theme_color
            if(this.customized_theme_color){
                return this.customized_theme_color;
            }

            //else if built_in_theme is provided, return built_in_theme color
            switch(this.built_in_theme){
                case 'green':
                    return 'var(--semantic-success-color--)';
                case 'primary-blue':
                    return 'var(--Schemes-primary)';
                case 'secondary-blue':
                    return 'var(--Schemes-Secondary)';
                default:
                    return 'var(--semantic-success-color--)';
            }
            
        },
        getCheckboxContainerWidth(){
            return this.$refs['checkbox-container']?.offsetWidth ?? 0;
        },
        // exposes
        focus(){
            this.$refs['checkbox-input-original'].focus();
        },
        blur(){
            this.$refs['checkbox-input-original'].blur();
        },
        error(msg){
            this.show_error = true;
            this.message_notification_text = msg;
        },
        removeAlertOrErrorEffect(){
            this.show_error = false;
            this.message_notification_text = '';
        }
    },
    expose:['focus', 'blur', 'error', 'removeAlertOrErrorEffect'],
}
</script>

<style scoped>
.checkbox-container{
    display: flex;
    cursor: pointer;
    width: fit-content;
    padding:8px 0px;
}
.checkbox-container.disabled{
    cursor: not-allowed;
}
.checkbox-container.small{
    column-gap: 10px;
}
.checkbox-container.medium{
    column-gap: 11px;
}
.checkbox-input{
    display: flex;
    align-items: center;
}
.small .checkbox-input{
    height:20px;
}
.medium .checkbox-input{
    height:24px;
}
/* raw input checkbox */
.checkbox-input-original{
    /* cannot use display:none since need to detect focus status via css */
    /* display: none; */
    opacity: 0;
    position: absolute;
}
/* customized checkbox style */
.checkbox-input-shown{
    box-sizing: border-box;
    border-radius: 2px;
    position:relative;
}
.small .checkbox-input-shown{
    width:20px;
    height:20px;
    padding:2px
}
.medium .checkbox-input-shown{
    width:24px;
    height:24px;
    padding:3px;
}
/* hover effect circle */
.checkbox-input-shown:hover::before{
    content:'';
    display: block;
    border-radius: 100%;
    width: 32px;
    height: 32px;
    background-color: var(--checkbox-theme-color--);
    opacity: 8%;
    position: absolute;
}
.small .checkbox-input-shown:hover::before{
    top:-6px;
    left:-6px;
}
.medium .checkbox-input-shown:hover::before{
    top:-4px;
    left:-4px;
}
.disabled .checkbox-input-shown:hover::before{
    background-color: transparent !important;
}

/* pressed */
.checkbox-input-shown:active::before{
    background-color: var(--checkbox-theme-color--);
    opacity: 16%;
}

.disabled .checkbox-input-shown:active::before{
    background-color: transparent !important;
}

/* focused */
.checkbox-input-original:focus + .checkbox-input-shown::before{
    content:'';
    display: block;
    border-radius: 100%;
    width: 32px;
    height: 32px;
    background-color: var(--checkbox-theme-color--);
    opacity: 10%;
    position: absolute;
}
.small .checkbox-input-original:focus + .checkbox-input-shown::before{
    top:-6px;
    left:-6px;
}
.medium .checkbox-input-original:focus + .checkbox-input-shown::before{
    top:-4px;
    left:-4px;
}

.disabled .indeterminate .checkbox-input-original:focus + .checkbox-input-shown::before,
.disabled .checked .checkbox-input-original:focus + .checkbox-input-shown::before{
    background-color: transparent !important;
}

/* when input focus and then hover */
.checkbox-input-original:focus + .checkbox-input-shown:hover::before{
    background-color: var(--checkbox-theme-color--);
    opacity: 8%;
}

/* the customized checkbox (the square box) */
.checkbox-input-shown-checkbox{
    width:100%;
    height: 100%;
    border-radius: 2px;
    box-sizing: border-box;
    position:relative;
}
.checkbox-input-shown-checkbox::after{
    content:"";
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 2px;
    box-sizing: border-box;
    border: 2px solid hsl(226, 8%, 10%);
}
.checked .checkbox-input-original:focus + .checkbox-input-shown .checkbox-input-shown-checkbox::after,
.checked .checkbox-input-shown:hover .checkbox-input-shown-checkbox::after{
    background-color: var(--checkbox-theme-color--);
}
.indeterminate .checkbox-input-original:focus + .checkbox-input-shown .checkbox-input-shown-checkbox::after,
.indeterminate .checkbox-input-shown:hover .checkbox-input-shown-checkbox::after{
    background-color: var(--checkbox-theme-color--);
}
.checkbox-input-original:focus + .checkbox-input-shown .checkbox-input-shown-checkbox::after,
.checkbox-input-shown:hover .checkbox-input-shown-checkbox::after{
    /* unchecked checkbox-input-shown-checkbox has transparent background when hover or focus */
    background-color: transparent;
}
.error .checkbox-input-shown-checkbox::after{
    border-color:var(--checkbox-theme-color--);
}
.disabled .checkbox-input-shown-checkbox::after{
    border-color:var(--disabled-color--) !important;
}

.disabled .indeterminate .checkbox-input-shown-checkbox::after,
.disabled .checked .checkbox-input-shown-checkbox::after{
    border-color:var(--disabled-color--) !important;
    background: var(--disabled-color--) !important;
}

.checked .checkbox-input-original:focus + .checkbox-input-shown .checkbox-input-shown-checkbox::after,
.indeterminate .checkbox-input-original:focus + .checkbox-input-shown .checkbox-input-shown-checkbox::after,
.indeterminate .checkbox-input-shown-checkbox::after,
.checked .checkbox-input-shown-checkbox::after{
    border-color:var(--checkbox-theme-color--);
    background: var(--checkbox-theme-color--);
}

/* indeterminate mark */
.indeterminate-mark::after{
    content: "";
    position: absolute;
    z-index:1;
    width: 10px;
    height: 2px;
    background-color: #FFFFFF;
}
.small .indeterminate-mark::after{
    top: 9px;
    left: 5px;
}
.medium .indeterminate-mark::after{
    top: 11px;
    left: 7px;
}
/* checkmark */
.checkmark::after{
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    z-index:1;
    width: 3.5px;
    height: 9px;
    border: solid #FFFFFF;
    border-width: 0 2px 2px 0;
    transform: translate(-45%, -65%) rotate(45deg);
}
 /* label */
.small .checkbox-container-label-wrapper{
    color: hsl(226, 8%, 10%);
    font-family: 'Roboto';
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0.25px;
}
.medium .checkbox-container-label-wrapper{
    color: hsl(226, 8%, 10%);
    font-family: 'Roboto';
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0.5px;
}
.disabled .checkbox-container-label-wrapper{
    color: var(--disabled-color--);
}
/* error / alert message */
.message-container{
    width: var(--message-container-width--, 100%);
    font-family: 'Roboto';
    font-weight: 400;
}
.message-container.has-message-min-width{
    min-width: 109px;
}
.message-container.error{
    color: var(--checkbox-theme-color--);
}
.small + .message-container{
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.25px;
}
.medium + .message-container{
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0.5px;
}

@media only screen and (max-width:767px){
    .checkbox-container.medium{
        column-gap: 10px;
    }
    .medium .checkbox-input{
        height:20px;
    }
    .medium .checkbox-input-shown{
        width:20px;
        height:20px;
        padding:2px
    }
    .medium .checkbox-input-shown:hover::before{
        top:-6px;
        left:-6px;
    }
    .medium .indeterminate-mark::after{
        top: 9px;
        left: 5px;
    }
    .medium .checkbox-container-label-wrapper{
        color: hsl(226, 8%, 10%);
        font-family: 'Roboto';
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
        letter-spacing: 0.25px;
    }
    .medium + .message-container{
        font-size: 14px;
        line-height: 20px;
        letter-spacing: 0.25px;
    }

}
</style>