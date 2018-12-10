<template>

    <b-container fluid>
    <!-- <b-alert show>{{items}}</b-alert> -->


    <b-table hover
             :items="items"
             :fields="fields" 
             @row-clicked="redirectToProduct"
              style = "cursor: pointer"
             >
             <!-- :current-page="currentPage"
             :per-page="perPage" --> >   
      <template slot="name" slot-scope="data"> {{data.value}} </template>
      <template slot="productNumber" slot-scope="data"> {{data.value}} </template>
      <template slot="profileImage" slot-scope="data">
        <b-img thumbnail fluid width="100" height="100" v-bind:src="data.value" alt="Thumbnail" />
      </template>
      <!-- <template slot="view" slot-scope="data">  
        <b-button size="sm" @click.stop="redirectToProduct(data.items.id)">
          View
        </b-button>
      </template> -->
     
    </b-table>
<!--
    <b-row>
      <b-col>
        <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage"/>
      </b-col>
    </b-row>
-->
  </b-container> 
</template>

<script>

import {getAllCategories} from '../API'
import {findProductByCategoryId} from '../API'
//const items=[{name: 'default name', productNumber: 'default num', profileImage: 'default img' }]

export default {
  name: 'ProductList',
  props: ['listOfProducts'],
  data () {
    return {
      
      /*categories: [],
      products:[], */
      items: this.listOfProducts,
      /* items: [{name: 'name3', productNumber: 'num111', profileImage: 'i1' },
              {name: 'name2', productNumber: 'num111', profileImage: 'i2' }], */
      fields: [
         { key: 'name', label: 'Product'},
         { key: 'productNumber', label: 'Number'},
         { key: 'profileImage', label: ' '}
      ],
      /* currentPage: 1,
      perPage: 10,
      totalRows: items.length */
    }
  },
  /* beforeMount: function() {
            getAllCategories().then(response => {
                
                response.forEach(element => {
                    this.categories.push(element)
                    
                });
                console.log(this.categories[0].id)
            });
            
      }, */
  methods: {
    redirectToProduct: function (product, index) {
      localStorage.setItem("lastViewedProduct", product.id)
      this.$router.push( '/products/' + product.id )
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
