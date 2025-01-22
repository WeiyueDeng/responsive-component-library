const component_loading = {
    mounted(el, binding) {
      // Create a loading container
      const spinner = document.createElement("div");
      spinner.classList.add("component-loading-spinner");
      spinner.style.display = "none"; // Initially hidden
      el._spinner = spinner; // Store reference on the element
      el.style.position = "relative"; // Ensure parent element has positioning
      el.appendChild(spinner);
  
      // Show or hide spinner based on binding value
      if (binding.value) {
        spinner.style.display = "flex";
      }
    },
    updated(el, binding) {
      // Toggle loading spinner
      if (binding.value) {
        el._spinner.style.display = "flex";
      } else {
        el._spinner.style.display = "none";
      }
    },
    unmounted(el) {
      // Cleanup: Remove spinner element
      el.removeChild(el._spinner);
    },
  };
  
  export default component_loading;