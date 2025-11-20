<template>
    <div :class="[
        'snackbar',
        {'large-padding': padding_size === 'large'},
        {'stacked-layout': isStackedLayout},
        customized_class,
    ]">
        <div class="snackbar-content-wrapper">
            <div class="snackbar-text">
                <slot>
                    <div v-if="content" v-html="content"></div>
                </slot>
            </div>
        </div>
        <div class="snackbar-actions-wrapper">
            <div v-if="action" class="action-button-wrapper">
                <DynamicColorResponsiveButton
                    button_type="text"
                    customized_theme_color="#9EC1FA"
                    size="small"
                    :display_name="action"
                    @click-button="handleActionClick"
                />
            </div>
            <div v-if="with_close_icon" class="close-icon-wrapper">
                <DynamicColorResponsiveButton
                    button_type="text"
                    customized_theme_color="#CAC4D0"
                    size="small"
                    width_type="normal"
                    @click-button="manuallyClose"
                >
                    <template #prefix>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M6.4 19L5 17.6L10.6 12L5 6.4L6.4 5L12 10.6L17.6 5L19 6.4L13.4 12L19 17.6L17.6 19L12 13.4L6.4 19Z" fill="currentColor"/>
                        </svg>
                    </template>
                </DynamicColorResponsiveButton>
            </div>
        </div>
    </div>
</template>

<script>
import DynamicColorResponsiveButton from '@/components/DynamicColorResponsiveButton.vue';

export default {
    components: {
        DynamicColorResponsiveButton
    },
    props: {
        content: {
            type: String,
            default: ''
        },
        action: {
            // Single action button text
            // Example: 'Undo'
            type: String,
            default: ''
        },
        padding_size: {
            // Padding size: 'normal' or 'large'
            type: String,
            default: 'normal',
            validator: (value) => ['normal', 'large'].includes(value)
        },
        with_close_icon: {
            type: Boolean,
            default: true
        },
        customized_class: {
            type: String,
            default: ''
        },
        mounted_programmatically: {
            type: Boolean,
            default: false
        },
        hide_after: {
            // Auto-hide after milliseconds
            // Default: 3000ms (3 seconds)
            // Set to 0 or null to disable auto-hide
            type: Number,
            default: 3000
        }
    },
    data() {
        return {};
    },
    mounted() {
        // Auto-hide if hide_after is set
        if (this.hide_after && typeof this.hide_after === 'number') {
            this.autoClose();
        }
    },
    computed: {
        isStackedLayout() {
            // Use stacked layout (column) when action button text is long (>10 characters)
            return this.action && this.action.length > 10;
        }
    },
    emits: [
        'close',
        'action'
    ],
    methods: {
        handleActionClick() {
            // Emit action event
            this.$emit('action');
            // Close snackbar after action button click
            this.manuallyClose();
        },
        autoClose() {
            // Wait for (hide_after - animation_duration) before starting fade-out animation
            const fade_out_duration = 150; // 150ms quick fade-out animation
            const delay_before_animation = this.hide_after - fade_out_duration;
            
            setTimeout(() => {
                // Add fade-out animation
                if (this.$el) {
                    this.$el.classList.add('fade-out');
                }
                
                // Close after animation completes
                setTimeout(() => {
                    this.manuallyClose();
                }, fade_out_duration);
            }, delay_before_animation > 0 ? delay_before_animation : 0);
        },
        manuallyClose() {
            // Add fade-out animation for manual close
            if (this.$el && !this.$el.classList.contains('fade-out')) {
                this.$el.classList.add('fade-out');
                // Wait for animation to complete before removing (150ms quick fade)
                setTimeout(() => {
                    this.removeSnackbar();
                }, 150);
            } else {
                this.removeSnackbar();
            }
        },
        removeSnackbar() {
            // Emit close event
            this.$emit('close', this.$el);

            if (this.mounted_programmatically) {
                // Remove the element and wrapper parent div
                const target_removed_div = this.$el ? this.$el.parentElement : null;
                
                if (target_removed_div) {
                    // 1. Remove HTML element from DOM tree
                    target_removed_div.remove();
                    
                    // 2. Unmount app instance
                    var app_instance = this.$attrs.snackbar_instances_collection[this.$attrs.id];
                    app_instance.unmount();
                    
                    // 3. Optimization for garbage collection
                    app_instance._container = null;
                    app_instance = null;
                    
                    // 4. Remove from instances collection
                    delete this.$attrs.snackbar_instances_collection[this.$attrs.id];
                }
                
                // Check if container is empty and remove it
                const floating_snackbar_container = document.getElementById('floating-snackbar-container');
                if (floating_snackbar_container && floating_snackbar_container.children.length === 0) {
                    floating_snackbar_container.remove();
                }
            }
        }
    }
};
</script>

<style scoped>
/* Quick fade-out animation for close (both manual and auto-hide) */
.fade-out {
    animation: fadeOut 150ms ease-out forwards;
}

@keyframes fadeOut {
    0% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
}

.snackbar {
    width: 100%;
    box-sizing: border-box;
    padding: 0px 0px 0px 16px; /* right padding 14px less than left  */
    border-radius: var(--Corner-Extra-small, 4px);
    background: #2F3137;
    
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    
    position: relative;
}

.snackbar.large-padding {
    padding: 10px 0px 10px 16px; /* Only top/bottom padding increased, left/right stay same */
}

/* Stacked layout when action button text is long */
.snackbar.stacked-layout {
    flex-direction: column;
    align-items: flex-start;
}

.snackbar.stacked-layout .snackbar-actions-wrapper {
    width: 100%;
    justify-content: flex-end;
}

.snackbar-content-wrapper {
    flex: 1;
    min-width: 0;
}

.snackbar-text {
    color: #E6E1E5;
    font-family: 'Roboto';
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    padding: 14px 14px 14px 0px; /* left padding 14px less than right */
    letter-spacing: 0.25px;
    
    white-space: normal;
    word-break: break-word;
}

.snackbar-actions-wrapper {
    display: flex;
    align-items: center;
    flex-shrink: 0;
}


.action-button-wrapper {
    flex-shrink: 0;
}

.close-icon-wrapper {
    flex-shrink: 0;
}

/* Mobile responsive */
@media only screen and (max-width: 767px) {
    .snackbar {
        width: 100vw;
        border-radius: var(--Corner-Extra-small, 4px);
        padding: 14px 0px 14px 16px; /* right padding 12px less than left */
    }
    
    .snackbar.large-padding {
        padding: 18px 0px 18px 16px; /* Only top/bottom padding increased, left/right stay same */
    }
}
</style>
