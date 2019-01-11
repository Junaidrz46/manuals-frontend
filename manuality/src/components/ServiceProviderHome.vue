<template>
	<div id="product">
        <div class="body">
			<div style="display: flex;">
				<b-container>
				<b-row>
				<b-col></b-col>
				<b-col md="10">
				<div  style="margin-top: 50px;">
					
					<font size="6px">Email to consumers</font>
                	<vue-editor v-model="textAreaContent" :editorToolbar="textAreaToolbar" style="height: 250px"></vue-editor>
            	</div>
				</b-col>
				<b-col></b-col>
				</b-row>
				<b-row>
					<b-col></b-col>
					<b-col>
					<b-btn style="margin-top: 100px;" v-on:click="sendEmailToCustomers">Send Email</b-btn>				
					</b-col>
					<b-col></b-col>
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
	height: 550px;
	width: 800px;
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	margin-left: 15%;
	margin-top: 4%; 

}
li{
	text-align: left
}
.space{
    width:15px;
    height:auto;
    display:inline-block;
}
</style>