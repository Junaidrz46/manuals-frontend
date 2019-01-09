<template>
    <div class="recent" style="width:1024px; height:480px; !important">
        <b-carousel id="carousel1"
            style="text-shadow: 1px 1px 2px #333;"
            controls
            indicators
            background="#ababab"
            :interval="3000"
            img-width="1024"
            img-height="200"
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
      test: []
    }
  },
  beforeMount: function(){
    getRecentProducts().then(response => {
      console.log(response)
      response.forEach(element => {
        findMaterialById(element.profileImage).then((function(result) {
          element.profileImage=result.fileDownloadUri}
        ));
        this.products.push(element)
        });
    })
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

