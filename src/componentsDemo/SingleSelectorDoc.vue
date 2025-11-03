<template>
  <div class="component-doc">
    <h2>SingleSelector</h2>
    <DemoBlock id="ss-playground" title="Playground" :code="playgroundCode">
      <div class="live">
        <div class="controls">
          <div class="row">
            <label class="ctrl">Label <input v-model="play.label" placeholder="Label"/></label>
            <label class="ctrl">Label Type
              <select v-model="play.label_type">
                <option value="outside">outside</option>
                <option value="inside">inside</option>
              </select>
            </label>
            <label class="ctrl">Theme
              <select v-model="play.theme_type">
                <option value="outlined">outlined</option>
                <option value="filled">filled</option>
              </select>
            </label>
            <label class="ctrl">Brand Color <input v-model="play.customized_theme_color" placeholder="var(--Schemes-primary) or #3b82f6"/></label>
            <label class="ctrl"><input type="checkbox" v-model="play.required"/> required</label>
            <label class="ctrl"><input type="checkbox" v-model="play.disabled"/> disabled</label>
          </div>
          <div class="row">
            <label class="ctrl">Placeholder <input v-model="play.placeholder" placeholder="Select"/></label>
            <label class="ctrl"><input type="checkbox" v-model="play.clearable"/> clearable</label>
            <label class="ctrl"><input type="checkbox" v-model="play.filterable"/> filterable</label>
            <label class="ctrl"><input type="checkbox" v-model="play.remote_search"/> remote_search</label>
            <label class="ctrl"><input type="checkbox" v-model="play.loading"/> loading</label>
            <label class="ctrl">Loading Text <input v-model="play.loading_text" placeholder="Loading..."/></label>
            <label class="ctrl">No Data Text <input v-model="play.no_data_text" placeholder="No data"/></label>
          </div>
          <div class="row">
            <label class="ctrl"><input type="checkbox" v-model="play.filter_only_among_options_value"/> filter value only</label>
            <label class="ctrl"><input type="checkbox" v-model="play.filter_only_among_options_label"/> filter label only</label>
            <label class="ctrl">Options
              <select v-model="play.optionsMode">
                <option value="has">has options value</option>
                <option value="empty">empty options value</option>
              </select>
            </label>
            <label class="ctrl">Prefix Slot
              <select v-model="play.prefixKind">
                <option value="none">none</option>
                <option value="svg">inline SVG</option>
              </select>
            </label>
            <label class="ctrl">Supporting Text <input v-model="play.supportingText" placeholder="e.g. Pick one option"/></label>
          </div>
        </div>

        <SingleSelector
          ref="playRef"
          v-model="play.value"
          :label="play.label"
          :label_type="play.label_type"
          :theme_type="play.theme_type"
          :customized_theme_color="play.customized_theme_color || ''"
          :required="play.required"
          :options="play.options"
          :filterable="play.filterable"
          :remote_search="play.remote_search"
          :disabled="play.disabled"
          :placeholder="play.placeholder"
          :clearable="play.clearable"
          :loading="play.loading"
          :loading_text="play.loading_text"
          :no_data_text="play.no_data_text"
          :filter_only_among_options_value="play.filter_only_among_options_value"
          :filter_only_among_options_label="play.filter_only_among_options_label"
          @change="(v)=>pushLog('change', v)"
          @filter-change="(q)=>pushLog('filter-change', q)"
          @remote-search="(q)=>pushLog('remote-search', q)"
          @visible-change="(vis)=>pushLog('visible-change', vis)"
          @focus="()=>pushLog('focus')"
          @blur="()=>pushLog('blur')"
          @clear="()=>pushLog('clear')"
        >
          <template v-if="play.prefixKind==='svg'" #prefix>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M16.6 18L10.3 11.7C9.8 12.1 9.225 12.4167 8.575 12.65C7.925 12.8833 7.23333 13 6.5 13C4.68333 13 3.14583 12.3708 1.8875 11.1125C0.629167 9.85417 0 8.31667 0 6.5C0 4.68333 0.629167 3.14583 1.8875 1.8875C3.14583 0.629167 4.68333 0 6.5 0C8.31667 0 9.85417 0.629167 11.1125 1.8875C12.3708 3.14583 13 4.68333 13 6.5C13 7.23333 12.8833 7.925 12.65 8.575C12.4167 9.225 12.1 9.8 11.7 10.3L18 16.6L16.6 18ZM6.5 11C7.75 11 8.8125 10.5625 9.6875 9.6875C10.5625 8.8125 11 7.75 11 6.5C11 5.25 10.5625 4.1875 9.6875 3.3125C8.8125 2.4375 7.75 2 6.5 2C5.25 2 4.1875 2.4375 3.3125 3.3125C2.4375 4.1875 2 5.25 2 6.5C2 7.75 2.4375 8.8125 3.3125 9.6875C4.1875 10.5625 5.25 11 6.5 11Z" fill="currentColor"/>
            </svg>
          </template>
          <template v-if="play.supportingText" #supportingText>
            <!-- You can render any HTML/Vue here to customize styles; the playground uses plain text for simplicity. -->
            {{ play.supportingText }}
          </template>
        </SingleSelector>

        <div class="log">
          <div class="log-title">Event Log</div>
          <ul>
            <li v-for="(e,i) in logs" :key="i">{{ e.time }} — {{ e.type }}<span v-if="e.detail">: {{ e.detail }}</span></li>
          </ul>
        </div>
      </div>
    </DemoBlock>
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
            play:{
              value: '',
              label:'',
              label_type:'outside',
              theme_type:'outlined',
              customized_theme_color:'',
              required:false,
              filterable:false,
              remote_search:false,
              disabled:false,
              placeholder:'Select',
              clearable:true,
              loading:false,
              loading_text:'Loading...',
              no_data_text:'No data',
              filter_only_among_options_value:false,
              filter_only_among_options_label:false,
              prefixKind:'none',
              supportingText:'',
              optionsMode:'has',
              options: [
                {value: '1', label: 'Option 1'},
                {value: '2', label: 'Option 2'},
                {value: '3', label: 'Option 3'},
                {value: '4', label: 'Option 4'},
              ],
            },
            logs:[],
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
        'play.optionsMode'(v){
            if(v === 'has'){
                this.play.options = [
                    {value: '1', label: 'Option 1'},
                    {value: '2', label: 'Option 2'},
                    {value: '3', label: 'Option 3'},
                    {value: '4', label: 'Option 4'},
                ];
            }else{
                this.play.options = [];
            }
        },
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
      playgroundCode(){
        const p = this.play
        const attrs = []
        if(p.label) attrs.push(`label="${p.label}"`)
        if(p.label_type) attrs.push(`label_type="${p.label_type}"`)
        if(p.theme_type) attrs.push(`theme_type="${p.theme_type}"`)
        if(p.customized_theme_color) attrs.push(`customized_theme_color="${p.customized_theme_color}"`)
        if(p.required) attrs.push(`required`)
        attrs.push(`:options="options"`)
        if(p.filterable) attrs.push(`:filterable="true"`)
        if(p.remote_search) attrs.push(`:remote_search="true"`)
        if(p.disabled) attrs.push(`:disabled="true"`)
        if(p.placeholder) attrs.push(`placeholder="${p.placeholder}"`)
        if(p.clearable) attrs.push(`clearable`)
        if(p.loading) attrs.push(`:loading="true"`)
        if(p.loading_text) attrs.push(`loading_text="${p.loading_text}"`)
        if(p.no_data_text) attrs.push(`no_data_text="${p.no_data_text}"`)
        if(p.filter_only_among_options_value) attrs.push(`:filter_only_among_options_value="true"`)
        if(p.filter_only_among_options_label) attrs.push(`:filter_only_among_options_label="true"`)

        const open = `<SingleSelector v-model="value" ${attrs.join(' ')}>`
        const lines = [open]
        if(p.prefixKind==='svg'){
          lines.push(`  <template #prefix>\n    <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"18\" height=\"18\" viewBox=\"0 0 18 18\" fill=\"none\">\n      <path d=\"M16.6 18L10.3 11.7C9.8 12.1 9.225 12.4167 8.575 12.65C7.925 12.8833 7.23333 13 6.5 13C4.68333 13 3.14583 12.3708 1.8875 11.1125C0.629167 9.85417 0 8.31667 0 6.5C0 4.68333 0.629167 3.14583 1.8875 1.8875C3.14583 0.629167 4.68333 0 6.5 0C8.31667 0 9.85417 0.629167 11.1125 1.8875C12.3708 3.14583 13 4.68333 13 6.5C13 7.23333 12.8833 7.925 12.65 8.575C12.4167 9.225 12.1 9.8 11.7 10.3L18 16.6L16.6 18ZM6.5 11C7.75 11 8.8125 10.5625 9.6875 9.6875C10.5625 8.8125 11 7.75 11 6.5C11 5.25 10.5625 4.1875 9.6875 3.3125C8.8125 2.4375 7.75 2 6.5 2C5.25 2 4.1875 2.4375 3.3125 3.3125C2.4375 4.1875 2 5.25 2 6.5C2 7.75 2.4375 8.8125 3.3125 9.6875C4.1875 10.5625 5.25 11 6.5 11Z\" fill=\"currentColor\"/>\n    </svg>\n  </template>`)
        }
        if(p.supportingText){
          lines.push(`  <template #supportingText>\n    ${p.supportingText}\n  </template>`)
        }
        lines.push(`</SingleSelector>`)
        const optionsLiteral = JSON.stringify(p.options, null, 2)
        return `<template>\n  ${lines.join('\n  ')}\n</template>\n\n<script setup>\nimport { ref } from 'vue'\nconst value = ref('')\nconst options = ${optionsLiteral}\n<\/script>`
      },
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
    },
    methods:{
      pushLog(type, detail){
        const timestamp = new Date().toLocaleTimeString();
        this.logs.unshift({ time: timestamp, type, detail: detail !== undefined ? String(detail) : '' })
        if(this.logs.length > 20){
          this.logs = this.logs.slice(0, 20)
        }
      }
    }
}
</script>

<style scoped>
.component-doc{ max-width: 900px; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; }
.live{ border: 1px dashed #e5e7eb; padding: 12px; border-radius: 8px; background: #fff; display:flex; flex-direction: column; gap: 8px; }
.controls{ display:flex; flex-direction: column; gap:8px; }
.row{ display:flex; gap:8px; flex-wrap: wrap; }
.ctrl{ display:flex; align-items:center; gap:6px; }
.actions{ display:flex; gap:8px; flex-wrap:wrap; }
.log{ border-top:1px dashed #e5e7eb; padding-top:8px; }
.log-title{ font-weight: 600; margin-bottom: 4px; }
</style>