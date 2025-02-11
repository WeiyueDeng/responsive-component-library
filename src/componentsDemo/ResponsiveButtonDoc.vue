<template>
    <div style = "width: 1000px; border: 1px pink solid; border-radius: 4px; padding:10px">
        <h1>Samples Display for ResponsiveButton.vue</h1> <br />
        <!-- fit content -->
        <h2>width-type: fit-content</h2>
        <br />
        <div @click = "$refs['target-responsive-button'].setLoading(true)" style = "width:fit-content">click to loading</div>
        <div @click = "$refs['target-responsive-button'].setLoading(false)" style = "width:fit-content">click to unloading</div>
        <ResponsiveButton 
        ref = "target-responsive-button"
        display_name='General Information' build_in_theme="outlined-primary" 
        width_type="fit-content"
        @click = "(display_name)=>handleRedirectButtonClick(display_name)"/>
        <br />
        <ResponsiveButton 
        display_name='General Information' build_in_theme="filled-primary" 
        width_type="fit-content"
        @click = "(display_name)=>handleRedirectButtonClick(display_name)"/>
        <br />
        <ResponsiveButton 
        display_name='General Information' build_in_theme="text-primary" 
        @click = "(display_name)=>handleRedirectButtonClick(display_name)"/>
        <br />
        <ResponsiveButton 
        display_name='General Information' build_in_theme="outlined-secondary" 
        width_type="fit-content"
        @click = "(display_name)=>handleRedirectButtonClick(display_name)"/>
        <br />
        <ResponsiveButton 
        display_name='General Information' build_in_theme="filled-secondary" 
        @click = "(display_name)=>handleRedirectButtonClick(display_name)"/>
        <br />
        <ResponsiveButton 
        display_name='General Information' build_in_theme="text-secondary" 
        @click = "(display_name)=>handleRedirectButtonClick(display_name)"/>
        <br />
        <!-- fill whole -->
        <h2>width-type: fill-whole</h2>
        <br />
        <ResponsiveButton 
        display_name='General Information' build_in_theme="outlined-primary" 
        width_type="fill-whole"
        @click = "(display_name)=>handleRedirectButtonClick(display_name)"/>
        <br />
        <ResponsiveButton 
        display_name='General Information' build_in_theme="filled-primary" 
        width_type="fill-whole"
        @click = "(display_name)=>handleRedirectButtonClick(display_name)"/>
        <br />
        <ResponsiveButton 
        display_name='General Information' build_in_theme="text-primary" 
        width_type="fill-whole"
        @click = "(display_name)=>handleRedirectButtonClick(display_name)"/>
        <br />
        <ResponsiveButton 
        display_name='General Information' build_in_theme="outlined-secondary" 
        width_type="fill-whole"
        @click = "(display_name)=>handleRedirectButtonClick(display_name)"/>
        <br />
        <ResponsiveButton 
        display_name='General Information' build_in_theme="filled-secondary"
        width_type="fill-whole" 
        @click = "(display_name)=>handleRedirectButtonClick(display_name)"/>
        <br />
        <ResponsiveButton 
        display_name='General Information' build_in_theme="text-secondary"
        width_type="fill-whole" 
        @click = "(display_name)=>handleRedirectButtonClick(display_name)"/>
        <br />
        <ResponsiveButton 
        ref = "target-hold-responsive-button"
        display_name='General Information' build_in_theme="outlined-secondary"
        width_type="fill-whole"
        @click = "(display_name)=>handleRedirectButtonClick(display_name)"/>
        <br />
        <div @click = "$refs['target-hold-responsive-button'].setHold(true)" style = "width:fit-content">click to set hold via expose</div>
        <div @click = "$refs['target-hold-responsive-button'].setHold(false)" style = "width:fit-content">click to cancel hold via expose</div>
        <div @click = "hold = true" style = "width:fit-content">click to set hold via prop 'hold'</div>
        <div @click = "hold = false" style = "width:fit-content">click to cancel hold via prop 'hold'</div>
        <ResponsiveButton 
        ref="target-hold-responsive-button"
        display_name='General Information' build_in_theme="outlined-primary" 
        width_type="fill-whole"
        @click = "(display_name)=>handleRedirectButtonClick(display_name)"/>
        <br />
        <h2>Dropdown Reponsive Button</h2> <br />
        <ResponsiveButton 
        display_name='Fill the Questionnaire (3 min)' build_in_theme="filled-primary" 
        width_type="fill-whole"
        :dropdown_options="test_dropdown_options"
        @click = "(display_name)=>handleRedirectButtonClick(display_name)">
            <template #prefix>
                <img src = "@/assets/icons/red_notification_icon.svg" style = "width: 100%; height: 100%;"/>
            </template>
        </ResponsiveButton>
        <br />
        <div @click = "(event)=>{event.stopPropagation(); $refs['target-responsive-dropdown-button-fit'].setLoading(true)}" style = "width:fit-content">click to loading</div>
        <div @click = "$refs['target-responsive-dropdown-button-fit'].setLoading(false)" style = "width:fit-content">click to unloading</div>
        <ResponsiveButton 
            ref = "target-responsive-dropdown-button-fit"
            display_name='Questionnaire' build_in_theme="outlined-primary" 
            width_type="fit-content"
            :dropdown_options="test_dropdown_options"
            @click = "(display_name)=>handleRedirectButtonClick(display_name)" />
        <br />
        <div @click = "$refs['target-responsive-dropdown-button'].setHold(true)" style = "width:fit-content">click to set hold via expose</div>
        <div @click = "$refs['target-responsive-dropdown-button'].setHold(false)" style = "width:fit-content">click to cancel hold via expose</div>
        <div @click = "hold = true" style = "width:fit-content">click to set hold via prop 'hold'</div>
        <div @click = "hold = false" style = "width:fit-content">click to cancel hold via prop 'hold'</div>
        <div @click = "$refs['target-responsive-dropdown-button'].setLoading(true)" style = "width:fit-content">click to loading</div>
        <div @click = "$refs['target-responsive-dropdown-button'].setLoading(false)" style = "width:fit-content">click to unloading</div>
        <ResponsiveButton 
        ref = "target-responsive-dropdown-button"
        display_name='Fill the Questionnaire (3 min)' build_in_theme="outlined-secondary" 
        width_type="fill-whole"
        :dropdown_options="test_dropdown_options"
        :hold="hold"
        @click = "(display_name)=>handleRedirectButtonClick(display_name)"/>
        <br />
        <ResponsiveButton 
        display_name='Fill the Questionnaire 123123(3 min)' build_in_theme="filled-secondary" 
        width_type="fit-content"
        :dropdown_options="test_disabled_dropdown_options"
        @click = "(display_name)=>handleRedirectButtonClick(display_name)">
            <template #prefix>
                <img src = "@/assets/icons/black_magnifying_glass_icon.svg" style = "width: 100%; height: 100%;"/>
            </template>
        </ResponsiveButton>
    </div>
</template>

<script>
import ResponsiveButton from '@/components/ResponsiveButton.vue';
export default{
    components: {
        ResponsiveButton
    },
    data(){
        return{
            hold:false,
            test_dropdown_options:[
                {
                    display_name:'op 1'
                },
                {
                    display_name:'op 2231 231 2312 312 123 34234123 1234 12341 1234',
                    dropdown_options:[
                        {
                            display_name:'op 2.1'
                        },
                        {
                            display_name:'op 2.2',
                            dropdown_options:[
                                {display_name:'op 2.2.1'},
                                {display_name:'op 2.2.2'}
                            ]
                        }
                    ]
                },
            ],
            test_disabled_dropdown_options:[
                {
                    display_name:'op 1'
                },
                {
                    display_name:'op 2231 231 2312 312 123 34234123 1234 12341 1234',
                    dropdown_options:[
                        {
                            display_name:'op 2.1'
                        },
                        {
                            display_name:'op 2.2',
                            disabled:true,
                            dropdown_options:[
                                {
                                    display_name:'op 2.2.1'
                                },
                                {
                                    display_name:'op 2.2.2'
                                }
                            ]
                        }
                    ]
                },
            ]
        }
    },
    methods:{
        handleRedirectButtonClick(display_name){
            alert('click ResponsiveButton: ' + display_name);
        }
    }
}
</script>

<style scoped>
</style>