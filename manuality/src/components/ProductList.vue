<template>
    





</template>

<script>

import {getAllCategories} from '../API'
import {findProductByCategoryId} from '../API'

export default {
  name: 'ProductList',
  data () {
    return {
      categories: [],
      products:[]
    }
  },
  beforeMount: function() {
            getAllCategories().then(response => {
                
                response.forEach(element => {
                    this.categories.push(element)
                    
                });
                console.log(this.categories[0].id)
            });
      },
  methods: {
    populateSidebar: function() {
      getAllCategories().then(response => {
            response.forEach(element => {
                this.categories.push(element)
            });
            console.log(this.cat)
          }
      )
    },
    redirectToProduct: function (product_entry) {
      localStorage.setItem("lastViewedProduct", product_entry.id)
      this.$router.push( '/products/' + product_entry.id )
      location.reload();
    }
  } 
}
</script>

<style>

.title-btn
{
  border-color: rgb(255, 255, 255);
  background-color: rgb(255, 255, 255);
  font-weight: bold;
  font-size: 25px;
  color: black;
  height: 70px;
  padding-top:15px;
  margin-left: 0px !important;
}

.cat-btn
{
  border-color: rgb(52,58,64);
  background-color: rgb(52,58,64);
  font-weight: bold;
  margin-left: 0px !important;
}

.brand-btn
{
  border-color: rgb(108,117,125);
  background-color: rgb(108,117,125);
  font-weight: bold;
  color: rgb(255, 255, 255);
  margin-left: 0px !important;
}

.prod-btn
{
  border-color: rgb(196, 205, 214);
  background-color: rgb(196, 205, 214);
  font-weight: bold;
  color: rgb(52,58,64);
  margin-left: 0px !important;
}

.card
{
  background-color:transparent; 
  margin-left: 0px !important;
}
</style>
