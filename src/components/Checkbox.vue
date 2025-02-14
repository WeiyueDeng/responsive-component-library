<template>
    <label :class = "[
        'checkbox-container',
        size,
    ]">
        <div :class = "[
            'checkbox-input',
            {'checked':checked}
        ]">
            <input type = 'checkbox' v-model = "checked" class = "checkbox-input-original">
            <div class = 'checkbox-input-shown'></div>
        </div>
        <div class = "checkbox-container-label-wrapper">
            <slot>
                {{ label }}
            </slot>
        </div>
    </label>
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
        }
    },
    data(){
        return{
            checked: this.modelValue,
        }
    },
    watch:{
        modelValue(newVal){
            this.checked = newVal;
        },
        checked(newVal){
            console.log('checked', newVal);
            this.$emit('update:modelValue', newVal);
        }
    }
}
</script>

<style scoped>
.checkbox-container{
    display: flex;
    cursor: pointer;
}
.checkbox-container.small{
    column-gap: 10px;
}
.checkbox-container.medium{
    column-gap: 11px;
}
.checkbox-input-original{
    display: none;
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
.checkbox-input-shown{
    box-sizing: border-box;
    border-radius: 2px;
    border: 2px solid #49454F;
}
.checked .checkbox-input-shown{
    border-color:#84BC3B;
    background: #84BC3B;
    position: relative;
}
.checked .checkbox-input-shown::after{
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    width: 3.5px;
    /* width: 4px; */
    height: 9px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: translate(-45%, -65%) rotate(45deg);
}
.small .checkbox-input-shown{
    width:16px;
    height:16px;
}
.medium .checkbox-input-shown{
    width:18px;
    height:18px;
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

@media only screen and (max-width:767px){
    .checkbox-container.medium{
        column-gap: 10px;
    }
    .medium .checkbox-container-label-wrapper{
        color: #1C1B1F;
        font-family: 'Roboto';
        font-size: 14px;
        font-weight: 400;
        line-height: 20px; /* 142.857% */
        letter-spacing: 0.25px;
    }
    .medium .checkbox-input-shown{
        width:16px;
        height:16px;
    }
}
</style>