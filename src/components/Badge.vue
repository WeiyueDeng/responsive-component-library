<template>
    <div :class="['badge-wrapper', position_type]" :style="getBadgePositionStyle()">
        <slot></slot>
        <span 
            :class="[
                'badge',
                size,
                position_type,
                built_in_theme,
                customized_class,
                {'has-content': hasContent}
            ]"
            :style="getBadgeThemeStyle()"
        >
            {{ content }}
        </span>
    </div>
</template>

<script>
import { parseColorToHsl } from '@/utils/colorConvention.js';

export default {
    props: {
        content: {
            // The content to display in the badge (number or text)
            type: [String, Number],
            default: ''
        },
        size: {
            // ENUM: small, medium, large
            // Web to mobile: small->small, medium->small, large->large
            // When badge has content, size must be large
            type: String,
            default: 'small'
        },
        position_type: {
            // ENUM: top-right, center-right
            // top-right: positioned at top right corner (0, 0)
            // center-right: center-aligned at the right side
            type: String,
            default: 'top-right'
        },
        customized_top_distance: {
            // OPTIONAL
            // NOTES: Only works for top-right position type
            // Can be any valid CSS length value
            type: String,
            default: ''
        },
        customized_right_distance: {
            // OPTIONAL
            // NOTES: Only works for top-right position type
            // Can be any valid CSS length value
            type: String,
            default: ''
        },
        built_in_theme: {
            // ENUM: primary, secondary
            // primary: red/error color
            // secondary: blue color
            type: String,
            default: 'primary'
        },
        customized_theme_color: {
            // OPTIONAL when built_in_theme is used
            // NOTES: Can be any valid CSS color value
            // NOTES: When both built_in_theme and customized_theme_color are used, customized_theme_color will override the built_in_theme
            type: String,
            default: ''
        },
        customized_class: {
            // Used if user wants to define their own custom styles
            type: String,
            default: ''
        }
    },
    computed: {
        hasContent() {
            return !!this.content;
        }
    },
    methods: {
        getBadgePositionStyle() {
            const styles = {};
            // if customized_top_distance or customized_right_distance is used, use it as the top and right distance
            if(this.position_type === 'top-right') {
                if(this.customized_top_distance) {
                    styles['--top-distance--'] = this.customized_top_distance;
                }
                if(this.customized_right_distance) {
                    styles['--right-distance--'] = this.customized_right_distance;
                }
            }
            return styles;
        },
        getBadgeThemeStyle() {
            if (this.customized_theme_color) {
                try {
                    // Parse the custom color to HSL
                    const bgHsl = parseColorToHsl(this.customized_theme_color);
                    
                    // Calculate text color based on background lightness
                    // Similar to FloatingActionButton logic
                    let textHsl;
                    if (bgHsl.l > 50) {
                        // Light background -> dark text
                        const l = bgHsl.l - 60;
                        textHsl = l <= 0 ? {
                            h: 0,
                            s: 0,
                            l: 0,
                            a: bgHsl.a
                        } : {
                            h: bgHsl.h,
                            s: bgHsl.s,
                            l: l,
                            a: bgHsl.a
                        };
                    } else {
                        // Dark background -> light text
                        const l = bgHsl.l + 60;
                        textHsl = l >= 100 ? {
                            h: 0,
                            s: 0,
                            l: 100,
                            a: bgHsl.a
                        } : {
                            h: bgHsl.h,
                            s: bgHsl.s,
                            l: l,
                            a: bgHsl.a
                        };
                    }
                    
                    // Convert HSL to CSS string
                    const textColor = `hsl(${textHsl.h}, ${textHsl.s}%, ${textHsl.l}%)`;
                    
                    return {
                        '--badge-theme-color--': this.customized_theme_color,
                        '--badge-text-color--': textColor
                    };
                } catch (error) {
                    console.warn('Failed to parse customized_theme_color:', error);
                    return {
                        '--badge-theme-color--': this.customized_theme_color
                    };
                }
            }
            return {};
        }
    }
}
</script>

<style scoped>
.badge-wrapper {
    display: inline-flex;
    width: fit-content;
    height: fit-content;
}

/* top-right: wrapper is relative, badge is absolute */
.badge-wrapper.top-right {
    position: relative;
}

/* center-right: wrapper is flex with gap, badge is not absolute */
.badge-wrapper.center-right {
    display: inline-flex;
    align-items: center;
    column-gap: 4px;
}

.badge {
    display: flex;
    align-items: center;
    justify-content: center;
    
    border-radius: 100%;
    box-sizing: border-box;
    
    color: #FFFFFF;
    font-family: 'Roboto';
    font-weight: 500;
    line-height: 1;
}

/* Badge is absolute only for top-right position */
.badge.top-right {
    position: absolute;
}

/* Badge is static (not absolute) for center-right position */
.badge.center-right {
    position: static;
}

/* Size variants - Web */
.badge.small {
    width: 6px;
    height: 6px;
    min-width: 6px;
}

.badge.medium {
    width: 8px;
    height: 8px;
    min-width: 8px;
}

.badge.large {
    width: 16px;
    height: 16px;
    min-width: 16px;
}

/* When badge has content, it must be large with padding */
.badge.has-content {
    width: auto;
    min-width: 20px;
    height: 20px;
    padding: 0 6px;
    border-radius: 10px;
    
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0.4px;
}

/* Position transform for top-right only */
.badge.top-right {
    top: var(--top-distance--, 0);
    right: var(--right-distance--, 0);
}

/* Theme colors */
.badge.primary {
    background-color: #AF251D;
    color: #FFFFFF;
}

.badge.secondary {
    background-color: #CFE0FC;
    color: #083D91;
}

/* Custom theme color override - must come after built-in themes */
.badge[style*="--badge-theme-color--"] {
    background-color: var(--badge-theme-color--) !important;
    color: var(--badge-text-color--, #FFFFFF) !important;
}

/* Mobile responsive */
@media only screen and (max-width: 767px) {
    /* small -> small (no change) */
    .badge.small {
        width: 6px;
        height: 6px;
        min-width: 6px;
    }
    
    /* medium -> small (6px) */
    .badge.medium {
        width: 6px;
        height: 6px;
        min-width: 6px;
    }
    
    /* large -> large (no change) */
    .badge.large {
        width: 16px;
        height: 16px;
        min-width: 16px;
    }
    
    /* Content badge remains the same on mobile */
    .badge.has-content {
        width: auto;
        min-width: 20px;
        height: 20px;
        padding: 0 6px;
        border-radius: 10px;
        
        font-size: 12px;
        line-height: 16px;
        letter-spacing: 0.4px;
    }
}
</style>