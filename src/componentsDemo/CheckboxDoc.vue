<template>
  <div class="component-doc">
    <h2>Checkbox</h2>
    <DemoBlock id="cb-green" title="Green Theme: Basic, Indeterminate, Exposed Methods" :code="greenThemeCode">
      <div class="live">
        <Checkbox v-model="green_theme_checked" :label="test_label"
          :indeterminate="is_indeterminate" ref="indeterminate-target-1" :disabled="indeterminate_target_1_disabled" />
        <div class="actions">
          <button @click="is_indeterminate = !is_indeterminate">Toggle indeterminate</button>
          <button @click="green_theme_checked = !green_theme_checked">Toggle checked</button>
          <button @click="$refs['indeterminate-target-1'].error('This is a customized error message passed via the expose of the checkbox component')">Show error</button>
          <button @click="$refs['indeterminate-target-1'].removeAlertOrErrorEffect()">Clear</button>
          <button @click="$refs['indeterminate-target-1'].focus()">Focus</button>
          <button @click="$refs['indeterminate-target-1'].blur()">Blur</button>
          <button @click="indeterminate_target_1_disabled=!indeterminate_target_1_disabled">Toggle disabled</button>
        </div>
        <div class="note">Notes: If both indeterminate and checked, shown as indeterminate. When indeterminate becomes true, checked resets to false.</div>
      </div>
    </DemoBlock>

    <DemoBlock id="cb-autofocus" title="Autofocus" :code="autofocusCode">
      <div class="live">
        <Checkbox v-model="green_theme_checked" :label="test_label" ref="autofocus-target-1" :autofocus="true"/>
        <div class="actions">
          <button @click="$refs['autofocus-target-1'].focus()">Focus</button>
          <button @click="$refs['autofocus-target-1'].blur()">Blur</button>
          <button @click="$refs['autofocus-target-1'].error('This is a customized error message passed via the expose of the checkbox component')">Show error</button>
          <button @click="$refs['autofocus-target-1'].removeAlertOrErrorEffect()">Clear</button>
        </div>
      </div>
    </DemoBlock>

    <DemoBlock id="cb-disabled-slot" title="Disabled with Slot Label" :code="disabledSlotCode">
      <div class="live">
        <Checkbox :disabled="true" v-model="checked" ref="autofocus-target-2">
          <div>text 2 (pass label via slot), v-model control</div>
        </Checkbox>
        <div class="actions">
          <button @click="$refs['autofocus-target-2'].focus()">Focus</button>
          <button @click="$refs['autofocus-target-2'].blur()">Blur</button>
          <button @click="checked=!checked">Toggle checked</button>
        </div>
      </div>
    </DemoBlock>

    <DemoBlock id="cb-themes" title="Themes" :code="themesCode">
      <div class="live">
        <div class="note">
          <strong>Built-in themes</strong>
          <ul>
            <li><code>green</code> (default) — success/affirmative tone.</li>
            <li><code>primary-blue</code> — primary brand blue.</li>
            <li><code>secondary-blue</code> — lighter/accent blue.</li>
          </ul>
          You can also set <code>customized_theme_color</code> to any valid CSS color string. When provided, it overrides <code>built_in_theme</code>.
        </div>

        <!-- Default (green) -->
        <Checkbox :label="'Default (green)'" />
        <!-- Primary blue -->
        <Checkbox :label="'Primary blue'" built_in_theme="primary-blue" />
        <!-- Secondary blue -->
        <Checkbox :label="'Secondary blue'" built_in_theme="secondary-blue" />
        <!-- Customized via CSS variable (overrides built_in_theme) -->
        <Checkbox :label="'Customized: var(--Schemes-primary)'" customized_theme_color="var(--Schemes-primary)" />
        <!-- Customized via HEX (overrides built_in_theme) -->
        <Checkbox :label="'Customized: #FF6B6B'" customized_theme_color="#FF6B6B" />
      </div>
    </DemoBlock>

    <DemoBlock id="cb-error" title="Error Mode (All Themes)" :code="errorCode">
      <div class="live">
        <Checkbox :label="test_label" ref="error-target-1"/>
      </div>
    </DemoBlock>

    <DemoBlock id="cb-disabled-variants" title="Disabled Variants" :code="disabledVariantsCode">
      <div class="live">
        <Checkbox v-model="initial_unchecked_value" :label="test_label" built_in_theme="secondary-blue" :disabled="true"/>
        <Checkbox v-model="initial_checked_value" :label="test_label" built_in_theme="secondary-blue" :disabled="true"/>
        <Checkbox v-model="initial_unchecked_value" :label="test_label" built_in_theme="secondary-blue" :disabled="true" indeterminate/>
      </div>
    </DemoBlock>

    <DemoBlock id="cb-no-label" title="No Label" :code="noLabelCode">
      <div class="live">
        <Checkbox v-model="initial_checked_value" built_in_theme="secondary-blue" ref='no-label-target-1'/>
        <div class="actions">
          <button @click="$refs['no-label-target-1'].error('This is a customized error message passed via the expose of the checkbox component')">Show error</button>
          <button @click="$refs['no-label-target-1'].removeAlertOrErrorEffect()">Clear</button>
        </div>
      </div>
    </DemoBlock>

    <DemoBlock id="cb-group" title="GroupCheckbox" :code="groupCode">
      <div class="live">
        <GroupCheckbox v-model="current_checked_values">
          <Checkbox v-for="item in checkbox_group_values" :key="item" :label="item" />
        </GroupCheckbox>
        <div class="actions">
          <button @click="current_checked_values=['checkbox1', 'checkbox2']">Set checked to ['checkbox1','checkbox2']</button>
          <button @click="current_checked_values.push('checkbox3')">Push 'checkbox3'</button>
        </div>
      </div>
    </DemoBlock>
  </div>
</template>

<script>
import Checkbox from "@/components/Checkbox.vue";
import GroupCheckbox from "@/components/GroupCheckbox.vue";
import DemoBlock from '@/componentsDemo/DemoBlock.vue';
export default{
    components:{
        Checkbox,
        GroupCheckbox,
        DemoBlock
    },
    mounted(){
        this.$refs['error-target-1'].error('This is a customized error message passed via the expose of the checkbox component');
    },
    data(){
        return{
            test_label: "text 1 (pass label via prop)",
            initial_checked_value:true,
            initial_unchecked_value:false,
            green_theme_checked:false,
            checked:true,
            is_indeterminate:false,
            indeterminate_target_1_disabled:false,
            
            current_checked_values:["checkbox1"],
            checkbox_group_values:["checkbox1", "checkbox2", "checkbox3", "checkbox4"],
        }
    },
    watch:{
        current_checked_values:{
            deep: true,
            handler(newVal){
                console.log('current_checked_values', newVal);
            }
        }
    },
    computed:{
      greenThemeCode(){
        return `<template>\n  <Checkbox v-model=\"checked\" :label=\"'text 1'\" :indeterminate=\"indeterminate\" ref=\"cb\" :disabled=\"disabled\"/>\n  <button @click=\"() => (indeterminate = !indeterminate)\">Toggle indeterminate</button>\n  <button @click=\"() => (checked = !checked)\">Toggle checked</button>\n  <button @click=\"() => cb.error('Custom error')\">Show error</button>\n  <button @click=\"() => cb.removeAlertOrErrorEffect()\">Clear</button>\n  <button @click=\"() => cb.focus()\">Focus</button>\n  <button @click=\"() => cb.blur()\">Blur</button>\n  <button @click=\"() => (disabled = !disabled)\">Toggle disabled</button>\n</template>\n\n<script setup>\nimport { ref } from 'vue'\nimport { Checkbox } from 'pns-component-library'\nconst checked = ref(false)\nconst indeterminate = ref(false)\nconst disabled = ref(false)\nconst cb = ref(null)\n<\/script>`
      },
      autofocusCode(){
        return `<template>\n  <Checkbox v-model=\"checked\" :label=\"'text 1'\" :autofocus=\"true\" ref=\"cb\"/>\n</template>\n\n<script setup>\nimport { ref } from 'vue'\nimport { Checkbox } from 'pns-component-library'\nconst checked = ref(false)\nconst cb = ref(null)\n<\/script>`
      },
      disabledSlotCode(){
        return `<template>\n  <Checkbox :disabled=\"true\" v-model=\"checked\">\n    <div>text 2 (pass label via slot), v-model control</div>\n  </Checkbox>\n</template>\n\n<script setup>\nimport { ref } from 'vue'\nimport { Checkbox } from 'pns-component-library'\nconst checked = ref(true)\n<\/script>`
      },
      themesCode(){
        return `<template>
  <!-- Built-in themes -->
  <Checkbox :label="'Default (green)'" />
  <Checkbox :label="'Primary blue'" built_in_theme="'primary-blue'" />
  <Checkbox :label="'Secondary blue'" built_in_theme="'secondary-blue'" />

  <!-- Customized theme color (overrides built_in_theme) -->
  <Checkbox :label="'Customized: var(--Schemes-primary)'" customized_theme_color="var(--Schemes-primary)" />
  <Checkbox :label="'Customized: #FF6B6B'" customized_theme_color="#FF6B6B" />
</template>`
      },
      errorCode(){
        return `<template>\n  <Checkbox :label=\"'text 1'\" ref=\"cb\"/>\n</template>\n\n<script setup>\nimport { onMounted, ref } from 'vue'\nimport { Checkbox } from 'pns-component-library'\nconst cb = ref(null)\nonMounted(() => cb.value?.error('Custom error'))\n<\/script>`
      },
      disabledVariantsCode(){
        return `<template>\n  <Checkbox v-model=\"unchecked\" :label=\"'text 1'\" built_in_theme=\"'secondary-blue'\" :disabled=\"true\"/>\n  <Checkbox v-model=\"checked\" :label=\"'text 1'\" built_in_theme=\"'secondary-blue'\" :disabled=\"true\"/>\n  <Checkbox v-model=\"unchecked\" :label=\"'text 1'\" built_in_theme=\"'secondary-blue'\" :disabled=\"true\" indeterminate/>\n</template>\n\n<script setup>\nimport { ref } from 'vue'\nconst checked = ref(true)\nconst unchecked = ref(false)\n<\/script>`
      },
      noLabelCode(){
        return `<template>\n  <Checkbox v-model=\"checked\" built_in_theme=\"'secondary-blue'\" ref=\"cb\"/>\n</template>\n\n<script setup>\nimport { ref } from 'vue'\nimport { Checkbox } from 'pns-component-library'\nconst checked = ref(true)\nconst cb = ref(null)\n<\/script>`
      },
      groupCode(){
        return `<template>\n  <GroupCheckbox v-model=\"checkedValues\">\n    <Checkbox v-for=\"item in items\" :key=\"item\" :label=\"item\"/>\n  </GroupCheckbox>\n</template>\n\n<script setup>\nimport { ref } from 'vue'\nimport { Checkbox, GroupCheckbox } from 'pns-component-library'\nconst items = ['checkbox1','checkbox2','checkbox3','checkbox4']\nconst checkedValues = ref(['checkbox1'])\n<\/script>`
      }
    },
    methods:{}
}
</script>

<style scoped>
.component-doc{ max-width: 900px; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; }
.live{ border: 1px dashed #e5e7eb; padding: 12px; border-radius: 8px; background: #fff; display: flex; flex-direction: column; gap: 8px; }
.actions{ display:flex; gap:8px; flex-wrap:wrap; }
.note{ color: #374151; }
</style>