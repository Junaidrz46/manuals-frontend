<template>
	<div id="product">
        <div class="body">

			<div style="display: flex;">

			<b-card :title="product.name"
					:img-src="imageUrl"
					:img-alt="product.name"
					img-top
					tag="article"
					style="max-width: 20rem; border: 0px;"
					class="mb-2">
				<p class="card-text">
					Number: {{product.productNumber}}
				</p>
				
				<div id="like" v-if="userIsConsumer">
					<b-button href="#" variant="primary">&#9733;</b-button>
					<b-button href="#" variant="primary">&#9734;</b-button>
				</div>
			</b-card>

			<div style="margin-left: 40px; margin-top: 30px;">
					<table style="border: 2px solid; min-width: 450px;">
						<thead>
							<th>Download</th>
							<th>Type</th>
							<th>Rating</th>
							<th v-if="userIsRepresentative">Remove</th>
						</thead>
						<tbody v-bind:key="material.id" v-for="material in product.materials" v-if="product.profileImage != material.id">
							<tr style="border: 1px solid;">
								<td>
									<a :href=material.fileDownloadUri>{{material.description}}</a>
								</td>
								<td>
									<img v-bind:src="material.fileIcon" class="smallImg">
								</td>
								
								<!-- TODO: v-if="logged_in" -->
								<td>
									<div v-if="userIsConsumer"> 
										<font size="5px">vote:&nbsp;</font>
										<select name="rating_dropdown" id="rating_dropdown" onchange="alert('Call API with value: '+this.value)" style="width: 40px; font-size:25px;">
											<option value="1">1</option>
											<option value="2">2</option>
											<option value="3">3</option>
											<option value="4">4</option>
											<option value="5">5</option>
										</select>
									</div>
									<div>
										<font size="5px">DELETEME{{score}}</font>
									</div>
								</td>
								<td v-if="userIsRepresentative">
									<img v-on:click="deleteMaterial(material.id)" src="../assets/delete_icon.svg" style="height: 40px">
								</td>
							</tr>							
						</tbody>
					</table>

					<!-- <div v-bind:key="material" v-for="material in product.materials" v-if="product.profileImage != material.id">
						<a :href=material.fileDownloadUri>{{material.description}} <img v-bind:src="material.fileIcon" class="smallImg"></a>
						<img v-on:click="deleteMaterial(material.id)" src="../assets/delete_icon.svg" style="height: 40px">
					</div> -->

				</div>
				</div>
			
        </div>
    </div>
</template>

<script>
import {findProductById, findMaterialById, deleteMaterialByID} from '../API'

export default {
  name: 'ProductPage',
  data () {
    return {
		product:[],
		isPdf: false,
		isImage: false,
		icon: 'https://i.gadgets360cdn.com/products/large/1519585124_635_samsung_galaxy_s9_blue.jpg',
		image: '',
		imageUrl: '',
    }
  },
  beforeMount: function () {
		findProductById(localStorage.getItem("lastViewedProduct"))
		.then(response => {
			this.product = response.data;
			console.log(this.product)
			console.log(this.product.materials)
			history.pushState(null, null, location.href);
    		window.onpopstate = function () {
        		history.go(1);
    		};
		})

		this.image = localStorage.getItem("profileImage")
		this.materials = localStorage.getItem("materials")

		findMaterialById(this.image)
		.then(response => {
			this.imageUrl = response.fileDownloadUri
		})		
	},
	methods: {
	    deleteMaterial: function(materialId) {
	      deleteMaterialByID(materialId).then(response => {
	        location.reload();
	      })
	    }
	},
	computed: {
		userIsRepresentative: function () {
			return localStorage.getItem('company') === this.product.companyId 
		},
		userIsConsumer: function () {
			return localStorage.getItem('permissions') === "consumer" 
		},
		
	}
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
	height: 40px;
	width: 40px;
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
	height: 500px;
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