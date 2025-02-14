<template>
  <div>
  <!-- Samples Display for SimplifiedNotification.vue -->
  <SimplifiedNotificationDoc />

  <br />
  <!-- Samples Display for InputBox.vue -->
  <InputBoxDoc />

  <br />
  <!-- Samples Display for SingleSelector.vue -->
  <SingleSelectorDoc />

  <br />
  <!-- Samples Display for ResponsiveButton.vue -->
  <ResponsiveButtonDoc />

  <br />
  <!-- Samples Display for Directives -->
  <CheckboxDoc />

  <br />
  <!-- Samples Display for Directives -->
  <DirectivesDoc />

  <br />
</div>
</template>

<script>
import SimplifiedNotificationDoc from "@/componentsDemo/SimplifiedNotificationDoc.vue";
import InputBoxDoc from '@/componentsDemo/InputBoxDoc.vue';
import SingleSelectorDoc from '@/componentsDemo/SingleSelectorDoc.vue';
import ResponsiveButtonDoc from '@/componentsDemo/ResponsiveButtonDoc.vue';
import DirectivesDoc from '@/componentsDemo/DirectivesDoc.vue';
import CheckboxDoc from "@/componentsDemo/CheckboxDoc.vue";


export default{
  components: {
    SimplifiedNotificationDoc,
    InputBoxDoc,
    SingleSelectorDoc,
    ResponsiveButtonDoc,
    DirectivesDoc,
    CheckboxDoc
  },
}
</script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
