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
      <b-carousel-slide v-bind:key="element" v-for="element in this.arr"
                        caption="First slide"
                        text="Nulla vitae elit libero, a pharetra augue mollis interdum."
                        img-src="https://picsum.photos/1024/480/?image=52"
      ></b-carousel-slide>


    </b-carousel>

    <p class="mt-4">
      Slide #: {{ slide }}<br>
      Sliding: {{ sliding }}
    </p>
    </div>
</template>

<script>
export default {
  data () {
    return {
      slide: 0,
      sliding: null,
      arr: ["Slide 1", "Slide 2", "Slide 3"]
    }
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

