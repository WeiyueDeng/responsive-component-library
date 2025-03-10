<template>
    <div style = "width: 500px; border: 1px pink solid; border-radius: 4px; padding:10px; background-color: pink;">
        <h1>Samples Display for Radio and Radio Group</h1> <br />

        <h2>primary-blue theme</h2> <br />
        <h3>Radio Group</h3> <br />
        <Radio v-model = "test_group_1_value" label="test radio 1" name = "test group 1" value = "option 1" ref = "autofocus-target-1" :disabled = "test_group_1_disabled"/>
        <Radio v-model = "test_group_1_value" label="test radio 2" name = "test group 1" value = "option 2" />
        <div style = "cursor:pointer" @click = "$refs['autofocus-target-1'].focus()">Click to focus</div> <br />
        <div style = "cursor:pointer" @click = "$refs['autofocus-target-1'].blur()">Click to blur</div> <br />
        <div style = "cursor:pointer" @click = "$refs['autofocus-target-1'].alert('This is a customized error message passed via the expose of the checkbox component')">Click to show error</div> <br />
        <div style = "cursor:pointer" @click = "$refs['autofocus-target-1'].removeAlertOrErrorEffect()">Click to remove alert</div> <br />
        <div style = "cursor:pointer" @click = "test_group_1_disabled=!test_group_1_disabled">Click to disable/enable option 1</div> <br />
        <br />
        <h3>Single Radio</h3> <br />
        <Radio label="single test radio" value = "option unit" @change = "radioSelectionChange"/>

        <h2>secondary-blue theme</h2> <br />
        <h3>Radio Group</h3> <br />
        <Radio v-model = "test_group_2_value" label="test radio 1" name = "test group 2" value = "option 1" built_in_theme = "secondary-blue" />
        <Radio v-model = "test_group_2_value" label="test radio 2" name = "test group 2" value = "option 2" built_in_theme = "secondary-blue" />
        <br />
        <Radio v-model = "check_single_radio_value" label="single test radio" value = "option unit" :disabled = "true" ref = "disabled-target-1"/>
        <div style = "cursor:pointer" @click = "$refs['disabled-target-1'].focus()">Click to focus</div> <br />
        <div style = "cursor:pointer" @click = "$refs['disabled-target-1'].blur()">Click to blur</div> <br />
        <div style = "cursor:pointer" @click = "check_single_radio_value = check_single_radio_value ? '' :'option unit'">Click to check/uncheck</div> <br />
        <h3>no label</h3> <br />
        <Radio v-model = "check_single_radio_value" value = "option 1" built_in_theme = "secondary-blue" ref = 'no-label-target-1'/>
        <div style = "cursor:pointer" @click = "$refs['no-label-target-1'].alert('This is a customized error message passed via the expose of the checkbox component')">Click to show error</div> <br />
        <div style = "cursor:pointer" @click = "$refs['no-label-target-1'].removeAlertOrErrorEffect()">Click to remove alert</div> <br />
    </div>
</template>

<script>
import Radio from "@/components/Radio.vue";

export default{
    components:{
        Radio,
    },
    data(){
        return {
            test_group_1_value:'',
            test_group_2_value:'',
            test_group_1_disabled:false,
            check_single_radio_value:'option unit',
        }
    },
    watch:{
        test_group_1_value(newVal){
            console.log('test_group_1_value change', newVal);
        },
        test_group_2_value(newVal){
            console.log('test_group_2_value change', newVal);
        },
    },
    methods:{
        radioSelectionChange(val){
            console.log('radioSelectionChange', val);
        }
    }
}
</script>