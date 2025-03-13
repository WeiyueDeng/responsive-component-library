import { createApp } from "vue";
import SimplifiedNotification from "@/components/SimplifiedNotification.vue";

const floating_notifications_instances_map = {};

export function FloatingNotification(notification_props){
    // 1. first check whether we already created container div for all the global floating notifications
    var floating_notifications_container = document.getElementById('floating-notifications-container');
    //    1.1 if not: create one a div with the id named floating-notifications-container
    if(!floating_notifications_container){
        floating_notifications_container = document.createElement('div');  
        floating_notifications_container.id = 'floating-notifications-container';
        document.body.appendChild(floating_notifications_container);
    }
    // 2. after we get the element referenece of the container of all global floating notifications:
    //    2.1 create the appInstance of the notification component based on the passed params notification_props
    const timestamp = Date.now(); // unique, used as id
    const appInstance = createApp(SimplifiedNotification, {
        ...notification_props,
        id:timestamp,
        notification_instances_collection: floating_notifications_instances_map,
        mounted_programmatically:true
    });
    //    2.2 record the appInstance in floating_notifications_instances_map for SimplifiedNotification to unmount itself inside the component when trigger close.
    floating_notifications_instances_map[timestamp]=appInstance;
    //    2.3 to mount appInstance, need to have a root element. 
    //    NOTES: if we directly use floating_notifications_container as root element, everytime call createNewNotification(), the notification shown will be updated with the newest one and always shown one notification
    //    creating another div as root element and prepend it inside floating_notifications_container allows to stack all notifications.
    const root_element = document.createElement('div');
    root_element.style.transition='all 0.5s ease-out';
    floating_notifications_container.prepend(root_element);
    appInstance.mount(root_element);
}