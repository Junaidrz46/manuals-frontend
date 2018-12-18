<template>
    <div id="ConsumerHome">
        <div class="body">
            <div style="display: flex;">
                <b-card :title="name" :img-src="imageUrl"	style="width: 20rem; border: 1px;" class="mb-2">
					<p class="card-text" style="float: left;">
						<strong>E-mail:</strong> {{email}}
					</p>
					<strong><p style="float:left;">Recieve news?</p></strong>
                    <b-form-radio-group id="reciebeNews" v-model="selected" name="radioSubComponent">
                        <b-form-radio value="true">Subscribe</b-form-radio>
                        <b-form-radio value="false" style="margin-left: 20px">Unsubscribe</b-form-radio>
                    </b-form-radio-group>	
                </b-card>
                <div style= "margin-left: 20px; margin-top: 20px;">
                    <h4>My Products</h4>
                    <table style="border: 2px solid; min-width: 450px;">
						<tbody v-bind:key="product.id" v-for="product in products">
							<tr style="border: 1px solid;">
								<td>
									<a>{{product}}</a>
								</td>
							</tr>							
						</tbody>
					</table>
				</div>
			</div>
        </div>
    </div>
</template>

<script>

import {getUserById} from '../API'

export default {
    data() {
        return{
            selected: null,
            name: localStorage.getItem("fname") + " " + localStorage.getItem("lname"),
            email: localStorage.getItem("email"),
            imageUrl: "https://i.cdn-sc.com/users/default-avatar.jpg",
			products: []
        }
    },

	beforeMount: function(){

		getUserById(localStorage.getItem("id")).then(
			response => {
				response.likedProducts.forEach(element => {
					this.products.push(element);
				});
				});
			
		

		console.log(this.products);

	},

	methods: {

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
	height: 500px;
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