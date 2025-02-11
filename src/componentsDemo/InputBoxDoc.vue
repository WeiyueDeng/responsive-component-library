<template>
    <div style = "width: 200px; border: 1px pink solid; border-radius: 4px; padding:10px">
        <h1>Samples Display for InputBox.vue</h1> <br />
        <div @click = "(event)=>{$refs['target-input-box'].focus(); event.stopPropagation()}">click to focus</div>
        <div @click = "(event)=>{$refs['target-input-box'].blur(); event.stopPropagation()}">click to blur</div>
        <div @click = "$refs['target-input-box'].alert('alert msg 123123123 123123 123')">click to show alert</div>
        <div @click = "$refs['target-input-box'].error('error msg 123123123 12312 123 1231')">click to show error</div>
        <div @click = "$refs['target-input-box'].removeAlertOrErrorEffect()">click to remove alert or error</div>
        <InputBox ref = "target-input-box" type = "text" clearable v-model = "input_value" placeholder = "Please input your words"/>
        <br />
        <h2>InputBox with prefix only</h2> <br />
        <InputBox type = "text" clearable v-model = "input_value" placeholder = "Please input your words">
            <template #prefix>
                <img src = "@/assets/icons/info_blue_icon.svg" style = "width:100%; height:100%;"/>
            </template>
        </InputBox>
        <br />
        <h2>InputBox with suffix only</h2> <br />
        <InputBox type = "text" clearable v-model = "input_value" placeholder = "Please input your words">
            <template #suffix>
                <img src = "@/assets/icons/black_arrow_down.svg" style = "width:100%; height:100%;"/>
            </template>
        </InputBox>
        <br />
        <h2>InputBox with prefix and suffix</h2> <br />
        <InputBox type = "text" clearable v-model = "input_value" placeholder = "Please input your words">
            <template #prefix>
                <img src = "@/assets/icons/info_blue_icon.svg" style = "width:100%; height:100%;"/>
            </template>
            <template #suffix>
                <img src = "@/assets/icons/black_arrow_down.svg" style = "width:100%; height:100%;"/>
            </template>
        </InputBox>
        <br />
        <h2>Disabled InputBox</h2> <br />
        <InputBox type = "text" clearable v-model = "input_value" disabled placeholder = "Please input your words"/>
        <br />
        <h2>type = 'date'</h2> <br />
        <InputBox type = "date" clearable v-model = "input_date_value" placeholder = "Please input your words"/>
        <br />
        <InputBox type = "date" clearable v-model = "input_date_value" disabled placeholder = "Please input your words"/>
        <br />
        <h2>type = 'password'</h2> <br />
        <InputBox :type = "hide_typed_password?'password':'text'" clearable v-model = "input_password_value" placeholder = "Enter your password">
        <template #suffix>
            <img :src = "dynamicPasswordSuffix" style = "width:100%; height:100%;" @click = "hide_typed_password = !hide_typed_password"/>
        </template>
        </InputBox>
    </div>
</template>

<script>
import InputBox from '@/components/InputBox.vue';
import eye_with_cross_icon from '@/assets/icons/eye_with_cross_icon.svg';
import eye_icon from '@/assets/icons/eye_icon.svg';
export default{
    components: {
        InputBox
    },
    data(){
        return{
            input_value: "123",
            input_date_value:'',
            input_password_value:'',
            hide_typed_password:true,
        }
    },
    computed:{
        dynamicPasswordSuffix(){
            return this.hide_typed_password ? eye_with_cross_icon : eye_icon;
        }
    },
}
</script>

<style scoped>
</style>