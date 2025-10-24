<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import ComponentsDocumentation from '@/componentsDemo/ComponentsDocumentation.vue'
import OutdatedComponentsDocumentation from '@/outdatedComponentsDemo/OutdatedComponentsDocumentation.vue'
import DevOnlyComponentsDocumentation from '@/devOnlyComponentsDemo/DevOnlyComponentsDocumentation.vue'

// Track which top section is currently active for nav highlighting
const activeTopSection = ref('components-docs')

const sectionIds = ['components-docs', 'outdated-docs', 'devonly-docs']
let observer = null

const scrollToSection = (id) => {
  const el = document.getElementById(id)
  if (el) {
    // Use smooth scrolling without changing focus, then update hash
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    history.replaceState(null, '', `#${id}`)
  }
}

onMounted(() => {
  // Smooth scroll preference
  if ('scrollBehavior' in document.documentElement.style) {
    document.documentElement.style.scrollBehavior = 'smooth'
  }

  observer = new IntersectionObserver((entries) => {
    // Choose the entry that is most visible and above the fold
    const visible = entries
      .filter(e => e.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
    if (visible.length > 0) {
      const id = visible[0].target.id
      if (id && sectionIds.includes(id)) {
        activeTopSection.value = id
      }
    }
  }, { rootMargin: '0px 0px -70% 0px', threshold: [0.1, 0.25, 0.5] })

  sectionIds.forEach(id => {
    const el = document.getElementById(id)
    if (el) observer.observe(el)
  })

  // Initialize from hash if present
  const hash = decodeURIComponent(location.hash.replace('#', ''))
  if (sectionIds.includes(hash)) {
    activeTopSection.value = hash
    // Avoid autofocus issues by not calling focus; just ensure hash reflects state
  }
})

onUnmounted(() => {
  if (observer) observer.disconnect()
})
</script>

<template>
  <div class="global-docs-nav">
    <span class="nav-label">Docs:</span>
    <a
      :class="['tab-link', { active: activeTopSection === 'components-docs' }]"
      href="#components-docs"
      @click.prevent="scrollToSection('components-docs')"
    >Components</a>
    <a
      :class="['tab-link', { active: activeTopSection === 'outdated-docs' }]"
      href="#outdated-docs"
      @click.prevent="scrollToSection('outdated-docs')"
    >Outdated Components</a>
    <a
      :class="['tab-link', { active: activeTopSection === 'devonly-docs' }]"
      href="#devonly-docs"
      @click.prevent="scrollToSection('devonly-docs')"
    >Dev-Only Components</a>
  </div>

  <section id="components-docs" class="docs-section-wrap">
    <h2 class="sr-only">Components Documentation</h2>
    <ComponentsDocumentation />
  </section>

  <section id="outdated-docs" class="docs-section-wrap">
    <h2 class="sr-only">Outdated Components Documentation</h2>
    <OutdatedComponentsDocumentation />
  </section>

  <section id="devonly-docs" class="docs-section-wrap">
    <h2 class="sr-only">Dev-Only Components Documentation</h2>
    <DevOnlyComponentsDocumentation />
  </section>
</template>

<style scoped>
.global-docs-nav{
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 10px 12px;
  background: #ffffffcc;
  backdrop-filter: blur(8px);
  border-bottom: 1px solid #e5e7eb;
}
.global-docs-nav .nav-label{ color: #6b7280; font-weight: 600; margin-right: 4px; }
.global-docs-nav .tab-link{
  color: #374151;
  text-decoration: none;
  padding: 4px 8px;
  border: 1px solid transparent;
  border-radius: 6px;
}
.global-docs-nav .tab-link:hover{ background: #f3f4f6; border-color: #e5e7eb; }
.global-docs-nav .tab-link.active{
  background: #eef2ff;
  color: #3730a3;
  border-color: #c7d2fe;
  font-weight: 600;
}

.docs-section-wrap{ scroll-margin-top: 64px; margin-top: 12px; }
.sr-only{ position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
