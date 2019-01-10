<template>
	<div id="product">
        <div class="body">
			<div style="display: flex;">

			<b-container>
			<b-row>
			<b-col md="7">
				
			<div style="margin-left: 15px; margin-top: 40px; height: 500px; overflow-y:auto;">
					<table>
						<thead style="border: 1px solid;">
							<th>Product</th>
							<th>Liked Counts</th>
							<th>Material name</th>
							<th>Access Counts</th>
						</thead>
						<tbody v-bind:key="product.id" v-for="product in products">
							<tr>
								<td>
									{{product.name}}
								</td>	
								<td>
									{{product.likedCounter}}
								</td>
								<td></td>
								<td></td>
							</tr>
							<tr v-bind:key="material.id" v-for="material in product.materials" style="border: 1px solid;">
								<td></td>
								<td></td>
								<td> {{material.fileName}} </td>
								<td> {{material.accessCounter}} </td>
							</tr>					
						</tbody>
					</table>

			</div>
			<!-- <div style="margin-left: 20px; margin-top: 30px;  height: 400px; overflow-y:auto;">
					<table>
						<thead>
							<th>Product</th>
							<th>Material</th>
							<th>Access Counts</th>
						</thead>
						<tbody v-bind:key="material.id" v-for="material in materials">
							<tr style="border: 1px solid;">
								<td>
								</td>	
								<td>
									{{material.fileName}}
								</td>
								<td>
									{{material.accessCounter}}
								</td>
							</tr>
																			
						</tbody>
						
					</table>
			</div> -->
			</b-col>


			<b-col>
				<div  style="margin-right: 10px; margin-top: 50px;">
					
					<font size="6px">Email to consumers</font>
                	<vue-editor v-model="textAreaContent" :editorToolbar="textAreaToolbar" style="height: 300px"></vue-editor>
            	</div>
				<b-btn style="margin-top: 120px;" v-on:click="sendEmailToCustomers">Send Email</b-btn>				
			</b-col>
			</b-row>
			</b-container>
			</div>	
        </div>
	</div>
</template>

<script>
import {VueEditor} from 'vue2-editor'
import {findAllProducts, getUserByRole, sendEmail, findCompanyById} from '../API'

export default {
  name: 'ProductPage',
  components: {
      VueEditor
   },
  data () {
    return {
		textAreaContent: '',
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

		products:[],
		materials:[],
		emailAddresses: [],
		companyName: "",
		companyId: localStorage.getItem('company')
    }
  },
  beforeMount: function () {
		findAllProducts().then(response => {
			response.forEach(tempProd => {
				if (tempProd.companyId==this.companyId) {
					/* findLikedCounterForProduct(tempProd.id).then( product => {
						this.products.push(product)
					}) */
					this.products.push(tempProd)
					var prodMaterials = tempProd.materials
					prodMaterials.forEach(material => {
						if (material!=null) {
							this.materials.push(material)	
						}
						
					})
				}
			});
		});
		findCompanyById(this.companyId).then(response => {
					this.companyName = response.name;
		});
		this.emailAddresses = [];
		getUserByRole("customer").then(response => {
			response.forEach(user => {
				this.emailAddresses.push(user.emailaddress);
			})
		});
	},
	methods: {
	    sendEmailToCustomers: function(){
			this.emailSubject = "Message from "+this.companyName+" representative!"
			sendEmail(this.emailSubject, this.textAreaContent, this.emailAddresses);
			this.waitFunc();
		},
		 waitFunc: function(){   
            setTimeout(function(){ location.reload(); }, 2000);
        }
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
	height: 600px;
	width: 1200px;
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	margin-left: 5%;
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
table{
	border: 2px solid;
}
tr{
	 border: 1px solid;
}
</style>