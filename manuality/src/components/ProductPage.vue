<template>

	<div id="product">
        <div class="body">
			<form>
				<h1>Specific product name</h1>				
				<div class="productdetails">	
					<h3><!-- Product Brand -->{{product.brand}}</h3>
					<h3><!-- Product Name -->{{product.name}}</h3>
					<h3><!-- Product ID -->{{product.number}}</h3>
				</div>
				<div >
					<fieldset>
						<legend>Materails (manuals)</legend>
						<div v-bind:key="material" v-for="material in product.materials">
							<div class="matname">Material 1 (Name and description){{material.name}}</div>
							<button type="button" class="matbtn">Download/View {{material.fileDownloadUri}}</button>
							<div class="space"/>
						</div>
					</fieldset>
				</div>
			</form>
        </div>
    </div>

</template>



<script>
import {findProductById} from '../API'
export default {
  name: 'ProductPage',
  //props: ['product', 'brand'],
  data () {
    return {
		productId: "5c0007759b30313659811b31",
		product:{},/* product: this.product,//product: {name: 'product 1', number: 'id111', materials:[{downloadLink: 'link1'}, {downloadLink: 'link2'}]},
		/* brand: this.brand */brand: {name: 'brandName'}
    }
  },
  beforeMount: function() {
            findProductById(this.productId).then(response => {
                
				this.product=response;
				
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
.body
{
	position:absolute;
	margin-left:580px;
	margin-top:-200px;
	border: 1px solid black;
	padding:0;
	border-radius: 6px;
	background-size:cover;
	font-family:sans-serif;
	background-color:white;
	height: 500px;
	width: 850px;
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

}
.productdetails
{	
	width:300px;
	height:150px;
	position: relative;
	left:150px;
	top:50px;
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
	position: relative;
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
	height:	auto;
	position: relative;
	left:150px;
	top:100px;
	background-color:#C0C0C0;
	border-radius:20px;
	padding-left:20px;
}
.matname
{
	float:left;
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