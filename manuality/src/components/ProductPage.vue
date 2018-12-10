<template>
	<div id="product">
        <div class="body">
			<form>
				<h1>{{product.name}}</h1>
				<div>
					<!-- Need to add product image from the DB here -->
					<img class="productImg" src="https://i.gadgets360cdn.com/products/large/1519585124_635_samsung_galaxy_s9_blue.jpg" alt="productImg">
				</div>				
				<div class="productdetails">	
					<h3>Product: {{product.name}}</h3>
					<h3>Number: {{product.productNumber}}</h3>
					<div >
						<h3>Materials (manuals):</h3>
						<div v-bind:key="material" v-for="material in product.materials">
							<div class="matname">
								{{material.name}}
							</div>
							<ul>
								<!-- Need to add material descriptive name from the DB here -->
								<li><a :href=material.fileDownloadUri>Download/View <img class="smallImg" src="http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/sign-check-icon.png"></a></li>
							</ul>
							<div/>
						</div>
				</div>
				</div>
				
			</form>
        </div>
    </div>
</template>

<script>
import {findProductById} from '../API'
export default {
  name: 'ProductPage',
  data () {
    return {
		product:[]
    }
  },
  beforeMount: function () {
		findProductById(localStorage.getItem("lastViewedProduct"))
		.then(response => {
			this.product=response.data;
		})
	},
}
</script>

<style>
h1
{
	margin:200;
	text-align:center;
	color:#101010;
}
h3{
	text-align: left;
}
.smallImg{
	height: 20px;
	width: 20px;
}
.productImg{
	width: 350px;
	height: 250px;
}

.body
{
	position:absolute;
	border: 1px solid black;
	padding:0;
	border-radius: 6px;
	background-size:cover;
	font-family:sans-serif;
	background-color:white;
	height: 650px;
	width: 850px;
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	margin-left: 17%;
	margin-top: 4%; 

}
.productdetails
{	
	width:90%;
	height:250px;
	position: static;
	margin-left: 40px;
	margin-top: 20px;
	padding-top:10px;
	background-color:#C0C0C0;
	border-radius:20px;
	padding-left:20px;
	font:bold 18px;
}
.materaildetails
{	
	width:auto;
	height:auto;
	position: inherit;
	left:250px;
	top:50px;
	padding-top:10px;
	background-color:#C0C0C0;
	border-radius:20px;
	padding-left:20px;
	font:bold 18px;
}
fieldset
{
	width:550px;
	height:	100px;
	position: relative;
	left:40px;
	top:50px;
	background-color:#C0C0C0;
	border-radius:20px;
	/* padding-left:20px; */
}
.matname
{
	float:left;
}
li{
	text-align: left
}
.matbtn
{
	margin:0 auto 0 20%;
	float:left;
	padding-top:5px;	
	background-color:#2F4F4F;
	color:white;
	border-radius:4px;
	border:2px #696969;
}
.matbtn:hover
{
	background-color:black;	
}
.matname1
{
	padding-top:10;
	float:left;
}
.matbtn1
{
	margin:0 auto 0 20%;
	float:left;
	background-color:#2F4F4F;
	color:white;
	padding-top:5px;
	border-radius:4px;
	border:2px #696969;
}
.matbtn1:hover
{
	background-color:black;	
}
.space{
    width:15px;
    height:auto;
    display:inline-block;
}
</style>