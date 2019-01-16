<template>
    <div id="create_service_provider">
        <div class="signup">
            <form>
                <h3>Add Service Provider</h3>
				<div class="firstname">
					<p>First Name</p>
					<input type="text" ref="fname" name="" placeholder="First name...">
				</div>
				<div class="lastname">
					<p>Last Name</p>
					<input type="text" ref="lname" name="" placeholder="Last name...">
				</div>
				<div class="uname">
					<p>Username</p>
					<input type="text" ref="username" name="" placeholder="Username...">
				</div>
				<div class="mail">
					<p>E-mail</p>
					<input type="text" ref="email" name="" placeholder="E-mail...">
				</div>
                <div class="pwd">
					<p>Password</p>		
					<input type="password" ref="pass" name="" placeholder="*******">
				</div>
				<div class="cpwd">
					<p>Confirm Password</p>
					<input type="password" ref="confirmPass" name="" placeholder="*******">
				</div>
                <div class="phone" style="text-align: left">
					<p>Phone</p>
					<input type="text" ref="phone" name="" placeholder="Phone..." style="align: left; margin-top: 50px">
				</div>
				<input type="button" class="submitbutton" value="Add SP" v-on:click="createServiceProvider" align="middle">
				<div class="addrep-error" id="error" v-if="seen">
					<p class="message">
						{{ message }}
					</p>
				</div>
				<div class="addrep-success" id="success" v-if="seenSuccess">
					<p class="message">
						{{ message }}
					</p>
				</div>			
            </form>
        </div>
    </div>
</template>

<script>

import {createServiceProvider} from '../API'

export default {
    data (){
        return{
            seen: false,
            message: "",
            seenSuccess: false,
            company: '',
			fname: '',
			lname: ''
        }
    },
    methods:{
        checkEmail: function (email) {
			var emailTest = /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
  			return emailTest.test(email);	
        },

        createServiceProvider: function (){
            if (this.$refs.username.value === "" || this.$refs.pass.value === "" || this.$refs.email.value === "" || this.$refs.confirmPass.value === "" || this.$refs.fname.value === "" || this.$refs.lname.value === "" || this.$refs.phone.value ===""){
				this.message = 'Please complete all the fields!'
				this.seen = true;
			}else if(this.checkEmail(this.$refs.email.value) === false){
				this.message = 'Enter a valid e-mail address!'
			}else {
				var pass = this.$refs.pass.value;
				var confirmPass = this.$refs.confirmPass.value;
				if (pass === confirmPass) {
					this.company = localStorage.getItem("company");
					createServiceProvider(
						this.$refs.fname.value,
						this.$refs.lname.value,
						this.$refs.username.value,
                        this.$refs.email.value,
                        this.$refs.phone.value,
						this.$refs.pass.value,
						this.company
					)
					.then(response => {
						console.log(response);
					})
					this.seen = false;
					this.message = 'Representative added! Reloading...'
					this.seenSuccess = true;
					this.waitFunc();
				} else {
					this.message = 'Passwords do not match!'
					this.seen = true;
				}
			}
        },

        waitFunc: function(){   
            setTimeout(function(){ location.reload(); }, 2000);
        }
    }
    
}
</script>

<style>

.greeting-message{
    color: #262626;
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	float: left;
	margin-top: 30px;
	margin-left: 50px;
}
.signup
{
	position:absolute;
	width:600px;
	height:680px;
	padding:50px 40px;
	box-sizing:cover;
    background:white;
    border-color: #262626;
    border: 3px solid #76323F;
    border-radius: 6px;
    background-size:border-box;
	margin-left: 20%;
	margin-top: 4%; 
	
}
.firstname{
	float:left;
}
.lastname{
	float:right;
}
.uname{
	float:left;
}
.mail{
	float:right;
}
.cname{
	clear:left;
}
.pwd{
	float:left;
}
.cpwd{
	float:right;
}
.comp {
	position: relative;
}
.user
{
	width:100px;
	height:100px;
	border-radius:50%;
	overflow:hidden;
	position:absolute;
	top:calc(-100px/2);
	left:calc(50%-50px);
}
h3	
{
	margin:0px;
	margin-bottom: 10px;
	padding:20px;
	padding-top:0px;
	color: #7B6652;
	text-align:center;
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
p{
	height:10px;
	margin:0;
	padding:0 0 20px;
	color: #7B6652;
	text-align: left;
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
.signup input
{
	width:auto;
	margin-bottom:40px;
	height: 50px;
}
.signup input[type="text"], .signup input[type="text"], .signup input[type="text"], .signup input[type="text"], .signup input[type="password"], .signup input[type="password"]
{
	border:none;
	border-bottom:1px solid black;
	background:transparent;
	outline:none;
	height:25px;
	width: 250px;
	color:black;
	font-size:16px;
	margin-top: 30px;
}
::placeholder
{
	color:darkgray;
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
.btn{
	
	margin-left:130px;
	align:center;
}
.signup input[type="button"]
{
	align:center;
	outline:none;
	height:40px;
	width: 200px;
	color:#fff;
	font-size:16px;
	background:#76323F;
	cursor:pointer;
	border-radius:20px;
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	margin-top: 0px;
}
.signup input[type="button"]:hover
{
	background:white;
	color:black;
}
.addrep-error p {
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	color:  #FF4C4C;
	text-align: center;
	margin-top: 0px;
}
.addrep-success p {
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	color:  green;
	text-align: center;
	margin-top: 0px;
}

</style>

