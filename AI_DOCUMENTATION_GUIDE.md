# AI Component Library Documentation Guide

This guide provides instructions for AI assistants to analyze and document the PNS Component Library effectively.

## Library Structure Overview

```
src/
├── components/           # Main component implementations
├── componentsDemo/       # Demo/example files for each component
├── composables/         # Reusable Vue composables (may depend on components)
├── directives/          # Custom Vue directives (may depend on components)
└── assets/             # Static assets (icons, etc.)
```

**Important**: Composables and directives may have dependencies on components and should be documented alongside their related components.

## Component Analysis Workflow

### Step 1: Identify Available Components and Related Assets

**Components Location**: `/src/components/`
**Composables Location**: `/src/composables/`
**Directives Location**: `/src/directives/`

**Current Components**:
- AreaCodePhoneInput.vue
- Checkbox.vue  
- GroupCheckbox.vue
- InputBox.vue
- Radio.vue
- ResponsiveButton.vue
- SimplifiedNotification.vue
- SingleSelector.vue
- WholePageErrorPopup.vue

**Current Composables** (check `/src/composables/`):
- FloatingNotification.js (depends on SimplifiedNotification.vue)
- useWindowSize.js
- [Other composables as found]

**Current Directives** (check `/src/directives/`):
- component_loading.js
- whole_page_loading.js
- [Other directives as found]

**Note**: Most directives are demonstrated in `DirectivesDoc.vue`, but some may appear in other component demo files as the library evolves.

### Step 2: Analyze Each Component with Precision

For each component, examine these key areas with **EXACT ACCURACY**:

#### A. Component Implementation (`/src/components/[ComponentName].vue`)

**CRITICAL RULE**: Document components **EXACTLY** as they appear in the code. Use the exact variable names, types, formats, and default values from the source code.

**Props Analysis - EXACT EXTRACTION RULES**:

1. **Composition API (defineProps)**:
```javascript
// Extract EXACTLY as written in code
const props = defineProps({
  modelValue: {
    type: Object,           // ← Use EXACT type (Object, not "object")
    default: () => ({})     // ← Use EXACT default value syntax
  },
  country_options: {        // ← Use EXACT prop name (snake_case if used)
    type: Array,
    default: () => []       // ← Use EXACT default value
  },
  enable_backup_country_options: {
    type: Boolean,
    default: true           // ← Use EXACT boolean value (not "true")
  }
});
```

2. **Options API (props object)**:
```javascript
props: {
  propName: {
    type: String,           // ← Extract EXACT type constructor
    default: 'defaultVal',  // ← Extract EXACT default value
    required: false,        // ← Extract EXACT required boolean
    validator: function     // ← Note if validator exists
  }
}
```

**DOCUMENTATION FORMAT RULES**:
- **Prop Names**: Use EXACT names from code (preserve snake_case, camelCase, etc.)
- **Types**: Use EXACT JavaScript constructors (String, Number, Boolean, Array, Object, Function)
- **Defaults**: Copy EXACT default values including syntax (`() => {}`, `[]`, `''`, `null`, etc.)
- **Required**: Use exact boolean value from code

**Events Analysis - EXACT PARAMETER EXTRACTION**:

1. **Find emit definitions**:
```javascript
// Composition API
const emits = defineEmits(['update:modelValue', 'change', 'focus', 'blur', 'clear']);

// Options API  
emits: ['event-name', 'update:modelValue']
```

2. **Find emit calls to determine EXACT parameters**:
```javascript
// Search for emit calls like:
emits('update:modelValue', {
    area_code: area_code.value,
    phone_number: phone_number.value
});

emits('change', {
    area_code: area_code.value, 
    phone_number: phone_number.value
});

emits('focus', {
    area_code: area_code.value,
    phone_number: phone_number.value
});
```

**DOCUMENTATION FORMAT RULES**:
- **Event Names**: Use EXACT event names from emits array
- **Parameters**: Document EXACT parameter structure from emit calls
- **Parameter Types**: Infer from actual usage in emit calls

**Exposed Methods - EXACT METHOD EXTRACTION**:

1. **Find defineExpose calls**:
```javascript
// Extract EXACT method names and their implementations
defineExpose({
    focus,                    // ← Document exactly as exposed
    blur, 
    clear,
    alert,
    error,
    removeAlertOrErrorEffect
});
```

2. **Find method implementations to document parameters and behavior**:
```javascript
// Example: Extract exact method signature
const focus = () => {
    if(!selected_country.value){
        countryAreaCodeSelector?.value?.focus();
    }else{
        phoneNumberInput?.value?.focus();
    }
};

const alert = (msg) => {
    show_alert.value = true;
    message_notification_text.value = msg;
};
```

**DOCUMENTATION FORMAT RULES**:
- **Method Names**: Use EXACT names from defineExpose
- **Parameters**: Document EXACT parameter names and types from implementation
- **Return Types**: Document actual return types (void, boolean, etc.)
- **Behavior**: Describe EXACT behavior from implementation

**Slots Analysis - EXACT SLOT EXTRACTION**:

1. **Find slot usage in template**:
```vue
<!-- Extract EXACT slot names and structure -->
<template #prefix v-if="selected_country">
    <img :src="`https://hatscripts.github.io/circle-flags/flags/${selected_country.toLowerCase()}.svg`" class="country-selector-prefix"/>
</template>

<slot name="slotName">Default content</slot>
<slot>Default slot</slot>
```

2. **Find slot props/scope**:
```vue
<!-- Document any scoped slot data -->
<slot name="item" :item="item" :index="index"></slot>
```

**DOCUMENTATION FORMAT RULES**:
- **Slot Names**: Use EXACT names from template (including "default" for unnamed slots)
- **Scoped Data**: Document EXACT prop names and types passed to slots
- **Usage Context**: Note where slots appear in component structure

#### B. Demo Implementation Analysis

**Note**: Not all components have dedicated `[ComponentName]Doc.vue` files. Some components are demonstrated within other component documentation files. Additionally, composables and directives may be demonstrated in component demo files.

**Demo Location Strategy**:
1. **Primary**: Look for `/src/componentsDemo/[ComponentName]Doc.vue`
2. **Secondary**: If not found, search for component usage in other Doc files:
   ```bash
   # Search for component usage across all demo files
   grep -r "ComponentName" /src/componentsDemo/
   # Example: GroupCheckbox is demonstrated in CheckboxDoc.vue
   ```
3. **Composables/Directives**: Search for usage examples in demo files:
   ```bash
   # Composables: May appear in related component demo files
   grep -r "FloatingNotification" /src/componentsDemo/
   
   # Directives: Primary location is DirectivesDoc.vue, but search all demo files
   grep -r "v-component-loading\|v-whole-page-loading" /src/componentsDemo/
   grep -r "component_loading\|whole_page_loading" /src/componentsDemo/
   ```

**Usage Examples to Extract**:
- Basic usage patterns
- Advanced configurations
- Event handling examples
- Prop combinations
- Integration patterns
- **Composable usage patterns** (import statements, function calls, parameters)
- **Directive usage patterns** (v-directive syntax, modifiers, values)

**Data Properties to Note**:
- Example data structures
- Default values
- State management patterns
- **Composable parameters and return values**

### Step 3: Documentation Structure

Generate documentation following this template:

```markdown
# [ComponentName] Documentation

## Overview
Brief description of component purpose and use cases.

## Basic Usage
```vue
<template>
  <!-- Simple example from Demo file -->
</template>
```

## API Reference

### Props
| Name | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| propName | `ExactType` | `exactDefault` | `true`/`false` | Description |

### Events
| Event | Description | Parameters |
|-------|-------------|------------|
| eventName | Description | `{exactParam: string, otherParam: number}` |

### Slots
| Name | Description | Scoped Props |
|------|-------------|-------------|
| slotName | Description | `{prop: Type, index: number}` |

### Exposed Methods
| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| methodName | `(exactParam: Type)` | `ReturnType` | Description |

## Related Composables/Directives (if applicable)

### [ComposableName] Composable
**File**: `/src/composables/[ComposableName].js`
**Dependencies**: [ComponentName].vue

#### Usage
```javascript
import { ComposableName } from '@/composables/ComposableName'

// Usage example from demo files
const result = ComposableName(parameters)
```

#### Parameters
| Name | Type | Required | Description |
|------|------|----------|-------------|
| param | Type | Yes/No | Description |

#### Returns
| Type | Description |
|------|-------------|
| ReturnType | Description |

## Examples
[Include various usage examples from Demo file]

## Best Practices
[Component-specific guidelines]
```

## PRECISE Analysis Instructions

### 1. Component Props - EXACT EXTRACTION
```bash
# Step 1: Find props definition
grep -n "props:" /src/components/[ComponentName].vue
grep -n "defineProps" /src/components/[ComponentName].vue

# Step 2: Extract COMPLETE props object (including all properties)
grep -A 20 "defineProps({" /src/components/[ComponentName].vue
grep -A 20 "props: {" /src/components/[ComponentName].vue

# Step 3: Verify default values and types
grep -n "type:" /src/components/[ComponentName].vue
grep -n "default:" /src/components/[ComponentName].vue
grep -n "required:" /src/components/[ComponentName].vue
```

**EXTRACTION CHECKLIST**:
- [ ] Exact prop name (preserve casing)
- [ ] Exact type constructor (String, Number, Boolean, Array, Object, Function)
- [ ] Exact default value (including functions like `() => []`)
- [ ] Exact required boolean
- [ ] Any validator functions

### 2. Component Events - EXACT PARAMETER CAPTURE
```bash
# Step 1: Find emits definition
grep -n "emits:" /src/components/[ComponentName].vue
grep -n "defineEmits" /src/components/[ComponentName].vue

# Step 2: Find ALL emit calls to determine exact parameters
grep -n "emits(" /src/components/[ComponentName].vue
grep -n "\$emit" /src/components/[ComponentName].vue

# Step 3: Extract complete emit call context
grep -A 5 -B 2 "emits('" /src/components/[ComponentName].vue
grep -A 5 -B 2 "\$emit('" /src/components/[ComponentName].vue
```

**EXTRACTION CHECKLIST**:
- [ ] Exact event names from emits array
- [ ] Exact parameter structure from emit calls
- [ ] Parameter types inferred from usage
- [ ] When events are triggered (context from surrounding code)

### 3. Exposed Methods - EXACT IMPLEMENTATION CAPTURE
```bash
# Step 1: Find expose definition
grep -n "expose:" /src/components/[ComponentName].vue
grep -n "defineExpose" /src/components/[ComponentName].vue

# Step 2: Find method implementations
for method in $(grep -o "defineExpose({[^}]*}" /src/components/[ComponentName].vue | grep -o "[a-zA-Z_][a-zA-Z0-9_]*" | grep -v "defineExpose"); do
  grep -A 10 "const $method = " /src/components/[ComponentName].vue
  grep -A 10 "function $method" /src/components/[ComponentName].vue
done

# Step 3: Extract method signatures and parameters
grep -A 5 "= (.*) => {" /src/components/[ComponentName].vue
grep -A 5 "function.*(.*)" /src/components/[ComponentName].vue
```

**EXTRACTION CHECKLIST**:
- [ ] Exact method names from defineExpose
- [ ] Exact parameter names and types from implementation
- [ ] Return types from implementation
- [ ] Method behavior description from code logic

### 4. Slots Usage - EXACT STRUCTURE CAPTURE
```bash
# Step 1: Find all slot usage
grep -n "<slot" /src/components/[ComponentName].vue
grep -n "#[a-zA-Z]" /src/components/[ComponentName].vue  # Named slots
grep -n "v-slot:" /src/components/[ComponentName].vue

# Step 2: Extract slot context and props
grep -A 3 -B 3 "<slot" /src/components/[ComponentName].vue
grep -A 3 -B 3 "#[a-zA-Z]" /src/components/[ComponentName].vue

# Step 3: Find scoped slot data
grep -n ":.*=" /src/components/[ComponentName].vue | grep "slot"
```

**EXTRACTION CHECKLIST**:
- [ ] Exact slot names (including "default" for unnamed)
- [ ] Scoped slot props and their types
- [ ] Default content if any
- [ ] Usage context within component structure

### 5. Demo Analysis
```bash
# Primary: Check for dedicated demo file
cat /src/componentsDemo/[ComponentName]Doc.vue

# Secondary: If no dedicated file exists, search across all demo files
grep -r "[ComponentName]" /src/componentsDemo/
grep -r "import.*[ComponentName]" /src/componentsDemo/

# Composables: Search for usage in demo files
grep -r "[ComposableName]" /src/componentsDemo/
grep -r "import.*[ComposableName]" /src/componentsDemo/

# Directives: Primary location is DirectivesDoc.vue, but may appear elsewhere
grep -r "DirectivesDoc" /src/componentsDemo/  # Check DirectivesDoc.vue first
grep -r "v-[directive-name]" /src/componentsDemo/  # Search for directive usage
grep -r "[DirectiveName]" /src/componentsDemo/  # Search for directive imports

# Example searches:
# GroupCheckbox demo is in CheckboxDoc.vue
# FloatingNotification composable usage is in SimplifiedNotificationDoc.vue
# Directives (component_loading, whole_page_loading) are primarily in DirectivesDoc.vue
# Some utility components might be demonstrated in multiple files
```

### 6. Composable/Directive Analysis
```bash
# Analyze composable files
cat /src/composables/[ComposableName].js

# Check for component dependencies in composables
grep -n "import.*from.*components" /src/composables/[ComposableName].js
grep -n "from.*@/components" /src/composables/[ComposableName].js

# Analyze directive files
cat /src/directives/[DirectiveName].js

# Check for component dependencies in directives
grep -n "import.*from.*components" /src/directives/[DirectiveName].js
grep -n "from.*@/components" /src/directives/[DirectiveName].js

# Search for composable/directive usage examples
grep -r "[ComposableName]" /src/componentsDemo/
grep -r "[DirectiveName]" /src/componentsDemo/

# Check for internal usage of composables/directives within components
grep -r "import.*composables" /src/components/
grep -r "import.*directives" /src/components/
```

## Component-Specific Considerations

### Form Components (Checkbox, Radio, InputBox, etc.)
- **v-model support**: Check for `modelValue` prop and `update:modelValue` event
- **Validation**: Look for error states, validation methods
- **Accessibility**: ARIA attributes, keyboard navigation
- **Theming**: Built-in themes, customization options

### Layout Components (ResponsiveButton, etc.)
- **Responsive behavior**: Breakpoint handling, mobile adaptations
- **Size variants**: Different size options
- **State management**: Loading, disabled, active states

### Utility Components (SimplifiedNotification, etc.)
- **Programmatic usage**: Methods for showing/hiding
- **Configuration options**: Duration, positioning, styling
- **Integration patterns**: Global vs local usage

### Container Components (GroupCheckbox, etc.)
- **Child component management**: provide/inject patterns
- **State synchronization**: Parent-child communication
- **Composition patterns**: How children should be structured

### Components with Internal Dependencies
- **Internal composable usage**: Check if components internally use library composables
- **Internal directive usage**: Check if components internally use library directives
- **Dependency documentation**: Note internal dependencies in component documentation
- **Integration notes**: How internal dependencies affect component behavior

## Documentation Quality Standards

### 1. Completeness
- [ ] All props documented with types and defaults
- [ ] All events documented with parameters
- [ ] All exposed methods documented
- [ ] All slots documented
- [ ] Usage examples provided
- [ ] Best practices included

### 2. Accuracy
- [ ] Props match actual implementation
- [ ] Event signatures are correct
- [ ] Examples are functional
- [ ] Default values are accurate

### 3. Clarity
- [ ] Clear, concise descriptions
- [ ] Practical examples
- [ ] Common use cases covered
- [ ] Migration notes if applicable

## Example Analysis Process

### For Checkbox Component:

1. **Read component file**: `/src/components/Checkbox.vue`
   - Extract props: modelValue, label, size, built_in_theme, etc.
   - Extract events: update:modelValue, change
   - Extract exposed methods: focus, blur, alert, removeAlertOrErrorEffect

2. **Read demo file**: `/src/componentsDemo/CheckboxDoc.vue`
   - Identify usage patterns
   - Extract example configurations
   - Note integration with GroupCheckbox

3. **Generate documentation** following the template above

### For GroupCheckbox Component (No Dedicated Doc File):

1. **Read component file**: `/src/components/GroupCheckbox.vue`
   - Extract props: modelValue (Array)
   - Extract events: update:modelValue, change
   - Note provide/inject pattern usage

2. **Search for demo usage**:
   ```bash
   grep -r "GroupCheckbox" /src/componentsDemo/
   # Found in: CheckboxDoc.vue
   ```

3. **Analyze usage in CheckboxDoc.vue**:
   - Extract GroupCheckbox usage patterns
   - Note how it wraps multiple Checkbox components
   - Document v-model array binding
   - Extract example data structures

4. **Generate documentation** with examples from CheckboxDoc.vue

### For FloatingNotification Composable (Component Dependency):

1. **Read composable file**: `/src/composables/FloatingNotification.js`
   - Extract function signature and parameters
   - Note dependency: `import SimplifiedNotification from "@/components/SimplifiedNotification.vue"`
   - Analyze programmatic component mounting logic

2. **Search for usage examples**:
   ```bash
   grep -r "FloatingNotification" /src/componentsDemo/
   # Found in: SimplifiedNotificationDoc.vue
   ```

3. **Analyze usage in SimplifiedNotificationDoc.vue**:
   - Extract import statements: `import { FloatingNotification } from '@/composables/FloatingNotification'`
   - Document function call patterns and parameters
   - Note integration with SimplifiedNotification component

4. **Generate documentation** including both composable API and component dependency

### For Directives (Primarily in DirectivesDoc.vue):

1. **Read directive files**: `/src/directives/component_loading.js`, `/src/directives/whole_page_loading.js`
   - Extract directive implementation and options
   - Note any component dependencies
   - Analyze directive lifecycle and behavior

2. **Search for usage examples**:
   ```bash
   # Primary location for directive demos
   cat /src/componentsDemo/DirectivesDoc.vue
   
   # Secondary: Search across all demo files as library evolves
   grep -r "v-component-loading\|v-whole-page-loading" /src/componentsDemo/
   ```

3. **Analyze usage in DirectivesDoc.vue**:
   - Extract directive usage patterns: `v-component-loading`, `v-whole-page-loading`
   - Document directive modifiers and values
   - Note integration with components if any

4. **Check for internal component usage**:
   ```bash
   # Some components might internally use these directives
   grep -r "component_loading\|whole_page_loading" /src/components/
   ```

5. **Generate documentation** including directive API, usage examples, and any component integrations

## Output Format

Generate documentation as a single markdown file with:
- Clear headings and structure
- Properly formatted tables
- Functional code examples
- Element Plus-style API documentation
- Practical usage guidance

## Files to Always Examine

For each component `[ComponentName]`:
1. `/src/components/[ComponentName].vue` - Main implementation
2. **Demo files (prioritized search)**:
   - Primary: `/src/componentsDemo/[ComponentName]Doc.vue` - Dedicated demo file
   - Secondary: Search all demo files if no dedicated file exists:
     ```bash
     grep -r "[ComponentName]" /src/componentsDemo/
     ```
   - **Known exceptions**:
     - `GroupCheckbox` → demonstrated in `CheckboxDoc.vue`
     - Container/utility components may appear in multiple demo files
3. **Related composables** in `/src/composables/` if referenced:
   - Check for component dependencies in composables
   - Look for composable usage examples in component demo files
   - **Known relationships**:
     - `FloatingNotification.js` → depends on `SimplifiedNotification.vue` → usage examples in `SimplifiedNotificationDoc.vue`
4. **Related directives** in `/src/directives/` if referenced:
   - Check for directive usage within components
   - **Known relationships**:
     - `component_loading.js`, `whole_page_loading.js` → usage examples primarily in `DirectivesDoc.vue`
5. **Internal dependencies** - Check if component internally uses other library assets:
   ```bash
   # Check for internal composable/directive usage
   grep -r "import.*composables\|import.*directives" /src/components/[ComponentName].vue
   ```
6. Any TypeScript definitions if present

For each composable `[ComposableName]`:
1. `/src/composables/[ComposableName].js` - Main implementation
2. **Component dependencies** - Check imports for component usage
3. **Demo files** - Search for usage examples:
   ```bash
   grep -r "[ComposableName]" /src/componentsDemo/
   ```
4. **Integration patterns** - How the composable works with components

For each directive `[DirectiveName]`:
1. `/src/directives/[DirectiveName].js` - Main implementation
2. **Component dependencies** - Check imports for component usage
3. **Demo files** - Primary location is `DirectivesDoc.vue`, but search all:
   ```bash
   # Primary location
   cat /src/componentsDemo/DirectivesDoc.vue
   
   # Secondary search as library evolves
   grep -r "v-[directive-name]\|[DirectiveName]" /src/componentsDemo/
   ```
4. **Internal component usage** - Check if components use the directive internally:
   ```bash
   grep -r "[DirectiveName]" /src/components/
   ```

## Demo File Discovery Process

### Step 1: Check for Dedicated Demo File
```bash
ls /src/componentsDemo/[ComponentName]Doc.vue
```

### Step 2: If Not Found, Search Across All Demo Files
```bash
# Search for component import statements
grep -r "import.*[ComponentName]" /src/componentsDemo/

# Search for component usage in templates
grep -r "<[ComponentName]" /src/componentsDemo/

# Search for component references in script sections
grep -r "[ComponentName]" /src/componentsDemo/
```

### Step 3: Analyze Found Usage
- Extract all usage patterns from the host demo file
- Note the context in which the component is used
- Document any parent-child relationships (e.g., GroupCheckbox wrapping Checkbox components)

## Common Patterns to Look For

### Vue 3 Composition API
```javascript
// Modern components use:
defineProps()
defineEmits()
defineExpose()
```

### Vue 2/3 Options API
```javascript
// Legacy components use:
props: {}
emits: []
expose: []
```

### Provide/Inject Pattern
```javascript
// Parent components:
provide('key', value)

// Child components:
inject: ['key']
// or
inject: { key: { default: null } }
```

This guide ensures comprehensive and consistent documentation generation for all components in the PNS Component Library.
