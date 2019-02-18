<template>
  <div class="lookbook" v-if="lookbook.fields">
    <CoverPage
      :page="lookbook.fields.coverPage"
      :authorName="lookbook.fields.authorName"
      v-show="currentPage == -1"
    />
    <ContentPage
      v-if="currentPage >= 0"
      :page="pages[currentPage]"
      :lookbookID="lookbook.sys.id"
    />
    <div class="lookbook__controls">
      <button class="lookbook__controls__control" @click="goToPrevPage">
        Previous Page
      </button>
      <router-link to="/">Back to Home</router-link>
      <button class="lookbook__controls__control" @click="goToNextPage">
        Next Page
      </button>
    </div>
  </div>
</template>

<script>
import { contentfulClientMixin } from '@/mixins/contentfulClientMixin.js';
import CoverPage from '@/components/CoverPage.vue';
import ContentPage from '@/components/ContentPage.vue';

export default {
  name: 'lookbook',
  mixins: [contentfulClientMixin],
  components: {
    CoverPage,
    ContentPage
  },
  data() {
    return {
      slug: '',
      lookbook: {},
      pages: [],
      currentPage: -1
    };
  },
  watch: {
    '$route.params.slug': function() {
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
      this.currentPage = -1;
    },
    getLookbook: async function() {
      this.lookbook = await this.getEntryBySlug('lookbook', this.slug);
      this.pages = this.lookbook.fields.pages;
    },
    goToPrevPage() {
      if (this.currentPage <= -1) {
        // Loop back to last page
        this.currentPage = this.pages.length - 1;
      } else {
        this.currentPage--;
      }
    },
    goToNextPage() {
      if (this.currentPage == this.pages.length - 1) {
        // Loop back to cover page
        this.currentPage = -1;
      } else {
        this.currentPage++;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.lookbook {
  position: relative;

  &__controls {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
    display: flex;
    justify-content: center;
  }

  a {
    color: $orange; // TEMP
  }
}
</style>
