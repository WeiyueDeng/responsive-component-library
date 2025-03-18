<template>
    <div style = "max-width: 1000px; width:100%; border: 1px pink solid; border-radius: 4px; padding:10px; box-sizing: border-box;">
        <h1>Samples Display for SimplifiedNotification.vue</h1> <br />
        <SimplifiedNotification title="Cutomized Title" content = "Cutomized content. This is a notification that cannot close manually." :with_close_btn = "false" />
        <br />
        <SimplifiedNotification title="Cutomized Title" content = "Cutomized content. This is a notification that can close manually." build_in_theme = "yellow" :with_close_btn = "true" />
        <br />
        <SimplifiedNotification title="Cutomized Title" content = "Cutomized content. This is a notification that can close manually. And will also disappear after 20 seconds." 
        build_in_theme = "green" :with_close_btn = "true" :hide_after = "20000"/>
        <br />
        <SimplifiedNotification title="Cutomized Title" content = "Cutomized content. This is a notification that cannot close manually, but will disappear after 30 seconds." 
        build_in_theme = "red" :with_close_btn = "false" :hide_after = "30000"/>

        <br />
        <h2>Samples Display for FloatingNotification function which is based on SimplifiedNotification.vue</h2> <br />
        <div @click  = "clickToShowGlobalNotification"> click to show global floating notification </div>
        <br />
        <div @click  = "clickToShowCustomizedContentGlobalNotificationViaSlot"> click to show global floating notification with customized content via slot</div>
    </div>
</template>

<script>
import SimplifiedNotification from '@/components/SimplifiedNotification.vue';
import { FloatingNotification } from '@/composables/FloatingNotification.js';
import { h } from 'vue';

export default{
    components: {
        SimplifiedNotification
    },
    data(){
        return{
            count:1,
        }
    },
    computed:{
        floating_notification_props(){
            return {
                title: "Global Floating Notification",
                content: `${this.count}. Cutomized content. This can be raw HTML text. This is a notification that cannot close manually, but will disappear after 30 seconds.`,
                build_in_theme: "red",
                with_close_btn: true,
                hide_after: 30000,
            }
        },
        floating_notification_props_with_slot(){
            return {
                title: "Error",
                build_in_theme: "red",
                with_close_btn: true,
                // listen to close event
                onClose: () => { 
                    console.log('close');
                }
            }
        }
    },
    methods:{
        clickToShowGlobalNotification(){
            FloatingNotification(this.floating_notification_props);
            this.count++;
        },
        clickToShowCustomizedContentGlobalNotificationViaSlot(){
            FloatingNotification(this.floating_notification_props_with_slot,{
                content: () => h(
                    'div',
                    {},
                    [
                        h('div', {}, 'We encountered a system error while loading the order, preventing the following information from being displayed:'),
                        h('ul', {
                            style:{
                                'margin': '0',
                                'padding-inline-start':'3ch'
                            },
                        }, [
                            h('li', {}, 'error 1'),
                            h('li', {}, 'error 2'),
                            h('li', {}, 'error 3'),
                        ]),
                        h('span', {
                            style:{
                                'margin-top': '4px',
                                'text-decoration': 'underline',
                                'cursor': 'pointer',
                            },
                            onClick: () => {
                                console.log('click action button');
                            }
                        }, 'action button'),
                    ]
                ) 
            });
            this.count++;
        }
    }
}
</script>

<style scoped>
</style>