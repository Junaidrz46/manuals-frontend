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
                  <b-card-body >
                        
                            <div role="tablist">
                                <b-card v-bind:key="brand_entry" v-for="brand_entry in category_entry.brands" style="border: 0px!important; border-radius: 0px; margin-bottom: -1px!important; " no-body class="mb-1">
                                  <b-card-header header-tag="header" class="p-1" role="tab" style="border-bottom: 0px; background-color: rgba(0,0,0,0.0)">
                                    <b-btn block href="#" v-b-toggle="brand_entry" class="brand-btn" size="md">{{brand_entry.name}}</b-btn>
                                  </b-card-header>
                                  
                                      <b-collapse :id="brand_entry" accordion="my-accordion1" class="mt-2">
                                        <b-card style="border: 0px!important;">
                                          <b-btn
                                            v-bind:key="product_entry"
                                            block href="#"
                                            class="prod-btn"
                                            size="sm"
                                            v-for="product_entry in brand_entry.products"> {{product_entry.name}} </b-btn>
                                        </b-card>
                                      </b-collapse>
                                </b-card>
                            </div>
    
                  </b-card-body>
                </b-collapse>
              </b-card>
              
          </div>



</template>

<script>

import {getAllCategories} from '../API'

export default {
  name: 'Sidebar',
  data () {
    return {
      categories: []
      /* categories: [
        {
          category: 'cat1',
          brands :[
            {
              brand: 'brand1-cat1',
              products: [
                  {product: 'product1-brand1-cat1'},
                  {product: 'product2-brand1-cat1'},
                  {product: 'product3-brand1-cat1'}
              ],
            },
            {
              brand: 'brand2-cat1',
              products: [
                  {product: 'product1-brand2-cat1'},
                  {product: 'product2-brand2-cat1'},
                  {product: 'product3-brand2-cat1'}
              ],
            }
          ]
        },

        {
          category: 'cat2',
          brands :[
            {
              brand: 'brand1-cat2',
              products: [
                  {product: 'product1-brand1-cat2'},
                  {product: 'product2-brand1-cat2'},
                  {product: 'product3-brand1-cat2'}
              ],
            },
            {
              brand: 'brand2-cat2',
              products: [
                  {product: 'product1-brand2-cat2'},
                  {product: 'product2-brand2-cat2'},
                  {product: 'product3-brand2-cat2'}
              ],
            }
          ]
        }
      
      ]  */
    }
  },
  beforeMount: function() {
            getAllCategories().then(response => {
                
                response.forEach(element => {
                    this.categories.push(element)
                    
                });


                console.log(response.element.Object)
            })
            //localStorage.setItem("latestAddedProduct", '5bfd83619110f2297fc7de38');
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
