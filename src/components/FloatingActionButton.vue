<template>
    <!-- floating action button only shows in non-web version -->
    <div v-if="!is_web_version"
    :style = "{
        '--fab-button-background-color--': toHslString(button_background_color_hsl_obj),
        '--fab-button-text-color--': toHslString(button_text_color_hsl_obj),
        '--fab-menu-cross-button-background-color--': toHslString(menu_cross_button_background_color_hsl_obj),
        '--fab-menu-cross-button-text-color--': toHslString(menu_cross_button_text_color_rgb_obj),
        '--fab-menu-child-button-background-color--': toHslString(menu_child_button_background_color_hsl_obj),
        '--fab-menu-child-button-text-color--': toHslString(menu_child_button_text_color_rgb_obj)
    }"
    :class = "['floating-action-button-container', size, customized_class]">
        <div v-if = "!show_menu" :class = "['floating-action-button']" @click = "handleFloatingActionButtonClick">
            <div v-if = "$slots.prefix" :class = "['prefix']">
                <slot name = "prefix"></slot>
            </div>
            <slot>
                <div>{{ display_name }}</div>
            </slot>
            <div v-if = "$slots.suffix" :class = "['suffix']">
                <slot name = "suffix"></slot>
            </div>
        </div>

        <div v-if = "show_menu" :class = "['floating-action-button-menu']">
            <div v-for = "option in options" :key = "option.value" :class = "['floating-action-button-menu-item']" @click="handleOptionClick(option.value)">
                <div v-if = "option.prefix" :class = "['floating-action-button-menu-item-prefix']">
                    <img :src = "option.prefix" />
                </div>
                <div :class = "['floating-action-button-menu-item-label']">{{ option.label }}</div>
                <div v-if = "option.suffix" :class = "['floating-action-button-menu-item-suffix']">
                    <img :src = "option.suffix" />
                </div>
            </div>
            <div :class = "['menu-cross-button']" @click="show_menu = false">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M5.33073 15.8307L4.16406 14.6641L8.83073 9.9974L4.16406 5.33073L5.33073 4.16406L9.9974 8.83073L14.6641 4.16406L15.8307 5.33073L11.1641 9.9974L15.8307 14.6641L14.6641 15.8307L9.9974 11.1641L5.33073 15.8307Z" fill="currentColor"/>
                </svg>
            </div>
        </div>
    </div>
    
</template>

<script setup>
import { ref, computed } from 'vue';
import { useWindowSize } from '@/composables/useWindowSize.js';
import { parseColorToHsl, toHslString } from '@/utils/colorConvention.js';

const props = defineProps({
    display_name:{
        type: String,
        default: 'button'
    },
    size:{
        type: String,
        // ENUM: small, medium, large
        default: 'small'
    },
    build_in_theme:{
        type: String,
        // ENUM: primary, secondary, tertiary, primary-container, secondary-container, tertiary-container
        default: 'primary'
    },
    customized_theme_color:{
        // custom theme color, will override build_in_theme
        // Any valid CSS color value is accepted
        // e.g. 'hsl(217, 40%, 40%)', '#ff0000', 'rgb(255, 0, 0)', 'rgba(255, 0, 0, 0.5)', 'hsla(217, 40%, 40%, 0.5)'
        // If customized_theme_color is not provided, build_in_theme will be used
        // We use dynamic color calculation to calculate the color of the floating action button and all the other parts based on the customized_theme_color
        // If use customized_theme_color, the color will be directly used as the background color of the floating action button
        // and for the mask of the interaction effects and all the other part's color, e.g. text color, inline svg color, menu cross button color, menu child button color, etc., the color will be calculated based on the customized_theme_color
        type: String,
        default: ''
    },
    customized_class:{
        type: String,
        default: ''
    },
    options:{
        // options: [{
        //     value: string,
        //     label: string,
        //     prefix?: string,
        //     suffix?: string
        // }]
        // NOTES: ONLY support one level options, NOT support nested options
        type: Array,
        default: () => []
    }
})
const emit = defineEmits(['option-click', 'floating-action-button-click']);
const { width } = useWindowSize();
const show_menu = ref(false);

const is_web_version = computed(() => width.value > 1024);

const button_background_color_hsl_obj = computed(() => {
    if (props.customized_theme_color) {
        try{
            return parseColorToHsl(props.customized_theme_color);
        }catch(e){
            console.warn(e?.message ?? 'customized theme color is invalid');
        }
    }
    
    switch (props.build_in_theme) {
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
})
const button_text_color_hsl_obj = computed(() => {
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
const menu_cross_button_background_color_hsl_obj = computed(() => {
    return button_background_color_hsl_obj.value.l > 50 ? button_text_color_hsl_obj.value : button_background_color_hsl_obj.value;
});
const menu_cross_button_text_color_rgb_obj = computed(() => {
    return button_background_color_hsl_obj.value.l > 50 ? button_background_color_hsl_obj.value : button_text_color_hsl_obj.value;
});
const menu_child_button_background_color_hsl_obj = computed(() => {
    return {
        h: button_background_color_hsl_obj.value.h,
        s: button_background_color_hsl_obj.value.s,
        l: 90,
        a: button_background_color_hsl_obj.value.a
    }
});
const menu_child_button_text_color_rgb_obj = computed(() => {
    return {
        h: button_background_color_hsl_obj.value.h,
        s: button_background_color_hsl_obj.value.s,
        l: 30,
        a: button_background_color_hsl_obj.value.a
    }
});

const handleOptionClick = (value) => {
    emit('option-click', value);
}
const handleFloatingActionButtonClick = () => {
    if(props.options?.length > 0){
        show_menu.value = !show_menu.value;
    }
    emit('floating-action-button-click', );
}
    

</script>

<style scoped>
.floating-action-button-container{
    position: fixed;
    right: 16px;
    bottom: 16px;
    z-index: 999;
}
.floating-action-button{
    border-radius: var(--Corner-Large-increased, 20px);
    background: var(--fab-button-background-color--);
    box-shadow: 0 4px 8px 3px rgba(0, 0, 0, 0.15), 0 1px 3px 0 rgba(0, 0, 0, 0.30);
    box-sizing: border-box;

    display: flex;
    justify-content: center;
    align-items: center;
    
    color: var(--fab-button-text-color--);
    font-family: var(--Static-Title-Medium-Font, Roboto);
    font-style: normal;
    cursor: pointer;
}
.floating-action-button:hover{
    background: color-mix(in srgb, var(--fab-button-background-color--), var(--fab-button-text-color--) 8%);
}
.floating-action-button:active{
    background: color-mix(in srgb, var(--fab-button-background-color--), var(--fab-button-text-color--) 16%);
}
.small .floating-action-button{
    height: 56px;
    padding: 16px;

    column-gap: 8px;

    /* M3/title/medium */
    font-size: var(--Static-Title-Medium-Size, 16px);
    font-weight: 500;
    line-height: var(--Static-Title-Medium-Line-Height, 24px); /* 150% */
    letter-spacing: var(--Static-Title-Medium-Tracking, 0.15px);
}
.medium .floating-action-button{
    height: 80px;
    padding: 26px;

    column-gap: 12px;

    font-size: var(--Static-Title-Large-Size, 22px);
    font-weight: 400;
    line-height: var(--Static-Title-Large-Line-Height, 28px); /* 127.273% */
    letter-spacing: var(--Static-Title-Large-Tracking, 0);
}
.large .floating-action-button{
    height: 96px;
    padding: 30px;

    column-gap: 16px;

    font-size: var(--Static-Headline-Small-Size, 24px);
    font-weight: 400;
    line-height: var(--Static-Headline-Small-Line-Height, 32px); /* 133.333% */
    letter-spacing: var(--Static-Headline-Small-Tracking, 0);
}
.floating-action-button .prefix,
.floating-action-button .suffix{
    box-sizing: border-box;
}
/* prefix and suffix wrapper */
/* Note: slotted content (like inline <svg>) isn't affected by scoped CSS selectors
   unless you use :deep(). These rules ensure icons fill the wrapper size. */
:deep(.prefix > svg),
:deep(.suffix > svg){
    width: 100%;
    height: 100%;
}
:deep(.prefix > img),
:deep(.suffix > img){
    width: 100%;
    height: 100%;
}
.small .floating-action-button .prefix,
.small .floating-action-button .suffix{
    width: 24px;
    height: 24px;
    padding: 2px;
}
.medium .floating-action-button .prefix,
.medium .floating-action-button .suffix{
    width: 28px;
    height: 28px;
    padding: 2.33px;
}
.large .floating-action-button .prefix,
.large .floating-action-button .suffix{
    width: 36px;
    height: 36px;
    padding: 3px;
}
.floating-action-button-menu{
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    row-gap: 4px;
}
.floating-action-button-menu-item{
    height: 56px;
    padding: 16px 24px;
    box-sizing: border-box;

    display: flex;
    justify-content: center;
    align-items: center;

    column-gap: 8px;

    background: var(--fab-menu-child-button-background-color--);
    border-radius: var(--Corner-Extra-large, 28px);

    color: var(--fab-menu-child-button-text-color--);
    font-family: var(--Static-Title-Medium-Font, Roboto);
    font-size: var(--Static-Title-Medium-Size, 16px);
    font-style: normal;
    font-weight: 500;
    line-height: var(--Static-Title-Medium-Line-Height, 24px); /* 150% */
    letter-spacing: var(--Static-Title-Medium-Tracking, 0.15px);

    cursor: pointer;
}

.floating-action-button-menu-item:hover{
    background: color-mix(in srgb, var(--fab-menu-child-button-background-color--), var(--fab-menu-child-button-text-color--) 8%);
}

.floating-action-button-menu-item:active{
    background: color-mix(in srgb, var(--fab-menu-child-button-background-color--), var(--fab-menu-child-button-text-color--) 16%);
}

.floating-action-button-menu-item-prefix,
.floating-action-button-menu-item-suffix{
    width: 24px;
    height: 24px;
    padding: 2px;
    box-sizing: border-box;
}

.menu-cross-button{
    width: 56px;
    height: 56px;
    padding: 16px;
    box-sizing: border-box;

    display: flex;
    justify-content: center;
    align-items: center;
    
    margin-top: 4px;
    border-radius: var(--Corner-Extra-large, 28px);
    background: var(--fab-menu-cross-button-background-color--);
 
    box-shadow: 0 4px 8px 3px rgba(0, 0, 0, 0.15), 0 1px 3px 0 rgba(0, 0, 0, 0.30);
    cursor: pointer;
}
.menu-cross-button > svg{
    color: var(--fab-menu-cross-button-text-color--);
}
</style>
