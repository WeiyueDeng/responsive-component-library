<template>
    <div :class="['responsive-button-wrapper', width_type]" ref = "responsive-button-wrapper" v-component-loading="loading">
        <div :class = "[
            'responsive-button',
            size,
            width_type,
            {'disabled':disabled},
            {'no-display-name': !display_name},
            {'has-prefix':has_prefix},
            {'has-suffix':has_suffix},
            {'held':is_button_held},
            build_in_theme,
            customized_class,
            // only works when this button has dropdown
            {'hovered': is_dropdown_option_hovered},
            {'focused': show_dropdown}
        ]" 
        ref = "responsive-button"
        @click = "handleClick()"
        @mouseenter="handleMouseEnterButton()" 
        >
            <div class = "button-content">
                <div v-if="$slots.prefix" class="prefix-wrapper">
                    <slot name="prefix"></slot>
                </div>     
                <div class = "button-name" v-if = "display_name">{{ display_name }}</div>
                <div v-if="$slots.suffix" class="suffix-wrapper">
                    <slot name = "suffix"></slot>
                </div>
                <div v-if = "!is_dropdown_option && has_dropdown" class="outest-responsive-dropdown-button-default-suffix suffix-wrapper">
                    <img :src = "dynamicDefaultDropdownDownArrow" :class = "[
                        'rotate-0',
                        {'rotate-180': show_dropdown}
                    ]"/>
                </div>
            </div>
            <div v-if = "is_dropdown_option && has_dropdown" class="nested-dropdown-default-suffix suffix-wrapper">
                <img v-if = "!disabled" src = "@/assets/icons/black_arrow_to_right.svg"/>
                <img v-else src = "@/assets/icons/grey_arrow_to_right.svg" />
            </div>
        </div>
        <div v-if = "web_version && show_dropdown" 
        ref = "responsive-button-dropdown"
        :class = "[
            'responsive-button-dropdown',
            {'sub-dropdown': is_dropdown_option}
        ]"
        :style = "dropdown_position_data">
            <ResponsiveButton v-for = "dropdown_option in dropdown_options" 
            :key = "`${display_name.replaceAll(' ','-')}-dropdown-item-${dropdown_option.display_name.replaceAll(' ','-')}`"
            v-bind = "dropdown_option"
            customized_class = "responsive-button-dropdown-option"
            :width_type="'fill-whole'"
            :is_dropdown_option="true"
            :nested_dropdown_option_button_history_stack = "is_dropdown_option ? $attrs.nested_dropdown_option_button_history_stack : nested_dropdown_option_button_history_stack"
            :currently_hovered_dropdown_option_display_name ="currently_hovered_dropdown_option_display_name"
            @update-currently-hovered-dropdown-option = "(option_display_name)=>updateCurrentlyHoveredDropdownOption(option_display_name)"
            @click = "(option_display_name)=>clickWebDropdownOption(option_display_name)"
            @add-nested-dropdown-history-stack = "(nested_dropdown_data)=>updateNestedDropdownHistoryStack(nested_dropdown_data)"
            @remove-nested-dropdown-history-stack = "(nested_dropdown_data)=>removeNestedDropdownHistoryStack(nested_dropdown_data)"
            />
        </div>
        <div v-else-if = "!web_version && show_dropdown" 
        ref = "responsive-button-dropdown"
        :class = "[
            'responsive-button-dropdown',
            {'sub-dropdown': is_dropdown_option}
        ]"
        :style = "dropdown_position_data">
            <div v-if = 'non_web_version_nested_dropdown_option_shown'
            class = "non-web-responsive-button-nested-dropdown-button"
            @click = "nonWebRemoveNestedDropdownHistoryStack({
                display_name: non_web_version_nested_dropdown_option_shown,
                dropdown_options: non_web_version_dropdown_options
            })">
                <div class="non-web-responsive-nested-dropdown-button-default-prefeix prefix-wrapper">
                    <img src = "@/assets/icons/black_arrow_to_right.svg" class = "rotate-180"/>
                </div>
                <div>{{ non_web_version_nested_dropdown_option_shown }}</div>
            </div>
            <div v-for = "dropdown_option in non_web_version_dropdown_options" 
            :key = "`${display_name.replaceAll(' ','-')}-dropdown-item-${dropdown_option.display_name.replaceAll(' ','-')}`"
            :class = "['non-web-responsive-button-dropdown-option', {'disabled':dropdown_option.disabled}]"
            @click = "clickNonWebDropdownOption(dropdown_option)">
                <div class = "non-web-dropdown-option-display-name">   
                    {{dropdown_option.display_name}}
                </div>
                <div v-if = "dropdown_option.dropdown_options" class="non-web-responsive-nested-dropdown-option-default-suffix suffix-wrapper">
                    <img v-if = "!dropdown_option.disabled" src = "@/assets/icons/black_arrow_to_right.svg" />
                    <img v-else src = "@/assets/icons/grey_arrow_to_right.svg" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useWindowSize } from '@/composables/useWindowSize.js';
import  white_arrow_down from '@/assets/icons/white_arrow_down.svg';
import cyan_arrow_down from '@/assets/icons/cyan_arrow_down.svg';
import dark_blue_arrow_down from '@/assets/icons/dark_blue_arrow_down.svg';
import grey_arrow_down from '@/assets/icons/grey_arrow_down.svg';

export default{
    name:'ResponsiveButton', // for recognizing itself when it calls itself inside the component
    inheritAttrs:false,
    props:{
        display_name:{
            type:String,
            default:'button',
        },
        size:{
            //reponsive for mobile version
            //ENUM: xsmall, small, medium, large
            //NOTES: xsmall -> height:36px; small -> height:40px; medium -> height:42px; large -> height:44px;
            type: String,
            default:'small'
        },
        width_type:{
            //ENUM: fill-whole, fit-content
            type:String,
            default:'fit-content',
        },
        build_in_theme:{
            //ENUM: outlined-primary, filled-primary, text-primary, outlined-secondary, filled-secondary, text-secondary
            type:String,
            default:'outlined-primary'
        },
        customized_class:{
            type:String,
            default:''
        },
        hold:{
            type:Boolean,
            default:false,
        },
        disabled:{
            type:Boolean,
            default:false,
        },
        dropdown_options:{
            type:Array,
            default:()=>[]
        },
        is_dropdown_option:{
            type:Boolean,
            default:false,
        }
    },
    mounted(){
        if(!this.is_dropdown_option && this.has_dropdown){
            document.addEventListener('click', (e)=>this.closeWhenClickOutsideDropdownButton(e));
            this.nested_dropdown_option_button_history_stack = [];
        }
        if(this.is_dropdown_option_hovered && this.has_dropdown){
            this.is_dropdown_visibile = true;
        }
    },
    unmounted(){
        if(!this.is_dropdown_option && this.has_dropdown){
            document.removeEventListener('click', (e)=>this.closeWhenClickOutsideDropdownButton(e));
        }
    },
    setup(){
        const { width } = useWindowSize();
        return {
            width,
        }
    },
    data(){
        return {
            is_dropdown_visibile:false,
            currently_hovered_dropdown_option_display_name:'',
            dropdown_position_data:{},
            nested_dropdown_option_button_history_stack:null,
            loading:false,
            is_button_held:this.hold,
        }
    },
    emits:[
        'click',
        'update-currently-hovered-dropdown-option', 
        'add-nested-dropdown-history-stack',
        'remove-nested-dropdown-history-stack'
    ],
    computed:{
        has_prefix(){
            return this.$slots.prefix;
        },
        has_suffix(){
            return this.$slots.suffix;
        },
        has_dropdown(){
            return this.dropdown_options && Array.isArray(this.dropdown_options) && this.dropdown_options.length > 0;
        },
        dynamicDefaultDropdownDownArrow(){
            if(this.build_in_theme == "filled-primary" || this.build_in_theme == "filled-secondary"){
                return white_arrow_down;
            }else if(this.build_in_theme == "outlined-secondary" || this.build_in_theme == "text-secondary"){
                if(this.disabled){
                    return grey_arrow_down;
                }else{
                    return cyan_arrow_down;
                }
            }else{
                if(this.disabled){
                    return grey_arrow_down;
                }else{
                    return dark_blue_arrow_down;
                }
            }
        },
        web_version(){
            return this.width > 1024 ? true : false;
        },
        mobile_version(){
            return this.width <= 767 ? true : false;
        },
        is_dropdown_option_hovered(){
        //indicate the hover status of the button which is a dropdown option
            // if this current button is an dropdown option with nested dropdown
            // but no this.$attrs.currently_hovered_dropdown_option_display_name and this.$attrs.nested_dropdown_option_button_history_stack isn't empty -> change from mobile to web
            // NOTES: from mobile to web: only need to convert the visible nested dropdown and corresponding options, which is recorded in history stack
            if(this.is_dropdown_option && this.has_dropdown && !this.$attrs.currently_hovered_dropdown_option_display_name && this.$attrs.nested_dropdown_option_button_history_stack && this.$attrs.nested_dropdown_option_button_history_stack.length > 0){
                // 1. check nested_dropdown_option_button_history_stack to find an element matched the current button's display_name and dropdown_options
                for (const nested_dropdown_history_unit of this.$attrs.nested_dropdown_option_button_history_stack) {
                    //1.1 check whether display_name and dropdown_options matched: if so: means this dropdown's dropdown is open: 
                    if(nested_dropdown_history_unit.display_name == this.display_name 
                    // dropdown_options in history stack share the same reference with the one in props which is passed via emit event
                    && JSON.stringify(nested_dropdown_history_unit.dropdown_options) == JSON.stringify(this.dropdown_options)){
                        // 2. emit update-currently-hovered-dropdown-option to parent button to indicate that the current button as a dropdown option is hovered
                        this.$emit('update-currently-hovered-dropdown-option', this.display_name);
                        this.is_dropdown_visibile = true;
                        // this.$nextTick(()=>{
                        //     console.log("is_dropdown_option_hovered find matched during convert",this.display_name);
                        //     this.calculateDropdownPosition();
                        // })
                        setTimeout(()=>{
                            // console.log("is_dropdown_option_hovered find matched during convert",this.display_name);
                            this.calculateDropdownPosition();
                        },100);
                        // 3. is_dropdown_option_hovered should be true to show the nested dropdown in webpage
                        return true;
                    }
                }
            }
            // else: 
            return this.is_dropdown_option && this.$attrs.currently_hovered_dropdown_option_display_name == this.display_name;
        },
        show_dropdown(){
            return this.is_dropdown_visibile && this.has_dropdown;
        },
        non_web_version_nested_dropdown_option_shown(){
            if(this.nested_dropdown_option_button_history_stack && this.nested_dropdown_option_button_history_stack.length > 0){
                return this.nested_dropdown_option_button_history_stack[this.nested_dropdown_option_button_history_stack.length-1].display_name;
            }else{
            //else: show the dropdown_options
                return null;
            }
        },
        non_web_version_dropdown_options(){
            //if nested_dropdown_option_button_history_stack has record: show the lastest record
            if(this.nested_dropdown_option_button_history_stack && this.nested_dropdown_option_button_history_stack.length > 0){
                return this.nested_dropdown_option_button_history_stack[this.nested_dropdown_option_button_history_stack.length-1].dropdown_options;
            }else{
            //else: show the dropdown_options
                return this.dropdown_options;
            }
        }
    },
    watch:{
        is_dropdown_option_hovered(newVal){
        //the button which is a dropdown option with a dropdown, its dropdown visibility is controlled by whether this dropdown option is hovered
            if(this.has_dropdown && !this.disabled){
                this.is_dropdown_visibile = newVal;
                // update in nested_dropdown_option_button_history_stack, in case viewport size changes during process
                // if is_dropdown_visibile == true:
                if(newVal){
                    // pass the current dropdown button/option's dropdown_options and display_name in the outest's button's history stack
                    // since the non-web version only show the deepest dropdown button/option's display_name and its dropdown_options
                    this.$emit('add-nested-dropdown-history-stack', {
                        display_name:this.display_name,
                        dropdown_options:this.dropdown_options
                    });
                }else{
                // if is_dropdown_visibile == false:
                    // pass the target dropdown button/option data to the outest button to remove the nested dropdown in history stack
                    // since this button's dropdown becomes invisible
                    this.$emit('remove-nested-dropdown-history-stack', {
                        display_name:this.display_name,
                        dropdown_options:this.dropdown_options
                    });
                }
            }
        },
        // nested_dropdown_option_button_history_stack:{
        //     deep:true,
        //     handler(newVal){
        //         console.log('nested_dropdown_option_button_history_stack', newVal);
        //     }
        // },
        show_dropdown(newVal){
            // console.log('show_dropdown change', this.display_name, newVal);
            if(newVal){
                this.$nextTick(()=>{
                    this.calculateDropdownPosition();
                });
            }else{
                //set style which is used to assign dropdown's position to be empty
                this.dropdown_position_data = {};
                //reset currently_hovered_dropdown_option_display_name to be empty
                this.currently_hovered_dropdown_option_display_name = '';
                if(!this.is_dropdown_option){
                    this.nested_dropdown_option_button_history_stack = [];
                }
            }
        },
        hold(newVal){
            this.is_button_held = newVal;
        }
    },
    methods:{
        closeWhenClickOutsideDropdownButton(e){
            // console.log('closeWhenClickOutsideDropdownButton',this.display_name, this.$refs['responsive-button'] && !this.$refs['responsive-button'].contains(e.target), this.$refs['responsive-button-dropdown'] && !this.$refs['responsive-button-dropdown'].contains(e.target) );
            if(this.show_dropdown 
            && this.$refs['responsive-button'] && !this.$refs['responsive-button'].contains(e.target)
            && this.$refs['responsive-button-dropdown'] && !this.$refs['responsive-button-dropdown'].contains(e.target)
            ) {
                this.is_dropdown_visibile = false;
            }
        },
        handleClick(){
            if(!this.disabled){
                //if this button has_dropdown 
                if(this.has_dropdown){
                    // for the outest button with a dropdown: its dropdown visibility is controlled by clicking
                    if(!this.is_dropdown_option){
                        // show/hide the dropdown
                        this.is_dropdown_visibile = !this.is_dropdown_visibile;
                    }
                    //else: for the button as a dropdown option -> do nothing as its dropdown is triggered by hover
                }else{
                    this.$emit('click', this.display_name);
                }
            }
        },
        handleMouseEnterButton(){
        //triggered when mouse enter the button part of the component
            //for the button as a dropdown option
            if(this.is_dropdown_option){
                //pass the display_name to its parent button
                this.$emit('update-currently-hovered-dropdown-option', this.display_name);         
            }
        },
        updateCurrentlyHoveredDropdownOption(hovered_option_display_name){
            this.currently_hovered_dropdown_option_display_name = hovered_option_display_name;
        },
        updateNestedDropdownHistoryStack(nested_dropdown_data){
            // if already in the outest button: push the data in nested_dropdown_option_button_history_stack
            if(!this.is_dropdown_option){
                this.nested_dropdown_option_button_history_stack.push(nested_dropdown_data);
                // console.log('updateNestedDropdownHistoryStack', this.nested_dropdown_option_button_history_stack);
            }else{
            // else: continue pass to the parent button until the outest one
                this.$emit('add-nested-dropdown-history-stack', nested_dropdown_data);
            }
        },
        removeNestedDropdownHistoryStack(nested_dropdown_data){
            // if already in the outest button: remove the data in nested_dropdown_option_button_history_stack
            if(!this.is_dropdown_option){
                // 1. find the latest matched record (reversely iterating will be more efficient)
                for (let i = this.nested_dropdown_option_button_history_stack.length - 1; i >= 0; i--) {
                    const cur_nested_dropdown_button = this.nested_dropdown_option_button_history_stack[i];
                    //1.1 check whether data matched: if so: this is the matched one
                    if(cur_nested_dropdown_button.display_name == nested_dropdown_data.display_name 
                    // dropdown_options in history stack share the same reference with the one in props which is passed via emit event
                    && JSON.stringify(cur_nested_dropdown_button.dropdown_options) == JSON.stringify(nested_dropdown_data.dropdown_options)){
                        // 2. remove it and all records after it (if has any)
                        //NOTES: it's possible directly close dropdown across multiple layer in web version, as it's triggered by hover
                        this.nested_dropdown_option_button_history_stack.splice(i); //in place edit
                        break;
                    }
                }
                // console.log('removeNestedDropdownHistoryStack', this.nested_dropdown_option_button_history_stack);
            }else{
            // else: continue pass to the parent button until the outest one
                this.$emit('remove-nested-dropdown-history-stack', nested_dropdown_data);
            }
        },
        nonWebRemoveNestedDropdownHistoryStack(nested_dropdown_data){
            setTimeout(()=>{
                this.removeNestedDropdownHistoryStack(nested_dropdown_data);
            },50);
        },
        clickWebDropdownOption(clicked_option_display_name){
        // triggered when any of the singular dropdown option (dropdown option without dropdown) is clicked
            // emit the click event to pass the clicked button display_name to the parent (will stop till the outest parent)
            this.$emit('click', clicked_option_display_name);
            // if the current button is already the outest button: 
            if(!this.is_dropdown_option){
                // hide the dropdown after received the event that indicates clicked one of the child option
                // NOTES: That the outest dropdown is closed (v-if of dropdown becomes false) triggers that Vue removes the outest dropdown and all its children and nested dropdown from the DOM.
                this.is_dropdown_visibile = false;
            }   
        },
        clickNonWebDropdownOption(clicked_dropdown_option){
        // only triggered by clicking an dropdown option in non-web version
            // if the clicked_dropdown_option is not disabled: trigger the corresponding events by the click
            if(!clicked_dropdown_option.disabled){
                //if clicked_dropdown_option has dropdown_options (nested dropdown)
                if(clicked_dropdown_option.dropdown_options){
                    // need to wait for closeWhenClickOutsideDropdownButton finished first, then change the dropdown content
                    // since if the dropdown options changed before closeWhenClickOutsideDropdownButton, the click will be detected as outside since the previous option is removed.
                    setTimeout(() => {
                        // 1. check whether history stack has this option's record: 
                        var has_nested_dropdown_record;
                        // 1.1 find the latest matched record (reversely iterating will be more efficient)
                        for (let i = this.nested_dropdown_option_button_history_stack.length - 1; i >= 0; i--) {
                            const cur_nested_dropdown_button = this.nested_dropdown_option_button_history_stack[i];
                            //1.2 check whether data matched: if so: this is the matched record
                            if(cur_nested_dropdown_button.display_name == clicked_dropdown_option.display_name 
                            // dropdown_options in history stack share the same reference with the one in props which is passed via emit event
                            && JSON.stringify(cur_nested_dropdown_button.dropdown_options) == JSON.stringify(clicked_dropdown_option.dropdown_options)){
                                has_nested_dropdown_record = true;
                                // 1.3 remove it and all records after it (if has any)
                                //NOTES: it's possible directly close dropdown across multiple layer in web version, as it's triggered by hover
                                this.nested_dropdown_option_button_history_stack.splice(i); //in place edit
                                break;
                            }
                        }
                        //  if no: add in history stack
                        if(!has_nested_dropdown_record){
                            this.nested_dropdown_option_button_history_stack.push({
                                display_name:clicked_dropdown_option.display_name,
                                dropdown_options: clicked_dropdown_option.dropdown_options
                            })
                        }
                    }, 50);
                }else{
                //if clicked_dropdown_option doesn't have any dropdown_options
                    // emit the click event to pass the clicked button display_name to the parent
                    // NOTES: for non-web version: no recursion, always in the outest button
                    this.$emit('click', clicked_dropdown_option.display_name);
                    this.is_dropdown_visibile = false;
                }
            }
        },
        calculateDropdownPosition(){
            const output = {};
            const button_element = this.$refs['responsive-button'];
            const current_dropdown_element = this.$refs["responsive-button-dropdown"];
            if(button_element && current_dropdown_element){
                const viewport_width = window.innerWidth;
                const viewport_height = window.innerHeight;

                const button_element_rect= button_element.getBoundingClientRect();
                const right_distance_to_viewport_left = button_element_rect.right;
                const bottom_distance_to_viewport_top = button_element_rect.bottom;
                const left_distance_to_viewport_left = button_element_rect.left; 
                const button_element_width = button_element_rect.width;
                const button_element_height = button_element_rect.height;

                const current_dropdown_element_rect = current_dropdown_element.getBoundingClientRect();
                const height = current_dropdown_element_rect.height;
                const width = current_dropdown_element_rect.width;
                if(this.is_dropdown_option){
                // if the current button is already a dropdown option:
                    // if bottom distance to the viewport bottom are enough: default dropdown position
                    if(viewport_height - bottom_distance_to_viewport_top >height + (this.mobile_version ? 4 : 8)){
                        // top:0
                        output['top'] = '0px';
                    }else{
                    // if bottom distance aren't enough:
                        //bottom:0
                        output['bottom'] = '0px';
                    }

                    // if right distance are enough: default dropdown position
                    if(viewport_width - right_distance_to_viewport_left > (width + (this.mobile_version ? 4 : 8))){
                        // left: the button's width + 12 (right padding of dropdown)+ 8 (distance between two dropdowns)
                        output['left'] = button_element_width + 12 + 8 +'px';
                    }else{
                    // if right distance aren't enough
                        // right: the button's width + 12 (right padding of dropdown)+ 8 (distance between two dropdowns)
                        output['right'] = button_element_width + 12 + 8 +'px';
                    }
                }else{
                // if the current button is the outest button:
                    // if bottom distance are enough: default dropdown position
                    if(viewport_height - bottom_distance_to_viewport_top > height + (this.mobile_version ? 4 : 8)){
                        // top: the button's height + 8 (distance between button and the dropdown)
                        output['top'] = button_element_height + (this.mobile_version ? 4 : 8) + 'px';
                    }else{
                    // if bottom distance aren't enough:
                        //bottom: the button's height + 8 (distance between button and the dropdown)
                        output['bottom'] = button_element_height + (this.mobile_version ? 4 : 8) + 'px';
                    }

                    // if distance from button's left edge to the viewport's right edge are enough: default dropdown position
                    if(viewport_width - left_distance_to_viewport_left > width + (this.mobile_version ? 4 : 8)){
                        // left: 0
                        output['left'] = '0px';
                    }else{
                    // if right distance aren't enough
                        // right: 0
                        output['right'] = '0px';
                    }
                }
            }
            // console.log('dynamicDropdownPosition', output);
            this.dropdown_position_data = output;
        },
        // expose
        setLoading(val){
            this.loading=val;
        },
        setHold(val){
            this.is_button_held=val;
        }
    },
    expose:['setLoading', 'setHold'],
}
</script>

<style scoped>
.responsive-button-wrapper{
    position: relative;
}
.responsive-button-wrapper.fill-whole{
    width: 100%;
    height: fit-content;
}
.responsive-button-wrapper.fit-content{
    width: fit-content;
    height: fit-content;
}
.responsive-button-wrapper :deep(.component-loading-spinner){
    border-radius: 4px;
}
.responsive-button-wrapper :deep(.component-loading-spinner)::after{
    height:25px;
    width: 25px;
}
.responsive-button{
    height:fit-content;
    box-sizing: border-box;
    border-radius: 4px;
    text-align: center;

    display: flex;
    flex-direction: column;
    align-items: center;

    font-family: 'Roboto';
    cursor: pointer;
}
.responsive-button.fit-content{
    min-width: 90px;
}
.responsive-button.no-display-name{
    min-width: 0px !important;
}
.button-content{
    display: flex;
    column-gap:8px;
    align-items: center;
}
.prefix-wrapper{
    width:20px;
    height:20px;
    flex-shrink: 0;
}
.suffix-wrapper{
    width:20px;
    height:20px;
    flex-shrink: 0;
}
.rotate-0{
    transform: rotate(0deg);
    transition: all 0.3s;
}
.rotate-180{
    transform: rotate(180deg);
}
/* xsmall */
.responsive-button.xsmall{
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    letter-spacing: 0.1px;
}
.responsive-button.fit-content.xsmall{
    width:fit-content;
    padding:7px 23px;
}
.responsive-button.no-display-name.fit-content.xsmall{
    width: fit-content;
    padding:7px !important;
}
.responsive-button.fit-content.xsmall.has-prefix{
    width:fit-content;
    padding:7px 23px 7px 15px;
}
.responsive-button.fit-content.xsmall.has-suffix{
    width:fit-content;
    padding:7px 15px 7px 23px;
}
.responsive-button.fit-content.xsmall.has-prefix.has-suffix{
    width:fit-content;
    padding:7px 15px 7px 15px;
}
.responsive-button.fill-whole.xsmall{
    width:100%;
    padding:7px 7px;
}
/* small */
.responsive-button.small{
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    letter-spacing: 0.1px;
}
.responsive-button.fit-content.small{
    width:fit-content;
    padding:9px 23px;
}
.responsive-button.no-display-name.fit-content.small{
    width: fit-content;
    padding:9px !important;
}
.responsive-button.fit-content.small.has-prefix{
    width:fit-content;
    padding:9px 23px 9px 15px;
}
.responsive-button.fit-content.small.has-suffix{
    width:fit-content;
    padding:9px 15px 9px 23px;
}
.responsive-button.fit-content.small.has-prefix.has-suffix{
    width:fit-content;
    padding:9px 15px 9px 15px;
}
.responsive-button.fill-whole.small{
    width:100%;
    padding:9px 7px;
}
/* medium */
.responsive-button.medium{
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    letter-spacing: 0.1px;
}
.responsive-button.fit-content.medium{
    width:fit-content;
    padding:10px 23px;
}
.responsive-button.no-display-name.fit-content.medium{
    width: fit-content;
    padding:10px !important;
}
.responsive-button.fit-content.medium.has-prefix{
    width:fit-content;
    padding:10px 23px 10px 15px;
}
.responsive-button.fit-content.medium.has-suffix{
    width:fit-content;
    padding:10px 15px 10px 23px;
}
.responsive-button.fit-content.medium.has-prefix.has-suffix{
    width:fit-content;
    padding:10px 15px 10px 15px;
}
.responsive-button.fill-whole.medium{
    width:100%;
    padding:10px 7px;
}
/* large */
.responsive-button.large{
    font-size: 16px;
    font-weight: 500;
    line-height: 20px;
    letter-spacing: 0.1px;
}
.responsive-button.fit-content.large{
    width:fit-content;
    padding:11px 23px;
}
.responsive-button.no-display-name.fit-content.large{
    width: fit-content;
    padding:11px !important;
}
.responsive-button.fit-content.large.has-prefix{
    width:fit-content;
    padding:11px 23px 11px 15px;
}
.responsive-button.fit-content.large.has-suffix{
    width:fit-content;
    padding:11px 15px 11px 23px;
}
.responsive-button.fit-content.large.has-prefix.has-suffix{
    width:fit-content;
    padding:11px 15px 11px 15px;
}
.responsive-button.fill-whole.large{
    width:100%;
    padding:11px 7px;
}
/* themes */
.disabled{
    cursor: not-allowed;
}
/* outlined-primary */
.outlined-primary{
    border: 1px solid #1E4670;
    background: #FFF;
    color: #1E4670;
}
.outlined-primary.held:hover,
.outlined-primary:hover{
    background: #ECF2F8;
}
.outlined-primary.held,
.outlined-primary.held:active,
.outlined-primary.focused,
.outlined-primary:active{
    background: linear-gradient(0deg, rgba(28, 27, 31, 0.08) 0%, rgba(28, 27, 31, 0.08) 100%), #ECF2F8;
}
.outlined-primary.held.disabled,
.outlined-primary.disabled,
.outlined-primary.disabled:hover,
.outlined-primary.disabled.focused,
.outlined-primary.disabled:active{
    border: 1px solid #979797;
    background: #F2F2F2;
    color:#979797;
}
/* filled-primary */
.filled-primary{
    border: 1px solid #1E4670;
    background: #1E4670;
    color: #FFF;
}
.filled-primary.held:hover,
.filled-primary:hover{
    background: #022A53;
}
.filled-primary.held,
.filled-primary.held:active,
.filled-primary.focused,
.filled-primary:active{
    background: linear-gradient(0deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.08) 100%), #022A53;
}
.filled-primary.held.disabled,
.filled-primary.disabled,
.filled-primary.disabled:hover,
.filled-primary.disabled.focused
.filled-primary.disabled:active{
    border: 1px solid #979797;
    background: #979797;
}
/* text-primary */
.text-primary{
    border: 1px solid transparent;
    background: #FFF;
    color: #1E4670;
}
.text-primary.held:hover,
.text-primary:hover{
    background: #ECF2F8;
}
.text-primary.held,
.text-primary.held:active,
.text-primary.focused,
.text-primary:active{
    background: linear-gradient(0deg, rgba(28, 27, 31, 0.08) 0%, rgba(28, 27, 31, 0.08) 100%), #ECF2F8;
}
.text-primary.held.disabled,
.text-primary.disabled,
.text-primary.disabled:hover,
.text-primary.disabled.focused,
.text-primary.disabled:active{
    color: #979797;
}
/* outlined-secondary */
.outlined-secondary{
    border: 1px solid #20A8C3;
    background: #FFF;
    color: #20A8C3;
}
.outlined-secondary.held:hover,
.outlined-secondary:hover{
    background: #E8F0F4;
}
.outlined-secondary.held,
.outlined-secondary.held:active,
.outlined-secondary.focused,
.outlined-secondary:active{
    background: linear-gradient(0deg, rgba(28, 27, 31, 0.08) 0%, rgba(28, 27, 31, 0.08) 100%), #E8F0F4;
}
.outlined-secondary.held.disabled,
.outlined-secondary.disabled,
.outlined-secondary.disabled:hover,
.outlined-secondary.disabled.focused,
.outlined-secondary.disabled:active{
    border: 1px solid #979797;
    background: #F2F2F2;
    color:#979797;
}
/* filled-secondary */
.filled-secondary{
    border: 1px solid #20A8C3;
    background: #20A8C3;
    color: #FFF;
}
.filled-secondary.held:hover,
.filled-secondary:hover{
    background: linear-gradient(0deg, rgba(28, 27, 31, 0.08) 0%, rgba(28, 27, 31, 0.08) 100%), #20A8C3;
    box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.30), 0px 1px 3px 1px rgba(0, 0, 0, 0.15);
}
.filled-secondary.held,
.filled-secondary.held:active,
.filled-secondary.focused,
.filled-secondary:active{
    background: linear-gradient(0deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.08) 100%), #20A8C3;
}
.filled-secondary.held.disabled,
.filled-secondary.disabled,
.filled-secondary.disabled:hover,
.filled-secondary.disabled.focused,
.filled-secondary.disabled:active{
    border: 1px solid #979797;
    background: #979797;
}

/* text-secondary */
.text-secondary{
    border: 1px solid transparent;
    background: #FFFFFF;
    color: #20A8C3;
}
.text-secondary.held:hover,
.text-secondary:hover{
    background: #E8F0F4;
}
.text-secondary.held,
.text-secondary.held:active,
.text-secondary.focused,
.text-secondary:active{
    background: linear-gradient(0deg, rgba(28, 27, 31, 0.08) 0%, rgba(28, 27, 31, 0.08) 100%), #E8F0F4;
}
.text-secondary.held.disabled,
.text-secondary.disabled,
.text-secondary.disabled:hover,
.text-secondary.disabled.focused,
.text-secondary.disabled:active{
    color: #979797;
}
/* responsive-button-dropdown */
.responsive-button-dropdown{
    min-width: 300px;
    padding: 9px 12px;
    box-sizing: border-box;
    border-radius: 4px;
    background: #FFF;
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.15), 0px 1px 3px 0px rgba(0, 0, 0, 0.30);

    position: absolute;
    z-index:1000;
}
.fill-whole .responsive-button-dropdown {
    width: 100%;
}
.fit-content .responsive-button-dropdown {
    width:fit-content;
}
.responsive-button-dropdown.sub-dropdown{
    width:fit-content !important;
}
/* responsive-button-dropdown-option */
.responsive-button-dropdown-option{
    width:100% !important;
    padding:12px 8px !important;
    border: none !important;

    flex-direction: row;
    align-items: flex-start !important;
    justify-content: space-between;
    column-gap: 12px;

    background: #FFFFFF !important;
    color: #1C1B1F !important;
    font-family: 'Roboto' !important;
    font-size: 16px !important;
    font-weight: 400 !important;
    line-height: 19px !important;
    cursor: pointer;

}
.responsive-button-dropdown-option.hovered{
    border-radius: 4px !important;
    background: #FAEBE6 !important;
}
.responsive-button-dropdown-option.disabled,
.responsive-button-dropdown-option.disabled.hovered{
    color: #979797 !important;
    cursor: not-allowed !important;
}
.responsive-button-dropdown-option .button-name{
    text-align: left;
}
.non-web-responsive-button-nested-dropdown-button{
    width:100% !important;
    box-sizing: border-box;
    padding:12px 8px;
    border-bottom: 1px solid #BCCCDC;

    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    column-gap: 12px;

    background: #FFFFFF;
    color: #1C1B1F;
    font-family: 'Roboto';
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0.25px;
    cursor: pointer;
}
.fill-whole .non-web-responsive-button-dropdown-option{
    width:100%;
}
.fit-content .non-web-responsive-button-dropdown-option{
    /* width:fit-content; */
    width:100%;
}
.non-web-responsive-button-dropdown-option{
    /* width:100%; */
    box-sizing: border-box;
    padding:12px 8px;

    display: flex;
    flex-direction: row;
    align-items: flex-start !important;
    justify-content: space-between;
    column-gap: 12px;

    background: #FFFFFF;
    color: #1C1B1F;
    font-family: 'Roboto';
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0.25px;
    cursor: pointer;
}
.non-web-responsive-button-dropdown-option:active{
    border-radius: 4px !important;
    background: #FAEBE6 !important;
}
.non-web-responsive-button-dropdown-option.disabled,
.non-web-responsive-button-dropdown-option.disabled:active{
    color: #979797 !important;
    cursor: not-allowed !important;
}
@media only screen and (max-width:767px){
    .simplified-notification{
        padding:8px 12px;
        gap:8px;
    }
    /* xsmall - same as web version */
    /* small -> xsmall of web */
    .responsive-button.small{
        font-size: 14px;
        font-weight: 500;
        line-height: 20px;
        letter-spacing: 0.1px;
    }
    .responsive-button.fit-content.small{
        width:fit-content;
        padding:7px 23px;
    }
    .responsive-button.fit-content.small.has-prefix{
        width:fit-content;
        padding:7px 23px 7px 15px;
    }
    .responsive-button.fit-content.small.has-suffix{
        width:fit-content;
        padding:7px 15px 7px 23px;
    }
    .responsive-button.fit-content.small.has-prefix.has-suffix{
        width:fit-content;
        padding:7px 15px 7px 15px;
    }
    .responsive-button.fill-whole.small{
        width:100%;
        padding:7px 7px;
    }
    /* medium -> small of web*/
    .responsive-button.medium{
        font-size: 14px;
        font-weight: 500;
        line-height: 20px;
        letter-spacing: 0.1px;
    }
    .responsive-button.fit-content.medium{
        width: fit-content;
        padding: 9px 23px;
    }
    .responsive-button.fit-content.medium.has-prefix{
        width: fit-content;
        padding: 9px 23px 9px 15px;
    }
    .responsive-button.fit-content.medium.has-suffix{
        width: fit-content;
        padding: 9px 15px 9px 23px;
    }
    .responsive-button.fit-content.medium.has-prefix.has-suffix{
        width: fit-content;
        padding: 9px 15px 9px 15px;
    }
    .responsive-button.fill-whole.medium{
        width: 100%;
        padding: 9px 7px;
    }
    /* large -> medium of web*/
    .responsive-button.large{
        font-size: 14px;
        font-weight: 500;
        line-height: 20px;
        letter-spacing: 0.1px;
    }
    .responsive-button.fit-content.large{
        width:fit-content;
        padding:10px 23px;
    }
    .responsive-button.fit-content.large.has-prefix{
        width:fit-content;
        padding:10px 23px 10px 15px;
    }
    .responsive-button.fit-content.large.has-suffix{
        width:fit-content;
        padding:10px 15px 10px 23px;
    }
    .responsive-button.fit-content.large.has-prefix.has-suffix{
        width:fit-content;
        padding:10px 15px 10px 15px;
    }
    .responsive-button.fill-whole.large{
        width:100%;
        padding:10px 7px;
    }
    .responsive-button-dropdown-option{
        font-size: 14px !important;
        font-weight: 400 !important;
        line-height: 20px !important;
        letter-spacing: 0.25px !important;
    }
    .responsive-button-dropdown{
        min-width: 267px;
    }
}
</style>