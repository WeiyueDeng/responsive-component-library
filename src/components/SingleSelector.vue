<template>
    <div class = "single-selector-unit-wrapper">
        <div ref = "single-selector"
        :class = "[
            'single-selector',
            {'error':show_error},
            {'alert':show_alert},
            {'disabled':disabled},
            {'is-focus':is_focus},
            {'has-prefix': $slots.prefix},
            {'show-clear-icon':show_clear_icon},
        ]" 
        @click = "handleClickSingleSelector"
        @mouseenter="hovered = true"
        @mouseleave="hovered = false">
            <!-- prefix part -->
            <div v-if = "$slots.prefix" class = "prefix-wrapper">
                <slot name = "prefix"></slot>
            </div>
            <!-- prefix part end -->

            <!-- show selected item / type filter_keyword part -->
            <div
            :class = "[
                'selected-content',
                selected_item ? 'content-text':'placeholder',
            ]">
                <span :class = "[{'hide':is_focus && filterable}]">{{ selected_item ? selected_item_label : placeholder }}</span>
                <input :class = "['filter-input',{'hide':!(is_focus && filterable)}]" ref = "filter-input" v-model = "filter_keyword"/>
            </div>
            <!-- show selected item / type filter_keyword part end-->

            <!-- suffix part -->
            <div :class = "[
                'suffix-wrapper',
            ]">
                <!-- clear icon part -->
                <img src = "@/assets/icons/input_clear_icon.svg" 
                :class = "[
                    'clear-icon',
                    {'hide': !show_clear_icon}
                ]"
                @click="handleClearValue"/>
                <!-- clear icon part end -->
                <slot name = "suffix">
                    <!-- default dropdown arrow part  -->
                    <img :src = "default_dropdown_arrow_src" 
                    :class = "[
                        'default-suffix-pic',
                        'rotate-0',
                        {'rotate-180':is_focus && !disabled},
                    ]"/>
                    <!-- default dropdown arrow part end -->
                </slot>
            </div>
            <!-- suffix part end -->

            <!--selector dropdown part -->
            <div v-if = "is_focus" class = "single-selector-dropdown" ref = "single-selector-dropdown">
                <div v-if = "options_shown && options_shown.length>0" class = "options-list">
                    <div 
                    v-for="item in options_shown"
                    :key="item.value"
                    :class = "[
                        'dropdown-item',
                        {'selected':checkWhetherIsSelected(item)}
                    ]"
                    @click = "handleSelectOption(item)">
                        {{ item.label }}
                    </div>
                </div>
                <div v-else class = 'no-data-notes'>
                    {{ is_loading ? loading_text : no_data_text}}
                </div>
            </div>
            <!--selector dropdown part end -->
        </div>

        <!-- message notification part -->
        <div v-if = "(show_alert || show_error) && message_notification_text" 
        :class = "[
            'message-container',
            {'error': show_error},
            {'alert':show_alert}
        ]">
            {{ message_notification_text }}
        </div>
        <!-- message notification part end -->
    </div>
</template>

<script>
import dark_gray_arrow_down from "@/assets/icons/dark_gray_arrow_down.svg";
import black_arrow_down from '@/assets/icons/black_arrow_down.svg'
export default{
    props:{
        modelValue:{
            type: String,
            default:''
        },
        options:{
            type:Array,
            default:()=>[],
        },
        filterable:{
            type:Boolean,
            default:false,
        },
        remote_search:{
            type:Boolean,
            default:false,
        },
        disabled:{
            type:Boolean,
            default:false,
        },
        placeholder:{
            type:String,
            default:'Select',
        },
        clearable:{
            type:Boolean,
            default:false,
        },
        loading:{
            type:Boolean,
            default:false,
        },
        loading_text:{
            type:String,
            default:"Loading",
        },
        no_data_text:{
            type:String,
            default:"No data",
        }
    },
    mounted(){
        document.addEventListener('click', (e)=>this.closeWhenClickOutsideSelector(e));
    },
    unmounted(){
        document.removeEventListener('click', (e)=>this.closeWhenClickOutsideSelector(e));
    },
    data(){
        return {
            selected_item: this.modelValue,
            selected_item_label: this.findCorrespondingLabelViaValue(this.modelValue),
            filter_keyword:'',
            is_focus:false,
            hovered:false,
            show_error:false,
            show_alert:false,
            message_notification_text:'',
            is_loading:this.loading,
        }
    },
    computed:{
        default_dropdown_arrow_src(){
            return this.disabled ? dark_gray_arrow_down : black_arrow_down;
        },
        options_shown(){
            //if not remote_search: directly filter options according to filter_keyword
            if(!this.remote_search){
                //if has filter_keyword: directly filter here.
                if(this.filter_keyword){
                    return this.options.filter((item)=>{
                        //return true, if the option's value or label includes the filter_keyword
                        return JSON.stringify(item.value).toLowerCase().includes(this.filter_keyword.toLowerCase())
                        ||
                        JSON.stringify(item.label).toLowerCase().includes(this.filter_keyword.toLowerCase());
                    });
                }else{
                //if no filter_keyword: directly return this.options
                    return this.options;
                }
            }else{
            //if use remote_search: users will filter options outside the component via @remote-search
            //so directly return this.options;
                return this.options;
            }
        },
        show_clear_icon(){
            //both pre-requisite: clearable and has a selected_item and not disabled
            //for web and non-web: focus/hover show clear icon 
            //(but no hover effect for non-web(tablet and mobile), so ingore hover for non-web version)
            return this.clearable && this.selected_item && !this.disabled && (this.hovered || this.is_focus);
            // return this.clearable && this.selected_item && !this.disabled && ((this.web_version && this.hovered) || !this.web_version);
        }
    },
    emits:[
        'update:modelValue',
        'change',
        'remote-search',
        'filter-change',
        'visible-change',
        'focus',
        'blur',
        'clear',
    ],
    watch:{
        modelValue(newVal){
            // console.log('single selector modelValue change', newVal);
            this.selected_item = newVal;
        },
        selected_item(newVal){
            // console.log('single selector value change', newVal);
            this.$emit('update:modelValue', newVal);
            this.$emit('change', newVal);
            this.selected_item_label = this.findCorrespondingLabelViaValue(newVal);
            this.filter_keyword = '';
        },
        filter_keyword(newVal){
            this.$emit('filter-change', newVal);
            if(this.remote_search){
                this.$emit('remote-search', newVal);
            }
        },
        is_focus(newVal){
            // console.log('is_focus change', newVal);
            //pass dropdown visibility to parent
            this.$emit('visible-change', newVal);
            //pass focus and blur event to parent
            if(newVal){
                this.$emit('focus');
                if(this.filterable){
                    this.$nextTick(()=>{
                        this.$refs['filter-input']?.focus();
                    })
                }
                //check overflow to set padding
                this.$nextTick(()=>{
                    this.checkWhetherDropdownIsOverflow();
                })
                
            }else{
                this.$emit('blur');
            }
        },
        loading(newVal){
            this.is_loading = newVal;
        }
    },
    methods:{
        checkWhetherDropdownIsOverflow(){
            if(this.$refs['single-selector-dropdown'].scrollHeight > this.$refs['single-selector-dropdown'].clientHeight){
                this.$refs['single-selector-dropdown'].style.padding = "8px 1px 8px 8px";
            }else{
                this.$refs['single-selector-dropdown'].style.padding = "8px";
            }
        },
        findCorrespondingLabelViaValue(value){
            //if not find the corresponding label, return the value itself
            var output = value;
            for(const item of this.options){
                if(item.value == value){
                    output = item.label;
                }
                // console.log('item.value == value',item, value, item.value == value);
            }
            return output;
        },
        handleClickSingleSelector(){
            // console.log('handleClickSingleSelector');
            if(!this.disabled){
                this.is_focus=!this.is_focus;
            }
        },
        handleSelectOption(item){
            this.selected_item = item.value;
            this.selected_item_label = item.label;
            //blur after select
            this.is_focus = false;
        },
        closeWhenClickOutsideSelector(e){
            // console.log('closeWhenClickOutsideSelector', e.target,this.$refs['single-selector'].contains(e.target));
            // const normalizedTarget = e.target.nodeType === Node.TEXT_NODE ? e.target.parentElement : e.target;
            if(this.is_focus && !this.$refs['single-selector'].contains(e.target)) {
                this.is_focus = false;
            }
        },
        checkWhetherIsSelected(item){
            if(item.value == this.selected_item){
                return true;
            }
        },
        handleClearValue(e){
            e.stopPropagation();
            this.selected_item = "";
            this.$emit('clear');
        },
        // Define a method you want to expose
        focus(){
            //focus selector manually
            //if has filter feature: auto focus filter input as well
            if(!this.disabled){
                if(this.filterable){
                    this.$refs['filter-input']?.focus();
                }
                this.is_focus = true;
            }
        },
        blur(){
            //blur selector manually
            //if has filter feature: auto blur filter input as well
            if(this.filterable){
                this.$refs['filter-input']?.blur();
            }
            this.is_focus = false;
        },
        alert(message){
            //close all other notification type: set all other notification type to be false
            this.show_error = false;
            //tell component the current notification type is error
            this.show_alert = true;
            this.message_notification_text = message;
        },
        error(message){
            //close all other notification type: set all other notification type to be false
            this.show_alert = false;
            //tell component the current notification type is error
            this.show_error = true;
            this.message_notification_text = message;
        },
        removeAlertOrErrorEffect(){
            this.show_alert = false;
            this.show_error = false;
            this.message_notification_text = '';
        },
        setDropdownContentLoading(val){
            this.is_loading = val;
        },
    },
    expose:['focus','blur','alert','error','removeAlertOrErrorEffect','setDropdownContentLoading'],
}
</script>

<style scoped>
.single-selector-unit-wrapper{
    width: 100%;
    display: flex;
    flex-direction: column;
    row-gap: 8px;
}
.single-selector{
    height:fit-content;
    width:100%;
    box-sizing: border-box;
    padding:9px 12px 9px 16px;

    display: flex;
    align-items: center;
    justify-content: space-between;
    column-gap: 12px;

    border-radius: 4px;
    /* border: 1px solid #BCCCDC; */
    box-shadow: inset 0 0 0 1px #BCCCDC;
    /* use box-shadow instead of border, as border will occupy 2px spaces to cause dropdown is 2px less wide than the input */
    background: #FFF;
    cursor: pointer;

    position: relative;
}
.single-selector:hover{
    /* border: 1px solid #DEE6ED; */
    box-shadow: inset 0 0 0 1px #DEE6ED;
    /* use box-shadow instead of border, as border will occupy 2px spaces to cause dropdown is 2px less wide than the input */
}
.single-selector.has-prefix{
    padding-left: 12px;
}
.single-selector.is-focus{
    /* border: 1px solid #9BB2CA; */
    box-shadow: inset 0 0 0 1px #9BB2CA;
    /* use box-shadow instead of border, as border will occupy 2px spaces to cause dropdown is 2px less wide than the input */
}
.single-selector.error{
    box-shadow: inset 0 0 0 1px #DE583F;
}
.single-selector.alert{
    box-shadow: inset 0 0 0 1px #E0961E;
}
.single-selector.disabled{
    background: #F2F2F2;
    cursor: not-allowed;
}
.single-selector.disabled:hover{
    box-shadow: inset 0 0 0 1px #BCCCDC;
}
.selected-content{
    /* width:100%; */
    flex: 1;
    font-family: 'Roboto';
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0.5px;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.hide{
    display: none;
}
.content-text{
    color: #1C1B1F;
}
.placeholder{
    color: #979797;
}
.single-selector.disabled .content-text,
.single-selector.disabled .placeholder{
    color:#555555;
}
.filter-input {
    width:100%;
    border: none;
    outline: none; /* Removes the default focus outline */
    color: #1C1B1F;
    font-family: 'Roboto';
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0.5px;
    height: 24px;
    padding:0px;
}
.default-suffix-pic{
    width: 100%;
    height:100%;
}
.prefix-wrapper{
    display: flex;
    align-items: center;
    column-gap:4px;
    flex-shrink:0;
    min-width: 24px;
    width:fit-content;
    height:24px;
}
.suffix-wrapper{
    display: flex;
    align-items: center;
    column-gap:4px;
    flex-shrink:0;
    min-width: 24px;
    width:fit-content;
    height:24px;
}
.rotate-0{
    transform: rotate(0deg);
    transition: all 0.3s;
}
.rotate-180{
    transform: rotate(180deg);
}
.clear-icon{
    width: 20px;
    height: 20px;
    opacity: 0.7;
    cursor: pointer;
}
.clear-icon:hover{
    opacity: 1;
}
.single-selector-dropdown{
    width: inherit;
    height: fit-content;
    max-height: 233px;
    padding:8px;
    box-sizing: border-box;

    border-radius: 4px;
    border: 1px solid #BCCCDC;
    background: #FFF;
    overflow: auto;

    position: absolute;
    z-index: 1000;
    top:50px;
    left:0px;
}
.single-selector-dropdown::-webkit-scrollbar{
    width:8px;
}
.single-selector-dropdown::-webkit-scrollbar-track{
    border-radius: 10px;
    background-color: transparent;
}
.single-selector-dropdown::-webkit-scrollbar-thumb{
    background-color: transparent;
}
.single-selector-dropdown:hover::-webkit-scrollbar-thumb{
    border-radius: 10px;
    border: 2px solid #FFFFFF;
    background-color: #c4c4c4;
}
.single-selector-dropdown:hover::-webkit-scrollbar-thumb:hover{
    border-radius: 10px;
    border: 2px solid #FFFFFF;
    background-color: #A8A8A8;
}
.no-data-notes{
    width: 100%;
    box-sizing: border-box;
    padding:12px 8px;
    border-radius: 4px;

    color: #979797;
    font-family: 'Roboto';
    font-size: 16px;
    font-weight: 500;
    line-height: 19px;
    text-align: center;
}
.dropdown-item{
    width: 100%;
    box-sizing: border-box;
    padding:12px 8px;
    border-radius: 4px;

    color: #1C1B1F;
    font-family: 'Roboto';
    font-size: 16px;
    font-weight: 400;
    line-height: 19px;
}
.dropdown-item:hover{
    background: #FAEBE6;
}
.dropdown-item.selected{
    font-weight: 600;
}
.message-container{
    width:100%;
    box-sizing: border-box;

    font-family: 'Roboto';
    font-size: 16px;
    font-weight: 400;
    line-height: 19px;
}
.message-container.error{
    color: #DE583F;
}
.message-container.alert{
    color: #E0961E;
}
@media only screen and (max-width:1024px){
    .single-selector-dropdown::-webkit-scrollbar-thumb{
        border-radius: 10px;
        border: 2px solid #FFFFFF;
        background-color: #c4c4c4;
    }
}
@media only screen and (max-width:767px){
    .single-selector-unit-wrapper{
        row-gap: 4px;
    }
    .single-selector{
        column-gap: 8px;
        padding:8px 12px 8px 14px;
    }
    .selected-content{
        font-size: 14px;
        line-height: 20px; 
        letter-spacing: 0.25px;
    }
    .filter-input {
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
        letter-spacing: 0.25px;
        height:20px;
    }
    .prefix-wrapper,
    .suffix-wrapper{
        min-width: 20px;
        height:20px;
        display: flex;
        align-items: center;
        column-gap:0px;
        flex-shrink:0;
    }
    .clear-icon{
        width: 36px;
        height: 36px;
        right: 32px;
        box-sizing: border-box;
        padding:10px;
    }
    .single-selector-dropdown{
        max-height: 176px;
        padding:7px;
        
        top:40px;
    }
    .no-data-notes{
        font-size: 14px;
        line-height: 20px;
        letter-spacing: 0.25px;
    }
    .dropdown-item{
        padding:6px 4px;

        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
        letter-spacing: 0.25px;
    }
    .message-container{
        font-size: 14px;
        line-height: 16px;
    }
}
</style>