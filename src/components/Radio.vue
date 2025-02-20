<template>
    <div class = "radio-unit-wrapper">
        <label :class = "[
        'radio-container',
        size,
        show_error ? 'red': built_in_theme,
        customized_class,
        {'disabled':disabled},
        ]"
        ref = "radio-container">
            <div :class = "[
                'radio-input',
                {'checked': checked},
            ]">
                <input v-if = "name" class = "radio-input-original" 
                ref = "radio-input-original" 
                type = 'radio' 
                v-model = "selectedOption"
                :value = "value"
                :name = "name"
                :disabled = "disabled" 
                :autofocus = "autofocus" @click = "handleClickRadio($event)">
                <input v-else type = 'radio' 
                class = "radio-input-original" 
                ref = "radio-input-original"
                v-model = "selectedOption"
                :value = "value"
                :disabled = "disabled" 
                :autofocus = "autofocus" @click = "handleClickRadio($event)">
                <div class = "radio-input-shown">
                    <div v-if = "checked" class = "radio-input-checkmark"></div>
                    <div class = "radio-input-shown-checkbox"></div>
                </div>
            </div>
            <div v-if = "$slots.default || label" class = "radio-container-label-wrapper">
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
        :style = "{'--message-container-width--':radio_container_width}">
            {{ message_notification_text }}
        </div>
    </div>
</template>

<script>
export default{
    props:{
        modelValue:{
            type: String,
            default: '',
        },
        // value is requried
        value:{
            type: String,
            default: '',
        },
        label:{
            type:String,
            default:''
        },
        name:{
            // used for group radio: the same group of radios share the same name
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
            // ENUM: primary-blue, secondary-blue, red
            type:String,
            default:"primary-blue"
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
    },
    mounted(){
        //initiate width used for error message if the initial value of show_error is true
        // if(this.show_error){
        //     const cur_width = this.getCheckboxContainerWidth();
        //     this.checkbox_container_width = cur_width ? `${cur_width}px`:'100%';
        // }
    },
    data(){
        return{
            selectedOption: this.modelValue,
            show_error:false,
            message_notification_text:"",
            radio_container_width: '100%',
        }
    },
    emits:[
        //for sync v-model
        'update:modelValue',
        //triggered when the checkbox is checked or unchecked
        'change'
    ],
    computed:{
        checked(){
            return this.selectedOption == this.value;
        }
    },
    watch:{
        modelValue(newVal){
            this.selectedOption = newVal;
        },
        selectedOption(newVal){
            this.$emit('update:modelValue', newVal);
            this.$emit('change', newVal);
        },
        show_error(newVal){
            if(newVal){
                const cur_width = this.getCheckboxContainerWidth();
                this.radio_container_width = cur_width ? `${cur_width}px`:'100%';
            }
        }
    },
    methods:{
        handleClickRadio(event){
            //if the clicked target input is the same as the selectedOption -> this is already checked -> deselect: change selectedOption to be empty
            if(event.target.value == this.selectedOption){
                this.selectedOption = '';
            }
            this.$refs['radio-input-original']?.blur();
        },
        getCheckboxContainerWidth(){
            return this.$refs['radio-container']?.offsetWidth ?? 0;
        },
        // exposes
        focus(){
            this.$refs['radio-input-original'].focus();
        },
        blur(){
            this.$refs['radio-input-original'].blur();
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
.radio-container{
    width:fit-content;
    padding: 8px 0px;
    display: flex;
    column-gap: 8px;
    cursor: pointer;
}
.disabled.radio-container{
    cursor: not-allowed;
}
.radio-input{
    position: relative;
}
.radio-input-original{
    opacity: 0;
    position: absolute;
}
.radio-input-shown{
    padding:2px;
    box-sizing: border-box;
    position:relative;
}
.small .radio-input-shown{
    width: 20px;
    height:20px;
}
.medium .radio-input-shown{
    width: 24px;
    height:24px;
}
/* hover effect */
.radio-input-shown:hover::before{
    content:'';
    display: block;
    border-radius: 100%;
    background-color: #EDEDED;
    position: absolute;
    top:-4px;
    left:-4px;
    z-index:0;
}
.small .radio-input-shown:hover::before{
    width:28px;
    height:28px
}
.medium .radio-input-shown:hover::before{
    width:32px;
    height:32px
}
.disabled .radio-input-shown:hover::before{
    background-color: transparent !important;
}
.primary-blue .checked .radio-input-shown:hover::before{
    background-color: #D2DAE2;
}
.secondary-blue .checked .radio-input-shown:hover::before{
    background-color: #D2EEF3;
}
/* pressed */
.primary-blue .radio-input-shown:active::before{
    background-color: #BBC3CD;
}
.secondary-blue .radio-input-shown:active::before{
    background-color: #BCD7DD;
}
.primary-blue .checked .radio-input-shown:active::before{
    background-color: #BCBFC4;
}
.secondary-blue .checked .radio-input-shown:active::before{
    background-color: #BCC8CC;
}
/* focus */
.radio-input-original:focus + .radio-input-shown::before{
    content:'';
    display: block;
    border-radius: 100%;
    background-color: #E4E4E4;
    position: absolute;
    top:-4px;
    left:-4px;
    z-index:0;
}
.small .radio-input-original:focus + .radio-input-shown::before{
    width:28px;
    height:28px
}
.medium .radio-input-original:focus +.radio-input-shown::before{
    width:32px;
    height:32px
}
.primary-blue .checked .radio-input-original:focus + .radio-input-shown::before{
    background-color:#B7C4D1;
}
.secondary-blue .checked .radio-input-original:focus + .radio-input-shown::before{
    background-color:#B8E3EC;
}
.disabled .radio-input-original:focus + .radio-input-shown::before,
.disabled .checked .radio-input-original:focus + .radio-input-shown::before{
    background-color: transparent !important;
}
/* when input focus and then hover */
.radio-input-original:focus + .radio-input-shown:hover::before{
    background-color: #EDEDED;
}
.green .checked .radio-input-original:focus + .radio-input-shown:hover::before{
    background-color: #E6F2D8;
}
.primary-blue .checked .radio-input-original:focus + .radio-input-shown:hover::before{
    background-color: #D2DAE2;
}
.secondary-blue .checked .radio-input-original:focus + .radio-input-shown:hover::before{
    background-color: #D2EEF3;
}
.red .checked .radio-input-original:focus + .radio-input-shown:hover::before{
    background-color: #F8DED9;
}
.disabled .checked .radio-input-original:focus + .radio-input-shown:hover::before{
    background-color: transparent !important;
}
/* checkmark */
.radio-input-checkmark{
    width:100%;
    height:100%;
    padding:7px;
    box-sizing: border-box;
    position: absolute;
    top:0px;
    left:0px;
    z-index: 1;
}
.radio-input-checkmark::after{
    content: "";
    display: block;
    width:100%;
    height:100%;
    box-sizing: border-box;
    border-radius: 100%;
}
.disabled .radio-input-checkmark::after{
    background-color: #979797 !important;
}
.primary-blue .radio-input-checkmark::after{
    background-color: #1E4670;
}
.secondary-blue .radio-input-checkmark::after{
    background-color: #20A8C3;
}
.disabled .radio-input-checkmark::after{
    background-color: #979797 !important;
}
/* customized radio checkbox */
.radio-input-shown-checkbox{
    width:100%;
    height: 100%;
    border: 2px solid #49454F;
    background-color: #FFFFFF;
    border-radius:100%;
    box-sizing: border-box;
    position: relative;
}
.radio-input-original:focus + .radio-input-shown .radio-input-shown-checkbox,
.radio-input-shown:hover .radio-input-shown-checkbox{
    background-color: transparent;
}
.disabled .radio-input-shown:hover .radio-input-shown-checkbox,
.disabled .radio-input-shown-checkbox{
    border-color:#979797 !important;
    background-color: #FFFFFF;
}
.primary-blue .checked .radio-input-shown-checkbox{
  border-color: #1E4670;
}
.secondary-blue .checked .radio-input-shown-checkbox{
  border-color: #20A8C3;
}
/* label */
.radio-container-label-wrapper{
    color: #1C1B1F;
    font-family: 'Roboto';
    font-weight: 400;
}
.small .radio-container-label-wrapper{
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.25px;
}
.medium .radio-container-label-wrapper{
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0.5px;
}
.disabled .radio-container-label-wrapper{
    color:#979797;
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
    color: #DE583F;
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
    .medium .radio-input-shown{
        width: 20px;
        height:20px;
    }
    /* hover effect */
    .medium .radio-input-shown:hover::before{
        width:28px;
        height:28px
    }
    /* focus */
    .medium .radio-input-original:focus + .radio-input-shown::before{
        width:28px;
        height:28px
    }
    /* label */
    .medium .radio-container-label-wrapper{
        font-size: 14px;
        line-height: 20px;
        letter-spacing: 0.25px;
    }
    /* error / alert message */
    .medium + .message-container{
        font-size: 14px;
        line-height: 20px;
        letter-spacing: 0.25px;
    }
}
</style>