<template>
    <div style = "width: 500px; border: 1px pink solid; border-radius: 4px; padding:10px">
        <h1>Samples Display for Checkbox</h1> <br />
        <Checkbox :label = 'test_label' />
        <br />
        <Checkbox :label = 'test_label'>
                <div>
                    text 2 (pass label via slot)
                </div>
        </Checkbox>
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
            test_label: "text 1"
        }
    }
}
</script>

<style scoped>
</style>