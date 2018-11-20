<template>
    <div id="login">
		<img src="../assets/logo.png">
        <div class="loginBox">
            <form>
                <h2>Login</h2>
                <p>Username</p>
                <input type="text" ref="username" name="" placeholder="Type your username...">
                <p>Password</p>
                <input type="password" ref="pass" name="" placeholder="*****">
                <input type="Submit" name="" value="Sign In" v-on:click="login">
				<p class="login-error" ref="error">Your username and password don`t match</p>
            </form>
        </div>
    </div>
</template>

<script>
import {loginUser} from '../API'
import router from '../router/index'

export default {
	
	methods: {
		login: function() {
				
			loginUser(
				this.$refs.username.value,
				this.$refs.pass.value
			)
			.then(response => {
        		console.log(response.data)
				if (response.data.loginstatus === "login-success") {
					var redirectToHomeMap = {
						"consumer": "/todo",
						"companyRepresentative": "/company_rep_home",
						"companyAdmin": "/company_admin_home"
					};
					this.$router.push( redirectToHomeMap[response.data.user.role] );
					localStorage.setItem("current_companyname", response.data.user.companyname);
				}
				else{
					//TODO show ERROR Message
					this.$refs.error.display = block;
					alert(response.data.message);
			}
			})

			// console.log("DONE");
		}
	}
}
</script>


<style>
.loginBox
{
	position:absolute;
	top:50%;
	left:50%;
	transform:translate(-50%,-50%);
	width:350px;
	height:420px;
	padding:80px 40px;
	box-sizing:cover;
	background:rgba(0,0,0.2);
    background-size:border-box;
    opacity: 0.7;
    margin-top: 70px;
    margin-left: 600px;
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	border-radius: 6px;
	
}
.user
{
	width:100px;
	height:100px;
	border-radius:50%;
	overflow: hidden;
	position:absolute;
	top:calc(-100px/2);
    left:calc(50%-50px);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
h2
{
	margin:0;
	padding:0 0 20px;
	color:#FFFFFF;
    text-align:center;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
.loginBox p 
{
	margin:0;
	padding:0 0 20px;
	color:#FFFFFF;
    font-weight:bold;
    text-align: left;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
.loginBox input
{
	width:100%;
    margin-bottom:20px;
    
}
.loginBox input[type="text"], .loginBox input[type="password"]
{
	border:none;
	border-bottom:1px solid #fff;
	background:transparent;
	outline:none;
	height:40px;
	color:#fff;
	font-size:16px;
}
::placeholder
{
    color:rgba(255,255,255,0.5);
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    
}
.loginBox input[type="Submit"]
{
    margin-top: 45px;
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
.loginBox input[type="Submit"]:hover
{
	background:#FFFFFF;
	color:#262626;
}
.loginBox a
{
     color:#fff;
font-size:14px;
font-weight:bold;
text-decoration:none;
}

.login-error {
	/*display: none;*/
	
}
</style>

