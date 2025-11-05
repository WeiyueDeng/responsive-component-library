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
        hourglass_icon_div.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" viewBox="0 0 16 20" fill="none"><path d="M4 18H12V15C12 13.9 11.6083 12.9583 10.825 12.175C10.0417 11.3917 9.1 11 8 11C6.9 11 5.95833 11.3917 5.175 12.175C4.39167 12.9583 4 13.9 4 15V18ZM0 20V18H2V15C2 13.9833 2.2375 13.0292 2.7125 12.1375C3.1875 11.2458 3.85 10.5333 4.7 10C3.85 9.46667 3.1875 8.75417 2.7125 7.8625C2.2375 6.97083 2 6.01667 2 5V2H0V0H16V2H14V5C14 6.01667 13.7625 6.97083 13.2875 7.8625C12.8125 8.75417 12.15 9.46667 11.3 10C12.15 10.5333 12.8125 11.2458 13.2875 12.1375C13.7625 13.0292 14 13.9833 14 15V18H16V20H0Z" fill="currentColor"/></svg>`;
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