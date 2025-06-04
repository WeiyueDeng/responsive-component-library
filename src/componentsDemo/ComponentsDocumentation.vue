<template>
  <div style = "display: flex; align-items: center; flex-direction: column;">
  <!-- Samples Display for SimplifiedNotification.vue -->
  <SimplifiedNotificationDoc />

  <br />
  <!-- Samples Display for InputBox.vue -->
  <InputBoxDoc />

  <br />
  <!-- Samples Display for SingleSelector.vue -->
  <SingleSelectorDoc />

  <br />
  <!-- Samples Display for AreaCodePhoneInput.vue -->
  <AreaCodePhoneInputDoc />

  <br />
  <!-- Samples Display for ResponsiveButton.vue -->
  <ResponsiveButtonDoc />

  <br />
  <!-- Samples Display for Checkbox -->
  <CheckboxDoc />

  <br />
  <!-- Samples Display for Radio -->
  <RadioDoc />

  <br />
  <!-- Samples Display for Directives -->
  <DirectivesDoc />

  <br />
  <!-- Samples Display for WholePageErrorPopup -->
  <WholePageErrorPopupDoc />

  <br />
</div>
</template>

<script>
import SimplifiedNotificationDoc from "@/componentsDemo/SimplifiedNotificationDoc.vue";
import InputBoxDoc from '@/componentsDemo/InputBoxDoc.vue';
import SingleSelectorDoc from '@/componentsDemo/SingleSelectorDoc.vue';
import AreaCodePhoneInputDoc from '@/componentsDemo/AreaCodePhoneInputDoc.vue';
import ResponsiveButtonDoc from '@/componentsDemo/ResponsiveButtonDoc.vue';
import DirectivesDoc from '@/componentsDemo/DirectivesDoc.vue';
import CheckboxDoc from "@/componentsDemo/CheckboxDoc.vue";
import RadioDoc from "@/componentsDemo/RadioDoc.vue";
import WholePageErrorPopupDoc from "@/componentsDemo/WholePageErrorPopupDoc.vue";


export default{
  components: {
    SimplifiedNotificationDoc,
    InputBoxDoc,
    SingleSelectorDoc,
    AreaCodePhoneInputDoc,
    ResponsiveButtonDoc,
    DirectivesDoc,
    CheckboxDoc,
    RadioDoc,
    WholePageErrorPopupDoc,
  },
}
</script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
