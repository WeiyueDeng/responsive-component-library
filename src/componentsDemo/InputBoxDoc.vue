<template>
  <div class="component-doc">
    <h2>InputBox</h2>
    <p class="desc">Versatile text input with clearable icon, validation helpers, and prefix/suffix slots.</p>
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
            input_value: "123",
            input_date_value:'',
            input_password_value:'',
            hide_typed_password:true,
            component_loading:false,
        }
    },
    computed:{
        dynamicPasswordSuffix(){
            return this.hide_typed_password ? eye_with_cross_icon : eye_icon;
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
    methods:{}
}
</script>

<style scoped>
.component-doc{ max-width: 900px; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; }
.desc{ color:#4b5563; margin-bottom: 12px; }
.live-demo{ border: 1px dashed #e5e7eb; padding: 12px; border-radius: 8px; background: #fff; }
.live-demo .actions{ display:flex; gap:8px; flex-wrap:wrap; margin-bottom:8px; }
</style>