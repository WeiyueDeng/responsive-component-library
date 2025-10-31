<template>
  <div class="component-doc">
    <h2>InputBox</h2>
    <p class="desc">Versatile text input with clearable icon, validation helpers, and prefix/suffix slots.</p>
    <p class="note">Tip: For prefix/suffix icons, prefer inline SVG with <code>fill="currentColor"</code> so icons automatically inherit the component state color (hover/focus/disabled/alert/error). Using <code>&lt;img&gt;</code> sources won’t inherit color.</p>

    <!-- Playground -->
    <DemoBlock id="inputbox-playground" title="Playground" :code="playgroundCode">
      <div class="live-demo stack">
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
                <option value="filled">filled</option>
                <option value="outlined">outlined</option>
              </select>
            </label>
            <label class="ctrl">Custom Theme Color
              <input v-model="play.customized_theme_color" placeholder="e.g. var(--Schemes-primary) or #3b82f6"/>
            </label>
          </div>
          <div class="row">
            <label class="ctrl">Type <input v-model="play.type" placeholder="text/email/date/..."/></label>
            <label class="ctrl">Placeholder <input v-model="play.placeholder" placeholder="Placeholder"/></label>
            <label class="ctrl">Autocomplete <input v-model="play.autocomplete" placeholder="off/email/name"/></label>
            <label class="ctrl"><input type="checkbox" v-model="play.clearable"/> clearable</label>
            <label class="ctrl"><input type="checkbox" v-model="play.required"/> required</label>
            <label class="ctrl"><input type="checkbox" v-model="play.disabled"/> disabled</label>
          </div>
          <div class="row">
            <label class="ctrl">Prefix
              <select v-model="play.prefixKind">
                <option value="none">none</option>
                <option value="svg">inline SVG (checkbox)</option>
              </select>
            </label>
            <label class="ctrl">Suffix
              <select v-model="play.suffixKind">
                <option value="none">none</option>
                <option value="svg">inline SVG (checkbox)</option>
              </select>
            </label>
          </div>
        </div>

        <div class="actions">
          <button @click="onFocus">Focus</button>
          <button @click="onBlur">Blur</button>
          <button @click="onAlert">Show Alert</button>
          <button @click="onError">Show Error</button>
          <button @click="onClearMsg">Clear Messages</button>
        </div>

        <InputBox
          ref="playRef"
          v-model="play.value"
          :label="play.label"
          :label_type="play.label_type"
          :theme_type="play.theme_type"
          :customized_theme_color="play.customized_theme_color || ''"
          :type="play.type"
          :placeholder="play.placeholder"
          :autocomplete="play.autocomplete"
          :clearable="play.clearable"
          :required="play.required"
          :disabled="play.disabled"
          @input="(v)=>pushLog('input', v)"
          @change="(v)=>pushLog('change', v)"
          @focus="()=>pushLog('focus')"
          @blur="()=>pushLog('blur')"
          @clear="()=>pushLog('clear')"
        >
          <template v-if="play.prefixKind==='svg'" #prefix>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M16.6 18L10.3 11.7C9.8 12.1 9.225 12.4167 8.575 12.65C7.925 12.8833 7.23333 13 6.5 13C4.68333 13 3.14583 12.3708 1.8875 11.1125C0.629167 9.85417 0 8.31667 0 6.5C0 4.68333 0.629167 3.14583 1.8875 1.8875C3.14583 0.629167 4.68333 0 6.5 0C8.31667 0 9.85417 0.629167 11.1125 1.8875C12.3708 3.14583 13 4.68333 13 6.5C13 7.23333 12.8833 7.925 12.65 8.575C12.4167 9.225 12.1 9.8 11.7 10.3L18 16.6L16.6 18ZM6.5 11C7.75 11 8.8125 10.5625 9.6875 9.6875C10.5625 8.8125 11 7.75 11 6.5C11 5.25 10.5625 4.1875 9.6875 3.3125C8.8125 2.4375 7.75 2 6.5 2C5.25 2 4.1875 2.4375 3.3125 3.3125C2.4375 4.1875 2 5.25 2 6.5C2 7.75 2.4375 8.8125 3.3125 9.6875C4.1875 10.5625 5.25 11 6.5 11Z" fill="currentColor"/>
            </svg>
          </template>
          <template v-if="play.suffixKind==='svg'" #suffix>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M16.6 18L10.3 11.7C9.8 12.1 9.225 12.4167 8.575 12.65C7.925 12.8833 7.23333 13 6.5 13C4.68333 13 3.14583 12.3708 1.8875 11.1125C0.629167 9.85417 0 8.31667 0 6.5C0 4.68333 0.629167 3.14583 1.8875 1.8875C3.14583 0.629167 4.68333 0 6.5 0C8.31667 0 9.85417 0.629167 11.1125 1.8875C12.3708 3.14583 13 4.68333 13 6.5C13 7.23333 12.8833 7.925 12.65 8.575C12.4167 9.225 12.1 9.8 11.7 10.3L18 16.6L16.6 18ZM6.5 11C7.75 11 8.8125 10.5625 9.6875 9.6875C10.5625 8.8125 11 7.75 11 6.5C11 5.25 10.5625 4.1875 9.6875 3.3125C8.8125 2.4375 7.75 2 6.5 2C5.25 2 4.1875 2.4375 3.3125 3.3125C2.4375 4.1875 2 5.25 2 6.5C2 7.75 2.4375 8.8125 3.3125 9.6875C4.1875 10.5625 5.25 11 6.5 11Z" fill="currentColor"/>
            </svg>
          </template>
        </InputBox>

        <br/>

        <div class="log">
          <div class="log-title">Event Log</div>
          <ul>
            <li v-for="(e,i) in logs" :key="i">{{ e.time }} — {{ e.type }}<span v-if="e.detail">: {{ e.detail }}</span></li>
          </ul>
        </div>
      </div>
    </DemoBlock>
    <DemoBlock id="inputbox-basic" title="Basic" :code="basicCode">
      <div class="live-demo stack">
        <div class="actions">
          <button @click="(e)=>{$refs['target-input-box'].focus(); e.stopPropagation()}">Focus</button>
          <button @click="(e)=>{$refs['target-input-box'].blur(); e.stopPropagation()}">Blur</button>
          <button @click="$refs['target-input-box'].alert('Please check this value')">Show Alert</button>
          <button @click="$refs['target-input-box'].error('Invalid input')">Show Error</button>
          <button @click="$refs['target-input-box'].removeAlertOrErrorEffect()">Clear Messages</button>
        </div>
        <InputBox ref="target-input-box" type="text" clearable v-model="input_value" placeholder="Please input your words" />
      </div>
    </DemoBlock>

    <DemoBlock id="inputbox-prefix" title="Prefix Only" :code="prefixCode">
      <div class="live-demo">
        <InputBox type="text" clearable v-model="input_value" placeholder="Please input your words">
          <template #prefix>
            <img src="@/assets/icons/info_blue_icon.svg" style="width:100%; height:100%;" />
          </template>
        </InputBox>
      </div>
    </DemoBlock>

    <DemoBlock id="inputbox-suffix" title="Suffix Only" :code="suffixCode">
      <div class="live-demo">
        <InputBox type="text" clearable v-model="input_value" placeholder="Please input your words">
          <template #suffix>
            <img src="@/assets/icons/black_arrow_down.svg" style="width:100%; height:100%;" />
          </template>
        </InputBox>
      </div>
    </DemoBlock>

    <DemoBlock id="inputbox-prefix-suffix" title="Prefix + Suffix" :code="prefixSuffixCode">
      <div class="live-demo">
        <InputBox type="text" clearable v-model="input_value" placeholder="Please input your words">
          <template #prefix>
            <img src="@/assets/icons/info_blue_icon.svg" style="width:100%; height:100%;" />
          </template>
          <template #suffix>
            <img src="@/assets/icons/black_arrow_down.svg" style="width:100%; height:100%;" />
          </template>
        </InputBox>
      </div>
    </DemoBlock>

    <DemoBlock id="inputbox-disabled" title="Disabled" :code="disabledCode">
      <div class="live-demo">
        <InputBox type="text" clearable v-model="input_value" disabled placeholder="Please input your words" />
      </div>
    </DemoBlock>

    <DemoBlock id="inputbox-date" title="Date Type" :code="dateCode">
      <div class="live-demo stack">
        <InputBox type="date" clearable v-model="input_date_value" placeholder="Select a date" />
        <InputBox type="date" clearable v-model="input_date_value" disabled placeholder="Select a date" />
      </div>
    </DemoBlock>

    <DemoBlock id="inputbox-password" title="Password With Toggle" :code="passwordCode">
      <div class="live-demo">
        <InputBox :type="hide_typed_password ? 'password' : 'text'" clearable v-model="input_password_value" placeholder="Enter your password">
          <template #suffix>
            <img :src="dynamicPasswordSuffix" style="width:100%; height:100%;" @click="hide_typed_password = !hide_typed_password" />
          </template>
        </InputBox>
      </div>
    </DemoBlock>

    <DemoBlock id="inputbox-component-loading" title="v-component-loading with InputBox" :code="componentLoadingCode" :default-expanded="false">
      <div class="live-demo stack">
        <div class="actions">
          <button @click="component_loading = !component_loading">Toggle Loading ({{ component_loading ? 'on' : 'off' }})</button>
        </div>
        <div v-component-loading="component_loading">
          <InputBox type="text" clearable v-model="input_value" placeholder="Loading overlay on parent" />
        </div>
      </div>
    </DemoBlock>
  </div>
</template>

<script>
import InputBox from '@/components/InputBox.vue';
import eye_with_cross_icon from '@/assets/icons/eye_with_cross_icon.svg';
import eye_icon from '@/assets/icons/eye_icon.svg';
import DemoBlock from '@/componentsDemo/DemoBlock.vue';
export default{
  components: {
    InputBox,
    DemoBlock
  },
  data(){
    return{
      play:{
        value:'',
        label:'',
        label_type:'outside',
        theme_type:'filled',
        customized_theme_color:'',
        type:'text',
        placeholder:'Please input your words',
        autocomplete:'off',
        clearable:true,
        required:false,
        disabled:false,
        prefixKind:'none',
        suffixKind:'none',
      },
      logs:[],
      input_value: "123",
      input_date_value:'',
      input_password_value:'',
      hide_typed_password:true,
      component_loading:false,
    }
  },
  computed:{
    playgroundCode(){
      const p = this.play
      const attrs = []
      attrs.push(`v-model="value"`)
      if(p.label) attrs.push(`label="${p.label}"`)
      if(p.label_type) attrs.push(`label_type="${p.label_type}"`)
      if(p.theme_type) attrs.push(`theme_type="${p.theme_type}"`)
      if(p.customized_theme_color) attrs.push(`customized_theme_color="${p.customized_theme_color}"`)
      if(p.type) attrs.push(`type="${p.type}"`)
      if(p.placeholder) attrs.push(`placeholder="${p.placeholder}"`)
      if(p.autocomplete) attrs.push(`autocomplete="${p.autocomplete}"`)
      if(p.clearable) attrs.push(`clearable`)
      if(p.required) attrs.push(`required`)
      if(p.disabled) attrs.push(`:disabled="true"`)

      const open = `<InputBox ${attrs.join(' ')}>`
      const lines = [open]
      if(p.prefixKind==='svg'){
        lines.push(`  <template #prefix>\n    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">\n      <path d="M16.6 18L10.3 11.7C9.8 12.1 9.225 12.4167 8.575 12.65C7.925 12.8833 7.23333 13 6.5 13C4.68333 13 3.14583 12.3708 1.8875 11.1125C0.629167 9.85417 0 8.31667 0 6.5C0 4.68333 0.629167 3.14583 1.8875 1.8875C3.14583 0.629167 4.68333 0 6.5 0C8.31667 0 9.85417 0.629167 11.1125 1.8875C12.3708 3.14583 13 4.68333 13 6.5C13 7.23333 12.8833 7.925 12.65 8.575C12.4167 9.225 12.1 9.8 11.7 10.3L18 16.6L16.6 18ZM6.5 11C7.75 11 8.8125 10.5625 9.6875 9.6875C10.5625 8.8125 11 7.75 11 6.5C11 5.25 10.5625 4.1875 9.6875 3.3125C8.8125 2.4375 7.75 2 6.5 2C5.25 2 4.1875 2.4375 3.3125 3.3125C2.4375 4.1875 2 5.25 2 6.5C2 7.75 2.4375 8.8125 3.3125 9.6875C4.1875 10.5625 5.25 11 6.5 11Z" fill="currentColor"/>\n    </svg>\n  </template>`)
      }
      if(p.suffixKind==='svg'){
        lines.push(`  <template #suffix>\n    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">\n      <path d="M16.6 18L10.3 11.7C9.8 12.1 9.225 12.4167 8.575 12.65C7.925 12.8833 7.23333 13 6.5 13C4.68333 13 3.14583 12.3708 1.8875 11.1125C0.629167 9.85417 0 8.31667 0 6.5C0 4.68333 0.629167 3.14583 1.8875 1.8875C3.14583 0.629167 4.68333 0 6.5 0C8.31667 0 9.85417 0.629167 11.1125 1.8875C12.3708 3.14583 13 4.68333 13 6.5C13 7.23333 12.8833 7.925 12.65 8.575C12.4167 9.225 12.1 9.8 11.7 10.3L18 16.6L16.6 18ZM6.5 11C7.75 11 8.8125 10.5625 9.6875 9.6875C10.5625 8.8125 11 7.75 11 6.5C11 5.25 10.5625 4.1875 9.6875 3.3125C8.8125 2.4375 7.75 2 6.5 2C5.25 2 4.1875 2.4375 3.3125 3.3125C2.4375 4.1875 2 5.25 2 6.5C2 7.75 2.4375 8.8125 3.3125 9.6875C4.1875 10.5625 5.25 11 6.5 11Z" fill="currentColor"/>\n    </svg>\n  </template>`)
      }
      lines.push(`</InputBox>`)
      return `<template>\n  ${lines.join('\n  ')}\n</template>\n\n<script setup>\nimport { ref } from 'vue'\nconst value = ref('')\n<\/script>`
    },
    basicCode(){
      return `<template>\n  <InputBox ref=\"input\" type=\"text\" clearable v-model=\"value\" placeholder=\"Please input your words\" />\n</template>\n\n<script setup>\nimport { ref } from 'vue'\nconst value = ref('')\n<\/script>`
    },
    prefixCode(){
      return `<template>\n  <InputBox type=\"text\" clearable v-model=\"value\" placeholder=\"Please input your words\">\n    <template #prefix>\n      <img src=\"/path/to/icon.svg\" style=\"width:100%; height:100%;\" />\n    </template>\n  </InputBox>\n</template>`
    },
    suffixCode(){
      return `<template>\n  <InputBox type=\"text\" clearable v-model=\"value\" placeholder=\"Please input your words\">\n    <template #suffix>\n      <img src=\"/path/to/icon.svg\" style=\"width:100%; height:100%;\" />\n    </template>\n  </InputBox>\n</template>`
    },
    prefixSuffixCode(){
      return `<template>\n  <InputBox type=\"text\" clearable v-model=\"value\" placeholder=\"Please input your words\">\n    <template #prefix>\n      <img src=\"/path/to/icon.svg\" style=\"width:100%; height:100%;\" />\n    </template>\n    <template #suffix>\n      <img src=\"/path/to/icon.svg\" style=\"width:100%; height:100%;\" />\n    </template>\n  </InputBox>\n</template>`
    },
    disabledCode(){
      return `<template>\n  <InputBox type=\"text\" clearable v-model=\"value\" disabled placeholder=\"Please input your words\" />\n</template>`
    },
    dateCode(){
      return `<template>\n  <InputBox type=\"date\" clearable v-model=\"date\" placeholder=\"Select a date\" />\n  <InputBox type=\"date\" clearable v-model=\"date\" disabled placeholder=\"Select a date\" />\n</template>\n\n<script setup>\nimport { ref } from 'vue'\nconst date = ref('')\n<\/script>`
    },
    passwordCode(){
      return `<template>\n  <InputBox :type=\"show ? 'text' : 'password'\" clearable v-model=\"pwd\" placeholder=\"Enter your password\">\n    <template #suffix>\n      <img src=\"/path/to/eye.svg\" style=\"width:100%; height:100%;\" @click=\"show = !show\"/>\n    </template>\n  </InputBox>\n</template>\n\n<script setup>\nimport { ref } from 'vue'\nconst show = ref(false)\nconst pwd = ref('')\n<\/script>`
    },
    componentLoadingCode(){
      return `<template>\n  <button @click=\"() => (loading = !loading)\">Toggle Loading</button>\n  <div v-component-loading=\"loading\">\n    <InputBox type=\"text\" clearable v-model=\"value\" placeholder=\"Loading overlay on parent\" />\n  </div>\n</template>\n\n<script setup>\nimport { ref } from 'vue'\nconst value = ref('')\nconst loading = ref(false)\n<\/script>`
    }
  },
  methods:{
    onFocus(){ this.$refs.playRef?.focus?.(); this.pushLog('focus(cmd)') },
    onBlur(){ this.$refs.playRef?.blur?.(); this.pushLog('blur(cmd)') },
    onAlert(){ this.$refs.playRef?.alert?.('Please check this value'); this.pushLog('alert(cmd)') },
    onError(){ this.$refs.playRef?.error?.('Invalid input'); this.pushLog('error(cmd)') },
    onClearMsg(){ this.$refs.playRef?.removeAlertOrErrorEffect?.(); this.pushLog('clear-messages(cmd)') },
    pushLog(type, detail=''){
      const t = new Date().toLocaleTimeString()
      this.logs.unshift({ type, detail, time: t })
      if(this.logs.length>30){ this.logs.pop() }
    }
  }
}
</script>

<style scoped>
.component-doc{ max-width: 900px; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; }
.desc{ color:#4b5563; margin-bottom: 12px; }
.note{ color:#374151; margin: 6px 0 12px; }
.controls{ display:grid; gap:8px; margin-bottom:8px; }
.row{ display:flex; gap:8px; flex-wrap:wrap; }
.ctrl{ display:flex; gap:6px; align-items:center; }
.live-demo{ border: 1px dashed #e5e7eb; padding: 12px; border-radius: 8px; background: #fff; }
.live-demo .actions{ display:flex; gap:8px; flex-wrap:wrap; margin-bottom:8px; }
.log{ width:100%; max-height: 160px; overflow:auto; border:1px solid #e5e7eb; border-radius:6px; padding:8px; }
.log-title{ font-weight:600; color:#374151; margin-bottom:6px; }
</style>