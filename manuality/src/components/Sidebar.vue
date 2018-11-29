<template>
    

    <b-container fluid>

      <b-row align-v="center">


        <b-col lg=3>
          <div role="tablist">
              
              <b-card v-bind:key="category_entry" v-for="category_entry in this.categories" style="border: 0px; border-radius: 0px; margin-bottom: -1px!important;" no-body class="mb-1">
                <b-card-header header-tag="header" class="p-1" style="border-bottom: 0px; background-color: rgba(0,0,0,0.0)" role="tab">
                  <b-btn block href="#" v-b-toggle="category_entry" variant="info" size="lg">{{category_entry.category}}</b-btn>
                </b-card-header>
                <b-collapse :id="category_entry" accordion="my-accordion" role="tabpanel">
                  <b-card-body >
                        
                            <div role="tablist">
                                <b-card v-bind:key="brand_entry" v-for="brand_entry in category_entry.brands" style="border: 0px!important; border-radius: 0px; margin-bottom: -1px!important; " no-body class="mb-1">
                                  <b-card-header header-tag="header" class="p-1" role="tab" style="border-bottom: 0px; background-color: rgba(0,0,0,0.0)">
                                    <b-btn block href="#" v-b-toggle="brand_entry" variant="secondary" size="md">{{brand_entry.brand}}</b-btn>
                                  </b-card-header>
                                  
                                      <b-collapse :id="brand_entry" accordion="my-accordion1" class="mt-2">
                                        <b-card style="border: 0px!important;">
                                          <b-btn
                                            v-bind:key="product_entry"
                                            block href="#"
                                            variant="outline-success"
                                            size="sm"
                                            v-for="product_entry in brand_entry.products"> {{product_entry.product}} </b-btn>
                                        </b-card>
                                      </b-collapse>
                                </b-card>
                            </div>
    
                  </b-card-body>
                </b-collapse>
              </b-card>
              
          </div>
        </b-col>

      </b-row>
    </b-container>



</template>

<script>

import {getAllCategories} from '../API'

export default {
  name: 'Sidebar',
  data () {
    return {
      // categories: this.getAllCategories()
      categories: [
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
      
      ] 
    }
  }
  // ,
  // methods: {
  //   populateSidebar: function() {
  //     getAllCategories().then(response => {
  //           response.forEach(element => {
  //               this.categories.push(element)
  //           });
  //           console.log(this.cat)
  //         }
  //     )
  //   }
  // } 
}
</script>
