<template>
    <div class="recent">
        <b-carousel id="carousel1"
            style="text-shadow: 1px 1px 2px #333;"
            controls
            indicators
            background="#ababab"
            :interval="4000"
            img-width="1024"
            img-height="480"
            v-model="slide"
            @sliding-start="onSlideStart"
            @sliding-end="onSlideEnd"
    >

      <!-- Text slides with image -->
      <b-carousel-slide v-bind:key="element" v-for="element in this.products"
                        :caption="element.name"
                        :text="element.description"
                        :img-src="element.profileImage"
      ></b-carousel-slide>


    </b-carousel>

    <p class="mt-4">
      Slide #: {{ slide }}<br>
      Sliding: {{ sliding }}
    </p>
    </div>
</template>

<script>

import {getRecentProducts} from '../API'
import {findMaterialById} from '../API'

export default {
  data () {
    return {
      slide: 0,
      sliding: null,
      products: [],
      products2: [],
      test: ''
    }
  },
  beforeMount: function(){
    getRecentProducts().then(response => {
      response.forEach(element => {
        this.products.push(element)
      });
    //  console.log(this.products)
    })
    this.products.forEach(product => {
      findMaterialById(product.profileImage).then(response => {	
			  product.profileImage = response.fileDownloadUri
		  })
    });
  console.log(this.products)
  console.log(this.test)
  },

  methods: {
    onSlideStart (slide) {
      this.sliding = true
    },
    onSlideEnd (slide) {
      this.sliding = false
    }
  }
}
</script>

<style>
.recent{
    width: auto;
    height: auto;
    margin-right: 20px;
    margin-top: 30px;
}
</style>

