<template>
  <div style="max-width:1000px; width:100%; border: 1px pink solid; box-sizing: border-box; border-radius: 4px; padding:10px; box-sizing: border-box;">
    <h1>Samples Display for FloatingActionButton.vue</h1>
    <br />

    <!-- Example selector -->
    <div class="toolbar">
      <button @click="activate('basic')">Basic</button>
      <button @click="activate('icon-only')">Icon Only</button>
      <button @click="activate('customizable')">Customizable</button>
      <button @click="activate('with-options')">With Options</button>
      <button @click="deactivate()">Hide</button>
    </div>

    <div class="hint">Note: Button is hidden on wide screens (is_web_version) by the component. Resize window below 1024px to see it.</div>

    <!-- Basic example -->
    <FloatingActionButton
      v-if="active_example === 'basic'"
      display_name="Basic"
      build_in_theme="primary"
      size="small"
      @floating-action-button-click="onFabClick('basic')"
    />

    <!-- Icon only example -->
    <FloatingActionButton
      v-if="active_example === 'icon-only'"
      :build_in_theme="'secondary'"
      size="medium"
      @floating-action-button-click="onFabClick('icon-only')"
    >
      <template #prefix>
        <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M6 16L10 12.95L14 16L12.5 11.05L16.5 8.2H11.6L10 3L8.4 8.2H3.5L7.5 11.05L6 16ZM10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.3125 6.1 0.7875C7.31667 0.2625 8.61667 0 10 0C11.3833 0 12.6833 0.2625 13.9 0.7875C15.1167 1.3125 16.175 2.025 17.075 2.925C17.975 3.825 18.6875 4.88333 19.2125 6.1C19.7375 7.31667 20 8.61667 20 10C20 11.3833 19.7375 12.6833 19.2125 13.9C18.6875 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6875 13.9 19.2125C12.6833 19.7375 11.3833 20 10 20Z" fill="currentColor"/>
        </svg>
      </template>
      <div>Icon-only</div>
      <template #suffix>
        <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M6 16L10 12.95L14 16L12.5 11.05L16.5 8.2H11.6L10 3L8.4 8.2H3.5L7.5 11.05L6 16ZM10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.3125 6.1 0.7875C7.31667 0.2625 8.61667 0 10 0C11.3833 0 12.6833 0.2625 13.9 0.7875C15.1167 1.3125 16.175 2.025 17.075 2.925C17.975 3.825 18.6875 4.88333 19.2125 6.1C19.7375 7.31667 20 8.61667 20 10C20 11.3833 19.7375 12.6833 19.2125 13.9C18.6875 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6875 13.9 19.2125C12.6833 19.7375 11.3833 20 10 20Z" fill="currentColor"/>
        </svg>
      </template>
    </FloatingActionButton>

    <!-- Customizable example (existing behavior) -->
    <div v-if="active_example === 'customizable'" class="panel">
      <div class="row">
        <div @click="size = 'small'">Small</div>
        <div @click="size = 'medium'">Medium</div>
        <div @click="size = 'large'">Large</div>
      </div>
      <div class="row">
        <div @click="build_in_theme = 'primary'">Primary</div>
        <div @click="build_in_theme = 'secondary'">Secondary</div>
        <div @click="build_in_theme = 'tertiary'">Tertiary</div>
        <div @click="build_in_theme = 'primary-container'">Primary Container</div>
        <div @click="build_in_theme = 'secondary-container'">Secondary Container</div>
        <div @click="build_in_theme = 'tertiary-container'">Tertiary Container</div>
      </div>
      <div class="row">
        <input v-model="customized_theme_color_input_value" placeholder="#3d5c8f or rgb(61,92,143)"/>
        <button @click="customized_theme_color = customized_theme_color_input_value">apply</button>
      </div>
      <div class="row">
        <button @click="showPopup()">Show</button>
        <button @click="hidePopup()">Hide</button>
      </div>

      <FloatingActionButton
        v-if="show_popup"
        :size="size"
        :build_in_theme="build_in_theme"
        :customized_theme_color="customized_theme_color"
        @floating-action-button-click="onFabClick('customizable')"
      >
        <!-- inline svg with fill=currentColor can show icon with the text color dynamically, based on dynamic color theme rules -->
        <template #prefix>
          <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M6 16L10 12.95L14 16L12.5 11.05L16.5 8.2H11.6L10 3L8.4 8.2H3.5L7.5 11.05L6 16ZM10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.3125 6.1 0.7875C7.31667 0.2625 8.61667 0 10 0C11.3833 0 12.6833 0.2625 13.9 0.7875C15.1167 1.3125 16.175 2.025 17.075 2.925C17.975 3.825 18.6875 4.88333 19.2125 6.1C19.7375 7.31667 20 8.61667 20 10C20 11.3833 19.7375 12.6833 19.2125 13.9C18.6875 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6875 13.9 19.2125C12.6833 19.7375 11.3833 20 10 20Z" fill="currentColor"/>
          </svg>
        </template>
        <div>Customizable</div>
        <template #suffix>
          <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M6 16L10 12.95L14 16L12.5 11.05L16.5 8.2H11.6L10 3L8.4 8.2H3.5L7.5 11.05L6 16ZM10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.3125 6.1 0.7875C7.31667 0.2625 8.61667 0 10 0C11.3833 0 12.6833 0.2625 13.9 0.7875C15.1167 1.3125 16.175 2.025 17.075 2.925C17.975 3.825 18.6875 4.88333 19.2125 6.1C19.7375 7.31667 20 8.61667 20 10C20 11.3833 19.7375 12.6833 19.2125 13.9C18.6875 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6875 13.9 19.2125C12.6833 19.7375 11.3833 20 10 20Z" fill="currentColor"/>
          </svg>
        </template>
      </FloatingActionButton>
    </div>

    <!-- With Options menu example -->
    <div v-if="active_example === 'with-options'" class="panel">
      <div class="row">
        <span>Size:</span>
        <button @click="options_size = 'small'">Small</button>
        <button @click="options_size = 'medium'">Medium</button>
        <button @click="options_size = 'large'">Large</button>
        <span>Current: {{ options_size }}</span>
      </div>

      <FloatingActionButton
        display_name="With Options"
        :options="sample_options"
        :build_in_theme="'tertiary'"
        :size="options_size"
        @option-click="onOptionClick"
        @floating-action-button-click="onFabClick('with-options')"
      />
    </div>

    <!-- Event log -->
    <div class="log" v-if="logs.length">
      <div class="log-title">Event Log</div>
      <ul>
        <li v-for="(item, idx) in logs" :key="idx">{{ item }}</li>
      </ul>
      <button @click="logs = []">Clear</button>
    </div>
  </div>
</template>

<script>
import FloatingActionButton from '@/components/FloatingActionButton.vue';
export default {
  components: {
    FloatingActionButton,
  },
  data() {
    return {
      // example state
      active_example: '',
      logs: [],

      // customizable example state
      show_popup: false,
      size: 'small',
      build_in_theme: 'primary',
      customized_theme_color_input_value: '',
      customized_theme_color: '',

      // options example
      sample_options: [
        { value: 'photo', label: 'New Photo' },
        { value: 'video', label: 'New Video' },
        { value: 'doc', label: 'New Doc' },
      ],
      options_size: 'small',
    };
  },
  methods: {
    activate(name) {
      this.active_example = name;
      // close any open popups when switching
      this.show_popup = false;
    },
    deactivate() {
      this.active_example = '';
      this.show_popup = false;
    },
    showPopup() {
      this.show_popup = true;
    },
    hidePopup() {
      this.show_popup = false;
    },
    onOptionClick(val) {
      this.logs.unshift(`[option-click] value="${val}"`);
    },
    onFabClick(example) {
      this.logs.unshift(`[floating-action-button-click] example="${example}"`);
    },
  },
};
</script>

<style scoped>
.icon{
    width: 100%;
    height: 100%;
}
.toolbar{ display: flex; gap: 8px; flex-wrap: wrap; }
.panel{ display: flex; flex-direction: column; gap: 8px; }
.row{ display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
.log{ margin-top: 12px; border-top: 1px solid #eee; padding-top: 8px; }
.log-title{ font-weight: bold; margin-bottom: 4px; }
.hint{ font-size: 12px; color: #666; margin: 6px 0 12px; }
</style>
