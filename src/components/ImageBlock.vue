<template>
  <div class="image">
    <img
      :src="module.fields.image.fields.file.url"
      :alt="module.fields.title"
    />
  </div>
</template>

<script>
export default {
  name: 'ImageModule',
  props: {
    module: {
      type: Object,
      required: true
    }
  }
};
</script>

<style></style>
