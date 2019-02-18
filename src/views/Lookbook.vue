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
      <router-link to="/">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          class="home-icon"
          alt="Back To Home"
        >
          <path d="M8 20H3V10H0L10 0l10 10h-3v10h-5v-6H8v6z"></path>
        </svg>
      </router-link>
      <button class="lookbook__controls__control" @click="goToPrevPage">
        <!-- Left Chevron -->
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path
            d="M7.05 9.293L6.343 10 12 15.657l1.414-1.414L9.172 10l4.242-4.243L12 4.343z"
          ></path>
        </svg>
        <span>Previous</span>
      </button>
      <div class="lookbook__controls__curr">{{ currentPage + 2 }}</div>
      <button class="lookbook__controls__control" @click="goToNextPage">
        <span>Next</span>
        <!-- Right Chevron -->
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path
            d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z"
          ></path>
        </svg>
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
  min-height: 100vh;

  &__controls {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    svg {
      min-width: 3rem;
    }

    .home-icon {
      margin: 1rem;
      transition: all 0.2s;
      fill: $orange;

      &:hover {
        fill: $orange;
      }
    }

    &__curr {
      font-weight: $semibold;
      font-size: 1.8rem;
    }

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      outline: none;
      border: none;
      border-radius: 5px;
      background-color: $off-white;
      box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.25);
      margin: 1rem;
      padding: 0 1rem;
      font-family: $secondary-font;
      font-size: 1.6rem;
      cursor: pointer;

      svg {
        margin: 0.5rem;
      }
    }
  }

  a {
    color: $orange; // TEMP
  }

  ul {
    margin: 0;
  }
}
</style>
