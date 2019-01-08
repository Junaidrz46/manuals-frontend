<template>
	<div id="product">
        <div class="body">

			<div style="display: flex;">

			<b-container>
			<b-row>
			<b-col md="6">
			<div style="margin-left: 20px; margin-top: 30px;">
					<table style="border: 2px solid; min-width: 450px;">
						<thead>
							<th>Product</th>
							<th>Liked Count</th>
						</thead>
						<tbody v-bind:key="material.id" v-for="material in allMaterials">
							<tr style="border: 1px solid;">
								<td>
									<a :href=material.fileDownloadUri>{{material.description}}</a>
								</td>	
								<td>
									<img v-bind:src="material.fileIcon" class="smallImg">
								</td>
							</tr>							
						</tbody>
					</table>

					<!-- <div v-bind:key="material" v-for="material in product.materials" v-if="product.profileImage != material.id">
						<a :href=material.fileDownloadUri>{{material.description}} <img v-bind:src="material.fileIcon" class="smallImg"></a>
						<img v-on:click="deleteMaterial(material.id)" src="../assets/delete_icon.svg" style="height: 40px">
					</div> -->
					</div>
			</b-col>
			<b-col>
				<div  style="margin-left: 20px; margin-top: 50px;">
					<font size="5px">Email to consumers</font>
					<br/>
                	<vue-editor v-model="textAreaContent" :editorToolbar="textAreaToolbar"></vue-editor>

            	</div>
			</b-col>
			</b-row>
			</b-container>
			</div>	
        </div>
	</div>
</template>

<script>
import {VueEditor} from 'vue2-editor'
import {findProductById, findMaterialById, deleteMaterialByID, saveLikedProduct, rateMaterial, isMaterialRatedByUser, getRatedMaterialsByuserId, deleteLikedProduct} from '../API'

export default {
  name: 'ProductPage',
  components: {
      VueEditor
   },
  data () {
    return {
		textAreaContent: 'Initial content',
		textAreaToolbar: [
			["bold", "italic", "underline"],
			[{align: ""}, {align: "right"}, {align: "center"}, {align: "justify"}],
			[{ list: "ordered" }, { list: "bullet" }],
			[{ 'indent': '-1'}, { 'indent': '+1' }],
			[{ 'direction': 'rtl' }],
			[{ 'size': ['small', false, 'large', 'huge'] }],
			[{ 'color': [] }, { 'background': [] }],
			[{ 'font': [] }],
			['clean']                                
		],

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
	width: 1100px;
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	margin-left: 7%;
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