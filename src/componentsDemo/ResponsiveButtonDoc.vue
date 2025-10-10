<template>
    <div class="component-doc">
        <h2>ResponsiveButton</h2>
        <p class="desc">
          Feature-rich action button with responsive width types, built-in themes, optional dropdown menus,
          and imperative controls for loading and hold states. Use it for primary and secondary actions
          with consistent UX across screens.
        </p>
        <!-- fit content -->
        <h3 class="sub-title">Width Type: fit-content</h3>
        <br />
        <div @click = "$refs['target-responsive-button'].setLoading(true)" style = "width:fit-content">click to loading</div>
        <div @click = "$refs['target-responsive-button'].setLoading(false)" style = "width:fit-content">click to unloading</div>
        <ResponsiveButton 
        ref = "target-responsive-button"
        display_name='General Information' build_in_theme="outlined-primary" 
        width_type="fit-content"
        @click = "(display_name)=>handleRedirectButtonClick(display_name)"/>
        <br />
        <ResponsiveButton 
        display_name='General Information' build_in_theme="filled-primary" 
        width_type="fit-content"
        @click = "(display_name)=>handleRedirectButtonClick(display_name)"/>
        <br />
        <ResponsiveButton 
        display_name='General Information' build_in_theme="text-primary" 
        @click = "(display_name)=>handleRedirectButtonClick(display_name)"/>
        <br />
        <ResponsiveButton 
        display_name='General Information' build_in_theme="outlined-secondary" 
        width_type="fit-content"
        @click = "(display_name)=>handleRedirectButtonClick(display_name)"/>
        <br />
        <ResponsiveButton 
        display_name='General Information' build_in_theme="filled-secondary" 
        @click = "(display_name)=>handleRedirectButtonClick(display_name)"/>
        <br />
        <ResponsiveButton 
        display_name='General Information' build_in_theme="text-secondary" 
        @click = "(display_name)=>handleRedirectButtonClick(display_name)"/>
        <br />
        <!-- fill whole -->
        <h3 class="sub-title">Width Type: fill-whole</h3>
        <br />
        <ResponsiveButton 
        display_name='General Information' build_in_theme="outlined-primary" 
        width_type="fill-whole"
        @click = "(display_name)=>handleRedirectButtonClick(display_name)"/>
        <br />
        <ResponsiveButton 
        display_name='General Information' build_in_theme="filled-primary" 
        width_type="fill-whole"
        @click = "(display_name)=>handleRedirectButtonClick(display_name)"/>
        <br />
        <ResponsiveButton 
        display_name='General Information' build_in_theme="text-primary" 
        width_type="fill-whole"
        @click = "(display_name)=>handleRedirectButtonClick(display_name)"/>
        <br />
        <ResponsiveButton 
        display_name='General Information' build_in_theme="outlined-secondary" 
        width_type="fill-whole"
        @click = "(display_name)=>handleRedirectButtonClick(display_name)"/>
        <br />
        <ResponsiveButton 
        display_name='General Information' build_in_theme="filled-secondary"
        width_type="fill-whole" 
        @click = "(display_name)=>handleRedirectButtonClick(display_name)"/>
        <br />
        <ResponsiveButton 
        display_name='General Information' build_in_theme="text-secondary"
        width_type="fill-whole" 
        @click = "(display_name)=>handleRedirectButtonClick(display_name)"/>
        <br />
        <ResponsiveButton 
        ref = "target-hold-responsive-button"
        display_name='General Information' build_in_theme="outlined-secondary"
        width_type="fill-whole"
        @click = "(display_name)=>handleRedirectButtonClick(display_name)"/>
        <br />
        <div @click = "$refs['target-hold-responsive-button'].setHold(true)" style = "width:fit-content">click to set hold via expose</div>
        <div @click = "$refs['target-hold-responsive-button'].setHold(false)" style = "width:fit-content">click to cancel hold via expose</div>
        <div @click = "hold = true" style = "width:fit-content">click to set hold via prop 'hold'</div>
        <div @click = "hold = false" style = "width:fit-content">click to cancel hold via prop 'hold'</div>
        <ResponsiveButton 
        ref="target-hold-responsive-button"
        display_name='General Information' build_in_theme="outlined-primary" 
        width_type="fill-whole"
        @click = "(display_name)=>handleRedirectButtonClick(display_name)"/>
        <br />
        <h3 class="sub-title">Dropdown Responsive Button</h3> <br />
        <ResponsiveButton 
        display_name='Fill the Questionnaire (3 min)' build_in_theme="filled-primary" 
        width_type="fill-whole"
        :dropdown_options="test_dropdown_options"
        @click = "(display_name)=>handleRedirectButtonClick(display_name)">
            <template #prefix>
                <img src = "@/assets/icons/red_notification_icon.svg" style = "width: 100%; height: 100%;"/>
            </template>
        </ResponsiveButton>
        <br />
        <div @click = "(event)=>{event.stopPropagation(); $refs['target-responsive-dropdown-button-fit'].setLoading(true)}" style = "width:fit-content">click to loading</div>
        <div @click = "$refs['target-responsive-dropdown-button-fit'].setLoading(false)" style = "width:fit-content">click to unloading</div>
        <ResponsiveButton 
            ref = "target-responsive-dropdown-button-fit"
            display_name='Questionnaire' build_in_theme="outlined-primary" 
            width_type="fit-content"
            :dropdown_options="test_dropdown_options"
            @click = "(display_name)=>handleRedirectButtonClick(display_name)" />
        <br />
        <div @click = "$refs['target-responsive-dropdown-button'].setHold(true)" style = "width:fit-content">click to set hold via expose</div>
        <div @click = "$refs['target-responsive-dropdown-button'].setHold(false)" style = "width:fit-content">click to cancel hold via expose</div>
        <div @click = "hold = true" style = "width:fit-content">click to set hold via prop 'hold'</div>
        <div @click = "hold = false" style = "width:fit-content">click to cancel hold via prop 'hold'</div>
        <div @click = "$refs['target-responsive-dropdown-button'].setLoading(true)" style = "width:fit-content">click to loading</div>
        <div @click = "$refs['target-responsive-dropdown-button'].setLoading(false)" style = "width:fit-content">click to unloading</div>
        <ResponsiveButton 
        ref = "target-responsive-dropdown-button"
        display_name='Fill the Questionnaire (3 min)' build_in_theme="outlined-secondary" 
        width_type="fill-whole"
        :dropdown_options="test_dropdown_options"
        :hold="hold"
        @click = "(display_name)=>handleRedirectButtonClick(display_name)"/>
        <br />
        <ResponsiveButton 
        display_name='Fill the Questionnaire 123123(3 min)' build_in_theme="filled-secondary" 
        width_type="fit-content"
        :dropdown_options="test_disabled_dropdown_options"
        @click = "(display_name)=>handleRedirectButtonClick(display_name)">
            <template #prefix>
                <img src = "@/assets/icons/black_magnifying_glass_icon.svg" style = "width: 100%; height: 100%;"/>
            </template>
        </ResponsiveButton>
        <!-- Copyable code sections (concise examples) -->
        <DemoBlock id="rb-fit-content" title="Fit Content Variants" :code="fitContentCode">
          <div class="live">
            <ResponsiveButton 
              display_name='General Information' build_in_theme="outlined-primary" 
              width_type="fit-content"
            />
            <ResponsiveButton 
              display_name='General Information' build_in_theme="filled-primary" 
              width_type="fit-content"
            />
            <ResponsiveButton 
              display_name='General Information' build_in_theme="text-primary" 
              width_type="fit-content"
            />
          </div>
        </DemoBlock>

        <DemoBlock id="rb-fill-whole" title="Fill Whole Variants" :code="fillWholeCode">
          <div class="live">
            <ResponsiveButton display_name='General Information' build_in_theme="outlined-primary" width_type="fill-whole" />
            <ResponsiveButton display_name='General Information' build_in_theme="filled-primary" width_type="fill-whole" />
            <ResponsiveButton display_name='General Information' build_in_theme="text-primary" width_type="fill-whole" />
          </div>
        </DemoBlock>

        <DemoBlock id="rb-dropdown" title="Dropdown Button" :code="dropdownCode">
          <div class="live">
            <ResponsiveButton 
              display_name='Questionnaire' build_in_theme="outlined-primary" 
              width_type="fit-content"
              :dropdown_options="test_dropdown_options"
            />
          </div>
        </DemoBlock>

        <DemoBlock id="rb-loading-hold" title="Loading & Hold Controls" :code="loadingHoldCode">
          <p class="note">Programmatically control loading spinners and block interaction with hold state.</p>
          <div class="live">
            <div class="actions">
              <button @click="(e)=>{ e.stopPropagation(); $refs['demo-loading'].setLoading(true) }">Set Loading</button>
              <button @click="$refs['demo-loading'].setLoading(false)">Unset Loading</button>
              <button @click="$refs['demo-hold'].setHold(true)">Set Hold (expose)</button>
              <button @click="$refs['demo-hold'].setHold(false)">Unset Hold (expose)</button>
              <button @click="hold = !hold">Toggle Hold (prop)</button>
            </div>
            <ResponsiveButton ref="demo-loading" display_name="Submit" build_in_theme="filled-primary" width_type="fit-content" />
            <ResponsiveButton ref="demo-hold" display_name="Save" build_in_theme="outlined-secondary" width_type="fill-whole" :hold="hold" />
          </div>
        </DemoBlock>

        <DemoBlock id="rb-prefix" title="Prefix Slot" :code="prefixSlotCode">
          <p class="note">Use prefix slot to add an icon or badge before the label.</p>
          <div class="live">
            <ResponsiveButton display_name='Fill the Questionnaire (3 min)' build_in_theme="filled-primary" width_type="fill-whole">
              <template #prefix>
                <img src = "@/assets/icons/red_notification_icon.svg" style = "width: 100%; height: 100%;"/>
              </template>
            </ResponsiveButton>
          </div>
        </DemoBlock>

        <DemoBlock id="rb-events" title="Events" :code="eventsCode">
          <p class="note">Use the click event payload (`display_name`) to handle navigation or actions.</p>
          <div class="live">
            <ResponsiveButton display_name='Go to Dashboard' build_in_theme="text-primary" width_type="fit-content" @click="(name)=>handleRedirectButtonClick(name)"/>
          </div>
        </DemoBlock>
    </div>
</template>

<script>
import ResponsiveButton from '@/components/ResponsiveButton.vue';
import DemoBlock from '@/componentsDemo/DemoBlock.vue';
export default{
    components: {
        ResponsiveButton,
        DemoBlock
    },
    data(){
        return{
            hold:false,
            test_dropdown_options:[
                {
                    display_name:'op 1'
                },
                {
                    display_name:'op 2231 231 2312 312 123 34234123 1234 12341 1234',
                    dropdown_options:[
                        {
                            display_name:'op 2.1'
                        },
                        {
                            display_name:'op 2.2',
                            dropdown_options:[
                                {display_name:'op 2.2.1'},
                                {display_name:'op 2.2.2'}
                            ]
                        }
                    ]
                },
            ],
            test_disabled_dropdown_options:[
                {
                    display_name:'op 1'
                },
                {
                    display_name:'op 2231 231 2312 312 123 34234123 1234 12341 1234',
                    dropdown_options:[
                        {
                            display_name:'op 2.1'
                        },
                        {
                            display_name:'op 2.2',
                            disabled:true,
                            dropdown_options:[
                                {
                                    display_name:'op 2.2.1'
                                },
                                {
                                    display_name:'op 2.2.2'
                                }
                            ]
                        }
                    ]
                },
            ]
        }
    },
    computed:{
        fitContentCode(){
            return `<template>\n  <ResponsiveButton display_name='General Information' build_in_theme=\"outlined-primary\" width_type=\"fit-content\"/>\n  <ResponsiveButton display_name='General Information' build_in_theme=\"filled-primary\" width_type=\"fit-content\"/>\n  <ResponsiveButton display_name='General Information' build_in_theme=\"text-primary\" width_type=\"fit-content\"/>\n</template>`
        },
        fillWholeCode(){
            return `<template>\n  <ResponsiveButton display_name='General Information' build_in_theme=\"outlined-primary\" width_type=\"fill-whole\"/>\n  <ResponsiveButton display_name='General Information' build_in_theme=\"filled-primary\" width_type=\"fill-whole\"/>\n  <ResponsiveButton display_name='General Information' build_in_theme=\"text-primary\" width_type=\"fill-whole\"/>\n</template>`
        },
        dropdownCode(){
            return `<template>\n  <ResponsiveButton display_name='Questionnaire' build_in_theme=\"outlined-primary\" width_type=\"fit-content\" :dropdown_options=\"options\"/>\n</template>\n\n<script setup>\nconst options = [\n  { display_name: 'op 1' },\n  { display_name: 'op 2', dropdown_options: [ { display_name: 'op 2.1' } ] }\n]\n<\/script>`
        },
        loadingHoldCode(){
            return `<template>\n  <div>\n    <button @click=\"() => loadingRef.setLoading(true)\">Set Loading</button>\n    <button @click=\"() => loadingRef.setLoading(false)\">Unset Loading</button>\n    <button @click=\"() => holdRef.setHold(true)\">Set Hold (expose)</button>\n    <button @click=\"() => holdRef.setHold(false)\">Unset Hold (expose)</button>\n    <button @click=\"() => (hold = !hold)\">Toggle Hold (prop)</button>\n    <ResponsiveButton ref=\"loadingRef\" display_name=\"'Submit'\" build_in_theme=\"'filled-primary'\" width_type=\"'fit-content'\"/>\n    <ResponsiveButton ref=\"holdRef\" display_name=\"'Save'\" build_in_theme=\"'outlined-secondary'\" width_type=\"'fill-whole'\" :hold=\"hold\"/>\n  </div>\n</template>\n\n<script setup>\nimport { ref } from 'vue'\nconst loadingRef = ref(null)\nconst holdRef = ref(null)\nconst hold = ref(false)\n<\/script>`
        },
        prefixSlotCode(){
            return `<template>\n  <ResponsiveButton display_name=\"'Fill the Questionnaire (3 min)'\" build_in_theme=\"'filled-primary'\" width_type=\"'fill-whole'\">\n    <template #prefix>\n      <img src=\"/path/to/icon.svg\" style=\"width: 100%; height: 100%;\"/>\n    </template>\n  </ResponsiveButton>\n</template>`
        },
        eventsCode(){
            return `<template>\n  <ResponsiveButton display_name=\"'Go to Dashboard'\" build_in_theme=\"'text-primary'\" width_type=\"'fit-content'\" @click=\"(name) => onClick(name)\"/>\n</template>\n\n<script setup>\nfunction onClick(name){\n  alert('Clicked: ' + name)\n}\n<\/script>`
        }
    },
    methods:{
        handleRedirectButtonClick(display_name){
            alert('click ResponsiveButton: ' + display_name);
        }
    }
}
</script>

<style scoped>
.component-doc{ max-width: 1000px; width:100%; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; box-sizing: border-box; }
.desc{ color:#4b5563; margin-bottom: 12px; }
.sub-title{ margin: 8px 0 4px; }
.note{ color:#374151; margin: 4px 0 8px; }
.live{ border: 1px dashed #e5e7eb; padding: 12px; border-radius: 8px; background: #fff; display:flex; flex-direction: column; gap: 8px; }
.actions{ display:flex; gap:8px; flex-wrap:wrap; }
</style>