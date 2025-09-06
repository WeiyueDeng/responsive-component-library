# PNS Component Library

A comprehensive Vue 3 component library built with modern development practices, providing reusable UI components, composables, and directives for building robust web applications.

## 🚀 Features

- **9 Production-Ready Components** - Form controls, layout components, and utility components
- **2 Powerful Composables** - Reusable logic for common patterns
- **2 Custom Directives** - Loading states and UI enhancements
- **Vue 3 Composition API** - Modern, performant, and type-safe
- **Responsive Design** - Mobile-first approach with breakpoint handling
- **Accessibility** - ARIA attributes and keyboard navigation support
- **Customizable Themes** - Multiple built-in color schemes

## 📦 Installation

```bash
npm install pns-component-library
```
or

```bash
npm install pns-component-library@latest
```

## 🎯 Quick Start

### 1. Install and Setup

First, import and register the library in your `main.js`:

```javascript
// main.js
import { createApp } from 'vue'
import App from './App.vue'
import PnsComponentLibrary from 'pns-component-library'
import 'pns-component-library/style.css'

const app = createApp(App)
app.use(PnsComponentLibrary)
app.mount('#app')
```

### 2. Use Components

```vue
<template>
  <div>
    <!-- Basic checkbox -->
    <Checkbox v-model="isChecked" label="Accept terms" />
    
    <!-- Phone input with country selection -->
    <AreaCodePhoneInput v-model="phoneData" />
    
    <!-- Responsive button -->
    <ResponsiveButton @click="handleClick">
      Click me
    </ResponsiveButton>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isChecked = ref(false)
const phoneData = ref({ area_code: '', phone_number: '' })

const handleClick = () => {
  console.log('Button clicked!')
}
</script>
```

## 📚 Components

### Form Components

#### Checkbox
Customizable checkbox with multiple themes and validation support.

##### Attributes

| Attribute | Description | Type | Default |
|-----------|-------------|------|---------|
| model-value / v-model | binding value - `true` when checked, `false` when unchecked | `boolean` | `false` |
| label | checkbox label | `string` | — |
| size | checkbox size | `'small' \| 'medium'` | `'medium'` |
| built-in-theme | color theme | `'green' \| 'primary-blue' \| 'secondary-blue' \| 'red'` | `'green'` |
| disabled | whether checkbox is disabled | `boolean` | `false` |
| indeterminate | whether checkbox is indeterminate | `boolean` | `false` |

##### Events

| Event | Description | Parameters |
|-------|-------------|------------|
| change | triggers when the binding value changes | `(value: boolean)` |

##### Exposes

| Method | Description | Type |
|--------|-------------|------|
| focus | focus the checkbox | `() => void` |
| blur | blur the checkbox | `() => void` |
| alert | show error message | `(message: string) => void` |
| removeAlertOrErrorEffect | clear error state | `() => void` |

```vue
<template>
  <Checkbox 
    v-model="agreed" 
    label="I agree to terms" 
    built_in_theme="primary-blue"
    @change="handleChange"
  />
</template>
```

#### GroupCheckbox
Container for managing multiple related checkboxes as a group.

##### Attributes

| Attribute | Description | Type | Default |
|-----------|-------------|------|---------|
| model-value / v-model | binding value - array of selected checkbox labels from child Checkbox components | `array` | `[]` |

##### Events

| Event | Description | Parameters |
|-------|-------------|------------|
| change | triggers when the binding value changes | `(value: array)` |

```vue
<template>
  <GroupCheckbox v-model="selectedItems">
    <Checkbox v-for="item in options" :key="item" :label="item" />
  </GroupCheckbox>
</template>

<script setup>
const selectedItems = ref(['option1'])
const options = ['option1', 'option2', 'option3']
</script>
```

#### AreaCodePhoneInput
International phone number input with country selection and area code handling.

##### Attributes

| Attribute | Description | Type | Default |
|-----------|-------------|------|---------|
| model-value / v-model | binding value - object containing `area_code` (country code like "+1") and `phone_number` (local number) | `{area_code: string, phone_number: string}` | `{area_code: '', phone_number: ''}` |
| country-options | custom country list | `array` | — |
| enable-backup-country-options | use built-in country list | `boolean` | `true` |
| country-filterable | enable country search | `boolean` | `false` |
| disabled | whether input is disabled | `boolean` | `false` |

##### Events

| Event | Description | Parameters |
|-------|-------------|------------|
| change | triggers when the binding value changes | `(value: object)` |
| focus | triggers when input is focused | `(event: FocusEvent)` |
| blur | triggers when input is blurred | `(event: FocusEvent)` |
| clear | triggers when clear button is clicked | — |

```vue
<template>
  <AreaCodePhoneInput 
    v-model="phoneData" 
    :country_filterable="true"
    @change="handlePhoneChange"
  />
</template>
```

#### InputBox
Versatile input field component with validation and styling options.

##### Attributes

| Attribute | Description | Type | Default |
|-----------|-------------|------|---------|
| model-value / v-model | binding value - the current input text value | `string` | — |
| type | input type | `string` | `'text'` |
| placeholder | placeholder text | `string` | — |
| clearable | whether to show clear button | `boolean` | `false` |
| disabled | whether input is disabled | `boolean` | `false` |

##### Events

| Event | Description | Parameters |
|-------|-------------|------------|
| input | triggers when input value changes | `(value: string)` |
| change | triggers when input value changes and loses focus | `(value: string)` |
| focus | triggers when input is focused | `(event: FocusEvent)` |
| blur | triggers when input is blurred | `(event: FocusEvent)` |
| clear | triggers when clear button is clicked | — |

##### Exposes

| Method | Description | Type |
|--------|-------------|------|
| focus | focus the input | `() => void` |
| blur | blur the input | `() => void` |
| alert | show alert message | `(message: string) => void` |
| error | show error message | `(message: string) => void` |
| removeAlertOrErrorEffect | clear alert/error state | `() => void` |

##### Slots

| Name | Description |
|------|-------------|
| prefix | content before input |
| suffix | content after input |

```vue
<InputBox 
  v-model="value" 
  type="text" 
  placeholder="Enter text" 
  clearable
>
  <template #prefix>
    <Icon name="search" />
  </template>
</InputBox>
```

#### Radio
Radio button component for single selection from multiple options.

##### Attributes

| Attribute | Description | Type | Default |
|-----------|-------------|------|---------|
| model-value / v-model | binding value - the `value` of the currently selected radio button in the group | `string` | — |
| value | radio value | `string` | — |
| label | radio label | `string` | — |
| name | group name for radio group | `string` | — |
| size | radio size | `'small' \| 'medium'` | `'medium'` |
| built-in-theme | color theme | `'primary-blue' \| 'secondary-blue' \| 'red'` | `'primary-blue'` |
| customized-class | custom CSS class | `string` | — |
| disabled | whether radio is disabled | `boolean` | `false` |
| autofocus | whether to auto focus | `boolean` | `false` |

##### Events

| Event | Description | Parameters |
|-------|-------------|------------|
| change | triggers when the binding value changes | `(value: string)` |

##### Exposes

| Method | Description | Type |
|--------|-------------|------|
| focus | focus the radio | `() => void` |
| blur | blur the radio | `() => void` |
| alert | show alert message | `(message: string) => void` |
| removeAlertOrErrorEffect | clear alert/error state | `() => void` |

```vue
<!-- Radio Group -->
<Radio v-model="selected" value="option1" name="group1" label="Option 1" />
<Radio v-model="selected" value="option2" name="group1" label="Option 2" />

<!-- Single Radio -->
<Radio v-model="single" value="yes" label="Agree to terms" />
```

#### SingleSelector
Dropdown selector component with filtering and search capabilities.

##### Attributes

| Attribute | Description | Type | Default |
|-----------|-------------|------|---------|
| model-value / v-model | binding value - the `value` property of the selected option from the options array | `string \| number \| boolean \| object \| array` | — |
| options | options array | `Array<{value: any, label: string}>` | `[]` |
| filterable | whether to enable filtering | `boolean` | `false` |
| remote-search | whether to enable remote search | `boolean` | `false` |
| disabled | whether selector is disabled | `boolean` | `false` |
| placeholder | placeholder text | `string` | `'Select'` |
| clearable | whether to show clear button | `boolean` | `false` |
| loading | loading state | `boolean` | `false` |
| loading-text | loading text | `string` | `'Loading'` |
| no-data-text | no data text | `string` | `'No data'` |

##### Events

| Event | Description | Parameters |
|-------|-------------|------------|
| change | triggers when the binding value changes | `(value: any)` |
| remote-search | triggers when remote search is performed | `(query: string)` |
| filter-change | triggers when filter text changes | `(query: string)` |
| visible-change | triggers when dropdown visibility changes | `(visible: boolean)` |
| focus | triggers when selector is focused | `(event: FocusEvent)` |
| blur | triggers when selector is blurred | `(event: FocusEvent)` |
| clear | triggers when clear button is clicked | — |

##### Exposes

| Method | Description | Type |
|--------|-------------|------|
| focus | focus the selector | `() => void` |
| blur | blur the selector | `() => void` |
| alert | show alert message | `(message: string) => void` |
| error | show error message | `(message: string) => void` |
| removeAlertOrErrorEffect | clear alert/error state | `() => void` |
| setDropdownContentLoading | set loading state | `(loading: boolean) => void` |

##### Slots

| Name | Description |
|------|-------------|
| prefix | content before selector |
| suffix | content after selector |

```vue
<SingleSelector 
  v-model="selected"
  :options="options"
  filterable
  clearable
  placeholder="Choose option"
>
  <template #prefix>
    <Icon name="search" />
  </template>
</SingleSelector>
```

### Layout Components

#### ResponsiveButton
Feature-rich button component with responsive behavior and multiple states.

##### Attributes

| Attribute | Description | Type | Default |
|-----------|-------------|------|---------|
| display-name | button text | `string` | `'button'` |
| size | button size | `'xsmall' \| 'small' \| 'medium' \| 'large'` | `'small'` |
| width-type | button width type | `'fill-whole' \| 'fit-content'` | `'fit-content'` |
| build-in-theme | color theme | `'outlined-primary' \| 'filled-primary' \| 'text-primary' \| 'outlined-secondary' \| 'filled-secondary' \| 'text-secondary'` | `'outlined-primary'` |
| customized-class | custom CSS class | `string` | — |
| hold | whether button is in hold state | `boolean` | `false` |
| disabled | whether button is disabled | `boolean` | `false` |
| dropdown-options | dropdown menu options | `array` | `[]` |
| is-dropdown-option | whether this is a dropdown item | `boolean` | `false` |

##### Events

| Event | Description | Parameters |
|-------|-------------|------------|
| click | triggers when button is clicked | `(event: MouseEvent)` |
| update-currently-hovered-dropdown-option | triggers when dropdown option is hovered | `(option: object)` |
| add-nested-dropdown-history-stack | triggers when nested dropdown is navigated | `(option: object)` |
| remove-nested-dropdown-history-stack | triggers when navigating back in nested dropdown | — |

##### Slots

| Name | Description |
|------|-------------|
| prefix | content before button text |
| suffix | content after button text |

```vue
<ResponsiveButton 
  display_name="Save Changes"
  size="medium"
  build_in_theme="filled-primary"
  @click="handleSave"
>
  <template #prefix>
    <Icon name="save" />
  </template>
</ResponsiveButton>
```

### Utility Components

#### SimplifiedNotification
Toast notification component for user feedback.

##### Attributes

| Attribute | Description | Type | Default |
|-----------|-------------|------|---------|
| content | notification content | `string` | — |
| build-in-theme | color theme | `'blue' \| 'red' \| 'yellow' \| 'green'` | `'blue'` |
| title | notification title | `string` | — |
| customized-alert-icon-src | custom icon URL | `string` | — |
| customized-class | custom CSS class | `string` | — |
| with-close-btn | whether to show close button | `boolean` | `true` |
| mounted-programmatically | whether mounted programmatically | `boolean` | `false` |
| hide-after | auto-hide after milliseconds (0 = never) | `number` | `0` |

##### Events

| Event | Description | Parameters |
|-------|-------------|------------|
| close | triggers when notification is closed | — |

##### Slots

| Name | Description |
|------|-------------|
| content | custom notification content |

```vue
<SimplifiedNotification 
  title="Success!"
  content="Operation completed successfully"
  build_in_theme="green"
  :hide_after="3000"
  @close="handleClose"
/>
```

#### WholePageErrorPopup
Full-page error overlay for critical error states.

##### Attributes

| Attribute | Description | Type | Default |
|-----------|-------------|------|---------|
| title | error title | `string` | `'Error'` |
| content | error message | `string` | `'An error has occured'` |

##### Events

| Event | Description | Parameters |
|-------|-------------|------------|
| retry | triggers when retry button is clicked | — |

##### Slots

| Name | Description |
|------|-------------|
| content | custom error content |

```vue
<WholePageErrorPopup 
  title="Connection Error"
  content="Unable to connect to server. Please check your internet connection."
  @retry="handleRetry"
/>
```

## 🔧 Composables

### FloatingNotification
Programmatically create floating notifications.

##### Parameters

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| type | notification type | `'success' \| 'error' \| 'warning' \| 'info'` | `'info'` |
| message | notification message | `string` | — |
| duration | auto-hide duration in milliseconds | `number` | `3000` |
| title | notification title | `string` | — |

##### Returns

| Type | Description |
|------|-------------|
| `void` | Creates and displays the notification |

```javascript
import { FloatingNotification } from 'pns-component-library/composables'

// Show notification
FloatingNotification({
  type: 'success',
  message: 'Operation completed!',
  duration: 3000
})
```

### useWindowSize
Reactive window size tracking composable.

##### Returns

| Property | Description | Type |
|----------|-------------|------|
| width | current window width | `Ref<number>` |
| height | current window height | `Ref<number>` |

```javascript
import { useWindowSize } from 'pns-component-library/composables'

const { width, height } = useWindowSize()

// Use in template or computed
watchEffect(() => {
  console.log(`Window size: ${width.value}x${height.value}`)
})
```

## 🎨 Directives

### v-component-loading
Add loading state to any component with overlay spinner.

##### Usage

| Binding | Description | Type |
|---------|-------------|------|
| value | whether to show loading state | `boolean` |

```vue
<template>
  <div v-component-loading="isLoading">
    Content here
  </div>
</template>

<script setup>
import { ref } from 'vue'
const isLoading = ref(false)

// Toggle loading
const startLoading = () => {
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
  }, 2000)
}
</script>
```

### v-whole-page-loading
Full-page loading overlay that covers the entire viewport.

##### Usage

| Binding | Description | Type |
|---------|-------------|------|
| value | whether to show full-page loading | `boolean` |

```vue
<template>
  <div v-whole-page-loading="isPageLoading">
    App content
  </div>
</template>

<script setup>
import { ref } from 'vue'
const isPageLoading = ref(false)

// Show page loading
const loadPage = async () => {
  isPageLoading.value = true
  try {
    await fetchData()
  } finally {
    isPageLoading.value = false
  }
}
</script>
```

## 🎨 Theming

The library provides multiple built-in themes:

- **Green** (default) - Primary green theme
- **Primary Blue** - Professional blue theme  
- **Secondary Blue** - Light blue accent theme
- **Red** - Error/warning red theme

```vue
<Checkbox built_in_theme="primary-blue" />
<ResponsiveButton variant="secondary-blue" />
```

## 📱 Responsive Design

Components automatically adapt to different screen sizes:

- **Desktop**: Full feature set with optimal spacing
- **Mobile**: Compact layouts with touch-friendly interactions
- **Breakpoint**: 767px for mobile/desktop switching

## ♿ Accessibility

All components include:

- ARIA attributes for screen readers
- Keyboard navigation support
- Focus management
- High contrast support
- Semantic HTML structure

## 🛠 Development

### Project Setup

```bash
npm install
```

### Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Component Documentation

Visit the demo pages to see all components in action with interactive examples.

## 📄 License

MIT License - see LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests and documentation
5. Submit a pull request

## 📞 Support

For questions and support, please open an issue on the GitHub repository.

---

Built with ❤️ using Vue 3 and modern web technologies.

