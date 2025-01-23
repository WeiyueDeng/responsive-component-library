// components
import SimplifiedNotification from '@/components/SimplifiedNotification.vue';
import ResponsiveButton from '@/components/ResponsiveButton.vue';
import InputBox from "@/components/InputBox.vue";
import SingleSelector from '@/components/SingleSelector.vue';

// directives
import component_loading from "@/directives/component_loading.js";

import '@/style.css';

// Register components for global usage
const components = { SimplifiedNotification, ResponsiveButton, InputBox, SingleSelector };

const install = (app) => {
  Object.keys(components).forEach((name) => {
    app.component(name, components[name]);
  });
  app.directive('component-loading', component_loading);
};

// Default export for Vue plugin installation
export default { install };

// Named exports for individual component imports
export { SimplifiedNotification, ResponsiveButton, InputBox, SingleSelector, component_loading };