<template>
  <section class="page">
    <h1>{{ page.fields.pageTitle }}</h1>
  </section>
</template>

<script>
export default {
  name: 'ContentPage',
  props: {
    page: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped></style>
