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
    getEntries: async function(contentType) {
      let result = await this.client
        .getEntries({
          content_type: contentType
        })
        .then(function(entries) {
          return entries.items;
        });

      return result;
    },
    getEntryBySlug: async function(contentType, slug) {
      let result = await this.client
        .getEntries({
          content_type: contentType,
          'fields.slug': slug
        })
        .then(function(entry) {
          if (entry.items.length > 0) {
            return entry.items[0];
          }

          return {};
        });

      return result;
    }
  }
};
