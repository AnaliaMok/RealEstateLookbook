<template>
  <div class="attributions">
    <h1 class="heading-one">Attributions</h1>
    <p>
      All photos were found at
      <a href="https://unsplash.com" target="_blank" rel="noopener nofollow"
        >Unsplash</a
      >
    </p>
    <div class="attributions__content" v-html="pageContent"></div>
  </div>
</template>

<script>
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

export default {
  name: 'AttributionsPage',
  props: {
    page: {
      type: Object,
      required: true
    }
  },
  computed: {
    pageContent() {
      return documentToHtmlString(this.page.fields.attributions);
    }
  }
};
</script>

<style lang="scss" scoped>
.attributions {
  padding: 4rem;
  color: $dark-grey;

  h1,
  h2 {
    color: $black;
  }

  ul li a {
    color: $slate;
  }
}
</style>
