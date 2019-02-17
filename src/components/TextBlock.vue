<template>
  <div class="text-block">
    <h1
      v-if="module.fields.showHeading"
      :class="{
        'text-block__heading--underline': module.fields.showHeadingUnderline
      }"
    >
      {{ module.fields.header }}
    </h1>
    <h3
      class="text-block__subheading"
      v-if="module.fields.subheader"
      :class="{
        'text-block__subheading--underline':
          module.fields.showSubheadingUnderline
      }"
    >
      {{ module.fields.subheader }}
    </h3>
    <div class="text-block__content" v-html="bodyContent"></div>
  </div>
</template>

<script>
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

export default {
  name: 'TextBlock',
  props: {
    module: {
      type: Object,
      required: true
    }
  },
  created() {
    console.log('');
  },
  computed: {
    bodyContent() {
      return documentToHtmlString(this.module.fields.bodyContent);
    }
  }
};
</script>

<style></style>
