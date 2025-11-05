<template>
  <div class="component-doc">
    <h2>Badge</h2>
    
    <DemoBlock id="badge-basic" title="Basic Badge - Sizes & Position Control" :code="basicCode">
      <div class="live">
        <div style="display: flex; gap: 40px; align-items: center; margin-bottom: 16px;">
          <div>
            <div style="margin-bottom: 8px; font-size: 14px; color: #6B7280;">small (6px) - padding: 4px</div>
            <Badge size="small">
              <div style="padding: 4px; border: 2px dashed #9CA3AF; border-radius: 4px;">
                <div style="width: 40px; height: 40px; background: #E5E7EB; border-radius: 4px; display: flex; align-items: center; justify-content: center;">Icon</div>
              </div>
            </Badge>
          </div>
          <div>
            <div style="margin-bottom: 8px; font-size: 14px; color: #6B7280;">medium (8px) - padding: 6px</div>
            <Badge size="medium">
              <div style="padding: 6px; border: 2px dashed #9CA3AF; border-radius: 4px;">
                <div style="width: 40px; height: 40px; background: #E5E7EB; border-radius: 4px; display: flex; align-items: center; justify-content: center;">Icon</div>
              </div>
            </Badge>
          </div>
          <div>
            <div style="margin-bottom: 8px; font-size: 14px; color: #6B7280;">large (16px) - padding: 8px</div>
            <Badge size="large">
              <div style="padding: 8px; border: 2px dashed #9CA3AF; border-radius: 4px;">
                <div style="width: 40px; height: 40px; background: #E5E7EB; border-radius: 4px; display: flex; align-items: center; justify-content: center;">Icon</div>
              </div>
            </Badge>
          </div>
        </div>
        <div style="display: flex; gap: 40px; align-items: center; margin-bottom: 16px;">
          <div>
            <div style="margin-bottom: 8px; font-size: 14px; color: #6B7280;">With content - padding: 8px</div>
            <Badge content="5">
              <div style="padding: 8px; border: 2px dashed #9CA3AF; border-radius: 4px;">
                <div style="width: 40px; height: 40px; background: #E5E7EB; border-radius: 4px; display: flex; align-items: center; justify-content: center;">Icon</div>
              </div>
            </Badge>
          </div>
          <div>
            <div style="margin-bottom: 8px; font-size: 14px; color: #6B7280;">With content - padding: 12px</div>
            <Badge content="99">
              <div style="padding: 12px; border: 2px dashed #9CA3AF; border-radius: 4px;">
                <div style="width: 40px; height: 40px; background: #E5E7EB; border-radius: 4px; display: flex; align-items: center; justify-content: center;">Icon</div>
              </div>
            </Badge>
          </div>
          <div>
            <div style="margin-bottom: 8px; font-size: 14px; color: #6B7280;">With text - padding: 10px</div>
            <Badge content="New">
              <div style="padding: 10px; border: 2px dashed #9CA3AF; border-radius: 4px;">
                <div style="width: 40px; height: 40px; background: #E5E7EB; border-radius: 4px; display: flex; align-items: center; justify-content: center;">Icon</div>
              </div>
            </Badge>
          </div>
        </div>
        <div style="display: flex; gap: 40px; align-items: center; margin-bottom: 16px;">
          <div>
            <div style="margin-bottom: 8px; font-size: 14px; color: #6B7280;">No padding (0px)</div>
            <Badge size="medium">
              <div style="padding: 0px; border: 2px dashed #9CA3AF; border-radius: 4px;">
                <div style="width: 40px; height: 40px; background: #E5E7EB; border-radius: 4px; display: flex; align-items: center; justify-content: center;">Icon</div>
              </div>
            </Badge>
          </div>
          <div>
            <div style="margin-bottom: 8px; font-size: 14px; color: #6B7280;">Asymmetric: 4px 8px</div>
            <Badge size="medium">
              <div style="padding: 4px 8px; border: 2px dashed #9CA3AF; border-radius: 4px;">
                <div style="width: 40px; height: 40px; background: #E5E7EB; border-radius: 4px; display: flex; align-items: center; justify-content: center;">Icon</div>
              </div>
            </Badge>
          </div>
          <div>
            <div style="margin-bottom: 8px; font-size: 14px; color: #6B7280;">Asymmetric: 2px 4px 6px 8px</div>
            <Badge content="3">
              <div style="padding: 2px 4px 6px 8px; border: 2px dashed #9CA3AF; border-radius: 4px;">
                <div style="width: 40px; height: 40px; background: #E5E7EB; border-radius: 4px; display: flex; align-items: center; justify-content: center;">Icon</div>
              </div>
            </Badge>
          </div>
        </div>
        <div class="note">Note: The dashed border shows the wrapper div. Use padding on this wrapper div to control badge position. You can use uniform padding (e.g., 8px), two-value padding (e.g., 4px 8px for vertical/horizontal), or four-value padding (e.g., 2px 4px 6px 8px for top/right/bottom/left). Adjust padding values to position the badge exactly where you need it. In production, remove the dashed border.</div>
      </div>
    </DemoBlock>

    <DemoBlock id="badge-disabled" title="Disabled" :code="disabledCode">
      <div class="live">
        <label style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">
          <input type="checkbox" v-model="disabledDemo"/>
          <span>Disable badge</span>
        </label>
        <div style="display:flex; gap:40px; align-items:center;">
          <Badge :disabled="disabledDemo" content="9">
            <div style="padding: 8px;">
              <div style="width: 40px; height: 40px; background: #E5E7EB; border-radius: 4px; display: flex; align-items: center; justify-content: center;">Icon</div>
            </div>
          </Badge>
          <Badge :disabled="disabledDemo">
            <div style="padding: 6px; border: 2px dashed #9CA3AF; border-radius: 4px;">
              <div style="width: 40px; height: 40px; background: #E5E7EB; border-radius: 4px; display: flex; align-items: center; justify-content: center;">Icon</div>
            </div>
          </Badge>
        </div>
        <div class="note">When disabled, the wrapped content remains, but the red badge indicator is hidden.</div>
      </div>
    </DemoBlock>

    <DemoBlock id="badge-content" title="Badge with Content" :code="contentCode">
      <div class="live">
        <div style="display: flex; gap: 40px; align-items: center;">
          <Badge content="5">
            <div style="padding: 8px;">
              <div style="width: 40px; height: 40px; background: #E5E7EB; border-radius: 4px; display: flex; align-items: center; justify-content: center;">Icon</div>
            </div>
          </Badge>
          <Badge content="99">
            <div style="padding: 8px;">
              <div style="width: 40px; height: 40px; background: #E5E7EB; border-radius: 4px; display: flex; align-items: center; justify-content: center;">Icon</div>
            </div>
          </Badge>
          <Badge content="New">
            <div style="padding: 8px;">
              <div style="width: 40px; height: 40px; background: #E5E7EB; border-radius: 4px; display: flex; align-items: center; justify-content: center;">Icon</div>
            </div>
          </Badge>
        </div>
        <div class="note">Note: When badge has content, it automatically becomes large with padding.</div>
      </div>
    </DemoBlock>

    <DemoBlock id="badge-position" title="Position Types" :code="positionCode">
      <div class="live">
        <div style="display: flex; gap: 40px; align-items: center;">
          <div>
            <div style="margin-bottom: 8px; font-size: 14px; color: #6B7280;">top-right</div>
            <Badge position_type="top-right" content="3">
              <div style="padding: 8px;">
                <div style="width: 40px; height: 40px; background: #E5E7EB; border-radius: 4px; display: flex; align-items: center; justify-content: center;">Icon</div>
              </div>
            </Badge>
          </div>
          <div>
            <div style="margin-bottom: 8px; font-size: 14px; color: #6B7280;">center-right</div>
            <Badge position_type="center-right" content="5">
              <div style="padding: 8px;">
                <div style="width: 40px; height: 40px; background: #E5E7EB; border-radius: 4px; display: flex; align-items: center; justify-content: center;">Icon</div>
              </div>
            </Badge>
          </div>
          <div>
            <div style="margin-bottom: 8px; font-size: 14px; color: #6B7280;">top-right with offsets (8px, 12px)</div>
            <Badge position_type="top-right" customized_top_distance="8px" customized_right_distance="12px" content="7">
              <div style="padding: 8px;">
                <div style="width: 40px; height: 40px; background: #E5E7EB; border-radius: 4px; display: flex; align-items: center; justify-content: center;">Icon</div>
              </div>
            </Badge>
          </div>
        </div>
        <div class="note">Note: top-right positions badge at corner (0,0), center-right aligns badge inline with 4px gap. Use padding to control position.</div>
      </div>
    </DemoBlock>

    <DemoBlock id="badge-themes" title="Built-in Themes" :code="themesCode">
      <div class="live">
        <div style="display: flex; gap: 40px; align-items: center;">
          <div>
            <div style="margin-bottom: 8px; font-size: 14px; color: #6B7280;">primary (red)</div>
            <Badge built_in_theme="primary" content="8">
              <div style="padding: 8px;">
                <div style="width: 40px; height: 40px; background: #E5E7EB; border-radius: 4px; display: flex; align-items: center; justify-content: center;">Icon</div>
              </div>
            </Badge>
          </div>
          <div>
            <div style="margin-bottom: 8px; font-size: 14px; color: #6B7280;">secondary (blue)</div>
            <Badge built_in_theme="secondary" content="12">
              <div style="padding: 8px;">
                <div style="width: 40px; height: 40px; background: #E5E7EB; border-radius: 4px; display: flex; align-items: center; justify-content: center;">Icon</div>
              </div>
            </Badge>
          </div>
        </div>
      </div>
    </DemoBlock>

    <DemoBlock id="badge-custom-color" title="Custom Theme Color" :code="customColorCode">
      <div class="live">
        <div style="display: flex; gap: 40px; align-items: center; margin-bottom: 16px;">
          <div>
            <div style="margin-bottom: 8px; font-size: 14px; color: #6B7280;">Green (l≈60%)</div>
            <Badge customized_theme_color="#10B981" content="New">
              <div style="padding: 8px;">
                <div style="width: 40px; height: 40px; background: #E5E7EB; border-radius: 4px; display: flex; align-items: center; justify-content: center;">Icon</div>
              </div>
            </Badge>
          </div>
          <div>
            <div style="margin-bottom: 8px; font-size: 14px; color: #6B7280;">Orange (l≈50%)</div>
            <Badge customized_theme_color="#F59E0B" content="Hot">
              <div style="padding: 8px;">
                <div style="width: 40px; height: 40px; background: #E5E7EB; border-radius: 4px; display: flex; align-items: center; justify-content: center;">Icon</div>
              </div>
            </Badge>
          </div>
          <div>
            <div style="margin-bottom: 8px; font-size: 14px; color: #6B7280;">Purple (l≈60%)</div>
            <Badge customized_theme_color="#8B5CF6" content="VIP">
              <div style="padding: 8px;">
                <div style="width: 40px; height: 40px; background: #E5E7EB; border-radius: 4px; display: flex; align-items: center; justify-content: center;">Icon</div>
              </div>
            </Badge>
          </div>
        </div>
        <div style="display: flex; gap: 40px; align-items: center;">
          <div>
            <div style="margin-bottom: 8px; font-size: 14px; color: #6B7280;">Dark (l≈25%)</div>
            <Badge customized_theme_color="hsl(220, 70%, 25%)" content="Dark">
              <div style="padding: 8px;">
                <div style="width: 40px; height: 40px; background: #E5E7EB; border-radius: 4px; display: flex; align-items: center; justify-content: center;">Icon</div>
              </div>
            </Badge>
          </div>
          <div>
            <div style="margin-bottom: 8px; font-size: 14px; color: #6B7280;">Light (l≈80%)</div>
            <Badge customized_theme_color="hsl(160, 60%, 80%)" content="Light">
              <div style="padding: 8px;">
                <div style="width: 40px; height: 40px; background: #E5E7EB; border-radius: 4px; display: flex; align-items: center; justify-content: center;">Icon</div>
              </div>
            </Badge>
          </div>
        </div>
        <div class="note">Note: customized_theme_color overrides built_in_theme. Text color is automatically calculated for optimal contrast.</div>
      </div>
    </DemoBlock>

    <DemoBlock id="badge-combinations" title="All Combinations" :code="combinationsCode">
      <div class="live">
        <div style="display: flex; flex-direction: column; gap: 24px;">
          <div style="display: flex; gap: 40px; align-items: center;">
            <Badge size="small" position_type="top-right">
              <div style="padding: 4px;">
                <div style="width: 40px; height: 40px; background: #E5E7EB; border-radius: 4px; display: flex; align-items: center; justify-content: center;">S</div>
              </div>
            </Badge>
            <Badge size="medium" position_type="top-right">
              <div style="padding: 6px;">
                <div style="width: 40px; height: 40px; background: #E5E7EB; border-radius: 4px; display: flex; align-items: center; justify-content: center;">M</div>
              </div>
            </Badge>
            <Badge size="large" position_type="top-right">
              <div style="padding: 8px;">
                <div style="width: 40px; height: 40px; background: #E5E7EB; border-radius: 4px; display: flex; align-items: center; justify-content: center;">L</div>
              </div>
            </Badge>
          </div>
          <div style="display: flex; gap: 40px; align-items: center;">
            <Badge size="small" position_type="center-right">
              <div style="padding: 4px;">
                <div style="width: 40px; height: 40px; background: #E5E7EB; border-radius: 4px; display: flex; align-items: center; justify-content: center;">S</div>
              </div>
            </Badge>
            <Badge size="medium" position_type="center-right">
              <div style="padding: 6px;">
                <div style="width: 40px; height: 40px; background: #E5E7EB; border-radius: 4px; display: flex; align-items: center; justify-content: center;">M</div>
              </div>
            </Badge>
            <Badge size="large" position_type="center-right">
              <div style="padding: 8px;">
                <div style="width: 40px; height: 40px; background: #E5E7EB; border-radius: 4px; display: flex; align-items: center; justify-content: center;">L</div>
              </div>
            </Badge>
          </div>
        </div>
      </div>
    </DemoBlock>

    <DemoBlock id="badge-responsive" title="Responsive Behavior" :code="responsiveCode">
      <div class="live">
        <div style="display: flex; gap: 40px; align-items: center;">
          <div>
            <div style="margin-bottom: 8px; font-size: 14px; color: #6B7280;">Web: small (6px)</div>
            <Badge size="small">
              <div style="padding: 4px;">
                <div style="width: 40px; height: 40px; background: #E5E7EB; border-radius: 4px; display: flex; align-items: center; justify-content: center;">Icon</div>
              </div>
            </Badge>
          </div>
          <div>
            <div style="margin-bottom: 8px; font-size: 14px; color: #6B7280;">Web: medium (8px)</div>
            <Badge size="medium">
              <div style="padding: 6px;">
                <div style="width: 40px; height: 40px; background: #E5E7EB; border-radius: 4px; display: flex; align-items: center; justify-content: center;">Icon</div>
              </div>
            </Badge>
          </div>
          <div>
            <div style="margin-bottom: 8px; font-size: 14px; color: #6B7280;">Web: large (16px)</div>
            <Badge size="large">
              <div style="padding: 8px;">
                <div style="width: 40px; height: 40px; background: #E5E7EB; border-radius: 4px; display: flex; align-items: center; justify-content: center;">Icon</div>
              </div>
            </Badge>
          </div>
        </div>
        <div class="note">Note: On mobile (≤767px): small→6px, medium→6px, large→16px</div>
      </div>
    </DemoBlock>
  </div>
</template>

<script>
import Badge from "@/components/Badge.vue";
import DemoBlock from '@/componentsDemo/DemoBlock.vue';

export default {
  components: {
    Badge,
    DemoBlock
  },
  data(){
    return {
      disabledDemo: false,
    }
  },
  computed: {
    basicCode() {
      return `<template>
  <!-- Basic sizes with uniform padding -->
  <Badge size="small">
    <div style="padding: 4px;">
      <div style="width: 40px; height: 40px; background: #E5E7EB; border-radius: 4px; display: flex; align-items: center; justify-content: center;">Icon</div>
    </div>
  </Badge>
  <Badge size="medium">
    <div style="padding: 6px;">
      <div style="width: 40px; height: 40px; background: #E5E7EB; border-radius: 4px; display: flex; align-items: center; justify-content: center;">Icon</div>
    </div>
  </Badge>
  <Badge size="large">
    <div style="padding: 8px;">
      <div style="width: 40px; height: 40px; background: #E5E7EB; border-radius: 4px; display: flex; align-items: center; justify-content: center;">Icon</div>
    </div>
  </Badge>

  <!-- Badges with content -->
  <Badge content="5">
    <div style="padding: 8px;">
      <div style="width: 40px; height: 40px; background: #E5E7EB; border-radius: 4px; display: flex; align-items: center; justify-content: center;">Icon</div>
    </div>
  </Badge>
  <Badge content="99">
    <div style="padding: 12px;">
      <div style="width: 40px; height: 40px; background: #E5E7EB; border-radius: 4px; display: flex; align-items: center; justify-content: center;">Icon</div>
    </div>
  </Badge>
  <Badge content="New">
    <div style="padding: 10px;">
      <div style="width: 40px; height: 40px; background: #E5E7EB; border-radius: 4px; display: flex; align-items: center; justify-content: center;">Icon</div>
    </div>
  </Badge>

  <!-- Flexible padding control -->
  <Badge size="medium">
    <div style="padding: 0px;">
      <div style="width: 40px; height: 40px; background: #E5E7EB; border-radius: 4px; display: flex; align-items: center; justify-content: center;">Icon</div>
    </div>
  </Badge>
  <Badge size="medium">
    <div style="padding: 4px 8px;">
      <div style="width: 40px; height: 40px; background: #E5E7EB; border-radius: 4px; display: flex; align-items: center; justify-content: center;">Icon</div>
    </div>
  </Badge>
  <Badge content="3">
    <div style="padding: 2px 4px 6px 8px;">
      <div style="width: 40px; height: 40px; background: #E5E7EB; border-radius: 4px; display: flex; align-items: center; justify-content: center;">Icon</div>
    </div>
  </Badge>
</template>

<script setup>
import { Badge } from 'pns-component-library'
<\/script>`
    },
    contentCode() {
      return `<template>
  <Badge content="5">
    <div style="padding: 8px;">
      <div style="width: 40px; height: 40px; background: #E5E7EB; border-radius: 4px; display: flex; align-items: center; justify-content: center;">Icon</div>
    </div>
  </Badge>
  <Badge content="99">
    <div style="padding: 8px;">
      <div style="width: 40px; height: 40px; background: #E5E7EB; border-radius: 4px; display: flex; align-items: center; justify-content: center;">Icon</div>
    </div>
  </Badge>
  <Badge content="New">
    <div style="padding: 8px;">
      <div style="width: 40px; height: 40px; background: #E5E7EB; border-radius: 4px; display: flex; align-items: center; justify-content: center;">Icon</div>
    </div>
  </Badge>
</template>

<script setup>
import { Badge } from 'pns-component-library'
<\/script>`
    },
    positionCode() {
      return `<template>
  <Badge position_type="top-right" content="3">
    <div style="padding: 8px;">
      <div style="width: 40px; height: 40px; background: #E5E7EB; border-radius: 4px; display: flex; align-items: center; justify-content: center;">Icon</div>
    </div>
  </Badge>
  <Badge position_type="center-right" content="5">
    <div style="padding: 8px;">
      <div style="width: 40px; height: 40px; background: #E5E7EB; border-radius: 4px; display: flex; align-items: center; justify-content: center;">Icon</div>
    </div>
  </Badge>
  <Badge position_type=\"top-right\" customized_top_distance=\"8px\" customized_right_distance=\"12px\" content=\"7\">
    <div style=\"padding: 8px;\">
      <div style=\"width: 40px; height: 40px; background: #E5E7EB; border-radius: 4px; display: flex; align-items: center; justify-content: center;\">Icon</div>
    </div>
  </Badge>
</template>

<script setup>
import { Badge } from 'pns-component-library'
<\/script>`
    },
    themesCode() {
      return `<template>
  <Badge built_in_theme="primary" content="8">
    <div style="padding: 8px;">
      <div style="width: 40px; height: 40px; background: #E5E7EB; border-radius: 4px; display: flex; align-items: center; justify-content: center;">Icon</div>
    </div>
  </Badge>
  <Badge built_in_theme="secondary" content="12">
    <div style="padding: 8px;">
      <div style="width: 40px; height: 40px; background: #E5E7EB; border-radius: 4px; display: flex; align-items: center; justify-content: center;">Icon</div>
    </div>
  </Badge>
</template>

<script setup>
import { Badge } from 'pns-component-library'
<\/script>`
    },
    customColorCode() {
      return `<template>
  <!-- Hex colors -->
  <Badge customized_theme_color="#10B981" content="New">
    <div style="padding: 8px;">
      <div style="width: 40px; height: 40px; background: #E5E7EB; border-radius: 4px; display: flex; align-items: center; justify-content: center;">Icon</div>
    </div>
  </Badge>
  <Badge customized_theme_color="#F59E0B" content="Hot">
    <div style="padding: 8px;">
      <div style="width: 40px; height: 40px; background: #E5E7EB; border-radius: 4px; display: flex; align-items: center; justify-content: center;">Icon</div>
    </div>
  </Badge>
  <Badge customized_theme_color="#8B5CF6" content="VIP">
    <div style="padding: 8px;">
      <div style="width: 40px; height: 40px; background: #E5E7EB; border-radius: 4px; display: flex; align-items: center; justify-content: center;">Icon</div>
    </div>
  </Badge>

  <!-- HSL colors with different lightness -->
  <Badge customized_theme_color="hsl(220, 70%, 25%)" content="Dark">
    <div style="padding: 8px;">
      <div style="width: 40px; height: 40px; background: #E5E7EB; border-radius: 4px; display: flex; align-items: center; justify-content: center;">Icon</div>
    </div>
  </Badge>
  <Badge customized_theme_color="hsl(160, 60%, 80%)" content="Light">
    <div style="padding: 8px;">
      <div style="width: 40px; height: 40px; background: #E5E7EB; border-radius: 4px; display: flex; align-items: center; justify-content: center;">Icon</div>
    </div>
  </Badge>
</template>

<script setup>
import { Badge } from 'pns-component-library'
<\/script>

<!-- Text color is automatically calculated based on background lightness -->`
    },
    combinationsCode() {
      return `<template>
  <!-- top-right positions -->
  <Badge size="small" position_type="top-right">
    <div style="padding: 4px;">
      <div style="width: 40px; height: 40px; background: #E5E7EB; border-radius: 4px; display: flex; align-items: center; justify-content: center;">Icon</div>
    </div>
  </Badge>
  <Badge size="medium" position_type="top-right">
    <div style="padding: 6px;">
      <div style="width: 40px; height: 40px; background: #E5E7EB; border-radius: 4px; display: flex; align-items: center; justify-content: center;">Icon</div>
    </div>
  </Badge>
  <Badge size="large" position_type="top-right">
    <div style="padding: 8px;">
      <div style="width: 40px; height: 40px; background: #E5E7EB; border-radius: 4px; display: flex; align-items: center; justify-content: center;">Icon</div>
    </div>
  </Badge>
  
  <!-- center-right positions -->
  <Badge size="small" position_type="center-right">
    <div style="padding: 4px;">
      <div style="width: 40px; height: 40px; background: #E5E7EB; border-radius: 4px; display: flex; align-items: center; justify-content: center;">Icon</div>
    </div>
  </Badge>
  <Badge size="medium" position_type="center-right">
    <div style="padding: 6px;">
      <div style="width: 40px; height: 40px; background: #E5E7EB; border-radius: 4px; display: flex; align-items: center; justify-content: center;">Icon</div>
    </div>
  </Badge>
  <Badge size="large" position_type="center-right">
    <div style="padding: 8px;">
      <div style="width: 40px; height: 40px; background: #E5E7EB; border-radius: 4px; display: flex; align-items: center; justify-content: center;">Icon</div>
    </div>
  </Badge>
</template>

<script setup>
import { Badge } from 'pns-component-library'
<\/script>`
    },
    responsiveCode() {
      return `<template>
  <!-- Sizes on web -->
  <Badge size="small">
    <div style="padding: 4px;">
      <div style="width: 40px; height: 40px; background: #E5E7EB; border-radius: 4px; display: flex; align-items: center; justify-content: center;">Icon</div>
    </div>
  </Badge>
  <Badge size="medium">
    <div style="padding: 6px;">
      <div style="width: 40px; height: 40px; background: #E5E7EB; border-radius: 4px; display: flex; align-items: center; justify-content: center;">Icon</div>
    </div>
  </Badge>
  <Badge size="large">
    <div style="padding: 8px;">
      <div style="width: 40px; height: 40px; background: #E5E7EB; border-radius: 4px; display: flex; align-items: center; justify-content: center;">Icon</div>
    </div>
  </Badge>
  
  <!-- On mobile (≤767px): small→6px, medium→6px, large→16px -->
</template>

<script setup>
import { Badge } from 'pns-component-library'
<\/script>`
    },
    disabledCode(){
      return `<template>
  <label>
    <input type="checkbox" v-model="disabled"/>
    Disable badge
  </label>

  <Badge :disabled="disabled" content="9">
    <div style="padding: 8px;">
      <div style="width: 40px; height: 40px; background: #E5E7EB; border-radius: 4px; display: flex; align-items: center; justify-content: center;">Icon</div>
    </div>
  </Badge>
</template>

<script setup>
import { ref } from 'vue'
import { Badge } from 'pns-component-library'
const disabled = ref(false)
<\/script>`
    }
  }
}
</script>

<style scoped>
.component-doc {
  max-width: 900px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 16px;
}
.live {
  border: 1px dashed #e5e7eb;
  padding: 12px;
  border-radius: 8px;
  background: #fff;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.note {
  color: #374151;
  font-size: 14px;
  margin-top: 8px;
}
</style>
