<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
#app {
 font-family: sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-image: url("./assets/background.jpg");
  height: 100vh;
}
</style>

<!-- @font-face {
  font-family: hateFont;
  src: url("./assets/droid-serif-fontfacekit/web fonts/droidserif_regular_macroman/DroidSerif-Regular-webfont.woff")
    format("woff");
} -->