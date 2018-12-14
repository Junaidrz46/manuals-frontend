<template>

    <b-container fluid>


    <b-table hover
             :items="items"
             :fields="fields" 
             @row-clicked="redirectToProduct"
              style = "cursor: pointer"
             >
      <template slot="name" slot-scope="data"> {{data.value}} </template>
      <template slot="productNumber" slot-scope="data"> {{data.value}} </template>
      <template slot="description" slot-scope="data">
        <b-img thumbnail fluid width="100" height="100" v-bind:src="data.value" alt="Thumbnail" />
      </template>
     
    </b-table>

  </b-container> 
</template>

<script>

import {getAllCategories} from '../API'
import {findMaterialById} from '../API'

export default {
  name: 'ProductList',
  props: ['listOfProducts'],
  data () {
    return {

      items: this.listOfProducts,
      fields: [
         { key: 'name', label: 'Product'},
         { key: 'productNumber', label: 'Number'},
         { key: 'description', label: 'Preview'}
      ]
    }
  },
  methods: {

    redirectToProduct: function (product, index) {
      localStorage.setItem("profileImage", product.profileImage)
      localStorage.setItem("lastViewedProduct", product.id)
      this.$router.push( '/products/' + product.id )
      location.reload();
    }
  } 
}
</script>

<style>


</style>
