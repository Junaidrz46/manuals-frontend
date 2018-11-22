<template>
    <div id="company_admin_home">
        <div class="signup">
            <form>
                <h2>Add Representatives</h2>
                <p>Username</p>
                <input type="text" ref="username" name="" placeholder="Type username...">
                <p>E-mail</p>
                <input type="text" ref="email" name="" placeholder="Type e-mail...">
                <p>Password</p>
                <input type="password" ref="pass" name="" placeholder="*******">
                <p>Confirm Password</p>
                <input type="password" ref="confirmPass" name="" placeholder="*******">
                <input type="button" class="submitbutton" value="Add representative" v-on:click="createRepresentative">
				<div class="addrep-error" id="error" v-if="seen">
					<p class="message">
						{{ message }}
					</p>
				</div>
            </form>
        </div>
    </div>
</template>

<script>
import {addRepresentative} from '../API'
import router from '../router/index'

export default {
	data () {
		return{
			seen: false,
			message: ''
		}
	},
	methods: {
		checkEmail: function (email) {
			var emailTest = /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
  			return emailTest.test(email);	
		},
		createRepresentative: function() {
			
			console.log(this.checkEmail(this.$refs.email.value));

			if (this.$refs.username.value === "" || this.$refs.pass.value === "" || this.$refs.email.value === "" || this.$refs.confirmPass.value === ""){
				this.message = 'Please complete all fields!'
				this.seen = true;

			}else if(this.checkEmail(this.$refs.email.value) === false){
				this.message = 'Enter a valid e-mail address!'
			}else {

				var pass = this.$refs.pass.value;
				var confirmPass = this.$refs.confirmPass.value;

				if (pass === confirmPass) {

					var companyname = localStorage.getItem("current_companyname");
					console.log(companyname)

					addRepresentative(
						this.$refs.username.value,
						this.$refs.email.value,
						this.$refs.pass.value,
						companyname
					)
					.then(response => {
						console.log(response);
					})
					this.seen = false;
					alert("A new representative added!")
				} else {
					this.message = 'Passwords do not match!'
					this.seen = true;
				}
			}

		}
	}
}
</script>


<style>
    
.signup
{
	position:absolute;
	top:50%;
	left:50%;
	transform:translate(-50%,-50%);
	width:350px;
	height:450px;
	padding:80px 40px;
	box-sizing:cover;
    background:white;
    border-color: #262626;
    border: 1px solid black;
    border-radius: 6px;
    background-size:border-box;
	
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
h2
{
	margin:0;
	padding:0 0 20px;
	color:black;
	text-align:center;
}
.signup p 
{
	margin:0;
	padding:0 0 20px;
	color:black;
	text-align: left;
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
.signup input
{
	width:100%;
	margin-bottom:20px;
}
.signup input[type="text"], .signup input[type="text"], .signup input[type="password"], .signup input[type="password"]
{
	border:none;
	border-bottom:1px solid black;
	background:transparent;
	outline:none;
	height:40px;
	color:black;
	font-size:16px;
}
::placeholder
{
	color:darkgray;
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
.signup input[type="button"]
{
	border:none;
	outline:none;
	height:40px;
	color:#fff;
	font-size:16px;
	background:#708090;
	cursor:pointer;
	border-radius:20px;
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
.signup input[type="button"]:hover
{
	background:black;
	color:white;
}

.addrep-error p {
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	color:  #FF4C4C;
	text-align: center;
	margin-top: 30px;
	
}


</style>
 