<template>
    <div style = "width: 500px; border: 1px pink solid; border-radius: 4px; padding:10px">
        <h1>Samples Display for Checkbox</h1> <br />
        <h2>green theme</h2> <br />
        <Checkbox v-model = "green_theme_checked" :label = 'test_label' 
        :indeterminate = "is_indeterminate" ref = "indeterminate-target-1"/> <br />
        <div style = "cursor:pointer" @click = "is_indeterminate = !is_indeterminate">Click to set/unset indeterminate</div> <br />
        <div style = "cursor:pointer" @click = "green_theme_checked = !green_theme_checked">Click to check/uncheck</div> <br />
        <div style = "cursor:pointer" @click = "$refs['indeterminate-target-1'].alert('This is a customized error message passed via the expose of the checkbox component')">Click to show error</div> <br />
        <div style = "cursor:pointer" @click = "$refs['indeterminate-target-1'].removeAlertOrErrorEffect()">Click to remove alert</div> <br />
        <div style = "cursor:pointer" @click = "$refs['indeterminate-target-1'].focus()">Click to focus</div> <br />
        <div style = "cursor:pointer" @click = "$refs['indeterminate-target-1'].blur()">Click to blur</div> <br />

        <div>***NOTES: If both indeterminate and checked, shown as indeterminate</div> <br />
        <div>***NOTES: If the value passed to the indeterminate prop changes to be true, the checked value will be automatically set to be false</div> <br />
        <br />
        <h3>autofocus</h3> <br />
        <Checkbox v-model = "green_theme_checked" :label = 'test_label' ref = "autofocus-target-1" :autofocus = "true"/>
        <br />
        <div style = "cursor:pointer" @click = "$refs['autofocus-target-1'].focus()">Click to focus</div> <br />
        <div style = "cursor:pointer" @click = "$refs['autofocus-target-1'].blur()">Click to blur</div> <br />
        <div style = "cursor:pointer" @click = "$refs['autofocus-target-1'].alert('This is a customized error message passed via the expose of the checkbox component')">Click to show error</div> <br />
        <div style = "cursor:pointer" @click = "$refs['autofocus-target-1'].removeAlertOrErrorEffect()">Click to remove alert</div> <br />
        <h3>disabled</h3> <br />
        <Checkbox :disabled ="true" v-model = "checked" ref = "autofocus-target-2">
            <div>
                text 2 (pass label via slot), v-model control
            </div>
        </Checkbox>
        <br />
        <div style = "cursor:pointer" @click = "$refs['autofocus-target-2'].focus()">Click to focus</div> <br />
        <div style = "cursor:pointer" @click = "$refs['autofocus-target-2'].blur()">Click to blur</div> <br />
        <div style = "cursor:pointer" @click = "checked=!checked">Click to check/uncheck</div> <br />
        
        
        <br />
        <h2>primary-blue theme</h2> <br />
        <Checkbox :label = 'test_label' built_in_theme = "primary-blue">
                <div>
                    text 2 (pass label via slot)
                </div>
        </Checkbox>
        <h2>secondary-blue theme</h2> <br />
        <Checkbox :label = 'test_label' built_in_theme = "secondary-blue" />
        <br />

        <h2>red theme</h2> <br />
        <Checkbox :label = 'test_label' built_in_theme = "red" />
        <br />

        <h2>disabled, secondary-blue, unchecked/checked</h2> <br />
        <Checkbox v-model = "initial_checked_value" :label = 'test_label' built_in_theme = "secondary-blue" :disabled = "true"/>
        <Checkbox v-model = "initial_unchecked_value" :label = 'test_label' built_in_theme = "secondary-blue" :disabled = "true"/>
        <br />
    </div>
</template>

<script>
import Checkbox from "@/components/Checkbox.vue";
export default{
    components:{
        Checkbox
    },
    data(){
        return{
            test_label: "text 1 (pass label via prop)",
            initial_checked_value:true,
            initial_unchecked_value:false,
            green_theme_checked:false,
            checked:true,
            is_indeterminate:false,
        }
    },
    methods:{
        handleAutofocus(){
            console.log('focus checkbox', this.$refs['autofocus-target'].focus());
        }
    }
}
</script>

<style scoped>
</style>