# PNS Component Library Vue 3 + Vite

This library provides some ready-to-use responsive components with Vue 3. Developers can directly use the components without setting the non-web UI and UX (all included in the library).

## How to Set Up
You have already created a vue project.
### Step 1:
```
npm install pns-component-library
```
### Step 2:
In your main.js, import the library and use it for your app instance.
```vue
  import { createApp } from 'vue';
  import PNSComponentLibray from "pns-component-library";

  const app = createApp(App);
  app.use(PNSComponentLibray);
```
### Step 3
Now you should be able to access the components, directives and icons in the library. 

## Available Components:
- SimplifiedNotification
- InputBox
- SingleSelector
- ResponsiveButton

## Available Directives:
- component-loading

## Available Icons:
If  `npm install pns-component-library`, and want to use any following icons: <br>
<pre>import { iconsMap } from "pns-component-library</pre>
iconsMap.[iconName] is the URL or Data URI (Uniform Resource Identifier) of the corresponding svg icon.
Eg. 
```vue
  <template>
    <img :src = "iconsMap['eye_icon']" />
  </template>
  <script>
 import { iconsMap } from "pns-component-library
  export default{
    data(){
      return{
        iconsMap,
      }
    }
  }
  </script>
```
### All icons' names
- black_arrow_down
- black_arrow_to_right
- black_calendar_icon
- black_magnifying_glass_icon
- cyan_arrow_down
- dark_blue_arrow_down
- dark_gray_arrow_down
- eye_icon
- eye_with_cross_icon
- green_notification_icon
- grey_arrow_down
- grey_arrow_to_right
- info_blue_icon
- input_clear_icon
- notification_cross_icon
- red_notification_icon
- white_arrow_down
- yellow_notification_icon

