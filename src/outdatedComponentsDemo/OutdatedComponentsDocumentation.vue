<template>
  <div class="docs-layout">
    <aside class="docs-sidebar legacy">
      <div class="sidebar-title">Legacy Demos</div>
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
      <h1>Outdated Components Documentation (Legacy Version and Usage Examples)</h1>
      <div class="intro-panel legacy">
        <p>
          This page contains <strong>legacy, deprecated</strong> demos for components. These samples still
          work, but are <strong>not actively maintained</strong>.
        </p>
        <ul>
          <li>May have issues occasionally due to lack of maintenance.</li>
          <li>Styles might not reflect the most recent design updates.</li>
          <li>For the latest, recommended demos, see
            <code>src/componentsDemo/ComponentsDocumentation.vue</code>.</li>
        </ul>
      </div>

      <section id="simplified-notification" class="doc-section" data-title="SimplifiedNotification">
        <h2>SimplifiedNotification (Legacy)</h2>
        <p class="section-desc">Older setup for toast notifications. Prefer latest samples for new apps.</p>
        <SimplifiedNotificationDoc />
      </section>

      <section id="input-box" class="doc-section" data-title="InputBox">
        <h2>InputBox (Legacy)</h2>
        <p class="section-desc">Prior API surface and styles. Some props/UX may differ from latest.</p>
        <InputBoxDoc />
      </section>

      <section id="single-selector" class="doc-section" data-title="SingleSelector">
        <h2>SingleSelector (Legacy)</h2>
        <p class="section-desc">Deprecated usage patterns. See latest demos for current recommendations.</p>
        <SingleSelectorDoc />
      </section>

      <section id="area-code-phone-input" class="doc-section" data-title="AreaCodePhoneInput">
        <h2>AreaCodePhoneInput (Legacy)</h2>
        <p class="section-desc">May lack recent validation and focus management enhancements.</p>
        <AreaCodePhoneInputDoc />
      </section>

      <section id="responsive-button" class="doc-section" data-title="ResponsiveButton">
        <h2>ResponsiveButton (Legacy)</h2>
        <p class="section-desc">Legacy theming and dropdown behaviours.</p>
        <ResponsiveButtonDoc />
      </section>

      <section id="checkbox" class="doc-section" data-title="Checkbox">
        <h2>Checkbox (Legacy)</h2>
        <p class="section-desc">Outdated theme tokens and error handling. Use latest component samples.</p>
        <CheckboxDoc />
      </section>

      <section id="radio" class="doc-section" data-title="Radio">
        <h2>Radio (Legacy)</h2>
        <p class="section-desc">Older markup and styling. Refer to latest docs for standardized patterns.</p>
        <RadioDoc />
      </section>

      <section id="directives" class="doc-section" data-title="Directives">
        <h2>Directives (Legacy)</h2>
        <p class="section-desc">Legacy directive usage. Latest page shows up-to-date patterns.</p>
        <DirectivesDoc />
      </section>

      <section id="whole-page-error-popup" class="doc-section" data-title="WholePageErrorPopup">
        <h2>WholePageErrorPopup (Legacy)</h2>
        <p class="section-desc">Older implementation of the error overlay.</p>
        <WholePageErrorPopupDoc />
      </section>
    </main>
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
  data(){
    return{
      sections: [
        { id: 'simplified-notification', title: 'SimplifiedNotification' },
        { id: 'input-box', title: 'InputBox' },
        { id: 'single-selector', title: 'SingleSelector' },
        { id: 'area-code-phone-input', title: 'AreaCodePhoneInput' },
        { id: 'responsive-button', title: 'ResponsiveButton' },
        { id: 'checkbox', title: 'Checkbox' },
        { id: 'radio', title: 'Radio' },
        { id: 'directives', title: 'Directives' },
        { id: 'whole-page-error-popup', title: 'WholePageErrorPopup' },
      ],
      activeSection: 'simplified-notification'
    }
  },
  mounted(){
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if(entry.isIntersecting){
          const id = entry.target.getAttribute('id');
          if(id){ this.activeSection = id; }
        }
      })
    }, { rootMargin: '0px 0px -70% 0px', threshold: 0.1 });
    this.$el.querySelectorAll('.doc-section').forEach((el) => observer.observe(el));
  },
  methods:{
    scrollTo(id){
      const el = this.$el.querySelector(`#${id}`);
      if(el){ el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
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
  border: 1px solid #fde68a;
  border-radius: 8px;
  background: #fffbeb;
}
.docs-sidebar.legacy{ color: #92400e; }
.sidebar-title{ font-weight: 600; margin-bottom: 8px; }
.sidebar-link{
  display: block; padding: 6px 8px; border-radius: 6px; margin: 2px 0; color: #92400e; text-decoration:none;
}
.sidebar-link:hover{ background: #fef3c7; }
.sidebar-link.active{ background: #fde68a; font-weight: 600; }

.docs-content{ max-width: 1000px; }
.intro-panel{
  padding: 12px 16px;
  border: 1px solid #fde68a;
  border-radius: 8px;
  background: #fffbeb;
  color: #92400e;
  margin-bottom: 16px;
}
.intro-panel ul{ margin: 0; padding-left: 18px; }

.doc-section{ padding-top: 8px; margin-bottom: 24px; scroll-margin-top: 80px; }
.section-desc{ color: #92400e; margin-top: 4px; margin-bottom: 12px; }
</style>
