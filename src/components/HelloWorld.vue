<script setup>
import { defineComponent, ref } from 'vue'
import SimplifiedNotification from './SimplifiedNotification.vue';

defineProps({
  msg: String,
})

defineComponent({
  components: {
    SimplifiedNotification
  }
})

const count = ref(0)
</script>

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
  

  <h1>{{ msg }}</h1>
  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Learn more about IDE Support for Vue in the
    <a
      href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support"
      target="_blank"
      >Vue Docs Scaling up Guide</a
    >.
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
