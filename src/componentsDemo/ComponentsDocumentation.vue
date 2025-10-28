<template>
  <div class="docs-layout">
    <aside class="docs-sidebar">
      <div class="sidebar-title">Components</div>
      <nav>
        <a
          v-for="s in sections"
          :key="s.id"
          :href="`#${s.id}`"
          :class="['sidebar-link', { active: activeSection === s.id }]"
          @click.prevent="scrollTo(s.id)"
        >{{ s.title }}</a>
      </nav>
    </aside>

    <main class="docs-content">
      <h1>Components Documentation (Latest Version and Usage Examples)</h1>
      <div class="intro-panel">
        <p>
          This page contains the <strong>most up-to-date, actively maintained</strong> demos for all
          components in <code>src/components/</code>.
        </p>
        <ul>
          <li>Recommended for integration and reference in new features.</li>
          <li>APIs, behaviors, and styles reflect the current library version.</li>
          <li>
            For legacy usage, see <code>src/outdatedComponentsDemo/OutdatedComponentsDocumentation.vue</code>.
          </li>
        </ul>
      </div>

      <!-- SimplifiedNotification -->
      <section id="simplified-notification" class="doc-section" data-title="SimplifiedNotification">
        <h2>SimplifiedNotification</h2>
        <p class="section-desc">
          Toast-style feedback with optional title, theme, and auto-hide. Use the composable
          <code>FloatingNotification</code> for programmatic triggers.
        </p>
        <SimplifiedNotificationDoc />
      </section>

      <!-- InputBox -->
      <section id="input-box" class="doc-section" data-title="InputBox">
        <h2>InputBox</h2>
        <p class="section-desc">
          A versatile text input with clearable icon, validation helpers, and prefix/suffix slots.
        </p>
        <InputBoxDoc />
      </section>

      <!-- SingleSelector -->
      <section id="single-selector" class="doc-section" data-title="SingleSelector">
        <h2>SingleSelector</h2>
        <p class="section-desc">
          A dropdown selector supporting filtering, remote search patterns, and common UX affordances.
        </p>
        <SingleSelectorDoc />
      </section>

      <!-- AreaCodePhoneInput -->
      <section id="area-code-phone-input" class="doc-section" data-title="AreaCodePhoneInput">
        <h2>AreaCodePhoneInput</h2>
        <p class="section-desc">
          International phone input with country selection. Includes smart focus behavior and clear button.
        </p>
        <AreaCodePhoneInputDoc />
      </section>

      <!-- DynamicColorResponsiveButton -->
      <section id="dynamic-color-responsive-button" class="doc-section" data-title="DynamicColorResponsiveButton">
        <h2>DynamicColorResponsiveButton</h2>
        <p class="section-desc">
          Modern button with dynamic color logic (filled/outlined/text/elevated), responsive widths, sizes, and icon-only mode.
        </p>
        <DynamicColorResponsiveButtonDoc />
      </section>

      <!-- Checkbox -->
      <section id="checkbox" class="doc-section" data-title="Checkbox">
        <h2>Checkbox</h2>
        <p class="section-desc">
          Customizable checkbox with themes and error/alert helpers. Works standalone or in groups.
        </p>
        <CheckboxDoc />
      </section>

      <!-- Radio -->
      <section id="radio" class="doc-section" data-title="Radio">
        <h2>Radio</h2>
        <p class="section-desc">
          Single-select control with group naming support and theme customization.
        </p>
        <RadioDoc />
      </section>

      <!-- Directives -->
      <section id="directives" class="doc-section" data-title="Directives">
        <h2>Directives</h2>
        <p class="section-desc">
          Utility directives for common UI states like loading overlays, showcased with practical patterns.
        </p>
        <DirectivesDoc />
      </section>

      <!-- Composables -->
      <section id="composables" class="doc-section" data-title="Composables">
        <h2>Composables</h2>
        <p class="section-desc">
          Reusable Vue composables used across the library. For FloatingNotification, see the SimplifiedNotification section above.
        </p>
        <ComposablesDoc />
      </section>

      <!-- WholePageErrorPopup -->
      <section id="whole-page-error-popup" class="doc-section" data-title="WholePageErrorPopup">
        <h2>WholePageErrorPopup</h2>
        <p class="section-desc">
          Full-screen error banner for critical failures with a retry callback.
        </p>
        <WholePageErrorPopupDoc />
      </section>

      <!-- FloatingActionButton -->
      <section id="floating-action-button" class="doc-section" data-title="FloatingActionButton">
        <h2>FloatingActionButton</h2>
        <p class="section-desc">
          Mobile-only anchored FAB with built-in themes and optional options menu. Hides automatically on
          wide screens.
        </p>
        <FloatingActionButtonDoc />
      </section>

      
    </main>
  </div>
</template>

<script>
import SimplifiedNotificationDoc from "@/componentsDemo/SimplifiedNotificationDoc.vue";
import InputBoxDoc from '@/componentsDemo/InputBoxDoc.vue';
import SingleSelectorDoc from '@/componentsDemo/SingleSelectorDoc.vue';
import AreaCodePhoneInputDoc from '@/componentsDemo/AreaCodePhoneInputDoc.vue';
import DynamicColorResponsiveButtonDoc from '@/componentsDemo/DynamicColorResponsiveButtonDoc.vue';
import DirectivesDoc from '@/componentsDemo/DirectivesDoc.vue';
import CheckboxDoc from "@/componentsDemo/CheckboxDoc.vue";
import RadioDoc from "@/componentsDemo/RadioDoc.vue";
import WholePageErrorPopupDoc from "@/componentsDemo/WholePageErrorPopupDoc.vue";
import FloatingActionButtonDoc from "@/componentsDemo/FloatingActionButtonDoc.vue";
import ComposablesDoc from "@/componentsDemo/ComposablesDoc.vue";

export default{
  components: {
    SimplifiedNotificationDoc,
    InputBoxDoc,
    SingleSelectorDoc,
    AreaCodePhoneInputDoc,
    DynamicColorResponsiveButtonDoc,
    DirectivesDoc,
    CheckboxDoc,
    RadioDoc,
    WholePageErrorPopupDoc,
    FloatingActionButtonDoc,
    ComposablesDoc,
  },
  data(){
    return{
      sections: [
        { id: 'simplified-notification', title: 'SimplifiedNotification' },
        { id: 'input-box', title: 'InputBox' },
        { id: 'single-selector', title: 'SingleSelector' },
        { id: 'area-code-phone-input', title: 'AreaCodePhoneInput' },
        { id: 'dynamic-color-responsive-button', title: 'DynamicColorResponsiveButton' },
        { id: 'checkbox', title: 'Checkbox' },
        { id: 'radio', title: 'Radio' },
        { id: 'directives', title: 'Directives' },
        { id: 'composables', title: 'Composables' },
        { id: 'whole-page-error-popup', title: 'WholePageErrorPopup' },
        { id: 'floating-action-button', title: 'FloatingActionButton' },
      ],
      activeSection: 'simplified-notification'
    }
  },
  mounted(){
    // Smooth scroll behavior
    if('scrollBehavior' in document.documentElement.style){
      document.documentElement.style.scrollBehavior = 'smooth';
    }
    // Observe sections for active highlight
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if(entry.isIntersecting){
          const id = entry.target.getAttribute('id');
          if(id){
            this.activeSection = id;
          }
        }
      })
    }, { rootMargin: '0px 0px -70% 0px', threshold: 0.1 });

    this.$el.querySelectorAll('.doc-section').forEach((el) => observer.observe(el));
  },
  methods:{
    scrollTo(id){
      const el = this.$el.querySelector(`#${id}`);
      if(el){
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }
}
</script>

<style scoped>
.docs-layout{
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 16px;
  align-items: start;
}

.docs-sidebar{
  position: sticky;
  top: 16px;
  height: calc(100vh - 32px);
  overflow: auto;
  padding: 12px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #fff;
}
.sidebar-title{
  font-weight: 600;
  margin-bottom: 8px;
}
.sidebar-link{
  display: block;
  padding: 6px 8px;
  color: #374151;
  text-decoration: none;
  border-radius: 6px;
  margin: 2px 0;
}
.sidebar-link:hover{
  background: #f3f4f6;
}
.sidebar-link.active{
  background: #eef2ff;
  color: #3730a3;
  font-weight: 600;
}

.docs-content{
  max-width: 1000px;
}
.intro-panel{
  padding: 12px 16px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #fafafa;
  color: #111;
  margin-bottom: 16px;
}
.intro-panel ul{ margin: 0; padding-left: 18px; }

.doc-section{
  padding-top: 8px;
  margin-bottom: 24px;
  scroll-margin-top: 80px;
}
.section-desc{
  color: #4b5563;
  margin-top: 4px; margin-bottom: 12px;
}
</style>
