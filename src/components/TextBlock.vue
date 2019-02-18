<template>
  <div class="text-block">
    <h1
      v-if="module.fields.showHeading"
      class="heading-one text-block__heading"
      :class="{
        'text-block__heading--underline': module.fields.showHeadingUnderline
      }"
      :style="headingStyleObject"
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
    <div
      class="text-block__content body-text"
      v-html="bodyContent"
      :style="headingStyleObject"
    ></div>
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
  computed: {
    bodyContent() {
      return documentToHtmlString(this.module.fields.bodyContent);
    },
    headingStyleObject() {
      const moduleTextAlign = this.module.fields.headingTextAlignment
        .toLowerCase()
        .trim();

      return {
        'text-align': moduleTextAlign
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.text-block {
  padding: 5rem;
  overflow-y: auto;

  &__heading {
    color: $black;
  }

  &__subheading {
    font-family: $primary-font;
    font-size: 1.8rem;
    color: $slate;
    font-weight: 500;
  }

  &__content {
    color: $dark-grey;
  }

  ul {
    margin: 0;
    padding: 0;

    p {
      margin: 0 0 0.5rem;
    }
  }
}
</style>
