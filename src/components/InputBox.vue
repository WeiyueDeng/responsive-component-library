<template>
    <div class = "input-box-unit-wrapper">
        <div :class = "[
            'input-box-unit',
            {'is-focus': is_focus},
            {'has-prefix': $slots.prefix},
            {'has-suffix': $slots.suffix},
            {'disabled': disabled},
            {'error': show_error},
            {'alert': show_alert},
        ]" 
        ref = "input-box-unit"
        @mouseenter="hovered = true"
        @mouseleave="hovered = false"
        @click = "handleClickInputBoxUnit($event)">
            <!-- prefix part -->
            <div v-if = "$slots.prefix" class = "prefix-wrapper">
                <slot name = "prefix"></slot>
            </div>
            <!-- prefix part end -->

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

            <!-- suffix part -->
            <div v-if = "$slots.suffix || show_clear_icon" 
            :class = "[
                'suffix-wrapper',
                {'only-clear-icon': show_clear_icon && !$slots.suffix},
                {'with-date-icon': type == 'date'}
            ]">
                <!-- clear icon part -->
                <img src = "@/assets/icons/input_clear_icon.svg" 
                :class = "[
                    'clear-icon',
                    {'hide': !show_clear_icon}
                ]"
                @click="handleClearValue"/>
                <!-- clear icon part end -->
                <slot name = "suffix"></slot>
            </div>
            <!-- suffix part end -->
        </div>
        <div v-if = "(show_alert || show_error) && message_notification_text" 
        :class = "[
            'message-container',
            {'error': show_error},
            {'alert':show_alert}
        ]">
            {{ message_notification_text }}
        </div>
    </div>
</template>

<script>
export default{
    props:{
        modelValue:{
            type: [String, Number],
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
    row-gap: 8px;
}
.input-box-unit{
    height:fit-content;
    width:100%;
    box-sizing: border-box;
    padding:8px 11px 8px 11px;
    
    display: flex;
    align-items: center;
    column-gap: 12px;

    border-radius: 4px;
    border: 1px solid #BCCCDC;
    background: #FFF;
    cursor: pointer;

    position: relative;
}
.input-box-unit:hover{
    border: 1px solid #DEE6ED;
}
.input-box-unit.is-focus{
    border: 1px solid #9BB2CA;
}
.input-box-unit.has-prefix,
.input-box-unit.has-prefix.has-suffix{
    padding: 8px 11px;
}
.input-box-unit.has-suffix{
    padding-left: 15px;
}
.input-box-unit.error{
    border: 1px solid #DE583F;
}
.input-box-unit.alert{
    border: 1px solid #E0961E;
}
.input-box-unit.disabled{
    background: #F2F2F2;
    cursor: not-allowed;
}
.input-box-unit.disabled:hover{
    border: 1px solid #BCCCDC;
}
.input-box{
    flex: 1;
    width:100%;
    padding:0px;
    background-color: transparent;
    border:none;
    outline: none;

    color: #1C1B1F;
    font-family: 'Roboto';
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0.5px;
    height:24px;
}
.input-box::placeholder{
    color: #979797;

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
    column-gap: 8px;

    min-width:24px;
    width:fit-content;
    height:24px;
}
.suffix-wrapper{
    flex-shrink:0;

    display: flex;
    align-items: center;
    column-gap: 8px;

    min-width:24px;
    width:fit-content;
    height:24px;
}
.suffix-wrapper.only-clear-icon{
    min-width:20px;
}
.suffix-wrapper.with-date-icon{
    position: absolute;
    right:40px;
}
.clear-icon{
    width: 20px;
    height: 20px;
    opacity: 0.7;
    cursor: pointer;
}
.clear-icon:hover{
    opacity: 1;
}
.hide{
    display: none;
}
.message-container{
    width:100%;
    box-sizing: border-box;

    font-family: 'Roboto';
    font-size: 16px;
    font-weight: 400;
    line-height: 19px;
}
.message-container.error{
    color: #DE583F;
}
.message-container.alert{
    color: #E0961E;
}
@media only screen and (max-width:767px){
    .input-box-unit-wrapper{
        row-gap: 4px;
    }
    .input-box-unit{
        padding:7px 11px;
        column-gap: 8px;
    }
    .input-box-unit.has-prefix,
    .input-box-unit.has-prefix.has-suffix{
        padding: 7px 11px;
    }
    .input-box-unit.has-suffix{
        padding-left: 13px;
    }
    .input-box{
        font-size: 14px;
        line-height: 20px; /* 142.857% */
        letter-spacing: 0.25px;
        height:20px;
    }
    .input-box::placeholder{
        font-size: 14px;
        line-height: 20px;
        letter-spacing: 0.25px;
    }
    .input-box::-webkit-calendar-picker-indicator {
        height:20px;
    }
    .prefix-wrapper{
        min-width:20px;
        height:20px;
    }
    .suffix-wrapper{
        min-width:20px;
        height:20px;
        column-gap: 0px;
    }
    .suffix-wrapper.with-date-icon{
        right:32px;
    }
    .clear-icon{
        width: 36px;
        height: 36px;
        box-sizing: border-box;
        padding: 10px;
    }
    .message-container{
        font-size: 14px;
        line-height: 16px;
    }
}
</style>