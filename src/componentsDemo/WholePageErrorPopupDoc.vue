<template>
    <div style = "width:100px; border: 1px pink solid; box-sizing: border-box; border-radius: 4px; padding:10px; box-sizing: border-box;">
        <h1>Samples Display for WholePageErrorPopup.vue</h1> <br />
        <div @click = "show_popup=true"> Click to show WholePageErrorPopup </div>
        <WholePageErrorPopup v-if = "show_popup" @retry = "hidePopup">
            <template #content>
                <div>
                    <p> This is a test </p>
                </div>
            </template>
        </WholePageErrorPopup>
    </div>

</template>

<script>
import WholePageErrorPopup from '@/components/WholePageErrorPopup.vue';
export default{
    components: {
        WholePageErrorPopup
    },
    data(){
        return{
            show_popup:false,
        }
    },
    methods:{
        showPopup(){
            this.show_popup = true;
        },
        hidePopup(){
            this.show_popup = false;
        }
    }
}
</script>