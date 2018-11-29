<template>
  <div id="app" style="margin-top: 0px;">
    <Navbar />
    <router-view/>
    <Sidebar />
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
  color: #2c3e50;
  margin-top: 60px;
}
body
{
margin:0;
padding:0;
background-size:cover;
font-family:sans-serif;
background-color: lightgray;
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

</style>
