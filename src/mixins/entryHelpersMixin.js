export const entryHelperMixin = {
  methods: {
    getFile(fileObj) {
      // Extract content type file
      return fileObj.fields.file;
    },
    getContentTypeName(entry) {
      // Retrieve content type ID
      return entry.sys.contentType.sys.id;
    }
  }
};
