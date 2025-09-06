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

### Step 2: Analyze Each Component

For each component, examine these key areas:

#### A. Component Implementation (`/src/components/[ComponentName].vue`)

**Props Analysis**:
```javascript
// Look for props definition (Options API or Composition API)
props: {
  propName: {
    type: String|Number|Boolean|Array|Object,
    default: defaultValue,
    required: true|false,
    validator: function // if present
  }
}
```

**Events Analysis**:
```javascript
// Look for emits definition
emits: ['event-name', 'update:modelValue']
// Or defineEmits() in Composition API
```

**Exposed Methods**:
```javascript
// Look for expose array (Options API)
expose: ['methodName1', 'methodName2']
// Or defineExpose() in Composition API
```

**Slots Analysis**:
```vue
<!-- Look for slot usage in template -->
<slot name="slotName">Default content</slot>
<slot>Default slot</slot>
```

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
| propName | Type | default | Yes/No | Description |

### Events
| Name | Parameters | Description |
|------|------------|-------------|
| eventName | (param: Type) | Description |

### Slots
| Name | Description | Scope |
|------|-------------|-------|
| slotName | Description | Scoped data if any |

### Exposed Methods
| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| methodName | (param: Type) | ReturnType | Description |

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

## Analysis Instructions

### 1. Component Props
```bash
# Search for props definition
grep -n "props:" /src/components/[ComponentName].vue
# Or for Composition API
grep -n "defineProps" /src/components/[ComponentName].vue
```

### 2. Component Events
```bash
# Search for emits
grep -n "emits:" /src/components/[ComponentName].vue
grep -n "defineEmits" /src/components/[ComponentName].vue
# Search for $emit calls
grep -n "\$emit" /src/components/[ComponentName].vue
```

### 3. Exposed Methods
```bash
# Search for expose
grep -n "expose:" /src/components/[ComponentName].vue
grep -n "defineExpose" /src/components/[ComponentName].vue
```

### 4. Slots Usage
```bash
# Search for slots in template
grep -n "<slot" /src/components/[ComponentName].vue
```

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
