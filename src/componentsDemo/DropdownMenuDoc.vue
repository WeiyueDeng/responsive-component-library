<template>
    <div class="doc-section">
        <h2>DropdownMenu</h2>
        <p class="section-desc">
            A versatile dropdown menu primitive with nested dropdown support and responsive behavior.
            This component is now part of the public API and can be used directly.
        </p>

        

        <!-- Interactive Playground -->
        <section id="dropdown-playground" class="sub-section">
            <h3>Playground</h3>
            <DemoBlock id="dropdownmenu-basic" title="Basic" :code="playgroundCode" :default-expanded="false">
              <div class="live-demo">
                <DropdownMenu :options="options"
                    :width_type="width_type"
                    :size="size"
                    @click-outside-dropdown-menu="handleClickOutsideDropdownMenu"
                    @select-dropdown-option="(value, label, in_dropdown_level) => handleSelectDropdownOption(value, label, in_dropdown_level)"
                />

                <div class="controls">
                  <label>
                    Width Type:
                    <select v-model="width_type">
                      <option value="fill-whole">fill-whole</option>
                      <option value="fit-content">fit-content</option>
                    </select>
                  </label>
                </div>

                <div class="controls">
                  <label>
                    Size:
                    <select v-model="size">
                      <option value="small">small</option>
                      <option value="medium">medium</option>
                      <option value="large">large</option>
                    </select>
                  </label>
                </div>

                <div class="controls">
                  <h4>Toggle dividers per item</h4>
                  <div class="control-grid">
                    <label v-for="id in dividerControlList" :key="id" class="control-item">
                      <input type="checkbox" v-model="dividerByValue[id]" />
                      <span>{{ id }}</span>
                    </label>
                  </div>
                </div>

                <div class="controls">
                  <h4>Toggle disabled per item</h4>
                  <div class="control-grid">
                    <label v-for="id in disabledControlList" :key="id" class="control-item">
                      <input type="checkbox" v-model="disabledByValue[id]" />
                      <span>{{ id }}</span>
                    </label>
                  </div>
                </div>
              </div>
            </DemoBlock>
        </section>

        <!-- Event Logs -->
        <section id="dropdown-logs" class="sub-section">
            <h3>Event Logs</h3>
            <div class="log-section">
                <div class="log-container">
                    <div v-for="(log, index) in clickLogs" :key="index" class="log-entry">
                        {{ log }}
                    </div>
                    <div v-if="clickLogs.length === 0" class="no-logs">
                        No events logged yet. Click outside the dropdown to see events.
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import DropdownMenu from '@/components/DropdownMenu.vue';
import DemoBlock from '@/componentsDemo/DemoBlock.vue';

export default{
    components: {
        DropdownMenu,
        DemoBlock
    },
    data(){ 
        return{
            copied: false,
            size: 'small',
            width_type: 'fill-whole',
            // Divider state per item (keyed by value). Adjust defaults to demonstrate dynamic control.
            dividerByValue: {
                'option1': true,
                'option1.1': true,
                'option1.2': true,
                'option1.2.1': true,
                'option1.2.1.1': false,
                'option1.2.1.2': true,
                'option1.2.2': false,
                'option1.3': true,
                'option2': true,
                'option2.1': true,
                'option2.1.1': false,
                'option3': true,
            },
            dividerControlList: [
                'option1',
                'option1.1',
                'option1.2',
                'option1.2.1',
                'option1.2.1.1',
                'option1.2.1.2',
                'option1.2.2',
                'option1.3',
                'option2',
                'option2.1',
                'option2.1.1',
                'option3',
            ],
            // Disabled state per item (keyed by value)
            disabledByValue: {
                'option1': false,
                'option1.1': false,
                'option1.2': false,
                'option1.2.1': false,
                'option1.2.1.1': false,
                'option1.2.1.2': false,
                'option1.2.2': false,
                'option1.3': false,
                'option2': false,
                'option2.1': false,
                'option2.1.1': false,
                'option3': false,
            },
            disabledControlList: [
                'option1',
                'option1.1',
                'option1.2',
                'option1.2.1',
                'option1.2.1.1',
                'option1.2.1.2',
                'option1.2.2',
                'option1.3',
                'option2',
                'option2.1',
                'option2.1.1',
                'option3',
            ],
            // Keep the original references by storing the options tree in data
            options: [
                {
                    value: 'option1',
                    label: 'Option 1',
                    prefix_slot_raw_html_content: '<span>Pre</span>',
                    options: [
                        {
                            value: 'option1.1',
                            label: 'Option 1.1',
                            prefix_slot_raw_html_content: '<span>Pre</span>',
                            suffix_slot_raw_html_content: '<span>Suf</span>',
                        },
                        {
                            value: 'option1.2',
                            label: 'Option 1.2 (has nested dropdown and if dropdown item has nested dropdown and has suffix_slot_raw_html_content, the default dropdown arrow suffix will be overridden.)',
                            prefix_slot_raw_html_content: '<span>Pre</span>',
                            // NOTE: if dropdown item has nested dropdown and has suffix_slot_raw_html_content, the default dropdown arrow suffix will be overridden.
                            suffix_slot_raw_html_content: '<span>Suf</span>',
                            options: [
                                {
                                    value: 'option1.2.1',
                                    label: 'Option 1.2.1 (has nested dropdown and default dropdown arrow suffix will be overridden.)',
                                    prefix_slot_raw_html_content: '<span>Pre</span>',
                                    suffix_slot_raw_html_content: '<span>Suf</span>',
                                    options: [
                                        {
                                            value: 'option1.2.1.1',
                                            label: 'Option 1.2.1.1',
                                            prefix_slot_raw_html_content: '<span>Pre</span>',
                                            suffix_slot_raw_html_content: '<span>Suf</span>',
                                        },
                                        {
                                            value: 'option1.2.1.2',
                                            label: 'Option 1.2.1.2',
                                            prefix_slot_raw_html_content: '<span>Pre</span>',
                                            suffix_slot_raw_html_content: '<span>Suf</span>',
                                        },
                                    ],
                                },
                                {
                                    value: 'option1.2.2',
                                    label: 'Option 1.2.2',
                                    prefix_slot_raw_html_content: '<span>Pre</span>',
                                    suffix_slot_raw_html_content: '<span>Suf</span>',
                                },
                            ],
                        },
                        {
                            value: 'option1.3',
                            label: 'Option 1.3',
                            prefix_slot_raw_html_content: '<span>Pre</span>',
                            suffix_slot_raw_html_content: '<span>Suf</span>',
                        },
                    ],
                },
                {
                    value: 'option2',
                    label: 'Option 2 (has nested dropdown and default dropdown arrow suffix will be overridden.)',
                    prefix_slot_raw_html_content: '<span>Pre</span>',
                    suffix_slot_raw_html_content: '<span>Suf</span>',
                    options: [
                        {
                            value: 'option2.1',
                            label: 'Option 2.1',
                            prefix_slot_raw_html_content: '<span>Pre</span>',
                            options: [
                                {
                                    value: 'option2.1.1',
                                    label: 'Option 2.1.1',
                                    prefix_slot_raw_html_content: '<span>Pre</span>',
                                    suffix_slot_raw_html_content: '<span>Suf</span>',
                                },
                            ],
                        },
                    ],
                },
                {
                    value: 'option3',
                    label: 'Option 3',
                    prefix_slot_raw_html_content: '<span>Pre</span>',
                    suffix_slot_raw_html_content: '<span>Suf</span>',
                },
            ],
            // Log entries for click events
            clickLogs: [],
        }
    },
    computed: {
        playgroundCode(){
            const optionsJson = JSON.stringify(this.options, null, 2)
              .replace(/<\/script>/g, '<\\/script>');
            return `<template>\n  <DropdownMenu\n    :options="options"\n    :size="'${this.size}'"\n    :width_type="'${this.width_type}'"\n    @click-outside-dropdown-menu="onOutside"\n    @select-dropdown-option="onSelect"\n  />\n</template>\n\n<script>\nimport DropdownMenu from '@/components/DropdownMenu.vue'\n\nexport default {\n  components: { DropdownMenu },\n  data(){\n    return {\n      options: ${optionsJson}\n    }\n  },\n  methods: {\n    onOutside(){ /* handle outside click */ },\n    onSelect(value, level){ /* handle select */ }\n  }\n}\n<\/script>`
        },
    },
    mounted(){
        // Ensure smooth scrolling for local anchors
        if('scrollBehavior' in document.documentElement.style){
            document.documentElement.style.scrollBehavior = 'smooth';
        }
    },
    created(){
        this.applyDividersAndDisabled();
    },
    watch: {
        dividerByValue: {
            handler(){ this.applyDividersAndDisabled(); },
            deep: true
        },
        disabledByValue: {
            handler(){ this.applyDividersAndDisabled(); },
            deep: true
        }
    },
    methods: {
        handleClickOutsideDropdownMenu() {
            const timestamp = new Date().toLocaleTimeString();
            this.clickLogs.unshift(`[${timestamp}] Clicked outside dropdown menu`);
            // Keep only the last 10 log entries
            if (this.clickLogs.length > 10) {
                this.clickLogs = this.clickLogs.slice(0, 10);
            }
        },
        handleSelectDropdownOption(value, label, in_dropdown_level){
            const timestamp = new Date().toLocaleTimeString();
            this.clickLogs.unshift(`[${timestamp}] Selected option: ${value}, label: ${label}, in_dropdown_level: ${in_dropdown_level}`);
            // Keep only the last 10 log entries
            if (this.clickLogs.length > 10) {
                this.clickLogs = this.clickLogs.slice(0, 10);
            }
        },
        applyDividersAndDisabled(){
            const apply = (items, level = 0) => {
                if(!Array.isArray(items)) return;
                for(const item of items){
                    // mutate in place to keep references
                    item.has_divider = !!this.dividerByValue[item.value];
                    item.disabled = !!this.disabledByValue[item.value];
                    if(item.options && item.options.length){
                        apply(item.options, level+1);
                    }
                }
            };
            apply(this.options);
        },
        scrollTo(id){
            const el = this.$el.querySelector(`#${id}`);
            if(el){ el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
        },
        async copyUsageCode(){
            try{
                await navigator.clipboard.writeText(this.playgroundCode);
                this.copied = true;
                setTimeout(()=>{ this.copied = false; }, 1500);
            }catch(e){
                console.warn('Copy failed', e);
            }
        }
    }
}
</script>

<style scoped>
.code-block{
    position: relative;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    background: #fff;
    color: #111827;
    overflow: auto;
}
.code-block.collapsed{
    overflow: hidden;
}
.code-block-header{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 10px;
    border-bottom: 1px solid #e5e7eb;
    background: #f9fafb;
}
.code-title{ font-size: 12px; color: #374151; }
.code-actions{ display: flex; gap: 8px; }
.toggle-btn{
    border: 1px solid #e5e7eb;
    background: #ffffff;
    color: #374151;
    font-size: 12px;
    padding: 4px 8px;
    border-radius: 6px;
    cursor: pointer;
}
.toggle-btn:hover{ background: #f3f4f6; }
.code-block pre{ margin: 0; padding: 12px 14px; background: #fafafa; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace; font-size: 12.5px; line-height: 1.5; }
.code-block code{ white-space: pre; }
.copy-btn{
    border: 1px solid #e5e7eb;
    background: #ffffff;
    color: #374151;
    font-size: 12px;
    padding: 4px 8px;
    border-radius: 6px;
    cursor: pointer;
}
.copy-btn:hover{ background: #f3f4f6; }
.code-fade-enter-active, .code-fade-leave-active{ transition: opacity .15s ease, max-height .2s ease; }
.code-fade-enter-from, .code-fade-leave-to{ opacity: 0; }
.local-toc{
    display: flex;
    gap: 12px;
    margin: 8px 0 16px;
}
.local-toc a{
    color: #374151;
    text-decoration: none;
    padding: 4px 8px;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
}
.local-toc a:hover{ background: #f3f4f6; }
.sub-section{ margin: 18px 0; }
.log-section {
    margin-top: 2rem;
    padding: 1rem;
    background-color: #f5f5f5;
    border-radius: 4px;
}

.log-container {
    max-height: 200px;
    overflow-y: auto;
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 0.5rem;
    font-family: monospace;
    font-size: 0.9em;
}

.log-entry {
    padding: 0.25rem 0.5rem;
    border-bottom: 1px solid #eee;
}

.log-entry:last-child {
    border-bottom: none;
}

.no-logs {
    color: #888;
    font-style: italic;
    padding: 0.5rem;
    text-align: center;
}
.controls{
    margin: 12px 0;
}
.control-grid{
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 8px 16px;
}
.control-item{
    display: flex;
    align-items: center;
    gap: 8px;
    user-select: none;
}
</style>