# PNS Component Library

A comprehensive Vue 3 component library built with modern development practices, providing reusable UI components, composables, and directives for building robust web applications.

## 🚀 Features

- **10 Production-Ready Components** - Form controls, layout components, and utility components
- **2 Powerful Composables** - Reusable logic for common patterns
- **2 Custom Directives** - Loading states and UI enhancements
- **Vue 3 Composition API** - Modern, performant, and type-safe
- **Fully Responsive UI & UX** - Components automatically adapt to all screen sizes with optimized mobile-first design and touch-friendly interactions
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
    
    <!-- Dynamic color responsive button (Recommended) -->
    <DynamicColorResponsiveButton 
      display_name="Click me" 
      button_type="filled" 
      built_in_theme="primary"
      @click-button="handleClick"
    />

    <!-- Legacy button (Deprecated but still works; not maintained). New projects should migrate to DynamicColorResponsiveButton. -->
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

#### AreaCodePhoneInput
International phone number input with country selection and area code handling. Features automatic country flag display, smart focus management, and a clear button that appears on hover/focus.

##### Attributes

| Attribute | Description | Type | Default |
|-----------|-------------|------|---------|
| v-model / modelValue | binding value - object containing `area_code` (string) and `phone_number` (string) | `{area_code: string, phone_number: string}` | `{}` |
| country_options | custom country list with `country_name` and `country_code` properties | `Array<{country_name: string, country_code: string}>` | `[]` |
| enable_backup_country_options | use built-in country list when no custom options provided | `boolean` | `true` |
| country_filterable | enable country search/filtering in dropdown | `boolean` | `true` |
| disabled | whether input is disabled | `boolean` | `false` |

##### Events

| Event | Description | Parameters |
|-------|-------------|------------|
| change | triggers when the binding value changes | `{area_code: string, phone_number: string}` |
| focus | triggers when any part of the input gains focus | `{area_code: string, phone_number: string}` |
| blur | triggers when the entire input loses focus | `{area_code: string, phone_number: string}` |
| clear | triggers when clear button is clicked | `{area_code: string, phone_number: string}` |

##### Exposes

| Method | Description | Type |
|--------|-------------|------|
| focus | focus the appropriate input (country selector if no country selected, phone input if country selected) | `() => void` |
| blur | blur both country selector and phone input | `() => void` |
| clear | clear both country selection and phone number | `() => void` |
| alert | show alert message below the input | `(message: string) => void` |
| error | show error message below the input | `(message: string) => void` |
| removeAlertOrErrorEffect | clear alert/error state and message | `() => void` |

```vue
<template>
  <AreaCodePhoneInput 
    v-model="phoneData" 
    :country_filterable="true"
    @change="handlePhoneChange"
  />
</template>
```

### Deprecated Components

> Note: Deprecated components still work and are supported for backward compatibility, but they are no longer maintained. For new development, please migrate to the recommended replacements.

#### ResponsiveButton (Deprecated, still works)
Legacy feature-rich button component superseded by `DynamicColorResponsiveButton`.

##### Attributes

| Attribute | Description | Type | Default |
|-----------|-------------|------|---------|
| display_name | button text | `string` | `'button'` |
| size | button size | `'xsmall' \| 'small' \| 'medium' \| 'large'` | `'small'` |
| width_type | button width type | `'fill-whole' \| 'fit-content'` | `'fit-content'` |
| build_in_theme | color theme | `'outlined-primary' \| 'filled-primary' \| 'text-primary' \| 'outlined-secondary' \| 'filled-secondary' \| 'text-secondary'` | `'outlined-primary'` |
| customized_class | custom CSS class | `string` | — |
| hold | whether button is in hold state | `boolean` | `false` |
| disabled | whether button is disabled | `boolean` | `false` |
| dropdown_options | dropdown menu options | `array` | `[]` |
| is_dropdown_option | whether this is a dropdown item | `boolean` | `false` |

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
<template>
  <ResponsiveButton 
    display_name="Save Changes"
    size="medium"
    build_in_theme="filled-primary"
    @click="handleSave"
  >
    <template #prefix>
      <img :src="iconsMap['eye_icon']" alt="eye" />
    </template>
  </ResponsiveButton>
</template>
```

#### InputBox
Versatile input field component with validation and styling options.

##### Attributes

| Attribute | Description | Type | Default |
|-----------|-------------|------|---------|
| v-model / modelValue | binding value - the current input text value | `string` | — |
| type | input type | `string` | `'text'` |
| placeholder | placeholder text | `string` | `'Enter'` |
| clearable | whether to show clear button | `boolean` | `false` |
| disabled | whether input is disabled | `boolean` | `false` |
| autocomplete | autocomplete attribute for input, raw input tag values work | `string` | `'off'` |

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

#### SingleSelector
Dropdown selector component with filtering and search capabilities.

##### Attributes

| Attribute | Description | Type | Default |
|-----------|-------------|------|---------|
| v-model / modelValue | binding value - the `value` property of the selected option from the options array | `string \| number \| boolean \| object \| array` | — |
| options | options array | `Array<{value: any, label: string}>` | `[]` |
| filterable | whether to enable filtering | `boolean` | `false` |
| remote_search | whether to enable remote search | `boolean` | `false` |
| disabled | whether selector is disabled | `boolean` | `false` |
| placeholder | placeholder text | `string` | `'Select'` |
| clearable | whether to show clear button | `boolean` | `false` |
| loading | loading state | `boolean` | `false` |
| loading_text | loading text | `string` | `'Loading'` |
| no_data_text | no data text | `string` | `'No data'` |
| filter_only_among_options_value | filter only among option values | `boolean` | `false` |
| filter_only_among_options_label | filter only among option labels | `boolean` | `false` |

> **Note**: `filter_only_among_options_value` and `filter_only_among_options_label` cannot be true at the same time. If both are true, `filter_only_among_options_value=true` will override `filter_only_among_options_label`'s logic.

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

#### Checkbox
Customizable checkbox with multiple themes and validation support.

##### Attributes

| Attribute | Description | Type | Default |
|-----------|-------------|------|---------|
| v-model / modelValue | binding value - `true` when checked, `false` when unchecked | `boolean` | `false` |
| label | checkbox label | `string` | — |
| size | checkbox size | `'small' \| 'medium'` | `'medium'` |
| built_in_theme | built-in color theme | `'green' \| 'primary-blue' \| 'secondary-blue'` | `'green'` |
| customized_theme_color | custom theme color (overrides built_in_theme) | `string`（any valid CSS color value） | `''` |
| customized_class | custom CSS class | `string` | — |
| disabled | whether checkbox is disabled | `boolean` | `false` |
| autofocus | whether to auto focus | `boolean` | `false` |
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
| error | show error message, will automatically use the error theme | `(message: string) => void` |
| removeAlertOrErrorEffect | clear error state | `() => void` |

```vue
<template>
  <!-- the #FF0000 will override the built-in theme color -->
  <Checkbox 
    v-model="agreed" 
    label="I agree to terms" 
    built_in_theme="primary-blue"
    customized_theme_color="#FF0000"
    @change="handleChange"
  />
  <!-- if want to use global defined color as the theme color, can use var() -->
  <Checkbox 
    v-model="agreed" 
    label="I agree to terms" 
    customized_theme_color="var(--Schemes-primary)"
    @change="handleChange"
  />
  <!-- Theme color can be any form of CSS color value. Since if the theme color isn't empty, it will override the built-in theme color. The background color of the checked and indeterminate state, and the mask color of the interaction effects of the checkbox will be the theme color, while the border color of unchecked checkbox will always be hsl(226, 8%, 10%). But when the checkbox is in error state, the theme will be error theme (the border color of unchecked checkbox, the background color of the checked and indeterminate state, and the mask color of the interaction effects of the checkbox will always be --semantic-error-color--) -->
  <Checkbox 
    v-model="agreed" 
    label="I agree to terms" 
    customized_theme_color="hsl(3, 71%, 40%)"
    @change="handleChange"
  />
</template>
```

#### GroupCheckbox
Container for managing multiple related checkboxes as a group.

##### Attributes

| Attribute | Description | Type | Default |
|-----------|-------------|------|---------|
| v-model / modelValue | binding value - array of selected checkbox labels from child Checkbox components | `array` | `[]` |

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

#### Radio
Radio button component for single selection from multiple options.

##### Attributes

| Attribute | Description | Type | Default |
|-----------|-------------|------|---------|
| v-model / modelValue | binding value - the `value` of the currently selected radio button in the group | `string` | — |
| value | radio value | `string` | — |
| label | radio label | `string` | — |
| name | group name for radio group | `string` | — |
| size | radio size | `'small' \| 'medium'` | `'medium'` |
| built_in_theme | color theme | `'primary-blue' \| 'secondary-blue' \| 'red'` | `'primary-blue'` |
| customized_class | custom CSS class | `string` | — |
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

#### Badge
Notification badge component with customizable size, position, themes, and content display. Features automatic text color calculation for optimal contrast.

##### Attributes

| Attribute | Description | Type | Default |
|-----------|-------------|------|---------|
| content | badge content (number or text) | `string \| number` | `''` |
| size | badge size | `'small' \| 'medium' \| 'large'` | `'small'` |
| position_type | badge position relative to content | `'top-right' \| 'center-right'` | `'top-right'` |
| built_in_theme | color theme | `'primary' \| 'secondary'` | `'primary'` |
| customized_theme_color | custom background color (any valid CSS color) | `string` | `''` |
| customized_class | custom CSS class | `string` | `''` |

##### Size Specifications

| Size | Web (px) | Mobile ≤767px (px) | With Content |
|------|----------|-------------------|--------------|
| small | 6×6 | 6×6 | auto-sized |
| medium | 8×8 | 6×6 | auto-sized |
| large | 16×16 | 16×16 | auto-sized |

> **Note**: When badge has content, it automatically becomes large with padding (min-width: 20px, height: 20px).

##### Position Types

| Position | Behavior |
|----------|----------|
| top-right | Positioned absolutely at top-right corner (0, 0) |
| center-right | Inline-flex aligned at right side with 4px gap |

> **Note**: Use padding on the wrapper div to control badge position. The badge positions relative to the wrapper's content.

##### Built-in Themes

| Theme | Background | Text Color |
|-------|-----------|------------|
| primary | #AF251D (red) | #FFFFFF (white) |
| secondary | #CFE0FC (light blue) | #083D91 (dark blue) |

##### Custom Theme Color

When using `customized_theme_color`, the text color is automatically calculated based on the background lightness:
- Light backgrounds (lightness > 50%) → dark text
- Dark backgrounds (lightness ≤ 50%) → light text

The algorithm adjusts lightness by ±60 while preserving hue and saturation for optimal contrast and color harmony.

```vue
<template>
  <!-- Basic badge with sizes -->
  <Badge size="small">
    <div style="padding: 4px;">
      <div>Icon</div>
    </div>
  </Badge>

  <!-- Badge with content -->
  <Badge content="5">
    <div style="padding: 8px;">
      <div>Icon</div>
    </div>
  </Badge>

  <!-- Badge with position types -->
  <Badge position_type="top-right" content="3">
    <div style="padding: 8px;">
      <div>Icon</div>
    </div>
  </Badge>

  <!-- Badge with custom color -->
  <Badge customized_theme_color="#10B981" content="New">
    <div style="padding: 8px;">
      <div>Icon</div>
    </div>
  </Badge>

  <!-- Dark background example -->
  <Badge customized_theme_color="hsl(220, 70%, 25%)" content="Dark">
    <div style="padding: 8px;">
      <div>Icon</div>
    </div>
  </Badge>
</template>
```

### Interactive Components

#### DynamicColorResponsiveButton
Modern button with dynamic color logic and responsive behavior.

##### Attributes

| Attribute | Description | Type | Default |
|-----------|-------------|------|---------|
| button_type | button style variant | `'filled' \| 'outlined' \| 'text' \| 'elevated'` | `'filled'` |
| button_border_radius | CSS border-radius value | `string` | `'100px'` |
| built_in_theme | built-in color theme | `'primary' \| 'secondary' \| 'tertiary' \| 'primary-container' \| 'secondary-container' \| 'tertiary-container'` | `'primary'` |
| customized_theme_color | overrides built_in_theme with any CSS color (e.g., `#3d5c8f`, `rgb(...)`, `hsl(...)`, `var(--Schemes-primary)`) | `string` | `''` |
| customized_class | custom CSS class for outer container | `string` | `''` |
| width_type | width mode | `'fill-whole' \| 'fit-content'` (auto-handles icon-only with `narrow`/`wide`) | `'fit-content'` |
| button_id | explicit id used in emitted event; falls back to `display_name` | `string` | `''` |
| display_name | button text (used when default slot empty) | `string` | `'button name'` |
| prefix | image url for prefix when not using slot | `string` | `''` |
| suffix | image url for suffix when not using slot | `string` | `''` |
| prefix_slot_raw_html_content | raw html for prefix (when not using named slot) | `string` | `''` |
| suffix_slot_raw_html_content | raw html for suffix (when not using named slot) | `string` | `''` |
| disabled | disable interaction | `boolean` | `false` |
| size | size (Web/Tablet enum) | `'small' \| 'medium' \| 'large' \| 'xlarge'` | `'small'` |

##### Events

| Event | Description | Parameters |
|-------|-------------|------------|
| click-button | emitted on button click | `(button_id: string, display_name: string)` |

##### Exposes

| Method | Description | Type |
|--------|-------------|------|
| handleFocusButton | programmatically apply focus style | `() => void` |
| handleBlurButton | remove focus style | `() => void` |

##### Slots

| Name | Description |
|------|-------------|
| prefix | content before the label (e.g., icon) |
| default | label content; falls back to `display_name` |
| suffix | content after the label (e.g., icon) |

```vue
<template>
  <DynamicColorResponsiveButton 
    button_id="save-changes"
    display_name="Save Changes"
    button_type="filled"
    built_in_theme="primary"
    width_type="fit-content"
    @click-button="onSave"
  >
    <template #prefix>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M5 12h14v2H5z"/></svg>
    </template>
  </DynamicColorResponsiveButton>
</template>

<script setup>
function onSave(id, name){
  console.log('clicked:', id, name)
}
</script>
```

#### FloatingActionButton
Mobile-only floating action button that anchors to the bottom-right of the viewport on small screens. It supports three sizes, built-in themes or a custom theme color, named slots for icons, and an optional one-level options menu. The button is automatically hidden on wide screens (when `window.width > 1024`).

##### Attributes

| Attribute | Description | Type | Default |
|-----------|-------------|------|---------|
| display_name | button text | `string` | `'button'` |
| size | button size | `'small' \| 'medium' \| 'large'` | `'small'` |
| build_in_theme | built-in color theme | `'primary' \| 'secondary' \| 'tertiary' \| 'primary-container' \| 'secondary-container' \| 'tertiary-container'` | `'primary'` |
| customized_theme_color | custom theme color (overrides built_in_theme). Accepts any valid CSS color string (e.g., `#3d5c8f`, `rgb(61, 92, 143)`, `hsl(217, 40%, 40%)`, or `var(--Schemes-primary)`). | `string` | `''` |
| customized_class | custom CSS class for the outer container | `string` | `''` |
| options | optional menu options (one level). Each item is `{ value: any, label: string, prefix?: string, suffix?: string }`. `prefix`/`suffix` are icon URLs for the option. | `array` | `[]` |

> Notes
> - When `options` is non-empty, clicking the FAB toggles the options menu. A cross button is provided to close the menu.
> - The component is hidden on wide screens (`width > 1024`) by design to target mobile usage.
> - `customized_theme_color` overrides `build_in_theme`. If it is not provided (empty string), the `build_in_theme` color will be used instead.
> - `customized_theme_color` accepts any valid CSS color value: e.g. `hsl(217, 40%, 40%)`, `#ff0000`, `rgb(255, 0, 0)`, `rgba(255, 0, 0, 0.5)`, `hsla(217, 40%, 40%, 0.5)`, or `var(--Schemes-primary)`.
> - When using `customized_theme_color`:
>   - The FAB background color uses the provided value directly.
>   - Related colors (text color, inline SVG color via currentColor, menu cross button colors, menu child button colors, and interaction masks) are dynamically calculated based on the `customized_theme_color` to ensure contrast and visual harmony.

##### Events

| Event | Description | Parameters |
|-------|-------------|------------|
| floating-action-button-click | emitted when the floating action button is clicked. If `options` is provided, this also toggles the menu visibility. | — |
| option-click | emitted when a menu option is clicked | `(value: any)` |

##### Slots

| Name | Description |
|------|-------------|
| prefix | content rendered before the button text. Commonly used for an icon. |
| default | default slot for button label content. Falls back to `display_name` when empty. |
| suffix | content rendered after the button text. Commonly used for an icon. |

```vue
<script setup>
const quickCreateOptions = [
  { value: 'photo', label: 'New Photo' },
  { value: 'video', label: 'New Video' },
  { value: 'doc', label: 'New Doc' },
]

const handleFabClick = () => {
  console.log('FAB clicked')
}

const handleOptionClick = (val) => {
  console.log('Option clicked:', val)
}
</script>

<template>
  <!-- Will only be visible on small screens (hidden on width > 1024) -->
  <FloatingActionButton
    display_name="New"
    size="small"
    build_in_theme="tertiary"
    :options="quickCreateOptions"
    @floating-action-button-click="handleFabClick"
    @option-click="handleOptionClick"
  >
    <template #prefix>
      <!-- Example icon (uses currentColor to adapt) -->
      <!-- Pros of using inline SVG:
           - Inherits currentColor automatically, so it adapts to theme/text color without extra CSS
           - Reacts naturally to hover/active color-mix effects used by the component
           - No additional network request for external assets
         Using a regular <img src="..."> is also fine if you prefer image assets;
         just note that <img> won't inherit currentColor by default (you'd need pre-colored assets or additional CSS). -->
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M6 16L10 12.95L14 16L12.5 11.05L16.5 8.2H11.6L10 3L8.4 8.2H3.5L7.5 11.05L6 16ZM10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.3125 6.1 0.7875C7.31667 0.2625 8.61667 0 10 0C11.3833 0 12.6833 0.2625 13.9 0.7875C15.1167 1.3125 16.175 2.025 17.075 2.925C17.975 3.825 18.6875 4.88333 19.2125 6.1C19.7375 7.31667 20 8.61667 20 10C20 11.3833 19.7375 12.6833 19.2125 13.9C18.6875 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6875 13.9 19.2125C12.6833 19.7375 11.3833 20 10 20Z" fill="currentColor"/>
      </svg>
    </template>
  </FloatingActionButton>

  <!-- Custom theme color overrides built-in theme -->
  <FloatingActionButton
    display_name="Custom"
    size="medium"
    customized_theme_color="hsl(217, 40%, 40%)"
    @floating-action-button-click="handleFabClick"
  />
</template>
```

### Feedback Components

#### SimplifiedNotification
Toast notification component for user feedback.

##### Attributes

| Attribute | Description | Type | Default |
|-----------|-------------|------|---------|
| content | notification content | `string` | — |
| build_in_theme | color theme | `'blue' \| 'red' \| 'yellow' \| 'green'` | `'blue'` |
| title | notification title | `string` | — |
| customized_alert_icon_src | custom icon URL | `string` | — |
| customized_class | custom CSS class | `string` | — |
| with_close_btn | whether to show close button | `boolean` | `true` |
| mounted_programmatically | whether mounted programmatically | `boolean` | `false` |
| hide_after | auto-hide after milliseconds (0 = never) | `number` | `0` |

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
  title="Success"
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
<DynamicColorResponsiveButton button_type="filled" built_in_theme="primary" />
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

