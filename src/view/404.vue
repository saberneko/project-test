<template>
<div class="page-wrapper">
  <div class="not-found-wrapper">
    <span class="not-found-text">
      404 NOT FOUND
    </span>
  </div>
</div>
</template>

<script>
export default {
  name: 'not-found-page',

  data () {
    return {

    }
  }
}
</script>

<style lang="stylus" scoped>
.page-wrapper
  height: 100vh;
  width: 100vw;

.not-found
  &-wrapper
    display table
    margin 0 auto
    height 100%
    text-align center
    vertical-align middle

  &-text
    display table-cell
    vertical-align middle
    // text-align center
    // width 100%
    // height 100%
    // margin 0 auto
</style>
