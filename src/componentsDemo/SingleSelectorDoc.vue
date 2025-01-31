<template>
    <div style = "width: 200px; border: 1px pink solid; border-radius: 4px; padding:10px">
        <div>Samples Display for SingleSelector.vue</div> <br />
        <div>
        <div @click = "(event)=>{$refs['target-selector'].focus(); event.stopPropagation()}">click to focus</div>
        <div @click = "(event)=>{$refs['target-selector'].blur(); event.stopPropagation()}">click to blur</div>
        <div @click = "$refs['target-selector'].alert('alert msg 2312312 312331231')">click to show alert</div>
        <div @click = "$refs['target-selector'].error('error msg 12312312 312312312313123')">click to show error</div>
        <div @click = "$refs['target-selector'].removeAlertOrErrorEffect()">click to remove alert or error</div>
        </div>
        <br />
        <SingleSelector ref = "target-selector"
        v-model = "single_selector_value"
        :options = "single_selector_options"
        clearable />
        <br />
        <br />
        <SingleSelector v-model = "single_selector_value"
        :filterable = "true"
        :options = "single_selector_options"
        :clearable = "true"/>
        <br />
        <SingleSelector v-model = "single_selector_value"
        :filterable = "true"
        :options = "single_selector_options_scroll"
        :clearable = "true">
        <template #prefix>
            <img src = "@/assets/icons/black_magnifying_glass_icon.svg" style = "width:100%; height:100%;"/>
        </template>
        </SingleSelector>
        <br />
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
            single_selector_value: "123",
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
            ]
        }
    },
    watch:{
        single_selector_value(newVal){
            console.log("single_selector_value: ", newVal);
        }
    }
}
</script>

<style scoped>
</style>