<template>
<div id="product">
	<div class="body">

		<div style="display: flex;">

		<b-container>
			<b-row>
			<b-col></b-col>
			<b-col>
			<div  style="margin-top: 20px">
				<font size="5px">Service Providers</font>				
			</div>
			<div style="margin-top: 20px; height: 400px; width: 500px; overflow-y:auto">
					<table style="border: 2px solid; min-width: 450px;">
						<thead>
							<th>Name</th>
							<th>E-mail</th>
							<th>Phone</th>
							<th>Authorized</th>
						</thead>
						<tbody v-bind:key="sp.id" v-for="sp in serviceProviders">
							<tr style="border: 1px solid;">
								<td>
									{{sp.firstname}} {{sp.lastname}}
								</td>	
								<td>
									{{sp.emailaddress}}
								</td>
							
								<td>
									{{sp.teleNumber}}
								</td>
								<td>
									<label class="switch">
										<input type="checkbox" v-model="sp.authorizedSP" @change="updateServiceProviderStatus(sp.id, sp.authorizedSP)">
										<span class="slider round"></span>
									</label>
								</td>
							</tr>							
						</tbody>
					</table>
				</div>
				</b-col>
				<b-col></b-col>
				</b-row>
			</b-container>
			</div>	
        </div>	
	</div>
</template>

<script>

import {/* serviceProviderByCompanyId,  */getUserByRole, updateAuthorizedStatusForSP} from '../API'

export default {

    data (){
        return{
			serviceProviders: [],
			authServiceProviders: [],
            company: localStorage.getItem("company")
        }
    },
    beforeMount: function(){

        /* serviceProviderByCompanyId(this.company).then(response => {
			//console.log(response)
			response.forEach(element => {
				this.authServiceProviders.push(element);
			});
		}); */

		getUserByRole("serviceProvider").then(response => {
			response.forEach(element => {
				if(element.companyId==this.company) {
					var temp = element;
					if (temp.authorizedSP==0)
						temp.authorizedSP = false;
					else
						temp.authorizedSP = true;
					this.serviceProviders.push(temp);
				}
				
			});
		})//.then(console.log(this.serviceProviders))
	
    },

    methods:{
		updateServiceProviderStatus: function(userId, newStatus) {
			if (newStatus==true)
				newStatus = 1;
			else
				newStatus = 0;
			updateAuthorizedStatusForSP(userId, newStatus);
			console.log(userId+" "+newStatus);
		}
    } 
}
</script>

<style>
h1
{
	margin:200;
	text-align:center;
	color: #7B6652;
}
h3{
	
	text-align:center;
	color: #7B6652;
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
	border: 3px solid #76323F;
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

/*Toggle switches*/
.switch {
  margin-top: 4px;
  position: relative;
  display: inline-block;
  width: 60px;
  height: 22px;
}

.switch input { 
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 3px;
  bottom: 1px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #76323F;
}

input:focus + .slider {
  box-shadow: 0 0 1px #76323F;
}

input:checked + .slider:before {
  -webkit-transform: translateX(33px);
  -ms-transform: translateX(33px);
  transform: translateX(33px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 30px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
