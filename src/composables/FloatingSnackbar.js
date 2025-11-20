import { createApp, h } from "vue";
import Snackbar from "@/components/Snackbar.vue";

const floating_snackbar_instances_map = {};

export function FloatingSnackbar(snackbar_props = {}, slots) {
    // 1. Check if container exists, create if not
    var floating_snackbar_container = document.getElementById('floating-snackbar-container');
    if (!floating_snackbar_container) {
        floating_snackbar_container = document.createElement('div');
        floating_snackbar_container.id = 'floating-snackbar-container';
        document.body.appendChild(floating_snackbar_container);
    }
    
    // 2. Create app instance with unique timestamp ID
    const timestamp = Date.now();
    
    // 3. Build event handlers from props (onAction1, onAction2, etc.)
    const event_handlers = {};
    const component_props = {};
    
    Object.keys(snackbar_props).forEach(key => {
        if (key === 'onAction' && typeof snackbar_props[key] === 'function') {
            // Handle single action event
            event_handlers.onAction = snackbar_props[key];
        } else if (key === 'onClose') {
            // Handle onClose
            event_handlers.onClose = snackbar_props[key];
        } else {
            // Regular props
            component_props[key] = snackbar_props[key];
        }
    });
    
    const appInstance = createApp({
        render: () => h(
            Snackbar,
            {
                ...component_props,
                id: timestamp,
                snackbar_instances_collection: floating_snackbar_instances_map,
                mounted_programmatically: true,
                ...event_handlers
            },
            slots
        )
    });
    
    // 4. Record app instance
    floating_snackbar_instances_map[timestamp] = appInstance;
    
    // 5. Create root element and mount
    const root_element = document.createElement('div');
    root_element.style.transition = 'all 0.5s ease-out';
    floating_snackbar_container.appendChild(root_element);
    appInstance.mount(root_element);
}
