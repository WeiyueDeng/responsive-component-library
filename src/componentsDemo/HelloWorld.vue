<template>
  <div>
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
  <!-- Samples Display for InputBox.vue -->
  <div style = "width: 200px; border: 1px pink solid; border-radius: 4px; padding:10px">
    <div>Samples Display for InputBox.vue</div> <br />
    <InputBox ref = "target-input-box" type = "text" clearable v-model = "input_value" placeholder = "Please input your words"/>
    <div @click = "(event)=>{$refs['target-input-box'].focus(); event.stopPropagation()}">click to focus</div>
    <div @click = "(event)=>{$refs['target-input-box'].blur(); event.stopPropagation()}">click to blur</div>
    <div @click = "$refs['target-input-box'].alert('alert msg 123123123 123123 123')">click to show alert</div>
    <div @click = "$refs['target-input-box'].error('error msg 123123123 12312 123 1231')">click to show error</div>
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
    <div>type = 'date'</div> <br />
    <InputBox type = "date" clearable v-model = "input_date_value" placeholder = "Please input your words"/>
    <br />
    <InputBox type = "date" clearable v-model = "input_date_value" disabled placeholder = "Please input your words"/>
    <br />
    <div>type = 'password'</div> <br />
    <InputBox :type = "hide_typed_password?'password':'text'" clearable v-model = "input_password_value" placeholder = "Enter your password">
      <template #suffix>
        <img :src = "dynamicPasswordSuffix" style = "width:100%; height:100%;" @click = "hide_typed_password = !hide_typed_password"/>
      </template>
    </InputBox>
  </div>

  <br />
  <!-- Samples Display for SingleSelector.vue -->
  <div style = "width: 200px; border: 1px pink solid; border-radius: 4px; padding:10px">
    <div>Samples Display for SingleSelector.vue</div> <br />
    <div>
      <div @click = "(event)=>{$refs['target-selector'].focus(); event.stopPropagation()}">click to focus</div>
      <div @click = "(event)=>{$refs['target-selector'].blur(); event.stopPropagation()}">click to blur</div>
      <div @click = "$refs['target-selector'].alert('alert msg 2312312 312331231')">click to show alert</div>
      <div @click = "$refs['target-selector'].error('error msg 12312312 312312312313123')">click to show error</div>
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

  <br />
  <!-- Samples Display for ResponsiveButton.vue -->
  <div style = "width: 1000px; border: 1px pink solid; border-radius: 4px; padding:10px">
    <div>Samples Display for ResponsiveButton.vue</div> <br />
    <!-- fit content -->
    <div>width-type: fit-content</div>
    <br />
    <div @click = "$refs['target-responsive-button'].setLoading(true)" style = "width:fit-content">click to loading</div>
    <div @click = "$refs['target-responsive-button'].setLoading(false)" style = "width:fit-content">click to unloading</div>
    <ResponsiveButton 
    ref = "target-responsive-button"
    display_name='General Information' build_in_theme="outlined-primary" 
    width_type="fit-content"
    @click = "(display_name)=>handleRedirectButtonClick(display_name)"/>
    <br />
    <ResponsiveButton 
    display_name='General Information' build_in_theme="filled-primary" 
    width_type="fit-content"
    @click = "(display_name)=>handleRedirectButtonClick(display_name)"/>
    <br />
    <ResponsiveButton 
    display_name='General Information' build_in_theme="text-primary" 
    @click = "(display_name)=>handleRedirectButtonClick(display_name)"/>
    <br />
    <ResponsiveButton 
    display_name='General Information' build_in_theme="outlined-secondary" 
    width_type="fit-content"
    @click = "(display_name)=>handleRedirectButtonClick(display_name)"/>
    <br />
    <ResponsiveButton 
    display_name='General Information' build_in_theme="filled-secondary" 
    @click = "(display_name)=>handleRedirectButtonClick(display_name)"/>
    <br />
    <ResponsiveButton 
    display_name='General Information' build_in_theme="text-secondary" 
    @click = "(display_name)=>handleRedirectButtonClick(display_name)"/>
    <br />
    <!-- fill whole -->
    <div>width-type: fill-whole</div>
    <br />
    <ResponsiveButton 
    display_name='General Information' build_in_theme="outlined-primary" 
    width_type="fill-whole"
    @click = "(display_name)=>handleRedirectButtonClick(display_name)"/>
    <br />
    <ResponsiveButton 
    display_name='General Information' build_in_theme="filled-primary" 
    width_type="fill-whole"
    @click = "(display_name)=>handleRedirectButtonClick(display_name)"/>
    <br />
    <ResponsiveButton 
    display_name='General Information' build_in_theme="text-primary" 
    width_type="fill-whole"
    @click = "(display_name)=>handleRedirectButtonClick(display_name)"/>
    <br />
    <ResponsiveButton 
    display_name='General Information' build_in_theme="outlined-secondary" 
    width_type="fill-whole"
    @click = "(display_name)=>handleRedirectButtonClick(display_name)"/>
    <br />
    <ResponsiveButton 
    display_name='General Information' build_in_theme="filled-secondary"
    width_type="fill-whole" 
    @click = "(display_name)=>handleRedirectButtonClick(display_name)"/>
    <br />
    <ResponsiveButton 
    display_name='General Information' build_in_theme="text-secondary"
    width_type="fill-whole" 
    @click = "(display_name)=>handleRedirectButtonClick(display_name)"/>
    <br />
    <div>Dropdown Reponsive Button</div> <br />
    <ResponsiveButton 
    display_name='Fill the Questionnaire (3 min)' build_in_theme="filled-primary" 
    width_type="fill-whole"
    :dropdown_options="test_dropdown_options"
    @click = "(display_name)=>handleRedirectButtonClick(display_name)">
          <template #prefix>
              <img src = "@/assets/icons/red_notification_icon.svg" style = "width: 100%; height: 100%;"/>
          </template>
    </ResponsiveButton>
    <br />
    <div @click = "(event)=>{event.stopPropagation(); $refs['target-responsive-dropdown-button-fit'].setLoading(true)}" style = "width:fit-content">click to loading</div>
    <div @click = "$refs['target-responsive-dropdown-button-fit'].setLoading(false)" style = "width:fit-content">click to unloading</div>
    <ResponsiveButton 
    ref = "target-responsive-dropdown-button-fit"
    display_name='Questionnaire' build_in_theme="outlined-primary" 
    width_type="fit-content"
    :dropdown_options="test_dropdown_options"
    @click = "(display_name)=>handleRedirectButtonClick(display_name)" />
    <br />
    <ResponsiveButton 
    ref = "target-responsive-dropdown-button"
    display_name='Fill the Questionnaire (3 min)' build_in_theme="outlined-secondary" 
    width_type="fill-whole"
    :dropdown_options="test_dropdown_options"
    @click = "(display_name)=>handleRedirectButtonClick(display_name)"/>
    <div @click = "$refs['target-responsive-dropdown-button'].setLoading(true)" style = "width:fit-content">click to loading</div>
    <div @click = "$refs['target-responsive-dropdown-button'].setLoading(false)" style = "width:fit-content">click to unloading</div>
    <br />
    <ResponsiveButton 
    display_name='Fill the Questionnaire 123123(3 min)' build_in_theme="filled-secondary" 
    width_type="fit-content"
    :dropdown_options="test_disabled_dropdown_options"
    @click = "(display_name)=>handleRedirectButtonClick(display_name)">
      <template #prefix>
          <img src = "@/assets/icons/black_magnifying_glass_icon.svg" style = "width: 100%; height: 100%;"/>
      </template>
    </ResponsiveButton>
  </div>
  <br />
</div>
</template>

<script>
import SimplifiedNotification from '@/components/SimplifiedNotification.vue';
import InputBox from '@/components/InputBox.vue';
import SingleSelector from '@/components/SingleSelector.vue';
import ResponsiveButton from '@/components/ResponsiveButton.vue';

import eye_with_cross_icon from '@/assets/icons/eye_with_cross_icon.svg';
import eye_icon from '@/assets/icons/eye_icon.svg';


export default{
  props:{
    msg: String,
  },
  components: {
    SimplifiedNotification,
    InputBox,
    SingleSelector,
    ResponsiveButton
  },
  data(){
    return{
      input_value: "123",
      input_date_value:'',
      input_password_value:'',
      hide_typed_password:true,

      single_selector_value: "123",
      single_selector_options: [
        {value: "1", label: "Option 1"},
        {value: "2", label: "Option 2"},
        {value: "3", label: "Option 3"},
        {value: "4", label: "Option 4"},
      ],

      test_dropdown_options:[
        {
          display_name:'op 1'
        },
        {
          display_name:'op 2231 231 2312 312 123 34234123 1234 12341 1234',
          dropdown_options:[
            {
              display_name:'op 2.1'
            },
            {
              display_name:'op 2.2',
              dropdown_options:[
                {display_name:'op 2.2.1'},
                {display_name:'op 2.2.2'}
              ]
          }
          ]
        },
      ],
      test_disabled_dropdown_options:[
        {
          display_name:'op 1'
        },
        {
          display_name:'op 2231 231 2312 312 123 34234123 1234 12341 1234',
          dropdown_options:[
            {
              display_name:'op 2.1'
            },
            {
              display_name:'op 2.2',
              disabled:true,
              dropdown_options:[
                {
                  display_name:'op 2.2.1'
                },
                {
                  display_name:'op 2.2.2'
                }
              ]
            }
          ]
        },
      ]
    }
  },
  computed:{
    dynamicPasswordSuffix(){
      return this.hide_typed_password ? eye_with_cross_icon : eye_icon;
    }
  },
  watch:{
    single_selector_value(newVal){
      console.log("single_selector_value: ", newVal);
    }
  },
  methods:{
    handleRedirectButtonClick(display_name){
      alert('click ResponsiveButton: ' + display_name);
    }
  }
}
</script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
