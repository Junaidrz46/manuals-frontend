<template>
<div id="product">
        <div class="body">

			<div style="display: flex;">

			<div style="margin-left: 40px; margin-top: 30px;">
					<table style="border: 2px solid; min-width: 450px;">
						<thead>
							<th>Name</th>
							<th>E-mail</th>
							<th>Phone</th>
							<th v-if="userIsRepresentative">Remove</th>
						</thead>
						<tbody v-bind:key="sp.id" v-for="sp in serviceProviders">
							<tr style="border: 1px solid;">
								<td>
									{{sp.firstname}}
								</td>	
								<td>
									{{sp.emailddress}}
								</td>
							
								<td>
									{{sp.phone}}
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

import {serviceProviderByCompanyId} from '../API'

export default {

    data (){
        return{
            serviceProviders: [],
            fields: [
				{key:'name', label: 'Name'},
				{key:'emailddress', label: 'E-mail'}
            ],
            showTable: false,
            company: localStorage.getItem("company")
        }
    },
    beforeMount: function(){

        serviceProviderByCompanyId(this.company).then(response => {
			console.log(response.data)
			response.data.forEach(element => {
				this.serviceProviders.push(element);
			});
		})
        
        console.log(this.serviceProviders)

    },

    methods:{

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
