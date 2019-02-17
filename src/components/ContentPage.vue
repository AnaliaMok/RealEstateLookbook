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
        <!-- Formatting page object to follow this component's template rendering -->
        <ContentPage
          v-else
          :isParent="false"
          :page="{ fields: { rowModules: [module] } }"
        />
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
    },
    isParent: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    pageStyleObject() {
      return {
        padding: this.page.fields.fullBleed || !this.isParent ? 0 : '10rem'
      };
    }
  }
};
</script>

<style lang="scss" scoped></style>
