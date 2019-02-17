<template>
  <section class="page" :style="pageStyleObject">
    <div
      class="page__row"
      v-for="row in page.fields.rowModules"
      :key="row.sys.id"
    >
      <div
        class="page__row__cell"
        v-for="module in row.fields.contentModules"
        :key="module.sys.id"
      >
        <ImageBlock v-if="getContentTypeName(module) === 'imageModule'" />
        <TextBlock v-else-if="getContentTypeName(module) === 'textModule'" />
        <!-- TODO: Handle nested rows -->
      </div>
    </div>
  </section>
</template>

<script>
import { entryHelpersMixin } from '@/mixins/entryHelpersMixin.js';
import ImageBlock from '@/components/ImageBlock.vue';
import TextBlock from '@/components/TextBlock.vue';

export default {
  name: 'ContentPage',
  mixins: [entryHelpersMixin],
  components: {
    ImageBlock,
    TextBlock
  },
  props: {
    page: {
      type: Object,
      required: true
    }
  },
  computed: {
    pageStyleObject() {
      return {
        padding: this.page.fields.fullBleed ? 0 : '10rem'
      };
    }
  }
};
</script>

<style lang="scss" scoped></style>
