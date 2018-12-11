<template>
    <ProductList v-bind:products="products" />
</template>


<script>
import {search} from '../API'

export default {
  name: 'Search',
  data () {
    return {
      products:[]
    }
  },
  beforeMount: function() {
    search(this.$route.query.search_query).then(response_with_products => {
        
        response_with_products.forEach(element => {
            this.products.push(element)
        });
        console.log(this.categories[0].id)
    });
      },    
}
</script>
