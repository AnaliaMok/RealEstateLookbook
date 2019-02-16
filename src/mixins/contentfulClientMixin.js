export const contentfulClientMixin = {
  data() {
    return {
      client: {}
    };
  },
  created() {
    const contentful = require('contentful');
    this.client = contentful.createClient({
      space: process.env.VUE_APP_CONTENTFUL_SPACE_ID,
      accessToken: process.env.VUE_APP_CONTENTFUL_ACCESS_TOKEN
    });
  },
  methods: {
    getEntries(contentType) {
      this.client
        .getEntries({
          content_type: contentType
        })
        .then(function(entries) {
          // self.lookbooks = entries.items;
          console.log(entries);
        });
    }
  }
};
