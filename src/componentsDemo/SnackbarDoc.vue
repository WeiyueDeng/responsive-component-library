<template>
  <div class="component-doc">
    <h2>Snackbar</h2>
    <p class="desc">Bottom-positioned snackbar with action buttons, auto-dismiss, and responsive layout. Primarily designed for mobile devices.</p>
    
    <DemoBlock id="snackbar-basic" title="Basic Snackbar (Auto-hide in 3s)" :code="basicCode">
      <div class="live-demo stack">
        <Snackbar 
          content="Basic snackbar message"
          action="Action"
          :with_close_icon="true"
          :hide_after="0"
        />
      </div>
    </DemoBlock>

    <DemoBlock id="snackbar-no-action" title="Without Action Button" :code="noActionCode">
      <div class="live-demo stack">
        <Snackbar 
          content="Snackbar without action button"
          :with_close_icon="true"
          :hide_after="0"
        />
      </div>
    </DemoBlock>

    <DemoBlock id="snackbar-larger-padding" title="Larger Padding" :code="largerPaddingCode">
      <div class="live-demo stack">
        <Snackbar 
          content="Snackbar with larger padding"
          action="Action"
          :with_close_icon="true"
          padding_size="large"
          :hide_after="0"
        />
      </div>
    </DemoBlock>

    <DemoBlock id="snackbar-long-action" title="Long Action Button Text (Stacked Layout)" :code="longActionCode">
      <div class="live-demo stack">
        <Snackbar 
          content="Snackbar with long action button text"
          action="Long Action Button"
          :with_close_icon="true"
          :hide_after="0"
        />
      </div>
    </DemoBlock>

    <DemoBlock id="snackbar-action-handler" title="Action Button Click Handler" :code="actionHandlerCode">
      <div class="live-demo stack">
        <Snackbar 
          content="Click the action button to see event log"
          action="Click Me"
          :with_close_icon="true"
          :hide_after="0"
          @action="handleActionClick"
        />
        
        <div class="log">
          <div class="log-title">Event Log</div>
          <ul>
            <li v-for="(e, i) in eventLogs" :key="i">{{ e.time }} — {{ e.type }}<span v-if="e.detail">: {{ e.detail }}</span></li>
          </ul>
        </div>
      </div>
    </DemoBlock>

    <DemoBlock id="snackbar-no-auto-hide" title="Disable Auto-Hide" :code="noAutoHideCode">
      <div class="live-demo stack">
        <Snackbar 
          content="This snackbar will NOT auto-hide (must be closed manually)"
          action="Action"
          :with_close_icon="true"
          :hide_after="0"
        />
      </div>
    </DemoBlock>

    <DemoBlock id="snackbar-floating" title="FloatingSnackbar (Composable)" :code="floatingCode">
      <div class="live-demo stack">
        <button @click="showFloatingSnackbar">Show Floating Snackbar</button>
        <button @click="showFloatingSnackbarWithoutAutoHide">Show disabled Auto-Hide</button>
        <button @click="showFloatingSnackbarCustomSlot">Show with Custom Slot Content</button>
      </div>
    </DemoBlock>
  </div>
</template>

<script>
import Snackbar from '@/components/Snackbar.vue';
import { FloatingSnackbar } from '@/composables/FloatingSnackbar.js';
import { h } from 'vue';
import DemoBlock from '@/componentsDemo/DemoBlock.vue';

export default {
  components: { 
    Snackbar,
    DemoBlock 
  },
  data() {
    return {
      count: 1,
      eventLogs: []
    };
  },
  computed: {
    basicCode() {
      return `<template>
  <!-- Auto-hides in 3 seconds by default -->
  <Snackbar 
    content="Basic snackbar message"
    action="Action"
    :with_close_icon="true"
  />
</template>`;
    },
    noActionCode() {
      return `<template>
  <!-- Snackbar without action button, only close icon -->
  <Snackbar 
    content="Snackbar without action button"
    :with_close_icon="true"
  />
</template>`;
    },
    largerPaddingCode() {
      return `<template>
  <Snackbar 
    content="Snackbar with larger padding"
    action="Action"
    :with_close_icon="true"
    padding_size="large"
  />
</template>`;
    },
    longActionCode() {
      return `<template>
  <!-- Action button text >10 characters triggers stacked layout -->
  <Snackbar 
    content="Snackbar with long action button text"
    action="Long Action Button"
    :with_close_icon="true"
  />
</template>

<!-- Note: When action text length > 10 characters, 
     layout automatically switches to column (stacked) -->`;
    },
    actionHandlerCode() {
      return `<template>
  <!-- No auto-close, action button shows in event log -->
  <Snackbar 
    content="Click the action button to see event log"
    action="Click Me"
    :with_close_icon="true"
    :hide_after="0"
    @action="handleActionClick"
  />
  
  <div class="log">
    <div class="log-title">Event Log</div>
    <ul>
      <li v-for="(e, i) in eventLogs" :key="i">
        {{ e.time }} — {{ e.type }}<span v-if="e.detail">: {{ e.detail }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      eventLogs: []
    };
  },
  methods: {
    handleActionClick() {
      const now = new Date();
      const time = \`\${now.getHours().toString().padStart(2, '0')}:\${now.getMinutes().toString().padStart(2, '0')}:\${now.getSeconds().toString().padStart(2, '0')}\`;
      this.eventLogs.unshift({
        time: time,
        type: 'action',
        detail: 'Action button clicked'
      });
    }
  }
};
<\/script>`;
    },
    noAutoHideCode() {
      return `<template>
  <!-- Set hide_after to 0 to disable auto-hide -->
  <Snackbar 
    content="This snackbar will NOT auto-hide"
    action="Action"
    :with_close_icon="true"
    :hide_after="0"
  />
</template>`;
    },
    floatingCode() {
      return `// Composable usage
import { FloatingSnackbar } from 'pns-component-library'

// Basic usage (auto-hides in 3s by default)
FloatingSnackbar({
  content: 'File deleted',
  action: 'Undo',
  with_close_icon: true,
  onAction: () => {
    console.log('Undo clicked');
  }
});

// Without auto-hide
FloatingSnackbar({
  content: 'This snackbar will not auto-close',
  action: 'Dismiss',
  with_close_icon: true,
  hide_after: 0,
  onAction: () => {
    console.log('Dismiss clicked');
  }
});

// Custom slot content
FloatingSnackbar({
  action: 'Action',
  with_close_icon: true
}, {
  default: () => h('div', { style: { fontWeight: 'bold' } }, 'Custom content')
});`;
    }
  },
  methods: {
    handleActionClick() {
      const now = new Date();
      const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
      this.eventLogs.unshift({
        time: time,
        type: 'action',
        detail: 'Action button clicked'
      });
      console.log('Action button clicked!');
    },
    showFloatingSnackbar() {
      FloatingSnackbar({
        content: `${this.count}. File deleted successfully`,
        action: 'Undo',
        with_close_icon: true,
        onAction: () => {
          console.log('Undo clicked');
        },
        onClose: () => {
          console.log('Snackbar closed');
        }
      });
      this.count++;
    },
    showFloatingSnackbarWithoutAutoHide() {
      FloatingSnackbar({
        content: `${this.count}. This snackbar will not auto-close`,
        action: 'Dismiss',
        with_close_icon: true,
        hide_after: 0,
        onAction: () => {
          console.log('Dismiss clicked');
        }
      });
      this.count++;
    },
    showFloatingSnackbarCustomSlot() {
      FloatingSnackbar({
        action: 'Dismiss',
        with_close_icon: true,
        onAction: () => {
          console.log('Dismiss clicked');
        }
      }, {
        default: () => h(
          'div', 
          {}, 
          [
            h('span', { style: { fontWeight: 'bold' } }, `${this.count}. Custom content: `),
            h('span', {}, 'This is a custom message with '),
            h('a', { 
              href: '#', 
              style: { color: '#D0BCFF', textDecoration: 'underline' },
              onClick: (e) => {
                e.preventDefault();
                console.log('Link clicked');
              }
            }, 'a link')
          ]
        )
      });
      this.count++;
    }
  }
};
</script>

<style scoped>
.component-doc {
  max-width: 900px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 16px;
}

.desc {
  color: #4b5563;
  margin-bottom: 12px;
}

.live-demo.stack {
  display: flex;
  flex-direction: column;
  gap: 16px;
  /* Simulate mobile viewport for snackbar demos */
  max-width: 400px;
  margin: 0 auto;
  background: #f5f5f5;
  padding: 16px;
  border-radius: 8px;
  position: relative;
}

.log {
  margin-top: 16px;
  padding: 12px;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  max-height: 200px;
  overflow-y: auto;
}

.log-title {
  font-weight: 600;
  font-size: 14px;
  color: #374151;
  margin-bottom: 8px;
}

.log ul {
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 13px;
  color: #6b7280;
}

.log li {
  padding: 4px 0;
  border-bottom: 1px solid #e5e7eb;
}

.log li:last-child {
  border-bottom: none;
}

.log li span {
  color: #374151;
}
</style>
