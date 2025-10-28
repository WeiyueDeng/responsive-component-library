<template>
  <div class="component-doc">
    <h2>DynamicColorResponsiveButton</h2>
    <p class="desc">
      Modern button with dynamic color logic for multiple types (filled/outlined/text/elevated), responsive
      widths (fit-content/fill-whole), five sizes, icon slots, and icon-only mode. Emits
      <code>click-button</code> with the button id and display name.
    </p>

    <!-- Playground -->
    <DemoBlock id="dcrb-playground" title="Playground" :code="playgroundCode">
      <div class="live row" style="align-items:flex-start; gap:16px;">
        <div class="controls">
          <div class="ctrl-group">
            <label>Type</label>
            <select v-model="play.type">
              <option value="filled">filled</option>
              <option value="outlined">outlined</option>
              <option value="text">text</option>
              <option value="elevated">elevated</option>
            </select>
          </div>
          <div class="ctrl-group">
            <label>Built-in Theme</label>
            <select v-model="play.built_in_theme">
              <option value="primary">primary</option>
              <option value="secondary">secondary</option>
              <option value="tertiary">tertiary</option>
              <option value="primary-container">primary-container</option>
              <option value="secondary-container">secondary-container</option>
              <option value="tertiary-container">tertiary-container</option>
            </select>
          </div>
          <div class="ctrl-group">
            <label>Customized Theme Color</label>
            <input v-model="play.custom_color" placeholder="e.g. hsl(217,40%,40%) or #e11d48 or var(--Schemes-primary)" />
          </div>
          <div class="ctrl-row">
            <div class="ctrl-group">
              <label>Size</label>
              <select v-model="play.size">
                <option value="small">small</option>
                <option value="medium">medium</option>
                <option value="large">large</option>
                <option value="xlarge">xlarge</option>
              </select>
            </div>
            <div class="ctrl-group">
              <label>Width</label>
              <select v-model="play.width">
                <option value="fit-content">fit-content</option>
                <option value="fill-whole">fill-whole</option>
              </select>
            </div>
          </div>
          <div class="ctrl-row">
            <div class="ctrl-group">
              <label>Border Radius</label>
              <input v-model="play.radius" placeholder="e.g. 100px or 12px" />
            </div>
            <div class="ctrl-group">
              <label>Disabled</label>
              <input type="checkbox" v-model="play.disabled" />
            </div>
          </div>
          <div class="ctrl-group">
            <label>Display Name</label>
            <input v-model="play.display_name" />
          </div>

          <fieldset class="ctrl-fieldset">
            <legend>Prefix</legend>
            <div class="ctrl-row">
              <label><input type="radio" value="none" v-model="play.prefixKind"/> none</label>
              <label><input type="radio" value="img" v-model="play.prefixKind"/> image URL</label>
              <label><input type="radio" value="svg" v-model="play.prefixKind"/> inline SVG slot</label>
              <label><input type="radio" value="raw" v-model="play.prefixKind"/> raw HTML slot</label>
            </div>
            <div class="note">Using built-in samples for image/svg/raw HTML.</div>
          </fieldset>

          <fieldset class="ctrl-fieldset">
            <legend>Suffix</legend>
            <div class="ctrl-row">
              <label><input type="radio" value="none" v-model="play.suffixKind"/> none</label>
              <label><input type="radio" value="img" v-model="play.suffixKind"/> image URL</label>
              <label><input type="radio" value="svg" v-model="play.suffixKind"/> inline SVG slot</label>
              <label><input type="radio" value="raw" v-model="play.suffixKind"/> raw HTML slot</label>
            </div>
            <div class="note">Using built-in samples for image/svg/raw HTML.</div>
          </fieldset>
        </div>

        <div class="preview">
          <DynamicColorResponsiveButton
            ref="playRef"
            :button_type="play.type"
            :built_in_theme="play.built_in_theme"
            :customized_theme_color="play.custom_color || ''"
            :size="play.size"
            :width_type="play.width"
            :button_border_radius="play.radius"
            :display_name="play.display_name"
            :disabled="play.disabled"
            @click-button="onPlayClick"
            :prefix="play.prefixKind==='img' ? samples.prefixImg : ''"
            :suffix="play.suffixKind==='img' ? samples.suffixImg : ''"
            :prefix_slot_raw_html_content="play.prefixKind==='raw' ? samples.prefixRaw : ''"
            :suffix_slot_raw_html_content="play.suffixKind==='raw' ? samples.suffixRaw : ''"
          >
            <template v-if="play.prefixKind==='svg'" #prefix>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M6 16L10 12.95L14 16L12.5 11.05L16.5 8.2H11.6L10 3L8.4 8.2H3.5L7.5 11.05L6 16ZM10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.3125 6.1 0.7875C7.31667 0.2625 8.61667 0 10 0C11.3833 0 12.6833 0.2625 13.9 0.7875C15.1167 1.3125 16.175 2.025 17.075 2.925C17.975 3.825 18.6875 4.88333 19.2125 6.1C19.7375 7.31667 20 8.61667 20 10C20 11.3833 19.7375 12.6833 19.2125 13.9C18.6875 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6875 13.9 19.2125C12.6833 19.7375 11.3833 20 10 20Z" fill="currentColor"/>
              </svg>
            </template>
            <template v-if="play.suffixKind==='svg'" #suffix>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M6 16L10 12.95L14 16L12.5 11.05L16.5 8.2H11.6L10 3L8.4 8.2H3.5L7.5 11.05L6 16ZM10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.3125 6.1 0.7875C7.31667 0.2625 8.61667 0 10 0C11.3833 0 12.6833 0.2625 13.9 0.7875C15.1167 1.3125 16.175 2.025 17.075 2.925C17.975 3.825 18.6875 4.88333 19.2125 6.1C19.7375 7.31667 20 8.61667 20 10C20 11.3833 19.7375 12.6833 19.2125 13.9C18.6875 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6875 13.9 19.2125C12.6833 19.7375 11.3833 20 10 20Z" fill="currentColor"/>
              </svg>
            </template>
          </DynamicColorResponsiveButton>
          <div class="exposes-toolbar">
            <button type="button" class="btn" @click="onPlayFocus">Focus (expose)</button>
            <button type="button" class="btn" @click="onPlayBlur">Blur (expose)</button>
          </div>
          <div class="event-log">
            <div class="event-log-title">Event Log</div>
            <ul>
              <li v-for="(e, idx) in logs" :key="idx">{{ e.time }} — {{ e.type }} {{ e.detail ? '(' + e.detail + ')' : '' }}</li>
            </ul>
          </div>
        </div>
      </div>
    </DemoBlock>

    <DemoBlock id="dcrb-variants" title="Basic Variants (fit-content)" :code="basicFitContentCode">
      <div class="live row">
        <DynamicColorResponsiveButton display_name="Primary Filled" button_type="filled" built_in_theme="primary" />
        <DynamicColorResponsiveButton display_name="Primary Outlined" button_type="outlined" built_in_theme="primary" />
        <DynamicColorResponsiveButton display_name="Primary Text" button_type="text" built_in_theme="primary" />
        <DynamicColorResponsiveButton display_name="Elevated" button_type="elevated" />
      </div>
    </DemoBlock>

    <DemoBlock id="dcrb-sizes" title="Sizes" :code="sizesCode">
      <div class="live col">
        <div class="note">
          Figma defines 5 visual sizes: xsmall, small, medium, large, xlarge. In this component, the
          <b>size prop represents Web/Tablet</b> and supports small, medium, large, xlarge. On Mobile (≤767px), sizes map as:
          small → xsmall, medium → small, large → medium, xlarge → large.
        </div>
        <div class="row">
          <DynamicColorResponsiveButton display_name="S" size="small" />
          <DynamicColorResponsiveButton display_name="M" size="medium" />
          <DynamicColorResponsiveButton display_name="L" size="large" />
          <DynamicColorResponsiveButton display_name="XL" size="xlarge" />
        </div>
      </div>
    </DemoBlock>

    <DemoBlock id="dcrb-width" title="Width Types" :code="widthCode">
      <div class="live col">
        <DynamicColorResponsiveButton display_name="Fit Content" width_type="fit-content" />
        <DynamicColorResponsiveButton display_name="Fill Whole" width_type="fill-whole" />
      </div>
    </DemoBlock>

    <DemoBlock id="dcrb-icon-widths" title="Icon Button: default, narrow, wide" :code="iconWidthsCode">
      <div class="live row">
        <!-- Default icon-only (auto-detected by having only one icon slot and no text) -->
        <DynamicColorResponsiveButton button_type="filled" built_in_theme="primary">
          <template #prefix>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M6 16L10 12.95L14 16L12.5 11.05L16.5 8.2H11.6L10 3L8.4 8.2H3.5L7.5 11.05L6 16ZM10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.3125 6.1 0.7875C7.31667 0.2625 8.61667 0 10 0C11.3833 0 12.6833 0.2625 13.9 0.7875C15.1167 1.3125 16.175 2.025 17.075 2.925C17.975 3.825 18.6875 4.88333 19.2125 6.1C19.7375 7.31667 20 8.61667 20 10C20 11.3833 19.7375 12.6833 19.2125 13.9C18.6875 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6875 13.9 19.2125C12.6833 19.7375 11.3833 20 10 20Z" fill="currentColor"/>
            </svg>
          </template>
        </DynamicColorResponsiveButton>

        <!-- Narrow icon-only -->
        <DynamicColorResponsiveButton button_type="filled" built_in_theme="primary" width_type="narrow">
          <template #prefix>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M6 16L10 12.95L14 16L12.5 11.05L16.5 8.2H11.6L10 3L8.4 8.2H3.5L7.5 11.05L6 16ZM10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.3125 6.1 0.7875C7.31667 0.2625 8.61667 0 10 0C11.3833 0 12.6833 0.2625 13.9 0.7875C15.1167 1.3125 16.175 2.025 17.075 2.925C17.975 3.825 18.6875 4.88333 19.2125 6.1C19.7375 7.31667 20 8.61667 20 10C20 11.3833 19.7375 12.6833 19.2125 13.9C18.6875 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6875 13.9 19.2125C12.6833 19.7375 11.3833 20 10 20Z" fill="currentColor"/>
            </svg>
          </template>
        </DynamicColorResponsiveButton>

        <!-- Wide icon-only -->
        <DynamicColorResponsiveButton button_type="filled" built_in_theme="primary" width_type="wide">
          <template #prefix>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M6 16L10 12.95L14 16L12.5 11.05L16.5 8.2H11.6L10 3L8.4 8.2H3.5L7.5 11.05L6 16ZM10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.3125 6.1 0.7875C7.31667 0.2625 8.61667 0 10 0C11.3833 0 12.6833 0.2625 13.9 0.7875C15.1167 1.3125 16.175 2.025 17.075 2.925C17.975 3.825 18.6875 4.88333 19.2125 6.1C19.7375 7.31667 20 8.61667 20 10C20 11.3833 19.7375 12.6833 19.2125 13.9C18.6875 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6875 13.9 19.2125C12.6833 19.7375 11.3833 20 10 20Z" fill="currentColor"/>
            </svg>
          </template>
        </DynamicColorResponsiveButton>
      </div>
    </DemoBlock>

    <DemoBlock id="dcrb-custom-color" title="Customized Theme Color" :code="customColorCode">
      <div class="live row">
        <DynamicColorResponsiveButton display_name="Custom HSL" button_type="filled" customized_theme_color="hsl(217, 40%, 40%)" />
        <DynamicColorResponsiveButton display_name="Custom HEX" button_type="outlined" customized_theme_color="#e11d48" />
        <DynamicColorResponsiveButton display_name="Custom var()" button_type="text" customized_theme_color="var(--Schemes-Tertiary)" />
      </div>
    </DemoBlock>

    <DemoBlock id="dcrb-slots" title="Prefix/Suffix Slots" :code="slotsCode">
      <div class="live col">
        <DynamicColorResponsiveButton display_name="With Prefix" button_type="filled" built_in_theme="primary">
          <template #prefix>
            <img src="@/assets/icons/red_notification_icon.svg" style="width: 100%; height: 100%;" />
          </template>
        </DynamicColorResponsiveButton>
        <DynamicColorResponsiveButton display_name="With Suffix" button_type="outlined" built_in_theme="secondary">
          <template #suffix>
            <img src="@/assets/icons/black_magnifying_glass_icon.svg" style="width: 100%; height: 100%;" />
          </template>
        </DynamicColorResponsiveButton>
      </div>
    </DemoBlock>

    <DemoBlock id="dcrb-icon-only" title="Icon-only Button (auto)" :code="iconOnlyCode">
      <p class="note">Icon-only mode is automatically enabled when there is only one icon slot (prefix or suffix) and no text content.</p>
      <div class="live row">
        <DynamicColorResponsiveButton button_type="filled" built_in_theme="primary">
          <template #prefix>
            <img src="@/assets/icons/black_magnifying_glass_icon.svg" style="width: 100%; height: 100%;" />
          </template>
        </DynamicColorResponsiveButton>
        <DynamicColorResponsiveButton button_type="outlined" built_in_theme="secondary">
          <template #suffix>
            <img src="@/assets/icons/red_notification_icon.svg" style="width: 100%; height: 100%;" />
          </template>
        </DynamicColorResponsiveButton>
      </div>
    </DemoBlock>

    <DemoBlock id="dcrb-events" title="Events" :code="eventsCode">
      <div class="live col">
        <DynamicColorResponsiveButton 
          button_id="save-changes"
          display_name="Save Changes"
          button_type="filled"
          built_in_theme="primary"
          @click-button="onClick"
        />
        <div class="note">Check alert for emitted payload: <code>(button_id, display_name)</code>.</div>
      </div>
    </DemoBlock>
  </div>
</template>

<script>
import DynamicColorResponsiveButton from '@/components/DyamicColorResponsiveButton.vue'
import DemoBlock from '@/componentsDemo/DemoBlock.vue';
import redNotificationIcon from '@/assets/icons/red_notification_icon.svg';
import blackMagnifyingGlassIcon from '@/assets/icons/black_magnifying_glass_icon.svg';
export default {
  name: 'DynamicColorResponsiveButtonDoc',
  components: {
    DynamicColorResponsiveButton,
    DemoBlock
  },
  data(){
    return{
      play:{
        type:'filled',
        built_in_theme:'primary',
        custom_color:'',
        size:'small',
        width:'fit-content',
        radius:'100px',
        display_name:'Playground Button',
        disabled:false,
        prefixKind:'none',
        suffixKind:'none',
      },
      samples:{
        prefixImg: redNotificationIcon,
        suffixImg: blackMagnifyingGlassIcon,
        prefixInlineSvgBody: '<path d="M10 17l5-5-5-5v10z"/>',
        suffixInlineSvgBody: '<path d="M12 2a10 10 0 100 20 10 10 0 000-20z"/>',
        prefixRaw: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M6 16L10 12.95L14 16L12.5 11.05L16.5 8.2H11.6L10 3L8.4 8.2H3.5L7.5 11.05L6 16ZM10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.3125 6.1 0.7875C7.31667 0.2625 8.61667 0 10 0C11.3833 0 12.6833 0.2625 13.9 0.7875C15.1167 1.3125 16.175 2.025 17.075 2.925C17.975 3.825 18.6875 4.88333 19.2125 6.1C19.7375 7.31667 20 8.61667 20 10C20 11.3833 19.7375 12.6833 19.2125 13.9C18.6875 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6875 13.9 19.2125C12.6833 19.7375 11.3833 20 10 20Z" fill="currentColor"/></svg>',
        suffixRaw: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M6 16L10 12.95L14 16L12.5 11.05L16.5 8.2H11.6L10 3L8.4 8.2H3.5L7.5 11.05L6 16ZM10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.3125 6.1 0.7875C7.31667 0.2625 8.61667 0 10 0C11.3833 0 12.6833 0.2625 13.9 0.7875C15.1167 1.3125 16.175 2.025 17.075 2.925C17.975 3.825 18.6875 4.88333 19.2125 6.1C19.7375 7.31667 20 8.61667 20 10C20 11.3833 19.7375 12.6833 19.2125 13.9C18.6875 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6875 13.9 19.2125C12.6833 19.7375 11.3833 20 10 20Z" fill="currentColor"/></svg>'
      },
      logs: []
    }
  },
  methods: {
    onClick(id, name){
      alert(`click-button emitted: id=${id}, name=${name}`)
    },
    onPlayFocus(){
      // call exposed focus method from DynamicColorResponsiveButton
      this.$refs.playRef?.handleFocusButton?.()
      this.pushLog('focus')
    },
    onPlayBlur(){
      // call exposed blur method from DynamicColorResponsiveButton
      this.$refs.playRef?.handleBlurButton?.()
      this.pushLog('blur')
    },
    onPlayClick(id, name){
      this.pushLog('click-button', `${id ?? ''} ${name ?? ''}`.trim())
    },
    pushLog(type, detail=''){
      const ts = new Date()
      const t = ts.toLocaleTimeString()
      this.logs.unshift({ type, detail, time: t })
      if(this.logs.length > 20) this.logs.pop()
    }
  },
  computed: {
    playgroundCode(){
      const p = this.play
      const s = this.samples
      const attrs = []
      attrs.push(`button_type="${p.type}"`)
      if(p.built_in_theme) attrs.push(`built_in_theme="${p.built_in_theme}"`)
      if(p.custom_color) attrs.push(`customized_theme_color="${p.custom_color}"`)
      if(p.size) attrs.push(`size="${p.size}"`)
      if(p.width) attrs.push(`width_type="${p.width}"`)
      if(p.radius) attrs.push(`button_border_radius="${p.radius}"`)
      if(p.display_name) attrs.push(`display_name="${p.display_name}"`)
      if(p.disabled) attrs.push(`:disabled="true"`)
      if(p.prefixKind==='img') attrs.push(`:prefix="redNotificationIcon"`)
      if(p.suffixKind==='img') attrs.push(`:suffix="blackMagnifyingGlassIcon"`)
      if(p.prefixKind==='raw') attrs.push(`:prefix_slot_raw_html_content="prefixRaw"`)
      if(p.suffixKind==='raw') attrs.push(`:suffix_slot_raw_html_content="suffixRaw"`)

      const open = `<DynamicColorResponsiveButton ${attrs.join(' ')}>`
      const lines = [open]
      if(p.prefixKind==='svg'){
        lines.push(`  <template #prefix>\n     <svg fill=\"currentColor\"><!-- icon --></svg>\n    </template>`)
      }
      if(p.suffixKind==='svg'){
        lines.push(`  <template #suffix>\n     <svg fill=\"currentColor\"><!-- icon --></svg>\n    </template>`)
      }
      lines.push(`</DynamicColorResponsiveButton>`)
      const importLines = []
      if(p.prefixKind==='img'){ importLines.push(`import redNotificationIcon from '@/assets/icons/red_notification_icon.svg'`) }
      if(p.suffixKind==='img'){ importLines.push(`import blackMagnifyingGlassIcon from '@/assets/icons/black_magnifying_glass_icon.svg'`) }

      const constLines = []
      if(p.prefixKind==='raw'){ constLines.push(`const prefixRaw = \`${s.prefixRaw.replace(/`/g,'\\`')}\``) }
      if(p.suffixKind==='raw'){ constLines.push(`const suffixRaw = \`${s.suffixRaw.replace(/`/g,'\\`')}\``) }

      const scriptContent = [...importLines, ...constLines].join('\n')
      const script = scriptContent ? `\n\n<script setup>\n${scriptContent}\n<\/script>` : ''
      return `<template>\n  ${lines.join('\n  ')}\n</template>${script}`
    },
    basicFitContentCode(){
      return `<template>\n  <DynamicColorResponsiveButton display_name="Primary Filled" button_type="filled" built_in_theme="primary"/>\n  <DynamicColorResponsiveButton display_name="Primary Outlined" button_type="outlined" built_in_theme="primary"/>\n  <DynamicColorResponsiveButton display_name="Primary Text" button_type="text" built_in_theme="primary"/>\n  <DynamicColorResponsiveButton display_name="Elevated" button_type="elevated"/>\n</template>`
    },
    sizesCode(){
      return `<template>\n  <!-- Web/Tablet sizes: small, medium, large, xlarge. On Mobile (≤767px): small→xsmall, medium→small, large→medium, xlarge→large -->\n  <DynamicColorResponsiveButton display_name=\"S\" size=\"small\"/>\n  <DynamicColorResponsiveButton display_name=\"M\" size=\"medium\"/>\n  <DynamicColorResponsiveButton display_name=\"L\" size=\"large\"/>\n  <DynamicColorResponsiveButton display_name=\"XL\" size=\"xlarge\"/>\n</template>`
    },
    widthCode(){
      return `<template>\n  <DynamicColorResponsiveButton display_name="Fit Content" width_type="fit-content"/>\n  <DynamicColorResponsiveButton display_name="Fill Whole" width_type="fill-whole"/>\n</template>`
    },
    iconWidthsCode(){
      return `<template>\n  <!-- Icon-only is auto when there's a single icon slot and no text -->\n  <DynamicColorResponsiveButton button_type=\"filled\" built_in_theme=\"primary\">\n    <template #prefix>\n      <svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" fill=\"none\">\n        <path d=\"M6 16L10 12.95L14 16L12.5 11.05L16.5 8.2H11.6L10 3L8.4 8.2H3.5L7.5 11.05L6 16ZM10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.3125 6.1 0.7875C7.31667 0.2625 8.61667 0 10 0C11.3833 0 12.6833 0.2625 13.9 0.7875C15.1167 1.3125 16.175 2.025 17.075 2.925C17.975 3.825 18.6875 4.88333 19.2125 6.1C19.7375 7.31667 20 8.61667 20 10C20 11.3833 19.7375 12.6833 19.2125 13.9C18.6875 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6875 13.9 19.2125C12.6833 19.7375 11.3833 20 10 20Z\" fill=\"currentColor\"/>\n      </svg>\n    </template>\n  </DynamicColorResponsiveButton>\n\n  <DynamicColorResponsiveButton button_type=\"filled\" built_in_theme=\"primary\" width_type=\"narrow\">\n    <template #prefix>\n      <svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" fill=\"none\">\n        <path d=\"M6 16L10 12.95L14 16L12.5 11.05L16.5 8.2H11.6L10 3L8.4 8.2H3.5L7.5 11.05L6 16ZM10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.3125 6.1 0.7875C7.31667 0.2625 8.61667 0 10 0C11.3833 0 12.6833 0.2625 13.9 0.7875C15.1167 1.3125 16.175 2.025 17.075 2.925C17.975 3.825 18.6875 4.88333 19.2125 6.1C19.7375 7.31667 20 8.61667 20 10C20 11.3833 19.7375 12.6833 19.2125 13.9C18.6875 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6875 13.9 19.2125C12.6833 19.7375 11.3833 20 10 20Z\" fill=\"currentColor\"/>\n      </svg>\n    </template>\n  </DynamicColorResponsiveButton>\n\n  <DynamicColorResponsiveButton button_type=\"filled\" built_in_theme=\"primary\" width_type=\"wide\">\n    <template #prefix>\n      <svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" fill=\"none\">\n        <path d=\"M6 16L10 12.95L14 16L12.5 11.05L16.5 8.2H11.6L10 3L8.4 8.2H3.5L7.5 11.05L6 16ZM10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.3125 6.1 0.7875C7.31667 0.2625 8.61667 0 10 0C11.3833 0 12.6833 0.2625 13.9 0.7875C15.1167 1.3125 16.175 2.025 17.075 2.925C17.975 3.825 18.6875 4.88333 19.2125 6.1C19.7375 7.31667 20 8.61667 20 10C20 11.3833 19.7375 12.6833 19.2125 13.9C18.6875 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6875 13.9 19.2125C12.6833 19.7375 11.3833 20 10 20Z\" fill=\"currentColor\"/>\n      </svg>\n    </template>\n  </DynamicColorResponsiveButton>\n</template>`
    },
    customColorCode(){
      return `<template>\n  <DynamicColorResponsiveButton display_name="Custom HSL" button_type="filled" customized_theme_color="hsl(217, 40%, 40%)"/>\n  <DynamicColorResponsiveButton display_name="Custom HEX" button_type="outlined" customized_theme_color="#e11d48"/>\n  <DynamicColorResponsiveButton display_name="Custom var()" button_type="text" customized_theme_color="var(--Schemes-Tertiary)"/>\n</template>`
    },
    slotsCode(){
      return `<template>\n  <DynamicColorResponsiveButton display_name="With Prefix" button_type="filled" built_in_theme="primary">\n    <template #prefix>\n      <img src="/path/to/icon.svg" style="width:100%;height:100%"/>\n    </template>\n  </DynamicColorResponsiveButton>\n  <DynamicColorResponsiveButton display_name="With Suffix" button_type="outlined" built_in_theme="secondary">\n    <template #suffix>\n      <img src="/path/to/icon.svg" style="width:100%;height:100%"/>\n    </template>\n  </DynamicColorResponsiveButton>\n</template>`
    },
    iconOnlyCode(){
      return `<template>\n  <DynamicColorResponsiveButton button_type="filled" built_in_theme="primary">\n    <template #prefix>\n      <img src="/path/to/icon.svg" style="width:100%;height:100%"/>\n    </template>\n  </DynamicColorResponsiveButton>\n  <DynamicColorResponsiveButton button_type="outlined" built_in_theme="secondary">\n    <template #suffix>\n      <img src="/path/to/icon.svg" style="width:100%;height:100%"/>\n    </template>\n  </DynamicColorResponsiveButton>\n</template>`
    },
    eventsCode(){
      return `<template>\n  <DynamicColorResponsiveButton button_id="save-changes" display_name="Save Changes" button_type="filled" built_in_theme="primary" @click-button="onClick"/>\n</template>\n\n<script setup>\nfunction onClick(id, name){\n  alert(\`id=\${id}, name=\${name}\`)\n}\n<\/script>`
    }
  }
}
</script>

<style scoped>
.component-doc{ max-width: 1000px; width:100%; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; box-sizing: border-box; }
.desc{ color:#4b5563; margin-bottom: 12px; }
.note{ color:#374151; margin: 4px 0 8px; }
.live{ border: 1px dashed #e5e7eb; padding: 12px; border-radius: 8px; background: #fff; display:flex; gap: 8px; }
.row{ flex-direction: row; flex-wrap: wrap; }
.col{ flex-direction: column; }
.controls{ min-width: 320px; max-width: 420px; display: grid; gap: 8px; }
.ctrl-row{ display:flex; gap: 8px; align-items:flex-end; flex-wrap:wrap; }
.ctrl-group{ display:flex; flex-direction: column; gap: 4px; min-width: 140px; }
.ctrl-group input[type="text"], .ctrl-group input, .ctrl-group select, .ctrl-group textarea{ padding:6px 8px; border:1px solid #e5e7eb; border-radius:6px; font-size: 12px; }
.ctrl-fieldset{ border:1px solid #e5e7eb; border-radius:8px; padding:8px; }
.ctrl-fieldset legend{ padding:0 6px; color:#374151; }
.preview{ flex:1; display:flex; flex-direction: column; align-items:flex-start; justify-content:flex-start; gap: 12px; min-height: 96px; }
.exposes-toolbar{ display:flex; flex-direction: column; gap: 8px; }
.exposes-toolbar .btn{ padding:6px 10px; border:1px solid #e5e7eb; border-radius:6px; background:#f9fafb; cursor:pointer; }
.exposes-toolbar .btn:hover{ background:#f3f4f6; }
.event-log{ width:100%; max-width: 100%; border:1px solid #e5e7eb; border-radius:6px; padding:8px; box-sizing:border-box; background:#fff; }
.event-log-title{ font-weight:600; color:#374151; margin-bottom:6px; }
.event-log ul{ margin:0; padding-left: 16px; max-height: 160px; overflow:auto; }
</style>
