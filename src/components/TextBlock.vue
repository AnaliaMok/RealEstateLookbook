<template>
  <div>Text Block</div>
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
  }
};
</script>

<style></style>
