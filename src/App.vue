<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
// vendor
// @import '../node_modules/animate.css/animate.min.css';
// @import '../node_modules/font-awesome/css/font-awesome.min.css';
// style
@import './assets/scss/style.scss';
// @import '../node_modules/bootstrap/scss/bootstrap.scss';

@import "~vue-material/dist/theme/engine"; // Import the theme engine

@include md-register-theme("default", (
  primary: rgba(70, 15, 2, 0.932), // md-get-palette-color(blue, A200), // The primary color of your application
  accent: rgb(146, 146, 146), //md-get-palette-color(red, A200), // The accent or secondary color
  theme: light // This can be dark or light
));

@import "~vue-material/dist/theme/all";
</style>
