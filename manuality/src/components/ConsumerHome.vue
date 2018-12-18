<template>
    <div id="ConsumerHome">
        <div class="body">
            <div style="display: flex;">
                <b-card :title="name" :img-src="imageUrl"	style="width: 20rem; border: 1px;" class="mb-2">
					<p class="card-text" style="float: left;">
						<strong>E-mail:</strong> {{email}}
					</p>
					<strong><p style="float:left;">Recieve news?</p></strong>
                    <b-form-radio-group id="recieveNews" v-model="selected" name="radioSubComponent" @change="updateStatus">
                        <b-form-radio value="0">Subscribe</b-form-radio>
                        <b-form-radio value="1" style="margin-left: 20px">Unsubscribe</b-form-radio>
                    </b-form-radio-group>
					<b-alert :show="dismissCountDown" dismissible @dismissed="dismissCountDown=0" @dismiss-count-down="countDownChanged" v-if="showYes" variant="info">You are subscribed</b-alert>
					<b-alert :show="dismissCountDown" dismissible @dismissed="dismissCountDown=0" @dismiss-count-down="countDownChanged" v-if="showNo" variant="warning">You are unsubscribed</b-alert>	
                </b-card>
                <div style= "margin-left: 20px; margin-top: 20px;">
					<h4 style="text-align: left">My Products</h4>
                    <b-table v-if="products" responsive hover :items="products" :fields="fields" @row-clicked="redirectToProduct" style="cursor:pointer; width: 650px "></b-table>
				</div>
			</div>
        </div>
    </div>
</template>

<script>
import {findUserById} from '../API'
import {findProductById} from '../API'
import {saveSubscribeStatus} from '../API'
export default {
    data() {
        return{
            selected: null,
            name: localStorage.getItem("fname") + " " + localStorage.getItem("lname"),
            email: localStorage.getItem("email"),
            imageUrl: "https://i.cdn-sc.com/users/default-avatar.jpg",
			products: [],
			fields: [
				{key:'name', label: 'Product name'},
				{key:'productNumber', label: 'Product#'}
			],
			showYes: false,
			showNo: false,
			dismissSecs: 5,
      		dismissCountDown: 0
        }
    },

	created: function() {

		findUserById(localStorage.getItem("id")).then(response => {
				response.likedProducts.forEach(element => {
					
					findProductById(element).then(response2 => {
						this.products.push(response2.data);
					})
					
					// this.products.push(element)
				});
				console.log(response.likedProducts)
			})
			

	},

	methods: {
		redirectToProduct: function (product, index) {
      		localStorage.setItem("profileImage", product.profileImage)
      		localStorage.setItem("lastViewedProduct", product.id)
      		this.$router.push( '/products/' + product.id )
      		location.reload();
		},

		countDownChanged (dismissCountDown) {
    	  this.dismissCountDown = dismissCountDown
    	},
    	showAlert () {
    	  this.dismissCountDown = this.dismissSecs
    	},
		
		updateStatus: function() {
			saveSubscribeStatus(localStorage.getItem("id"), this.selected).then(response => {
				if(this.selected === "0"){
					this.showYes = true;
					this.showNo = false;
					this.showAlert();
				}else{
					this.showNo = true;
					this.showYes = false;
					this.showAlert();
				}
			})
		}
	}
}
</script>


<style>
.body
{
	position:absolute;
	border: 1px solid black;
	padding:0;
	border-radius: 6px;
	background-size:cover;
	font-family:sans-serif;
	background-color:white;
	height: 510px;
	width: 1000px;
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