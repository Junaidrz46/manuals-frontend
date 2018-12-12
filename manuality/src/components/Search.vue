<template>
    <ProductList v-bind:listOfProducts="products" />
</template>


<script>
import {search} from '../API'
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

    search(this.$route.params.search_query).then(response_with_products => {
        
        console.log(response_with_products)
        
        
        response_with_products.forEach(element => {
            this.products.push(element)
        });
        console.log(this.products)
    });
      },    
}
</script>
