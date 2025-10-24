<template>
  <div class="docs-layout">
    <aside class="docs-sidebar">
      <div class="sidebar-title">Dev-Only Components</div>
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
      <h1>Dev-Only Components Documentation</h1>
      <div class="intro-panel">
        <p>
          The components on this page are for <strong>internal development only</strong> and are not exported
          as part of the public component library API. They exist to support future components (e.g.,
          dropdown button, selectors) or to validate patterns.
        </p>
      </div>

      <!-- DropdownMenu (dev-only) -->
      <section id="dropdown-menu" class="doc-section" data-title="DropdownMenu (Dev-Only)">
        <h2>DropdownMenu (Dev-Only)</h2>
        <p class="section-desc">
          Internal dropdown menu primitive used to explore nested menu behaviors and interactions. Not exported.
        </p>
        <DropdownMenuDoc />
      </section>
    </main>
  </div>
</template>

<script>
import DropdownMenuDoc from '@/componentsDemo/DropdownMenuDoc.vue'

export default {
  components: { DropdownMenuDoc },
  data() {
    return {
      sections: [
        { id: 'dropdown-menu', title: 'DropdownMenu (Dev-Only)' },
      ],
      activeSection: 'dropdown-menu',
    }
  },
  mounted(){
    if('scrollBehavior' in document.documentElement.style){
      document.documentElement.style.scrollBehavior = 'smooth';
    }
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
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #fff;
}
.sidebar-title{ font-weight: 600; margin-bottom: 8px; }
.sidebar-link{
  display: block;
  padding: 6px 8px;
  color: #374151;
  text-decoration: none;
  border-radius: 6px;
  margin: 2px 0;
}
.sidebar-link:hover{ background: #f3f4f6; }
.sidebar-link.active{
  background: #eef2ff;
  color: #3730a3;
  font-weight: 600;
}
.docs-content{ max-width: 1000px; }
.intro-panel{
  padding: 12px 16px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #fafafa;
  color: #111;
  margin-bottom: 16px;
}
.doc-section{
  padding-top: 8px;
  margin-bottom: 24px;
  scroll-margin-top: 80px;
}
.section-desc{ color: #4b5563; margin-top: 4px; margin-bottom: 12px; }
</style>
