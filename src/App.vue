<template>
  <div id="app">
    <!-- TODO: Implement dynamic router for "page flipping" -->
    <!-- <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>
    </div>-->
    <router-view />
  </div>
</template>

<style lang="scss">
body {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
#app {
  font-family: $primary-font;
  color: #2c3e50;
}
</style>
