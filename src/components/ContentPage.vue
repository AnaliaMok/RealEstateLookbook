<template>
  <section class="page" :class="pageClassObject" :style="pageStyleObject">
    <div
      class="page__row"
      v-for="row in page.fields.rowModules"
      :key="row.sys.id"
    >
      <div
        class="page__row__cell"
        :class="{
          'page__row__cell--text':
            getContentTypeName(module) === 'textModule' &&
            page.fields.rowModules.length == 1
        }"
        v-for="module in row.fields.contentModules"
        :key="module.sys.id"
      >
        <ImageBlock
          v-if="getContentTypeName(module) === 'imageModule'"
          :module="module"
        />
        <TextBlock
          v-else-if="getContentTypeName(module) === 'textModule'"
          :module="module"
        />
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
        padding: this.page.fields.fullBleed || !this.isParent ? 0 : '5rem'
      };
    },
    pageClassObject() {
      return {
        'page--full-height':
          this.page.fields.rowModules.length == 1 && this.isParent,
        'page--with-bleed':
          this.page.fields.fullBleed &&
          this.isParent &&
          this.page.fields.rowModules.length == 1,
        'page--with-gutter': this.page.fields.showGutter && this.isParent
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.page {
  &__row {
    display: flex;

    &__cell {
      position: relative;
      flex: 1 1 50%;
      max-width: 50%;

      .text-block {
        padding-left: 1rem;
      }
    }
  }

  &--full-height {
    .page {
      &__row {
        position: relative;
        min-height: 100vh;
        &__cell {
          min-height: 100px;
          &--text {
            min-height: 100vh;
          }
          .image {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
          }
          // .text-block {
          //   position: absolute;
          //   top: 0;
          //   left: 0;
          //   right: 0;
          //   overflow-y: auto;
          // }
        }
      }
    }
  }

  &--with-bleed {
    .text-block {
      padding: 4rem;
    }
  }
}
</style>
