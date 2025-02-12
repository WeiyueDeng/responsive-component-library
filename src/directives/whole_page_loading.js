const whole_page_loading = {
    mounted(el, binding) {
        // Create a loading container
        const spinner_mask = document.createElement("div");
        spinner_mask.classList.add("whole-page-loading-mask");
        spinner_mask.style.display = "none"; // Initially hidden
        
        //spinner_container contains:
        // 1. spinner_icon_container(hourglass icon and spinning circle)
        // 2. text: Loading...
        // create spinner_container and assign class
        const spinner_container = document.createElement("div");
        spinner_container.classList.add("whole-page-loading-spinner-container");
        // create spinner_icon_container and assign class: this contains hourglass icon and spinning circle
        const spinner_icon_container = document.createElement("div");
        spinner_icon_container.classList.add("whole-page-loading-spinner-icon-container");
        // create hourglass_icon_div, assign class and append it into spinner_icon_container
        const hourglass_icon_div = document.createElement("div");
        hourglass_icon_div.classList.add("whole-page-loading-hourglass-icon-div");
        spinner_icon_container.appendChild(hourglass_icon_div);
        // create loading_circle_div, assign class and append it into spinner_icon_container
        const loading_circle_div = document.createElement("div");
        loading_circle_div.classList.add("whole-page-loading-progress-circle-div");
        spinner_icon_container.appendChild(loading_circle_div);
        // add finished spinner_icon_container into spinner_container
        spinner_container.appendChild(spinner_icon_container);
        // create loading_text_div, assign class, and add it into spinner_container
        const loading_text_div = document.createElement("div");
        loading_text_div.classList.add("whole-page-loading-text-div");
        spinner_container.appendChild(loading_text_div);

        //add finished spinner_container into spinner_mask
        spinner_mask.appendChild(spinner_container);

        el._spinnerMask = spinner_mask; // Store reference on the element for future lifecycle usage 
        el.style.position = "relative"; // Ensure parent element has positioning
        el.appendChild(spinner_mask);

        

        // Show or hide spinner based on binding value
        if (binding.value) {
            el._spinnerMask.style.display = "flex";
        }
    },
    updated(el, binding) {
        // Toggle loading spinner
        if (binding.value) {
            el._spinnerMask.style.display = "flex";
        } else {
            el._spinnerMask.style.display = "none";
        }
    },
    unmounted(el) {
        // Cleanup: Remove spinner element
        el.removeChild(el._spinnerMask);
    },
  };
  
  export default whole_page_loading;