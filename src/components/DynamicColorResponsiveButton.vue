<template>
    <div :class = "[
        'dynamic-color-responsive-button-container',
        {'has-interaction-effect': has_interaction_effect},
        size,
        {'disabled':disabled},
        button_type,
        customized_class,
        is_icon_button ? 'icon-button' : width_type,
        {'narrow': is_icon_button && width_type === 'narrow'},
        {'wide': is_icon_button && width_type === 'wide'}
    ]"
    :style = "{
        '--button-background-color--': toHslString(button_background_color_hsl_obj),
        '--button-text-color--': toHslString(button_text_color_hsl_obj),
        '--button-border-color--': toHslString(button_border_color_hsl_obj, { modern: true }),
        '--button-border-radius--': button_border_radius
    }">
        <div :class = "['dynamic-color-responsive-button', {'focus': is_focused}]" 
        @click = "handleClickButton">
            <div class = "dynamic-color-responsive-button-content">
                <div v-if = "$slots.prefix || prefix || prefix_slot_raw_html_content" class="prefix-wrapper" ref="prefix_wrapper">
                    <slot name="prefix">
                        <div class="prefix-raw-html-slot" v-if = "prefix_slot_raw_html_content" v-html = "prefix_slot_raw_html_content"></div>
                        <img v-else :src = "prefix"/>
                    </slot>
                </div>
                <div v-if = "$slots.default || display_name" class = "button-name-wrapper" ref="button_name_wrapper">
                    <slot>
                        <div v-if = "display_name">{{ display_name }}</div>
                    </slot>
                </div>
                <div v-if="$slots.suffix || suffix || suffix_slot_raw_html_content" class="suffix-wrapper" ref="suffix_wrapper">
                    <slot name = "suffix">
                        <div class="suffix-raw-html-slot" v-if = "suffix_slot_raw_html_content" v-html = "suffix_slot_raw_html_content"></div>
                        <img v-else :src = "suffix"/>
                    </slot>
                </div>
            </div>   
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { parseColorToHsl, toHslString } from '@/utils/colorConvention.js';

const props = defineProps({
    has_interaction_effect:{
        type: Boolean,
        default: true
    },
    button_type:{
        type: String,
        // ENUM: filled, outlined, text, elevated
        // 1. filled:
        // Dynamic Color Rules:
        // Theme Color is used as the background color of the button.
        // If the background color in HSL format has a third percentage<=50%(eg. HSL((217, 90%, 30%)), the color of the label, the icon, and the mask of the interaction effect will be HSL(217, 90%, 30%+60%)=>HSL(217, 90%, 90%)
        // If the background color in HSL format has a third percentage> 50%(eg. HSL((217, 90%, 70%)), the color of the label, the icon, and the mask of the interaction effect will be HSL(217, 90%, 70%-60%)=>HSL(217, 90%, 10%)
        // If the calculated HSL's third percentage >= 100%: directly use HSL(0, 0%, 100%)
        // If the calculated HSL's third percentage >= 0%: directly use HSL(0, 0%, 0%)
        // The mask's opacity will be 8%-hover, 10%-focus, 16%-pressed.
        // 2. outlined:
        // Dynamic Color Rules:
        // Theme color is the text/label/icon color of the button.
        // If the theme color, eg. HSL((217, 90%, 30%), the color of the border and the mask of the interaction effect will be HSL(217, 90%, 30%+50%)=>HSL(217, 90%, 80%).
        // If the calculated HSL's third percentage >= 100%: directly use HSL(0, 0%, 100%)
        // The mask's opacity will be 8%-hover, 10%-focus, 16%-pressed.
        // 3. text:
        // Dynamic Color Rules:
        // Theme color is the color of the text/label/icon and the mask of the interaction effect of the button.
        // The background and the border is the transparent.
        // The mask's opacity will be 8%-hover, 10%-focus, 16%-pressed.
        // 4. elevated:
        // NO Dynamic Color Rules. Hardcode as design
        default: 'filled'
    },
    button_border_radius:{
        type: String,
        // any valid css border-radius value
        default: '100px'
    },
    built_in_theme:{
        type: String,
        // ENUM: primary, secondary, tertiary, primary-container, secondary-container, tertiary-container
        default: 'primary'
    },
    customized_theme_color:{
        type: String,
        default: ''
    },
    customized_class:{
        type: String,
        default: ''
    },
    width_type:{
        type: String,
        // ENUM: fill-whole, fit-content, narrow, wide
        // NOTES: 
        // 1. fill-whole: the width of the button will be the width of the parent container
        // 2. fit-content: the width of the button will be the width of the content
        // 3. narrow: ONLY for icon button, the width of the button will be the narrowest possible
        // 4. wide: ONLY for icon button, the width of the button will be the widest possible
        // ICON BUTTON is the button that only has one icon (either prefix or suffix) and no text
        default: 'fit-content'
    },
    button_id:{
        type: String,
        // If no button_id is provided, consider display_name as the button_id
        default: ''
    },
    display_name:{
        type: String,
        default: ''
    },
    prefix:{
        type: String,
        default: ''
    },
    suffix:{
        type: String,
        default: ''
    },
    prefix_slot_raw_html_content:{
        type: String,
        default: ''
    },
    suffix_slot_raw_html_content:{
        type: String,
        default: ''
    },
    disabled:{
        type: Boolean,
        default: false
    },
    size:{
        type: String,
        // ENUM: small, medium, large, xlarge
        // NOTES: the ENUM is the size of the button in web version, we apply responsive rules to make it automatically adapt to mobile version
        // Responsive Rules: 
        // Web small (figma size) -> Mobile xsmall (figma size)
        // Web medium (figma size) -> Mobile small (figma size)
        // Web large (figma size) -> Mobile medium (figma size)
        // Web xlarge (figma size) -> Mobile large (figma size)
        default: 'small'
    },
});
const emit = defineEmits(['click-button']);

const prefix_wrapper = ref(null);
const button_name_wrapper = ref(null);
const suffix_wrapper = ref(null);
const is_focused = ref(false);

const is_icon_button = computed(() => {
    //if only have one icon (either prefix or suffix) and no text, then it is an icon button
    return !button_name_wrapper.value && ((prefix_wrapper.value && !suffix_wrapper.value) || (!prefix_wrapper.value && suffix_wrapper.value));
});
const button_background_color_hsl_obj = computed(() => {
    if(props.disabled){
        return is_icon_button.value 
        ?  {
            h:0,
            s:0,
            l:0,
            a:0
        }
        : parseColorToHsl('var(--disabled-button-background-color--)');
    }
    if(props.button_type === 'elevated'){
    // elevated button has a fixed color
        return {
            h: 226,
            s: 8,
            l: 96,
            a: 100
        };
    }else if(props.button_type === 'text' || props.button_type === 'outlined'){
    // text button and outlined button has a transparent background
    // NOTES: the customized theme color will be used as the text color for text button and outlined button
        return {
            h:0,
            s:0,
            l:0,
            a:0
        };
    }else if(props.customized_theme_color){
    // if not text button or outlined button, and customized theme color is provided, use it.
    // NOTES: the customized theme color will be used as the background color of the button
        try{
            return parseColorToHsl(props.customized_theme_color);
        }catch(e){
            console.warn(e?.message ?? 'customized theme color is invalid');
        }
    }
    // if not elevated button, text button or outlined button, and customized theme color is not provided, use the built-in theme color
    switch (props.built_in_theme) {
        case 'primary':
            return parseColorToHsl('var(--Schemes-primary)');
        case 'secondary':
            return parseColorToHsl('var(--Schemes-Secondary)');
        case 'tertiary':
            return parseColorToHsl('var(--Schemes-Tertiary)');
        case 'primary-container':
            return parseColorToHsl('var(--Schemes-Primary-Container)');
        case 'secondary-container':
            return parseColorToHsl('var(--Schemes-Secondary-Container)');
        case 'tertiary-container':
            return parseColorToHsl('var(--Schemes-Tertiary-Container)');
        default:
            return parseColorToHsl('var(--Schemes-primary)');
    }
});
const button_text_color_hsl_obj = computed(() => {
    if(props.disabled){
        return parseColorToHsl('var(--disabled-color--)');
    }

    if(props.button_type === 'elevated'){
    // elevated button has a fixed color
        return parseColorToHsl('var(--Schemes-primary)');
    }else if(props.button_type === 'text' || props.button_type === 'outlined'){
    // text button and outlined button use the customized theme color or built_in_theme as the text color
        if(props.customized_theme_color){
            try{
                return parseColorToHsl(props.customized_theme_color);
            }catch(e){
                console.warn(e?.message ?? 'customized theme color is invalid');
            }
        }
        switch (props.built_in_theme) {
            case 'primary':
                return parseColorToHsl('var(--Schemes-primary)');
            case 'secondary':
                return parseColorToHsl('var(--Schemes-Secondary)');
            case 'tertiary':
                return parseColorToHsl('var(--Schemes-Tertiary)');
            case 'primary-container':
                return parseColorToHsl('var(--Schemes-Primary-Container)');
            case 'secondary-container':
                return parseColorToHsl('var(--Schemes-Secondary-Container)');
            case 'tertiary-container':
                return parseColorToHsl('var(--Schemes-Tertiary-Container)');
            default:
                return parseColorToHsl('var(--Schemes-primary)');
        }
    }
    // if not elevated/text/outlined button (eg. filled_button), use the dynamic color calculation
    if(button_background_color_hsl_obj.value.l > 50){
        const l = button_background_color_hsl_obj.value.l - 60;
        return l <= 0 ?{
            h: 0,
            s: 0,
            l: 0,
            a: button_background_color_hsl_obj.value.a
        }:{
            h: button_background_color_hsl_obj.value.h,
            s: button_background_color_hsl_obj.value.s,
            l: l,
            a: button_background_color_hsl_obj.value.a
        }
    }else{
        const l = button_background_color_hsl_obj.value.l + 60;
        return l >= 100 ?{
            h: 0,
            s: 0,
            l: 100,
            a: button_background_color_hsl_obj.value.a
        }:{
            h: button_background_color_hsl_obj.value.h,
            s: button_background_color_hsl_obj.value.s,
            l: l,
            a: button_background_color_hsl_obj.value.a
        }
    }
});
const button_border_color_hsl_obj = computed(() => {
    if(props.button_type == 'outlined'){
        if (props.disabled) {
            return{
                h: 220,
                s: 12,
                l: 80,
                a: 1
            };
        }
        if(button_text_color_hsl_obj.value.l > 50){
            const l = button_text_color_hsl_obj.value.l - 50;
            return l <= 0 ?{
                h: 0,
                s: 0,
                l: 0,
                a: button_text_color_hsl_obj.value.a
            }:{
                h: button_text_color_hsl_obj.value.h,
                s: button_text_color_hsl_obj.value.s,
                l: l,
                a: button_text_color_hsl_obj.value.a
            }
        }else{
            const l = button_text_color_hsl_obj.value.l + 50;
            return l >= 100 ?{
                h: 0,
                s: 0,
                l: 100,
                a: button_text_color_hsl_obj.value.a
            }:{
                h: button_text_color_hsl_obj.value.h,
                s: button_text_color_hsl_obj.value.s,
                l: l,
                a: button_text_color_hsl_obj.value.a
            }
        }
    }
    if(props.button_type == 'elevated'){
        return {
            h: 0,
            s: 0,
            l: 0,
            a: 0
        }
    }
    return button_background_color_hsl_obj.value;
});


const handleClickButton = () => {
    if(!props.disabled){
        emit('click-button', props.button_id ? props.button_id : props.display_name, props.display_name);
    }
}

const handleFocusButton = () => {
    is_focused.value = true;
}
const handleBlurButton = () => {
    is_focused.value = false;
}

defineExpose({
    handleFocusButton,
    handleBlurButton
})
</script>

<style scoped>
.dynamic-color-responsive-button-container.fit-content{
   width: fit-content;
}
.dynamic-color-responsive-button-container.fill-whole{
   width: 100%;
}
.dynamic-color-responsive-button-container.icon-button{
    width: fit-content;
    min-width: 44px;
}

.fill-whole .dynamic-color-responsive-button,
.icon-button .dynamic-color-responsive-button{
    width: 100%;
}
.fit-content .dynamic-color-responsive-button{
    width: fit-content;
}
.dynamic-color-responsive-button{
    box-sizing: border-box;
    height: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}
.disabled .dynamic-color-responsive-button{
    cursor: not-allowed;
}
.small .dynamic-color-responsive-button{
    min-height: 44px;
    padding: 2px 0px;
}
.medium .dynamic-color-responsive-button{
    min-height: 44px;
}
.large .dynamic-color-responsive-button{
    min-height: 56px;
}
.xlarge .dynamic-color-responsive-button{
    min-height: 96px;
}

.fit-content .dynamic-color-responsive-button-content,
.icon-button .dynamic-color-responsive-button-content{
    width: fit-content;
}
.fill-whole .dynamic-color-responsive-button-content{
    width: 100%;
}
.dynamic-color-responsive-button-content{
    display: flex;
    align-items: center;
    justify-content: center;

    background: var(--button-background-color--);
    color: var(--button-text-color--);
    border-radius: var(--button-border-radius--);
    border-style: solid;
    border-color: var(--button-border-color--);

    transition: all 0.2s ease-in-out;
}
.elevated .dynamic-color-responsive-button-content{
    box-shadow: 0 4px 8px 3px rgba(0, 0, 0, 0.15), 0 1px 3px 0 rgba(0, 0, 0, 0.30);
}

.disabled .dynamic-color-responsive-button-content,
.disabled .dynamic-color-responsive-button:hover .dynamic-color-responsive-button-content,
.disabled .dynamic-color-responsive-button.focus .dynamic-color-responsive-button-content,
.disabled .dynamic-color-responsive-button:active .dynamic-color-responsive-button-content{
    background: var(--button-background-color--) !important;
    border-radius: var(--button-border-radius--) !important;
}

.has-interaction-effect .dynamic-color-responsive-button:hover .dynamic-color-responsive-button-content{
    background: color-mix(in srgb, var(--button-background-color--), var(--button-text-color--) 8%);
}
.has-interaction-effect .dynamic-color-responsive-button.focus .dynamic-color-responsive-button-content{
    background: color-mix(in srgb, var(--button-background-color--), var(--button-text-color--) 10%);
}
.has-interaction-effect .dynamic-color-responsive-button:active .dynamic-color-responsive-button-content{
    background: color-mix(in srgb, var(--button-background-color--), var(--button-text-color--) 16%);
}

.small.has-interaction-effect .dynamic-color-responsive-button:active .dynamic-color-responsive-button-content{
    border-radius: 8px;
}
.medium.has-interaction-effect .dynamic-color-responsive-button:active .dynamic-color-responsive-button-content{
    border-radius: 12px;
}
.large.has-interaction-effect .dynamic-color-responsive-button:active .dynamic-color-responsive-button-content,
.xlarge.has-interaction-effect .dynamic-color-responsive-button:active .dynamic-color-responsive-button-content{
    border-radius: 16px;
}

/* normal button .dynamic-color-responsive-button-content*/
.small .dynamic-color-responsive-button-content{
    border-width: 1px;
    padding: 9px 13px;
    column-gap: 8px;
}
.medium .dynamic-color-responsive-button-content{
    border-width: 1px;
    padding: 9px 13px;
    column-gap: 8px;
}
.large .dynamic-color-responsive-button-content{
    border-width: 2px;
    padding: 14px 22px;
    column-gap: 12px;
}
.xlarge .dynamic-color-responsive-button-content{
    border-width: 2px;
    padding: 30px 46px;
    column-gap: 16px;
}
/* default icon button .dynamic-color-responsive-button-content*/
.small.icon-button .dynamic-color-responsive-button-content{
    padding-top: 7px;
    padding-bottom: 7px;
    padding-left: 7px;
    padding-right: 7px;
}
.medium.icon-button .dynamic-color-responsive-button-content{
    padding-top: 9px;
    padding-bottom: 9px;
    padding-left: 9px;
    padding-right: 9px;
}
.large.icon-button .dynamic-color-responsive-button-content{
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 10px;
    padding-right: 10px;
}
.xlarge.icon-button .dynamic-color-responsive-button-content{
    padding-top: 26px;
    padding-bottom: 26px;
    padding-left: 26px;
    padding-right: 26px;
}
/* narrow icon button .dynamic-color-responsive-button-content*/
.small.icon-button.narrow .dynamic-color-responsive-button-content{
    padding-left: 3px;
    padding-right: 3px;
}
.medium.icon-button.narrow .dynamic-color-responsive-button-content{
    padding-left: 5px;
    padding-right: 5px;
}
.large.icon-button.narrow .dynamic-color-responsive-button-content{
    padding-left: 6px;
    padding-right: 6px;
}
.xlarge.icon-button.narrow .dynamic-color-responsive-button-content{
    padding-left: 10px;
    padding-right: 10px;
}
/* wide icon button .dynamic-color-responsive-button-content*/
.small.icon-button.wide .dynamic-color-responsive-button-content{
    padding-left: 13px;
    padding-right: 13px;
}
.medium.icon-button.wide .dynamic-color-responsive-button-content{
    padding-left: 15px;
    padding-right: 15px;
}
.large.icon-button.wide .dynamic-color-responsive-button-content{
    padding-left: 18px;
    padding-right: 18px;
}
.xlarge.icon-button.wide .dynamic-color-responsive-button-content{
    padding-left: 42%;
    padding-right: 42px;
}

.prefix-raw-html-slot,
.suffix-raw-html-slot{
    width: 100%;
    height: 100%;
}
/* prefix and suffix wrapper */
/* Note: slotted content (like inline <svg>) isn't affected by scoped CSS selectors
   unless you use :deep(). These rules ensure icons fill the wrapper size. */
:deep(.prefix-wrapper > svg),
:deep(.suffix-wrapper > svg),
:deep(.prefix-raw-html-slot > svg),
:deep(.suffix-raw-html-slot > svg),
:deep(.prefix-wrapper > img),
:deep(.suffix-wrapper > img),
:deep(.prefix-raw-html-slot > img),
:deep(.suffix-raw-html-slot > img){
    width: 100%;
    height: 100%;
}

.small .prefix-wrapper,
.small .suffix-wrapper{
    width: 20px;
    height: 20px;
    padding:1.67px;
    box-sizing: border-box;
}
.small.icon-button .prefix-wrapper,
.small.icon-button .suffix-wrapper{
    width: 24px;
    height: 24px;
    padding: 2px;
    box-sizing: border-box;
}
.medium .prefix-wrapper,
.medium .suffix-wrapper{
    width: 24px;
    height: 24px;
    padding: 2px;
    box-sizing: border-box;
}
.medium.icon-button .prefix-wrapper,
.medium.icon-button .suffix-wrapper{
    width: 24px;
    height: 24px;
    padding: 2px;
    box-sizing: border-box;
}
.large .prefix-wrapper,
.large .suffix-wrapper{
    width: 24px;
    height: 24px;
    padding: 2px;
    box-sizing: border-box;
}
.large.icon-button .prefix-wrapper,
.large.icon-button .suffix-wrapper{
    width: 32px;
    height: 32px;
    padding: 2.67px;
    box-sizing: border-box;
}
.xlarge .prefix-wrapper,
.xlarge .suffix-wrapper{
    width: 32px;
    height: 32px;
    padding: 2.67px;
    box-sizing: border-box;
}
.xlarge.icon-button .prefix-wrapper,
.xlarge.icon-button .suffix-wrapper{
    width: 40px;
    height: 40px;
    padding: 3.33px;
    box-sizing: border-box;
}

.button-name-wrapper{
    color: var(--button-text-color--);
    font-family: 'Roboto';
    font-style: normal;
}
.small .button-name-wrapper{
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    letter-spacing: 0.1px;
}
.medium .button-name-wrapper{
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: 0.15px;
}
.large .button-name-wrapper{
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: 0.15px;
}
.xlarge .button-name-wrapper{
    font-size: 24px;
    font-weight: 400;
    line-height: 32px;
    letter-spacing: 0;
}
.fit-content .dynamic-color-responsive-button-content .button-name-wrapper{
    white-space: nowrap;
}
.fill-whole .dynamic-color-responsive-button-content .button-name-wrapper{
    white-space: wrap;
}

@media only screen and (max-width: 767px){
    .small .dynamic-color-responsive-button{
        min-height: 44px;
        padding: 4px 0px;
    }
    .medium .dynamic-color-responsive-button{
        min-height: 44px;
        padding: 2px 0px;
    }
    .large .dynamic-color-responsive-button{
        min-height: 44px;
    }
    .xlarge .dynamic-color-responsive-button{
        min-height: 56px;
    }

    .small.has-interaction-effect .dynamic-color-responsive-button:active .dynamic-color-responsive-button-content,
    .medium.has-interaction-effect .dynamic-color-responsive-button:active .dynamic-color-responsive-button-content{
        border-radius: 8px;
    }
    .large.has-interaction-effect .dynamic-color-responsive-button:active .dynamic-color-responsive-button-content{
        border-radius: 12px;
    }
    .xlarge.has-interaction-effect .dynamic-color-responsive-button:active .dynamic-color-responsive-button-content{
        border-radius: 16px;
    }

    /* normal button .dynamic-color-responsive-button-content*/
    .small .dynamic-color-responsive-button-content{
        border-width: 1px;
        padding: 7px 11px;
        column-gap: 4px;
    }
    .medium .dynamic-color-responsive-button-content{
        border-width: 1px;
        padding: 9px 13px;
        column-gap: 8px;
    }
    .large .dynamic-color-responsive-button-content{
        border-width: 1px;
        padding: 9px 13px;
        column-gap: 8px;
    }
    .xlarge .dynamic-color-responsive-button-content{
        border-width: 2px;
        padding: 14px 22px;
        column-gap: 12px;
    }
    /* default icon button .dynamic-color-responsive-button-content*/
    .small.icon-button .dynamic-color-responsive-button-content{
        padding-top: 7px;
        padding-bottom: 7px;
        padding-left: 7px;
        padding-right: 7px;
    }
    .medium.icon-button .dynamic-color-responsive-button-content{
        padding-top: 7px;
        padding-bottom: 7px;
        padding-left: 7px;
        padding-right: 7px;
    }
    .large.icon-button .dynamic-color-responsive-button-content{
        padding-top: 9px;
        padding-bottom: 9px;
        padding-left: 9px;
        padding-right: 9px;
    }
    .xlarge.icon-button .dynamic-color-responsive-button-content{
        padding-top: 10px;
        padding-bottom: 10px;
        padding-left: 10px;
        padding-right: 10px;
    }
    /* narrow icon button .dynamic-color-responsive-button-content*/
    .small.icon-button.narrow .dynamic-color-responsive-button-content{
        padding-left: 5px;
        padding-right: 5px;
    }
    .medium.icon-button.narrow .dynamic-color-responsive-button-content{
        padding-left: 3px;
        padding-right: 3px;
    }
    .large.icon-button.narrow .dynamic-color-responsive-button-content{
        padding-left: 5px;
        padding-right: 5px;
    }
    .xlarge.icon-button.narrow .dynamic-color-responsive-button-content{
        padding-left: 6px;
        padding-right: 6px;
    }
    /* wide icon button .dynamic-color-responsive-button-content*/
    .small.icon-button.wide .dynamic-color-responsive-button-content{
        padding-left: 11px;
        padding-right: 11px;
    }
    .medium.icon-button.wide .dynamic-color-responsive-button-content{
        padding-left: 13px;
        padding-right: 13px;
    }
    .large.icon-button.wide .dynamic-color-responsive-button-content{
        padding-left: 15px;
        padding-right: 15px;
    }
    .xlarge.icon-button.wide .dynamic-color-responsive-button-content{
        padding-left: 18px;
        padding-right: 18px;
    }

    .small .prefix-wrapper,
    .small .suffix-wrapper{
        width: 20px;
        height: 20px;
        padding: 1.67px;
        box-sizing: border-box;
    }
    .small.icon-button .prefix-wrapper,
    .small.icon-button .suffix-wrapper{
        width: 20px;
        height: 20px;
        padding: 1.67px;
        box-sizing: border-box;
    }
    .medium .prefix-wrapper,
    .medium .suffix-wrapper{
        width: 20px;
        height: 20px;
        padding: 1.67px;
        box-sizing: border-box;
    }
    .medium.icon-button .prefix-wrapper,
    .medium.icon-button .suffix-wrapper{
        width: 24px;
        height: 24px;
        padding: 2px;
        box-sizing: border-box;
    }
    .large .prefix-wrapper,
    .large .suffix-wrapper{
        width: 24px;
        height: 24px;
        padding: 2px;
        box-sizing: border-box;
    }
    .large.icon-button .prefix-wrapper,
    .large.icon-button .suffix-wrapper{
        width: 24px;
        height: 24px;
        padding: 2px;
        box-sizing: border-box;
    }
    .xlarge .prefix-wrapper,
    .xlarge .suffix-wrapper{
        width: 24px;
        height: 24px;
        padding: 2px;
        box-sizing: border-box;
    }
    .xlarge.icon-button .prefix-wrapper,
    .xlarge.icon-button .suffix-wrapper{
        width: 32px;
        height: 32px;
        padding: 2.67px;
        box-sizing: border-box;
    }

    .small .button-name-wrapper,
    .medium .button-name-wrapper{
        font-size: 14px;
        font-weight: 500;
        line-height: 20px;
        letter-spacing: 0.1px;
    }
    .large .button-name-wrapper{
        font-size: 16px;
        font-weight: 500;
        line-height: 24px;
        letter-spacing: 0.15px;
    }
    .xlarge .button-name-wrapper{
        font-size: 16px;
        font-weight: 500;
        line-height: 24px;
        letter-spacing: 0.15px;
    }
}

</style>