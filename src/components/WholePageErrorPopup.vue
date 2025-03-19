<template>
    <div class = "whole-page-error-popup-container whole-page-error-mask">
        <div class = "whole-page-error-popup-window">
            <div class = "error-popup-header">
                <img src = "@/assets/icons/red_sad_face.svg" class = "error-popup-title-icon">
                <div class = "error-popup-title-text">
                    {{ title }}
                </div>
            </div>
            <div class = "error-popup-body">
                <slot name="content">
                    <div v-if = "content" class = "popup-body-content-details">
                        <div v-html="content"></div>
                    </div>
                </slot>    
            </div>
            <div class = "error-popup-footer">
               <div class = "retry-button" @click  = "retry"> Retry </div>
            </div>
        </div>
    </div>
</template>

<script>
export default{
    props:{
        title:{
            type: String,
            default: "Error"
        },
        content:{
            type: String,
            default: "An error has occured"
        },
    },
    emits:['retry'],
    methods:{
        retry(){
            this.$emit('retry');
        },
    }
}
</script>

<style scoped>
.whole-page-error-popup-container.whole-page-error-mask{
    height:100vh;
    width:100%;

    position:fixed;
    top:0;
    left:0;
    z-index:1000;

    background-color: rgba(28, 27, 31, 0.30);

    display:flex;
    flex-direction: column;
    align-items:center;
}
.whole-page-error-popup-window{
    width: 38%;
    min-width: 552px;
    height:fit-content;
    margin-top: 94px;
    background-color: #FFFFFF;
    border-radius: 10px;
}
.error-popup-header{
    display:flex;
    flex-direction: column;
    align-items:center;
    padding: 12px 16px;
    row-gap:20px;
}
.error-popup-title-icon{
    width: 100px;
    height: 100px;
}
.error-popup-title-text{
    color: #DE583F;
    font-family: 'Roboto';
    font-size: 24px;
    font-weight: 500;
    line-height: 28px;
    letter-spacing: 0.458px;
}
.error-popup-body{
    width: 100%;
    box-sizing: border-box;
    padding: 12px 16px 0px 16px;

    color: #1C1B1F;
    font-family: 'Roboto';
    font-size: 14px;
    font-weight: 400;
    line-height: 20px; /* 142.857% */
    letter-spacing: 0.25px;
}
.error-popup-footer{
    width: 100%;
    box-sizing: border-box;
    padding:24px;
}
.retry-button{
    text-align: center;
    width:100%;
    box-sizing: border-box;
    padding: 10px 24px;
    border-radius: 4px;
    background: #DE583F;

    color: #FFF;
    font-family: 'Roboto';
    font-size: 14px;
    font-weight: 500;
    line-height: 20px; /* 142.857% */
    letter-spacing: 0.1px;
    cursor: pointer;
}
@media only screen and (max-width:1024px){
    .whole-page-error-popup-window{
        max-width: 552px;
        margin-top: 64px;
        width: 54%;
        min-width:0;
    }
}
@media only screen and (max-width:767px){
    .whole-page-error-popup-container.whole-page-error-mask{
        padding:0px 16px;
        box-sizing: border-box;
    }
    .whole-page-error-popup-window{
        max-width: none;
        width: 100%;
        margin-top: 12px;
        min-width:0;
    }
    .error-popup-header{
        display:flex;
        flex-direction: column;
        align-items:center;
        padding: 12px 12px;
        row-gap:16px;
    }
    .error-popup-title-icon{
        width: 64px;
        height: 64px;
    }
    .error-popup-title-text{
        font-size: 22px;
        line-height: 26px;
    }
    .error-popup-body{
        padding: 12px 12px 0px 12px;
    }
    .error-popup-footer{
        width: 100%;
        box-sizing: border-box;
        padding:16px 12px;
    }
}
</style>