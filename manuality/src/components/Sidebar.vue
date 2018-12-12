<template>
    

          <div role="tablist">
              
              <b-card style="border: 0px; border-radius: 0px; margin-bottom: -1px!important;" no-body class="mb-1">
                <b-card-header header-tag="header" class="p-1" style="border-bottom: 0px;" role="tab">
                  <b-btn block href="#"  class="title-btn" style="vertext-bottom;" size="lg">Manual Directory</b-btn>
                </b-card-header>
              </b-card>

              <b-card v-bind:key="category_entry" v-for="category_entry in this.categories" style="border: 0px; border-radius: 0px; margin-bottom: -1px!important;" no-body class="mb-1">
                <b-card-header header-tag="header" class="p-1" style="border-bottom: 0px;" role="tab">
                  <b-btn block href="#" v-b-toggle="category_entry"  class="cat-btn" size="lg">{{category_entry.name}}</b-btn>
                </b-card-header>
                <b-collapse :id="category_entry" accordion="my-accordion" role="tabpanel">
                  <b-card-body>
                      
                        <b-card
                          v-bind:key="product_entry"
                          v-for="product_entry in category_entry.products"
                          
                          style="border: 0px!important;">
                          
                          <b-btn
                            class="prod-btn"
                            size="sm"
                            v-on:click="redirectToProduct(product_entry)"
                            >
                              {{product_entry.name}}
                            </b-btn>
                        </b-card>
                      
                  </b-card-body>
                </b-collapse>
              </b-card>
              
          </div>



</template>

<script>

import {getAllCategories} from '../API'
import {findProductByCategoryId} from '../API'

export default {
  name: 'Sidebar',
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
       localStorage.setItem("profileImage", product_entry.profileImage)
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

.card-body {
  padding: 5px!important;
}

.card
{
  background-color:transparent; 
  margin-left: 0px !important;
}
</style>
