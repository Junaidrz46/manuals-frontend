<template>
    <ProductList v-bind:listOfProducts="products" />
</template>


<script>
import {searchProducts} from '../API'
import ProductList from '@/components/ProductList'


export default {
  name: 'Search',
  components: {
    ProductList
  },
  data () {
    return {
      products:[]
    }
  },
  beforeMount: function() {

    console.log(this.$route.params.search_query )

    searchProducts(this.$route.params.search_query).then(response => {
        
        console.log(response)
        
        
        response.forEach(element => {
            this.products.push(element)
        });
        console.log(this.products)
    });
      },    
}
</script>
