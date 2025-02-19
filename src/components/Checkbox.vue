<template>
    <div class = "checkbox-unit-wrapper">
        <label :class = "[
        'checkbox-container',
        size,
        show_error ? 'red': built_in_theme,
        customized_class,
        {'disabled':disabled},
        ]">
            <div :class = "[
                'checkbox-input',
                {'checked':checked},
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
            <div class = "checkbox-container-label-wrapper">
                <slot>
                    {{ label }}
                </slot>
            </div>
        </label>
        <div v-if = "show_error && message_notification_text" 
        :class = "[
            'message-container',
            {'error': show_error},
        ]">
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
            // ENUM: green, primary-blue, secondary-blue, red
            type:String,
            default:"green"
        },
        customized_class:{
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
    data(){
        return{
            checked: this.modelValue,
            show_error:false,
            message_notification_text:"",
        }
    },
    emits:[
        //for sync v-model
        'update:modelValue',
        //triggered when the checkbox is checked or unchecked
        'change'
    ],
    watch:{
        modelValue(newVal){
            this.checked = newVal;
        },
        checked(newVal){
            console.log('checked', newVal);
            this.$emit('update:modelValue', newVal);
            this.$emit('change', newVal);
            this.$refs['checkbox-input-original']?.blur();
        },
        indeterminate(newVal){
            if(newVal){
                this.checked = false;
            }
        }
    },
    methods:{
        // exposes
        focus(){
            this.$refs['checkbox-input-original'].focus();
        },
        blur(){
            this.$refs['checkbox-input-original'].blur();
        },
        alert(msg){
            this.show_error = true;
            this.message_notification_text = msg;
        },
        removeAlertOrErrorEffect(){
            this.show_error = false;
            this.message_notification_text = '';
        }
    },
    expose:['focus', 'blur', 'alert', 'removeAlertOrErrorEffect'],
}
</script>

<style scoped>
.checkbox-unit-wrapper{
    width: fit-content;
    display: flex;
    flex-direction: column;
}
.checkbox-container{
    display: flex;
    cursor: pointer;
    width: fit-content;
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
    width:16px;
    height:16px;
}
.medium .checkbox-input-shown{
    width:18px;
    height:18px;
}
/* hover effect circle */
.checkbox-input-shown:hover::before{
    content:'';
    display: block;
    border-radius: 100%;
    width: 32px;
    height: 32px;
    background-color: rgba(28, 27, 31, 0.2);
    z-index: -1;
    position: absolute;
}
.checked .checkbox-input-shown:hover::before{
    content:'';
    display: block;
    border-radius: 100%;
    width: 32px;
    height: 32px;
    z-index: -1;
    position: absolute;
}
.small .checkbox-input-shown:hover::before{
    top:-8px;
    left:-8px;
}
.medium .checkbox-input-shown:hover::before{
    top:-7px;
    left:-7px;
}
.disabled .checkbox-input-shown:hover::before{
    background-color: transparent !important;
}
.green .checked .checkbox-input-shown:hover::before{
    background-color: rgba(132, 188, 59, 0.2);
}
.primary-blue .checked .checkbox-input-shown:hover::before{
    background-color: rgba(30, 70, 112, 0.20);
}
.secondary-blue .checked .checkbox-input-shown:hover::before{
    background-color: rgba(32, 168, 195, 0.20);
}
.red .checked .checkbox-input-shown:hover::before{
    background-color: rgba(222, 88, 63, 0.20);
}
.disabled .checked .checkbox-input-shown:hover::before{
    background-color: transparent !important;
}

/* pressed */
.green .checkbox-input-shown:active::before{
    background-color: #D0DBC2;
}
.primary-blue .checkbox-input-shown:active::before{
    background-color: #BBC3CD;
}
.secondary-blue .checkbox-input-shown:active::before{
    background-color: #BCD7DD;
}
.red .checkbox-input-shown:active::before{
    background-color: #F5CDC6;
}
.disabled .checkbox-input-shown:active::before{
    background-color: transparent !important;
}
.green .checked .checkbox-input-shown:active::before{
    background-color: #C6CBBF;
}
.primary-blue .checked .checkbox-input-shown:active::before{
    background-color: #BCBFC4;
}
.secondary-blue .checked .checkbox-input-shown:active::before{
    background-color: #BCC8CC;
}
.red .checked .checkbox-input-shown:active::before{
    background-color: #F5CDC6;
}
.disabled .checked .checkbox-input-shown:active::before{
    background-color: transparent !important;
}
/* focused */
.checkbox-input-original:focus + .checkbox-input-shown::before{
    content:'';
    display: block;
    border-radius: 100%;
    width: 32px;
    height: 32px;
    background-color: rgba(28, 27, 31, 0.12);
    z-index: -1;
    position: absolute;
}
.small .checkbox-input-original:focus + .checkbox-input-shown::before{
    top:-8px;
    left:-8px;
}
.medium .checkbox-input-original:focus + .checkbox-input-shown::before{
    top:-7px;
    left:-7px;
}
.checkbox-input-original:focus + .checkbox-input-shown:hover::before{
    background-color: rgba(28, 27, 31, 0.08);
}
.green .checked .checkbox-input-original:focus + .checkbox-input-shown::before{
    background-color: rgba(132, 188, 59, 0.32);
}
.primary-blue .checked .checkbox-input-original:focus + .checkbox-input-shown::before{
    background-color: rgba(30, 70, 112, 0.32);
}
.secondary-blue .checked .checkbox-input-original:focus + .checkbox-input-shown::before{
    background-color: rgba(32, 168, 195, 0.32);
}
.red .checked .checkbox-input-original:focus + .checkbox-input-shown::before{
    background-color: rgba(222, 88, 63, 0.32);
}
.disabled .checked .checkbox-input-original:focus + .checkbox-input-shown::before{
    background-color: transparent !important;
}
/* when input focus and then hover */
.green .checked .checkbox-input-original:focus + .checkbox-input-shown:hover::before{
    background-color: rgba(132, 188, 59, 0.20);
}
.primary-blue .checked .checkbox-input-original:focus + .checkbox-input-shown:hover::before{
    background-color: rgba(30, 70, 112, 0.20);
}
.secondary-blue .checked .checkbox-input-original:focus + .checkbox-input-shown:hover::before{
    background-color: rgba(32, 168, 195, 0.20);
}
.red .checked .checkbox-input-original:focus + .checkbox-input-shown:hover::before{
    background-color: rgba(222, 88, 63, 0.20);
}
.disabled .checked .checkbox-input-original:focus + .checkbox-input-shown:hover::before{
    background-color: transparent !important;
}
/* the customized checkbox (the square box) */
.checkbox-input-shown-checkbox{
    width:100%;
    height: 100%;
    border: 2px solid #49454F;
    border-radius: 2px;
    box-sizing: border-box;
}

.disabled .checkbox-input-shown-checkbox{
    border-color:#979797;
    background-color: #FFFFFF;
}
.disabled .indeterminate .checkbox-input-shown-checkbox,
.disabled .checked .checkbox-input-shown-checkbox{
    border-color:#979797 !important;
    background: #979797 !important;
}
.green .indeterminate .checkbox-input-shown-checkbox,
.green .checked .checkbox-input-shown-checkbox{
    border-color:#84BC3B;
    background: #84BC3B;
}
.primary-blue .indeterminate .checkbox-input-shown-checkbox,
.primary-blue .checked .checkbox-input-shown-checkbox{
    border-color:#1E4670;
    background: #1E4670;
}
.secondary-blue .indeterminate .checkbox-input-shown-checkbox,
.secondary-blue .checked .checkbox-input-shown-checkbox{
    border-color: #20A8C3;
    background:  #20A8C3;
}
.red .indeterminate .checkbox-input-shown-checkbox,
.red .checked .checkbox-input-shown-checkbox{
    border-color:#DE583F;;
    background: #DE583F;;
}
.indeterminate-mark::after{
    content: "";
    position: absolute;
    width: 10px;
    height: 2px;
    background-color: #FFFFFF;
}
.small .indeterminate-mark::after{
    top:7px;
    left: 3px;
}
.medium .indeterminate-mark::after{
    top:8px;
    left: 4px;
}
.checkmark::after{
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    width: 3.5px;
    /* width: 4px; */
    height: 9px;
    border: solid #FFFFFF;
    border-width: 0 2px 2px 0;
    transform: translate(-45%, -65%) rotate(45deg);
}
.small .checkbox-container-label-wrapper{
    color: #1C1B1F;
    font-family: 'Roboto';
    font-size: 14px;
    font-weight: 400;
    line-height: 20px; /* 142.857% */
    letter-spacing: 0.25px;
}
.medium .checkbox-container-label-wrapper{
    color: #1C1B1F;
    font-family: 'Roboto';
    font-size: 16px;
    font-weight: 400;
    line-height: 24px; /* 150% */
    letter-spacing: 0.5px;
}

.message-container{
    font-family: 'Roboto';
    font-weight: 400;
}
.message-container.error{
    color: #DE583F;
}
.small .message-container{
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.25px;
}
.medium .message-container{
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0.5px;
}

@media only screen and (max-width:767px){
    .checkbox-container.medium{
        column-gap: 10px;
    }
    .medium .checkbox-container-label-wrapper{
        color: #1C1B1F;
        font-family: 'Roboto';
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
        letter-spacing: 0.25px;
    }
    .medium .checkbox-input{
        height:20px;
    }
    .medium .checkbox-input-shown{
        width:16px;
        height:16px;
    }
    .medium .checkbox-input-shown:hover::before{
        top:-8px;
        left:-8px;
    }
    .medium .message-container{
        font-size: 14px;
        line-height: 20px;
        letter-spacing: 0.25px;
    }
}
</style>