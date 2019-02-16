<template>
  <div class="home">
    <div class="home__header">
      <h1>Real Estate Lookbooks</h1>
      <p>Please note, none of these lookbooks describe real locations.</p>
    </div>
    <div class="home__lookbook-list">
      <div
        class="home__lookbook-list__item"
        v-for="lb in lookbooks"
        :key="lb.sys.id"
      >
        <img
          :src="lb.fields.thumbnail.fields.file.url"
          :alt="lb.fields.title"
        />
        <h3>{{ lb.fields.title }}</h3>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { contentfulClientMixin } from '../mixins/contentfulClientMixin.js';

export default {
  name: 'home',
  mixins: [contentfulClientMixin],
  data: function() {
    return {
      lookbooks: []
    };
  },
  created: function() {
    this.getLooksbooks();
  },
  methods: {
    getLooksbooks() {
      // Retrieving entries
      this.getEntries('lookbook');
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  &__header {
    margin: 8rem 0 4rem;
    padding: 2rem 0;
    text-align: center;

    p {
      font-weight: $medium;
    }
  }

  &__lookbook-list {
    display: flex;
    width: 80%;
    margin: 0 auto;

    &__item {
      flex: 1 1 33.33%;
      max-width: 33.33%;
      margin: 0 1rem 1rem;

      img {
        width: 100%;
        height: auto;
      }
    }
  }
}
</style>
