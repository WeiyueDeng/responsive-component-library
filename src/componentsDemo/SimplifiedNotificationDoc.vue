<template>
  <div class="component-doc">
    <h2>SimplifiedNotification</h2>
    <p class="desc">Toast-style alert with theme, optional close button, and auto-hide.</p>
    <DemoBlock id="sn-basic" title="Basic Notifications" :code="basicCode">
      <div class="live-demo stack">
        <SimplifiedNotification title="Customized Title" content="Non-closable notification" :with_close_btn="false" />
        <SimplifiedNotification title="Warning" content="Closable notification" build_in_theme="yellow" :with_close_btn="true" />
        <SimplifiedNotification title="Success" content="Closable and auto-dismiss after 20s" build_in_theme="green" :with_close_btn="true" :hide_after="20000" />
        <SimplifiedNotification title="Error" content="Non-closable but auto-dismiss after 30s" build_in_theme="red" :with_close_btn="false" :hide_after="30000" />
      </div>
    </DemoBlock>

    <DemoBlock id="sn-floating" title="FloatingNotification (Composable)" :code="floatingCode">
      <div class="live-demo stack">
        <button @click="clickToShowGlobalNotification">Show global floating notification</button>
        <button @click="clickToShowCustomizedContentGlobalNotificationViaSlot">Show with custom slot content</button>
      </div>
    </DemoBlock>
  </div>
</template>

<script>
import SimplifiedNotification from '@/components/SimplifiedNotification.vue';
import { FloatingNotification } from '@/composables/FloatingNotification.js';
import { h } from 'vue';
import DemoBlock from '@/componentsDemo/DemoBlock.vue';

export default{
  components: { SimplifiedNotification, DemoBlock },
  data(){
    return{ count:1 }
  },
  computed:{
    floating_notification_props(){
      return {
        title: 'Global Floating Notification',
        content: `${this.count}. Custom content. Non-closable, auto-dismiss after 30s.`,
        build_in_theme: 'red',
        with_close_btn: true,
        hide_after: 30000,
      }
    },
    floating_notification_props_with_slot(){
      return {
        title: 'Error',
        build_in_theme: 'red',
        with_close_btn: true,
        onClose: () => { console.log('close'); }
      }
    },
    basicCode(){
      return `<template>
  <SimplifiedNotification title="Customized Title" content="Non-closable notification" :with_close_btn="false" />
  <SimplifiedNotification title="Warning" content="Closable notification" build_in_theme="yellow" :with_close_btn="true" />
  <SimplifiedNotification title="Success" content="Closable and auto-dismiss after 20s" build_in_theme="green" :with_close_btn="true" :hide_after="20000" />
  <SimplifiedNotification title="Error" content="Non-closable but auto-dismiss after 30s" build_in_theme="red" :with_close_btn="false" :hide_after="30000" />
</template>`
    },
    floatingCode(){
      return `// Composable usage\nimport { FloatingNotification } from 'pns-component-library'\n\n// Show notification\nFloatingNotification({\n  title: 'Global Floating Notification',\n  content: 'Custom content',\n  build_in_theme: 'red',\n  with_close_btn: true,\n  hide_after: 30000,\n})\n\n// With custom slot content\nFloatingNotification({ title: 'Error', build_in_theme: 'red', with_close_btn: true }, {\n  content: () => h('div', {}, ['custom node'])\n})`
    }
  },
  methods:{
    clickToShowGlobalNotification(){
      FloatingNotification(this.floating_notification_props);
      this.count++;
    },
    clickToShowCustomizedContentGlobalNotificationViaSlot(){
      FloatingNotification(this.floating_notification_props_with_slot,{
        content: () => h(
          'div', {}, [
            h('div', {}, 'We encountered a system error while loading the order, preventing the following information from being displayed:'),
            h('ul', { style:{ margin:'0', 'padding-inline-start':'3ch' } }, [
              h('li', {}, 'error 1'),
              h('li', {}, 'error 2'),
              h('li', {}, 'error 3'),
            ]),
            h('span', { style:{ marginTop:'4px', textDecoration:'underline', cursor:'pointer' }, onClick: () => console.log('click action button') }, 'action button')
          ]
        ) 
      });
      this.count++;
    }
  }
}
</script>

<style scoped>
.component-doc{ max-width: 900px; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; }
.desc{ color:#4b5563; margin-bottom: 12px; }
.live-demo.stack{ display:flex; flex-direction: column; gap: 8px; }
</style>