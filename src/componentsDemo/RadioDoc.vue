<template>
  <div class="component-doc">
    <h2>Radio</h2>
    <DemoBlock id="radio-group-primary" title="Radio Group (primary-blue)" :code="groupPrimaryCode">
      <div class="live">
        <Radio v-model="test_group_1_value" label="test radio 1" name="test group 1" value="option 1" ref="autofocus-target-1" :disabled="test_group_1_disabled"/>
        <Radio v-model="test_group_1_value" label="test radio 2" name="test group 1" value="option 2" />
        <div class="actions">
          <button @click="$refs['autofocus-target-1'].focus()">Focus</button>
          <button @click="$refs['autofocus-target-1'].blur()">Blur</button>
          <button @click="$refs['autofocus-target-1'].alert('Customized error message')">Show error</button>
          <button @click="$refs['autofocus-target-1'].removeAlertOrErrorEffect()">Clear</button>
          <button @click="test_group_1_disabled=!test_group_1_disabled">Toggle disabled option 1</button>
        </div>
      </div>
    </DemoBlock>

    <DemoBlock id="radio-single" title="Single Radio" :code="singleRadioCode">
      <div class="live">
        <Radio label="single test radio" value="option unit" @change="radioSelectionChange"/>
      </div>
    </DemoBlock>

    <DemoBlock id="radio-group-secondary" title="Radio Group (secondary-blue)" :code="groupSecondaryCode">
      <div class="live">
        <Radio v-model="test_group_2_value" label="test radio 1" name="test group 2" value="option 1" built_in_theme="secondary-blue" />
        <Radio v-model="test_group_2_value" label="test radio 2" name="test group 2" value="option 2" built_in_theme="secondary-blue" />
      </div>
    </DemoBlock>

    <DemoBlock id="radio-disabled" title="Disabled Single Radio" :code="disabledSingleCode">
      <div class="live">
        <Radio v-model="check_single_radio_value" label="single test radio" value="option unit" :disabled="true" ref="disabled-target-1"/>
        <div class="actions">
          <button @click="$refs['disabled-target-1'].focus()">Focus</button>
          <button @click="$refs['disabled-target-1'].blur()">Blur</button>
          <button @click="check_single_radio_value = check_single_radio_value ? '' : 'option unit'">Toggle</button>
        </div>
      </div>
    </DemoBlock>

    <DemoBlock id="radio-no-label" title="No Label" :code="noLabelCode">
      <div class="live">
        <Radio v-model="check_single_radio_value" value="option 1" built_in_theme="secondary-blue" ref='no-label-target-1'/>
        <div class="actions">
          <button @click="$refs['no-label-target-1'].alert('Customized error message')">Show error</button>
          <button @click="$refs['no-label-target-1'].removeAlertOrErrorEffect()">Clear</button>
        </div>
      </div>
    </DemoBlock>
  </div>
</template>

<script>
import Radio from "@/components/Radio.vue";
import DemoBlock from '@/componentsDemo/DemoBlock.vue';

export default{
  components:{
    Radio,
    DemoBlock,
  },
  data(){
    return {
      test_group_1_value:'',
      test_group_2_value:'',
      test_group_1_disabled:false,
      check_single_radio_value:'option unit',
    }
  },
  watch:{
    test_group_1_value(newVal){
      console.log('test_group_1_value change', newVal);
    },
    test_group_2_value(newVal){
      console.log('test_group_2_value change', newVal);
    },
  },
  computed:{
    groupPrimaryCode(){
      return `<template>\n  <Radio v-model=\"val\" label=\"'test radio 1'\" name=\"'group-1'\" value=\"'option 1'\" ref=\"r\"/>\n  <Radio v-model=\"val\" label=\"'test radio 2'\" name=\"'group-1'\" value=\"'option 2'\"/>\n  <button @click=\"() => r.focus()\">Focus</button>\n  <button @click=\"() => r.blur()\">Blur</button>\n  <button @click=\"() => r.alert('Customized error')\">Show error</button>\n  <button @click=\"() => r.removeAlertOrErrorEffect()\">Clear</button>\n</template>\n\n<script setup>\nimport { ref } from 'vue'\nimport { Radio } from 'pns-component-library'\nconst val = ref('')\nconst r = ref(null)\n<\/script>`
    },
    singleRadioCode(){
      return `<template>\n  <Radio label=\"'single test radio'\" value=\"'option unit'\"/>\n</template>`
    },
    groupSecondaryCode(){
      return `<template>\n  <Radio v-model=\"val\" label=\"'test radio 1'\" name=\"'group-2'\" value=\"'option 1'\" built_in_theme=\"'secondary-blue'\"/>\n  <Radio v-model=\"val\" label=\"'test radio 2'\" name=\"'group-2'\" value=\"'option 2'\" built_in_theme=\"'secondary-blue'\"/>\n</template>`
    },
    disabledSingleCode(){
      return `<template>\n  <Radio v-model=\"val\" label=\"'single test radio'\" value=\"'option unit'\" :disabled=\"true\"/>\n</template>\n\n<script setup>\nimport { ref } from 'vue'\nconst val = ref('option unit')\n<\/script>`
    },
    noLabelCode(){
      return `<template>\n  <Radio v-model=\"val\" value=\"'option 1'\" built_in_theme=\"'secondary-blue'\" ref=\"r\"/>\n</template>\n\n<script setup>\nimport { ref } from 'vue'\nconst val = ref('')\nconst r = ref(null)\n<\/script>`
    }
  },
  methods:{
    radioSelectionChange(val){
      console.log('radioSelectionChange', val);
    }
  }
}
</script>

<style scoped>
.component-doc{ max-width: 900px; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; }
.live{ border: 1px dashed #e5e7eb; padding: 12px; border-radius: 8px; background: #fff; display:flex; flex-direction: column; gap: 8px; }
.actions{ display:flex; gap:8px; flex-wrap:wrap; }
</style>