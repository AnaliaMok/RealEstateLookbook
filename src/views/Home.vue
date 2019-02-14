<template>
  <div class="home">
    <div class="home__header">
      <h1>Real Estate Lookbooks</h1>
      <p>Please note, none of these lookbooks describe real locations.</p>
    </div>
    <div class="home__lookbook-list">
      <div class="home__lookbook-list__item"></div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'home',
  // components: {
  //   HelloWorld
  // },
  data: function() {
    return {
      client: {},
      lookbooks: []
    };
  },
  created: function() {
    const contentful = require('contentful');
    this.client = contentful.createClient({
      space: process.env.VUE_APP_CONTENTFUL_SPACE_ID,
      accessToken: process.env.VUE_APP_CONTENTFUL_ACCESS_TOKEN
    });
  },
  mounted: function() {
    this.getLooksbooks(this);
  },
  methods: {
    getLooksbooks(self) {
      // Retrieving entries
      this.client
        .getEntries({
          content_type: 'contentPage'
        })
        .then(function(entries) {
          self.lookbooks = entries.items;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  &__header {
    margin-top: 8rem;
    padding: 2rem 0;
    text-align: center;

    p {
      font-weight: $medium;
    }
  }

  &__lookbook-list {
    display: flex;
  }
}
</style>
