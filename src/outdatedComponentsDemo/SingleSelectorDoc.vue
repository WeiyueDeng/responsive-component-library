<template>
    <div style = "width: 200px; border: 1px pink solid; border-radius: 4px; padding:10px">
        <h1>Samples Display for SingleSelector.vue</h1> <br />
        <h2>Clearable SingleSelector with operations of focus, blur, alert, error via script</h2> <br />
        <div @click = "(event)=>{$refs['target-selector'].focus(); event.stopPropagation()}">click to focus</div>
        <div @click = "(event)=>{$refs['target-selector'].blur(); event.stopPropagation()}">click to blur</div>
        <div @click = "$refs['target-selector'].alert('alert msg 2312312 312331231')">click to show alert</div>
        <div @click = "$refs['target-selector'].error('error msg 12312312 312312312313123')">click to show error</div>
        <div @click = "$refs['target-selector'].removeAlertOrErrorEffect()">click to remove alert or error</div>
        <br />
        <SingleSelector ref = "target-selector"
        v-model = "single_selector_value"
        :options = "single_selector_options"
        clearable />
        <br />
        <br />
        <h2>Clearable and filterable SingleSelector</h2> <br />
        <h3>option value string</h3> <br />
        <div @click = "(event)=>{$refs['target-selector-2'].focus(); event.stopPropagation()}">click to focus</div>
        <div @click = "(event)=>{$refs['target-selector-2'].blur(); event.stopPropagation()}">click to blur</div>
        <div @click = "$refs['target-selector-2'].alert('alert msg 2312312 312331231')">click to show alert</div>
        <div @click = "$refs['target-selector-2'].error('error msg 12312312 312312312313123')">click to show error</div>
        <div @click = "$refs['target-selector-2'].removeAlertOrErrorEffect()">click to remove alert or error</div>
        <SingleSelector v-model = "single_selector_value"
        ref = "target-selector-2"
        :filterable = "true"
        :options = "single_selector_options"
        :clearable = "true"/>
        <br />
        <h3>option value number</h3> <br />
        <SingleSelector v-model = "single_selector_value_number"
        :filterable = "true"
        :options = "single_selector_options_value_number"
        :clearable = "true"/>
        <br />
        <h3>option value boolean</h3> <br />
        <SingleSelector v-model = "single_selector_value_boolean"
        :filterable = "true"
        :options = "single_selector_options_value_boolean"
        :clearable = "true"/>
        <br />
        <h3>option value array</h3> <br />
        <SingleSelector v-model = "single_selector_value_array"
        :filterable = "true"
        :options = "single_selector_options_value_array"
        :clearable = "true"/>
        <br />
        <h3>option value object</h3> <br />
        <SingleSelector v-model = "single_selector_value_object"
        :filterable = "true"
        :options = "single_selector_options_value_object"
        :clearable = "true"/>
        <br />
        <h3>Clearable and filterable SingleSelector with prefix</h3> <br />
        <SingleSelector v-model = "single_selector_value"
        :filterable = "true"
        :options = "single_selector_options_scroll"
        :clearable = "true">
            <template #prefix>
                <img src = "@/assets/icons/black_magnifying_glass_icon.svg" style = "width:100%; height:100%;"/>
            </template>
        </SingleSelector>
        <br />
        <h2>Disabled, clearable and filterable SingleSelector</h2> <br />
        <SingleSelector v-model = "single_selector_value"
        :filterable = "true"
        :options = "single_selector_options_scroll"
        :clearable = "true"
        disabled/>
    </div>
</template>

<script>
import SingleSelector from '@/components/SingleSelector.vue';
export default{
    components: {
        SingleSelector
    },
    data(){
        return{
            single_selector_value: "3",
            single_selector_value_number: 1,
            single_selector_value_boolean: true,
            single_selector_value_array: [1],
            single_selector_value_object: {
                1:'1',
            },
            single_selector_options: [
                {value: "1", label: "Option 1"},
                {value: "2", label: "Option 2"},
                {value: "3", label: "Option 3"},
                {value: "4", label: "Option 4"},
            ],
            single_selector_options_scroll:[
                {value: "1", label: "Option 1"},
                {value: "2", label: "Option 2"},
                {value: "3", label: "Option 3"},
                {value: "4", label: "Option 4"},
                {value: "11", label: "Option 1"},
                {value: "21", label: "Option 2"},
                {value: "31", label: "Option 3"},
                {value: "41", label: "Option 4"},
                {value: "12", label: "Option 1"},
                {value: "22", label: "Option 2"},
                {value: "32", label: "Option 3"},
                {value: "42", label: "Option 4"},
                {value: "13", label: "Option 1"},
                {value: "23", label: "Option 2"},
                {value: "33", label: "Option 3"},
                {value: "43", label: "Option 4"},
            ],
            single_selector_options_value_number: [
                {value: 1, label: "Option 1"},
                {value: 2, label: "Option 2"},
                {value: 3, label: "Option 3"},
                {value: 4, label: "Option 4"},
            ],
            single_selector_options_value_boolean: [
                {value: true, label: "Yes"},
                {value: false, label: "No"},
            ],
            single_selector_options_value_array: [
                {value: [1], label: "Option 1"},
                {value: [2], label: "Option 2"},
                {value: [3], label: "Option 3"},
                {value: [4], label: "Option 4"},
            ],
            single_selector_options_value_object: [
                {value: {1:'1'}, label: "Option 1"},
                {value: {2:'2'}, label: "Option 2"},
                {value: {3:'3'}, label: "Option 3"},
                {value: {4:'4'}, label: "Option 4"},
            ],
        }
    },
    watch:{
        single_selector_value(newVal){
            console.log(`single_selector_value:`, newVal);
            alert(`single_selector_value:${newVal}`);
        },
        single_selector_value_number(newVal){
            console.log(`single_selector_value_number:`, newVal);
            alert(`single_selector_value_number:${JSON.stringify(newVal)}`);
        },
        single_selector_value_boolean(newVal){
            console.log(`single_selector_value_boolean:`, newVal);
            alert(`single_selector_value_boolean:${JSON.stringify(newVal)}`);
        },
        single_selector_value_array(newVal){
            console.log(`single_selector_value_array:`, newVal);
            alert(`single_selector_value_array:${JSON.stringify(newVal)}`);
        },
        single_selector_value_object(newVal){
            console.log(`single_selector_value_object:`, newVal);
            alert(`single_selector_value_object:${JSON.stringify(newVal)}`);
        },
        
    }
}
</script>

<style scoped>
</style>