<template>
  <select v-model="bigmatter">
    <option v-for="item in bigmatters" :value="item">{{item.GP_name}}</option>
  </select>
</template>

<script>
/* eslint-disable */

import R from '../common/request'
import { GP } from '../common/index'

export default {
  name: 'bigpicker',

  props: {
    bigmatter: {
      type: String,
      default:''
    }
  },

  data () {
    return {
      bigmatters: null
    }
  },

  ready () {
    R.post('/Service/GetBigMatterList.ashx').then(data => {
      this.bigmatters = data
    })
  }
}
</script>
