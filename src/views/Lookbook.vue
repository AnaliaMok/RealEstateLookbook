<template>
  <div class="lookbook">
    <h2 v-if="lookbook.fields">{{ lookbook.fields.title }}</h2>
  </div>
</template>

<script>
import { contentfulClientMixin } from '@/mixins/contentfulClientMixin.js';

export default {
  name: 'lookbook',
  mixins: [contentfulClientMixin],
  data() {
    return {
      slug: '',
      lookbook: {}
    };
  },
  watch: {
    '$route.params.slug': function($slug) {
      this.updateComponent();
    }
  },
  created() {
    this.updateComponent();
  },
  methods: {
    updateComponent() {
      this.slug = this.$route.params.slug;
      this.getLookbook();
    },
    getLookbook: async function() {
      this.lookbook = await this.getEntryBySlug('lookbook', this.slug);
      console.log(this.lookbook);
    }
  }
};
</script>

<style lang="scss" scoped>
.lookbook {
  position: relative;
  height: 100vh;
  width: 100vw;
}
</style>
