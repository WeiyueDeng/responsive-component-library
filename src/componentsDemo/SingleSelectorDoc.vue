<template>
  <div class="component-doc">
    <h2>SingleSelector</h2>
    <DemoBlock id="ss-basic" title="Clearable with focus/blur/alert/error" :code="basicCode">
      <div class="live">
        <div class="actions">
          <button @click="(event)=>{$refs['target-selector'].focus(); event.stopPropagation()}">Focus</button>
          <button @click="(event)=>{$refs['target-selector'].blur(); event.stopPropagation()}">Blur</button>
          <button @click="$refs['target-selector'].alert('alert msg 2312312 312331231')">Show alert</button>
          <button @click="$refs['target-selector'].error('error msg 12312312 312312312313123')">Show error</button>
          <button @click="$refs['target-selector'].removeAlertOrErrorEffect()">Clear</button>
        </div>
        <SingleSelector ref="target-selector" v-model="single_selector_value" :options="single_selector_options" clearable />
      </div>
    </DemoBlock>

    <DemoBlock id="ss-filterable-string" title="Filterable (string value)" :code="filterableStringCode">
      <div class="live">
        <div class="actions">
          <button @click="(event)=>{$refs['target-selector-2'].focus(); event.stopPropagation()}">Focus</button>
          <button @click="(event)=>{$refs['target-selector-2'].blur(); event.stopPropagation()}">Blur</button>
          <button @click="$refs['target-selector-2'].alert('alert msg 2312312 312331231')">Show alert</button>
          <button @click="$refs['target-selector-2'].error('error msg 12312312 312312312313123')">Show error</button>
          <button @click="$refs['target-selector-2'].removeAlertOrErrorEffect()">Clear</button>
        </div>
        <SingleSelector v-model="single_selector_value" ref="target-selector-2" :filterable="true" :options="single_selector_options" :clearable="true"/>
      </div>
    </DemoBlock>

    <DemoBlock id="ss-filterable-number" title="Filterable (number value)" :code="filterableNumberCode">
      <div class="live">
        <SingleSelector v-model="single_selector_value_number" :filterable="true" :options="single_selector_options_value_number" :clearable="true"/>
      </div>
    </DemoBlock>

    <DemoBlock id="ss-filterable-boolean" title="Filterable (boolean value)" :code="filterableBooleanCode">
      <div class="live">
        <SingleSelector v-model="single_selector_value_boolean" :filterable="true" :options="single_selector_options_value_boolean" :clearable="true"/>
      </div>
    </DemoBlock>

    <DemoBlock id="ss-filterable-array" title="Filterable (array value)" :code="filterableArrayCode">
      <div class="live">
        <SingleSelector v-model="single_selector_value_array" :filterable="true" :options="single_selector_options_value_array" :clearable="true"/>
      </div>
    </DemoBlock>

    <DemoBlock id="ss-filterable-object" title="Filterable (object value)" :code="filterableObjectCode">
      <div class="live">
        <SingleSelector v-model="single_selector_value_object" :filterable="true" :options="single_selector_options_value_object" :clearable="true"/>
      </div>
    </DemoBlock>

    <DemoBlock id="ss-prefix" title="With Prefix" :code="withPrefixCode">
      <div class="live">
        <SingleSelector v-model="single_selector_value" :filterable="true" :options="single_selector_options_scroll" :clearable="true">
          <template #prefix>
            <img src="@/assets/icons/black_magnifying_glass_icon.svg" style="width:100%; height:100%;"/>
          </template>
        </SingleSelector>
      </div>
    </DemoBlock>

    <DemoBlock id="ss-disabled" title="Disabled" :code="disabledCode">
      <div class="live">
        <SingleSelector v-model="single_selector_value" :filterable="true" :options="single_selector_options_scroll" :clearable="true" disabled/>
      </div>
    </DemoBlock>
  </div>
</template>

<script>
import SingleSelector from '@/components/SingleSelector.vue';
import DemoBlock from '@/componentsDemo/DemoBlock.vue';
export default{
    components: {
        SingleSelector,
        DemoBlock
    },
    data(){
        return{
            single_selector_value: "3",
            single_selector_value_number: 1,
            single_selector_value_boolean: true,
            single_selector_value_array: [1],
            single_selector_value_object: {
                1:'1',
            },
            single_selector_options: [
                {value: "1", label: "Option 1"},
                {value: "2", label: "Option 2"},
                {value: "3", label: "Option 3"},
                {value: "4", label: "Option 4"},
            ],
            single_selector_options_scroll:[
                {value: "1", label: "Option 1"},
                {value: "2", label: "Option 2"},
                {value: "3", label: "Option 3"},
                {value: "4", label: "Option 4"},
                {value: "11", label: "Option 1"},
                {value: "21", label: "Option 2"},
                {value: "31", label: "Option 3"},
                {value: "41", label: "Option 4"},
                {value: "12", label: "Option 1"},
                {value: "22", label: "Option 2"},
                {value: "32", label: "Option 3"},
                {value: "42", label: "Option 4"},
                {value: "13", label: "Option 1"},
                {value: "23", label: "Option 2"},
                {value: "33", label: "Option 3"},
                {value: "43", label: "Option 4"},
            ],
            single_selector_options_value_number: [
                {value: 1, label: "Option 1"},
                {value: 2, label: "Option 2"},
                {value: 3, label: "Option 3"},
                {value: 4, label: "Option 4"},
            ],
            single_selector_options_value_boolean: [
                {value: true, label: "Yes"},
                {value: false, label: "No"},
            ],
            single_selector_options_value_array: [
                {value: [1], label: "Option 1"},
                {value: [2], label: "Option 2"},
                {value: [3], label: "Option 3"},
                {value: [4], label: "Option 4"},
            ],
            single_selector_options_value_object: [
                {value: {1:'1'}, label: "Option 1"},
                {value: {2:'2'}, label: "Option 2"},
                {value: {3:'3'}, label: "Option 3"},
                {value: {4:'4'}, label: "Option 4"},
            ],
        }
    },
    watch:{
        single_selector_value(newVal){
            console.log(`single_selector_value:`, newVal);
            alert(`single_selector_value:${newVal}`);
        },
        single_selector_value_number(newVal){
            console.log(`single_selector_value_number:`, newVal);
            alert(`single_selector_value_number:${JSON.stringify(newVal)}`);
        },
        single_selector_value_boolean(newVal){
            console.log(`single_selector_value_boolean:`, newVal);
            alert(`single_selector_value_boolean:${JSON.stringify(newVal)}`);
        },
        single_selector_value_array(newVal){
            console.log(`single_selector_value_array:`, newVal);
            alert(`single_selector_value_array:${JSON.stringify(newVal)}`);
        },
        single_selector_value_object(newVal){
            console.log(`single_selector_value_object:`, newVal);
            alert(`single_selector_value_object:${JSON.stringify(newVal)}`);
        },
        
    },
    computed:{
      basicCode(){
        return `<template>\n  <SingleSelector v-model=\"value\" :options=\"options\" clearable ref=\"ss\"/>\n  <button @click=\"() => ss.focus()\">Focus</button>\n  <button @click=\"() => ss.blur()\">Blur</button>\n  <button @click=\"() => ss.alert('alert msg')\">Show alert</button>\n  <button @click=\"() => ss.error('error msg')\">Show error</button>\n  <button @click=\"() => ss.removeAlertOrErrorEffect()\">Clear</button>\n</template>\n\n<script setup>\nimport { ref } from 'vue'\nimport { SingleSelector } from 'pns-component-library'\nconst value = ref('')\nconst ss = ref(null)\nconst options = [\n  { value: '1', label: 'Option 1' },\n  { value: '2', label: 'Option 2' },\n]\n<\/script>`
      },
      filterableStringCode(){
        return `<template>\n  <SingleSelector v-model=\"value\" :filterable=\"true\" :options=\"options\" :clearable=\"true\" ref=\"ss\"/>\n</template>\n\n<script setup>\nimport { ref } from 'vue'\nconst value = ref('')\nconst ss = ref(null)\nconst options = [\n  { value: '1', label: 'Option 1' },\n  { value: '2', label: 'Option 2' },\n]\n<\/script>`
      },
      filterableNumberCode(){
        return `<template>\n  <SingleSelector v-model=\"value\" :filterable=\"true\" :options=\"options\" :clearable=\"true\"/>\n</template>\n\n<script setup>\nimport { ref } from 'vue'\nconst value = ref(1)\nconst options = [\n  { value: 1, label: 'Option 1' },\n  { value: 2, label: 'Option 2' },\n]\n<\/script>`
      },
      filterableBooleanCode(){
        return `<template>\n  <SingleSelector v-model=\"value\" :filterable=\"true\" :options=\"options\" :clearable=\"true\"/>\n</template>\n\n<script setup>\nimport { ref } from 'vue'\nconst value = ref(true)\nconst options = [\n  { value: true, label: 'Yes' },\n  { value: false, label: 'No' },\n]\n<\/script>`
      },
      filterableArrayCode(){
        return `<template>\n  <SingleSelector v-model=\"value\" :filterable=\"true\" :options=\"options\" :clearable=\"true\"/>\n</template>\n\n<script setup>\nimport { ref } from 'vue'\nconst value = ref([1])\nconst options = [\n  { value: [1], label: 'Option 1' },\n  { value: [2], label: 'Option 2' },\n]\n<\/script>`
      },
      filterableObjectCode(){
        return `<template>\n  <SingleSelector v-model=\"value\" :filterable=\"true\" :options=\"options\" :clearable=\"true\"/>\n</template>\n\n<script setup>\nimport { ref } from 'vue'\nconst value = ref({1:'1'})\nconst options = [\n  { value: {1:'1'}, label: 'Option 1' },\n  { value: {2:'2'}, label: 'Option 2' },\n]\n<\/script>`
      },
      withPrefixCode(){
        return `<template>\n  <SingleSelector v-model=\"value\" :filterable=\"true\" :options=\"options\" :clearable=\"true\">\n    <template #prefix>\n      <img src=\"/path/to/icon.svg\" style=\"width:100%; height:100%;\"/>\n    </template>\n  </SingleSelector>\n</template>`
      },
      disabledCode(){
        return `<template>\n  <SingleSelector v-model=\"value\" :filterable=\"true\" :options=\"options\" :clearable=\"true\" disabled/>\n</template>`
      }
    }
}
</script>

<style scoped>
.component-doc{ max-width: 900px; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; }
.live{ border: 1px dashed #e5e7eb; padding: 12px; border-radius: 8px; background: #fff; display:flex; flex-direction: column; gap: 8px; }
.actions{ display:flex; gap:8px; flex-wrap:wrap; }
</style>