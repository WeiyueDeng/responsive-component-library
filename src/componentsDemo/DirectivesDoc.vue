<template>
    <div style = "width: 500px; border: 1px pink solid; border-radius: 4px; padding:10px">
        <h1>Samples Display for Directives</h1> <br />
        <h2>Example of v-component-loading</h2> <br />
        <div style = "cursor:pointer" @click = "dummy_component_loading=!dummy_component_loading"> 
            Click here to show/cancel component-loading for Dummy Component Div below
        </div>
        <div style = "margin-top:10px; width: 250px; height:250px; background-color: #E8F4FD; border-radius: 4px; padding:10px" 
        v-component-loading = "dummy_component_loading">
            Dummy Component
        </div>
        <br/>
        <h2>Example of v-whole-page-loading</h2> <br />
        <div style = "cursor:pointer" @click = "whole_page_loading=!whole_page_loading"
        v-whole-page-loading="whole_page_loading"> 
            Click here to show/cancel whole-page-loading
        </div>

    </div>
</template>

<script>
export default{
    data(){
        return{
            dummy_component_loading:false,
            whole_page_loading:false,
        }
    }
}
</script>

<style scoped>
</style>