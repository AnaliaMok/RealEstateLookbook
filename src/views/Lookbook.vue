<template>
  <div class="lookbook" v-if="lookbook.fields">
    <!-- TODO: Need to make currently displayed page reactive -->
    <CoverPage
      :page="lookbook.fields.coverPage"
      :authorName="lookbook.fields.authorName"
    />
  </div>
</template>

<script>
import { contentfulClientMixin } from '@/mixins/contentfulClientMixin.js';
import CoverPage from '@/components/CoverPage.vue';

export default {
  name: 'lookbook',
  mixins: [contentfulClientMixin],
  components: {
    CoverPage
  },
  data() {
    return {
      slug: '',
      lookbook: {},
      pages: []
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
      this.pages = this.lookbook.fields.pages;
    }
  }
};
</script>

<style lang="scss" scoped>
.lookbook {
  position: relative;
  height: 100vh;
  width: 100vw;
  max-height: 100vh;
  max-width: 100vw;
  overflow: hidden;
}
</style>
