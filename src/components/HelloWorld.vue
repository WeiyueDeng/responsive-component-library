<template>
  <!-- Samples Display for SimplifiedNotification.vue -->
  <div style = "width: 1000px; border: 1px pink solid; border-radius: 4px; padding:10px">
    <div>Samples Display for SimplifiedNotification.vue</div> <br />
    <SimplifiedNotification title="Cutomized Title" content = "Cutomized content. This is a notification that cannot close manually." :with_close_btn = "false" />
    <br />
    <SimplifiedNotification title="Cutomized Title" content = "Cutomized content. This is a notification that can close manually." build_in_theme = "yellow" :with_close_btn = "true" />
    <br />
    <SimplifiedNotification title="Cutomized Title" content = "Cutomized content. This is a notification that can close manually. And will also disappear after 20 seconds." 
    build_in_theme = "green" :with_close_btn = "true" :hide_after = "20000"/>
    <br />
    <SimplifiedNotification title="Cutomized Title" content = "Cutomized content. This is a notification that cannot close manually, but will disappear after 30 seconds." 
    build_in_theme = "red" :with_close_btn = "false" :hide_after = "30000"/>
  </div>
  <br />
  <div style = "width: 200px; border: 1px pink solid; border-radius: 4px; padding:10px">
    <div>Samples Display for InputBox.vue</div> <br />
    <InputBox ref = "target-input-box" type = "text" clearable v-model = "input_value" placeholder = "Please input your words"/>
    <div @click = "(event)=>{$refs['target-input-box'].focus(); event.stopPropagation()}">click to focus</div>
    <div @click = "(event)=>{$refs['target-input-box'].blur(); event.stopPropagation()}">click to blur</div>
    <div @click = "$refs['target-input-box'].alert('alert msg')">click to show alert</div>
    <div @click = "$refs['target-input-box'].error('error msg')">click to show error</div>
    <div @click = "$refs['target-input-box'].removeAlertOrErrorEffect()">click to remove alert or error</div>
    <br />
    <InputBox type = "text" clearable v-model = "input_value" placeholder = "Please input your words">
      <template #prefix>
        <img src = "@/assets/icons/info_blue_icon.svg" style = "width:100%; height:100%;"/>
      </template>
    </InputBox>
    <br />
    <InputBox type = "text" clearable v-model = "input_value" placeholder = "Please input your words">
      <template #suffix>
        <img src = "@/assets/icons/black_arrow_down.svg" style = "width:100%; height:100%;"/>
      </template>
    </InputBox>
    <br />
    <InputBox type = "text" clearable v-model = "input_value" placeholder = "Please input your words">
      <template #prefix>
        <img src = "@/assets/icons/info_blue_icon.svg" style = "width:100%; height:100%;"/>
      </template>
      <template #suffix>
        <img src = "@/assets/icons/black_arrow_down.svg" style = "width:100%; height:100%;"/>
      </template>
    </InputBox>
    <br />
    <InputBox type = "text" clearable v-model = "input_value" disabled placeholder = "Please input your words"/>
    <br />
    <InputBox type = "date" clearable v-model = "input_date_value" placeholder = "Please input your words"/>
    <br />
    <InputBox type = "date" clearable v-model = "input_date_value" disabled placeholder = "Please input your words"/>
  </div>
  <br />
  <div style = "width: 200px; border: 1px pink solid; border-radius: 4px; padding:10px">
    <div>Samples Display for SingleSelector.vue</div> <br />
    <div>
      <div @click = "(event)=>{$refs['target-selector'].focus(); event.stopPropagation()}">click to focus</div>
      <div @click = "(event)=>{$refs['target-selector'].blur(); event.stopPropagation()}">click to blur</div>
      <div @click = "$refs['target-selector'].alert('alert msg')">click to show alert</div>
      <div @click = "$refs['target-selector'].error('error msg')">click to show error</div>
      <div @click = "$refs['target-selector'].removeAlertOrErrorEffect()">click to remove alert or error</div>
    </div>
    <br />
    <SingleSelector ref = "target-selector"
    v-model = "single_selector_value"
    :options = "single_selector_options"
    clearable />
    <br />
    <br />
    <SingleSelector v-model = "single_selector_value"
    :filterable = "true"
    :options = "single_selector_options"
    :clearable = "true"/>
    <br />
    <SingleSelector v-model = "single_selector_value"
    :filterable = "true"
    :options = "single_selector_options"
    :clearable = "true">
      <template #prefix>
        <img src = "@/assets/icons/black_magnifying_glass_icon.svg" style = "width:100%; height:100%;"/>
      </template>
    </SingleSelector>
    <br />
    <SingleSelector v-model = "single_selector_value"
    :filterable = "true"
    :options = "single_selector_options"
    :clearable = "true"
    disabled/>
  </div>
</template>

<script>
import SimplifiedNotification from '@/components/SimplifiedNotification.vue';
import InputBox from '@/components/InputBox.vue';
import SingleSelector from '@/components/SingleSelector.vue';

export default{
  props:{
    msg: String,
  },
  components: {
    SimplifiedNotification,
    InputBox,
    SingleSelector,
  },
  data(){
    return{
      input_value: "123",
      input_date_value:'',

      single_selector_value: "123",
      single_selector_options: [
        {value: "1", label: "Option 1"},
        {value: "2", label: "Option 2"},
        {value: "3", label: "Option 3"},
        {value: "4", label: "Option 4"},
      ],
      
    }
  },
  watch:{
    single_selector_value(newVal){
      console.log("single_selector_value: ", newVal);
    }
  }
}
</script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
