<template>
  <div class="home">
    <div class="home__header">
      <img src="../assets/mansion.png" alt="Mansion Illustration" />
      <h1>Real Estate Lookbooks</h1>
      <p>Please note, none of these lookbooks describe real locations.</p>
    </div>
    <div class="home__lookbook-list">
      <router-link
        :to="/lookbook/ + lb.fields.slug"
        class="home__lookbook-list__item"
        v-for="lb in lookbooks"
        :key="lb.sys.id"
      >
        <img
          :src="lb.fields.thumbnail.fields.file.url"
          :alt="lb.fields.title"
        />
        <h3>{{ lb.fields.title }}</h3>
      </router-link>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { contentfulClientMixin } from '@/mixins/contentfulClientMixin.js';

export default {
  name: 'home',
  mixins: [contentfulClientMixin],
  data() {
    return {
      lookbooks: []
    };
  },
  created() {
    this.getLooksbooks();
  },
  methods: {
    getLooksbooks: async function() {
      // Retrieving entries
      this.lookbooks = await this.getEntries('lookbook');
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

    img {
      display: block;
      max-width: 10%;
      margin: 0 auto;
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
      color: $black;
      text-align: center;
      background-color: $white;
      box-shadow: 2px 4px 6px rgba(0, 0, 0, 0.16);
      border-radius: 1.5rem;
      overflow: hidden;
      transition: all 0.3s;

      &:hover {
        box-shadow: 2px 2px 25px rgba(0, 0, 0, 0.5);
      }

      img {
        width: 100%;
        height: auto;
      }

      h3 {
        padding: 0.75rem 1rem 1rem;
      }
    }
  }
}
</style>
