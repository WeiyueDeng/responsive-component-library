<template>
    <div :class = "[
        'simplified-notification',
        theme_class,
        customized_class,
    ]">
        <div class = "prefix-icon-container">
            <img :src = "alert_icon_src" class = "prefix_icon"/>
        </div>
        <div class = "notifiction-text">
            <div class = "content-wrapper">
                <div class = "title" v-if = "title">{{ title }}</div>
                <slot name="content">
                    <div v-if = "content" class = "content-details">
                        <div v-html="content"></div>
                    </div>
                </slot>    
            </div>
        </div>
        <div class = "close-btn-container">
            <img v-if = "with_close_btn" src = "@/assets/icons/notification_cross_icon.svg" class = "close-btn" @click = "manuallyClose"/>
        </div>
    </div>
</template>

<script>
import blue_info_icon from '@/assets/icons/info_blue_icon.svg';
import green_notification_icon from '@/assets/icons/green_notification_icon.svg';
import yellow_notification_icon from '@/assets/icons/yellow_notification_icon.svg';
import red_notification_icon from '@/assets/icons/red_notification_icon.svg';
export default{
    props:{
        content:String,
        build_in_theme:{
            //ENUM: blue, red, yellow, green
            type:String,
            default:'blue'
        },
        title:{
            type:String,
            default:'',
        },
        customized_alert_icon_src:{
            type:String,
            default:'',
        },
        customized_class:{
            type:String,
            default:'',
        },
        with_close_btn:{
            type:Boolean,
            default:true,
        },
        mounted_programmatically:{
            type:Boolean,
            default:false,
        },
        hide_after:{
            type:Number,
            default:0,
        }
    },
    mounted(){
        // hide_after == 0: means never automatically hide
        // if hide_after has a non-zero value: means hide after hide_after milliseconds
        // console.log('auto hide',!this.hide_after, typeof this.hide_after);
        if(this.hide_after && typeof this.hide_after === 'number'){
            this.autoClose();
        }
    },
    computed:{
        alert_icon_src(){
            if(this.customized_alert_icon_src){
                return this.customized_alert_icon_src;
            }else if(this.build_in_theme == 'blue'){
                return blue_info_icon;
            }else if(this.build_in_theme == 'yellow'){
                return yellow_notification_icon;
            }else if(this.build_in_theme == 'red'){
                return red_notification_icon;
            }else if(this.build_in_theme == 'green'){
                return green_notification_icon;
            }
            return blue_info_icon;
        },
        theme_class(){
            return this.build_in_theme;
        }
    },
    emits:['close'],
    methods:{
        autoClose(){
        //trigger only if need to auto-close notification: this.hide_after != 0
        //NOTES: if has hide_after, this function will be triggered as soon as this component is mounted
            setTimeout(()=>{
                this.manuallyClose();
            }, this.hide_after);
            //add fade-out effect if this.hide_after is not zero;
            if(this.hide_after){
                this.$el.classList.add('fade-out');
                this.$el.style.setProperty('--fade-out-duration-ms', `${this.hide_after}ms`);
            }
        },
        manuallyClose(){
            //trigger close event to parent component 
            //NOTES: need to trigger before component is removed from DOM tree if mounted_programmatically
            this.$emit('close', this.$el);

            if(this.mounted_programmatically){
                //remove the element and the wrapper parent div inside the compoent;
                // console.log('auto hide 1',this.$el, this.$el.parentElement);
                const target_removed_div= this.$el ? this.$el.parentElement : null;
                // console.log('auto hide',this.$attrs.notification_instances_collection, this.$attrs.id, target_removed_div);
                if(target_removed_div){
                    //1. remove HTML element from DOM tree
                    target_removed_div.remove();
                    //2. unmount app instance after remove as it is mounted by createApp()
                    //NOTES: remove() only removes the HTML element from the DOM tree, but Vue still keeps track of the component instance, including any reactive properties, watchers, and event listeners.
                    //avoid memory leaks
                    var app_instance = this.$attrs.notification_instances_collection[this.$attrs.id];
                    //need to use unmount() for dynamically mounted Vue app instances or components to ensure proper cleanup of Vue’s reactivity system.
                    app_instance.unmount();
                    //3. optimization to help garbage collection
                    // after unmounted Vue component instance (including its this context) remains in memory, unless explicitly destroyed.
                    // 3.1 Remove internal reference to the container DOM element
                    // Not strictly necessary but good practice
                    app_instance._container = null;  
                    // 3.2 Dereference the app instance to allow garbage collection
                    app_instance = null;
                    //4. remove this component's key by updating notification_instances_collection
                    delete this.$attrs.notification_instances_collection[this.$attrs.id];
                }
                // console.log('auto hide 2',this.$el, this.$el.parentElement);
                
                // Check whether the floating-notifications-container is empty, if yes, remove it from DOM tree
                // const floating_notifications_container = document.getElementById('floating-notifications-container');
                if(floating_notifications_container && floating_notifications_container.children.length === 0){
                    floating_notifications_container.remove();
                }
            }
        }
    }
}
</script>

<style scoped>
.fade-out {
  animation: fadeOut var(--fade-out-duration-ms, 3000ms) forwards; /* Animation name, duration, and forward fill mode */
}

@keyframes fadeOut {
  0% {
    opacity: 1; /* Fully visible */
  }
  90% {
    opacity: 0.8;
  }
  100% {
    opacity: 0; /* Fully transparent */
  }
}
.simplified-notification{
    width:100%;
    padding:12px 16px;
    border-radius: 8px;
    display: flex;
    gap:12px;
    align-items: stretch;
    box-sizing: border-box;
    position: relative;
}
.simplified-notification.blue{
    background: #E8F4FD;
}
.simplified-notification.red{
    background: #FAEAEA;
}
.simplified-notification.yellow{
    background: #FFF7DF;
}
.simplified-notification.green{
    background: #EBF4EC;
}
.prefix_icon{
    width:24px;
    height:24px;
}
.prefix-icon-container{
    display: flex;
    /* align-items: center; */
    align-items:flex-start;
}
.close-btn-container{
    display: flex;
    flex-direction: column;
}
.close-btn{
    cursor: pointer;
}
.notifiction-text{
    width: 100%;
    color: #000;
    font-family: 'Roboto';
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;

    white-space: normal;
    word-break: break-word;
}
/* .with-cross .content-wrapper{
    width: calc(100% - 20px);
} */
.content-wrapper{
    width:100%;
}
.title{
    color: #000;
    font-family: 'Roboto';
    font-size: 14px;
    font-weight: 600;
    line-height: 16px;
    margin-bottom:4px;
}
.content-details{
    min-height: 24px;
    display: flex;
    align-items: center;
}

@media only screen and (max-width:767px){
    .simplified-notification{
        padding:8px 12px;
        gap:8px;
    }
}
</style>