import SimplifiedNotification from '@/components/SimplifiedNotification.vue';

// Register components for global usage
const components = { SimplifiedNotification };

const install = (app) => {
  Object.keys(components).forEach((name) => {
    app.component(name, components[name]);
  });
};

// Default export for Vue plugin installation
export default { install };

// Named exports for individual component imports
export { SimplifiedNotification };