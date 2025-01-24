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

// Icons: 
// Import all SVG files under src/assets/icons: use relative path as in import.meta.glob @ alias and . doesn't work
// the eager: true option ensures the files are imported at build time, making them available synchronously.
export const icons = import.meta.glob('./assets/icons/*.svg', { eager: true });
var iconsMap = {};
// Function to load all icons
// Loop through all the SVG paths and load them
for (const path in icons) {
  const iconName = path.split('/').pop().replace('.svg', '');  // Extract icon name from the path
  iconsMap[iconName] = icons[path].default;
}

// Named exports for individual component imports
export { 
  //components
  SimplifiedNotification, ResponsiveButton, InputBox, SingleSelector, 
  //directives
  component_loading ,
  //all icons
  iconsMap,
};