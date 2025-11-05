// components
import SimplifiedNotification from '@/components/SimplifiedNotification.vue';
import ResponsiveButton from '@/components/ResponsiveButton.vue';
import InputBox from "@/components/InputBox.vue";
import SingleSelector from '@/components/SingleSelector.vue';
import Checkbox from '@/components/Checkbox.vue';
import Radio from '@/components/Radio.vue';
import WholePageErrorPopup from '@/components/WholePageErrorPopup.vue';
import AreaCodePhoneInput from '@/components/AreaCodePhoneInput.vue';
import GroupCheckbox from '@/components/GroupCheckbox.vue';
import DropdownMenu from '@/components/DropdownMenu.vue';
import Badge from '@/components/Badge.vue';
import FloatingActionButton from '@/components/FloatingActionButton.vue';
import DynamicColorResponsiveButton from '@/components/DynamicColorResponsiveButton.vue';

// directives
import component_loading from "@/directives/component_loading.js";
import whole_page_loading from '@/directives/whole_page_loading.js';

//composables (functions)
import { useWindowSize } from '@/composables/useWindowSize.js';
import { FloatingNotification } from "@/composables/FloatingNotification.js";

import '@/style.css'; 

// utils
import { parseColorToHsl, toHslString, toHsl } from '@/utils/colorConversion.js';

// Register components and directives for global usage
const components = { SimplifiedNotification, ResponsiveButton, InputBox, SingleSelector, Checkbox, Radio, WholePageErrorPopup, AreaCodePhoneInput, GroupCheckbox, DropdownMenu, Badge, FloatingActionButton, DynamicColorResponsiveButton };
const directives = {
  'component-loading': component_loading,
  'whole-page-loading': whole_page_loading,
};
const install = (app) => {
  Object.keys(components).forEach((name) => {
    app.component(name, components[name]);
  });
  Object.keys(directives).forEach((name) => {
    app.directive(name, directives[name]);
  });
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
  SimplifiedNotification, ResponsiveButton, InputBox, SingleSelector, Checkbox, Radio, WholePageErrorPopup, AreaCodePhoneInput, GroupCheckbox, DropdownMenu, Badge, FloatingActionButton, DynamicColorResponsiveButton,
  //directives
  component_loading ,
  whole_page_loading,
  //composables
  useWindowSize, FloatingNotification,
  //utils
  parseColorToHsl, toHslString, toHsl,
  //all icons
  iconsMap,
};