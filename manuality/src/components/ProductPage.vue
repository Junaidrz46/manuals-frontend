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
					<b-button v-on:click="saveLikedProduct" @click="showAlert" variant="primary">&#9733;</b-button>
					<b-button v-on:click="deleteLikedProduct" @click="showAlert" variant="primary">&#9734;</b-button>
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
						<tbody v-bind:key="material.id" v-for="material in allMaterials" v-if="product.profileImage != material.id">
							<tr style="border: 1px solid;">
								<td>
									<a v-on:click="increaseAccessCountMaterial(material.id)" :href=material.fileDownloadUri>{{material.description}}</a>
								</td>	
								<td>
									<img v-bind:src="material.fileIcon" class="smallImg">
								</td>
							
								<td>
									<div id="vote" v-if="userIsConsumer && !ratedMaterialsByUser.includes(material.id)"> <!--  !isRatedByUser(material.id)"> -->
										<font size="5px">vote:&nbsp;</font>
										<select name="rating_dropdown" id="rating_dropdown" v-model="rating" @change="sendMaterialrating(material.id, rating)" style="width: 40px; font-size:25px;">
											<option disabled value="">Please rate the material</option>
											<option value="1">1</option>
											<option value="2">2</option>
											<option value="3">3</option>
											<option value="4">4</option>
											<option value="5">5</option>
										</select>
									</div>
									<div>
										<font size="5px">Avg rating: {{material.averageRate}}</font>
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
		<div>
			<b-alert :show="dismissCountDown" @dismissed="dismissCountDown=0" @dismiss-count-down="countDownChanged" v-if="added" variant="info" style="width: auto; margin: 30px;">Product added!</b-alert>
			<b-alert :show="dismissCountDown" @dismissed="dismissCountDown=0" @dismiss-count-down="countDownChanged" v-if="deleted" variant="warning" style="width: auto; margin: 30px;">Product removed!</b-alert>
		</div>
	</div>
</template>

<script>
import {findProductById, findMaterialById, deleteMaterialByID, saveLikedProduct, rateMaterial, isMaterialRatedByUser, getRatedMaterialsByuserId, deleteLikedProduct, increaseLikedCounterProduct, decreaseLikedCounterProduct, increaseAccessCountMaterial} from '../API'

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
		userId: localStorage.getItem('id'),
		prod: localStorage.getItem('lastViewedProduct'),
		ratedMaterialsByUser: [],
		allMaterials: [],
		deleted: false,
		added: false,
		dismissSecs: 4,
		dismissCountDown: 0 
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
			this.product.materials.forEach(mat => {
					findMaterialById(mat.id).then(newMat => {
						this.allMaterials.push(newMat)
					})
			});
		})

		this.image = localStorage.getItem("profileImage")
		this.materials = localStorage.getItem("materials")

		findMaterialById(this.image)
		.then(response => {	
			this.imageUrl = response.fileDownloadUri
		}),
		
		getRatedMaterialsByuserId(localStorage.getItem("id")).then( response => {
				response.forEach(element => {
                    this.ratedMaterialsByUser.push(element)
                });
			})

	},
	methods: {
	    deleteMaterial: function(materialId) {
	      deleteMaterialByID(materialId).then(response => {
	        location.reload();
	      })
		},

		countDownChanged (dismissCountDown) {
    	  this.dismissCountDown = dismissCountDown
    	},
    	showAlert () {
    	  this.dismissCountDown = this.dismissSecs
    	},
		
		saveLikedProduct: function(){
			saveLikedProduct(this.userId, this.prod).then(response => {
				console.log(response);
				increaseLikedCounterProduct(this.prod)
				this.added = true
				this.deleted = false
			})
		},

		deleteLikedProduct: function(){
			deleteLikedProduct(this.userId, this.prod).then(response => {
				decreaseLikedCounterProduct(this.prod)
				this.deleted = true
				this.added = false
			})
		},

		sendMaterialrating: function(materialId, rating) {
			rateMaterial(localStorage.getItem("id"), materialId, rating);
			location.reload();
		},

		isRatedByUser: function(materialId) {
			isMaterialRatedByUser(localStorage.getItem("id"), materialId).then(response => {
				//console.log(materialId+" "+response)
				return response;
			})
		},

		increaseAccessCountMaterial: function(id){
			increaseAccessCountMaterial(id)
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