<template>
  <div id="app" style="margin-top: 0px;">
    
    <Navbar />

    <b-container class="container-no-margin" fluid>
      <b-row>
        <b-col sm="6" md="4" lg="2" class="column-no-margin">
          <Sidebar />
        </b-col>
        <b-col>
          <router-view/>
        </b-col>
      </b-row>
    </b-container>

    <!-- TEST -->
    
     <!-- END TEST -->

  </div>
</template>

<script>
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'

export default {
  name: 'App',
  components: {
    Navbar,
    Sidebar
  }
}

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #7B6652;
  margin-top: 60px;
}
body
{
margin:0;
padding:0;
background-size:cover;
font-family:sans-serif;
background-color: #d7cec7;
}
h1
{
	margin:0;
	text-align:center;
	color:#F08080;
}
h2
{
	margin:0;
	padding:0 0 20px;
	color:#FFF8DC;
	text-align:center;
} 

.container-no-margin
{
  padding-left: 0px !important;
  padding-right: 0px !important;
  margin-left: 0px !important;
  margin-right: 0px !important;
}

.column-no-margin
{
  padding-left: 0px !important;
  padding-right: 0px !important;
  margin-left: 0px !important;
  margin-right: 0px !important;
}


</style>
