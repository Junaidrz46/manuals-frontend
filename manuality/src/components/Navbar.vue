<template>
    <div id="navbar">
        <b-navbar toggleable="md" type="navbar navbar-expand-sm bg-dark navbar-dark" variant="info">

     <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
     <b-navbar-brand>
         <a href="/">
           <img src="../assets/logo_white.png" class="d-inline-block align-top" style="height: 40px" alt="BV">
         </a>
     </b-navbar-brand>

     <b-collapse is-nav id="nav_collapse">

       <!-- Right aligned nav items -->
       <b-navbar-nav class="ml-auto">
       <!-- search bar
         <b-nav-form>
           <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search"/>
           <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
         </b-nav-form>
       -->

        <b-button v-if="logged" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;"> USER NAME </b-button>
         <b-button-group size="lg" v-if="!logged">
           <b-button style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">Sign Up</b-button>
           <b-dropdown style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;" right text="Log In" size="lg">

                <div>
                    <form class="loginBox">
                        <h2>Login</h2>
                        <p>Username</p>
                        <input type="text" ref="username" name="username" placeholder="Type your username...">
                        <p>Password</p>
                        <input type="password" ref="pass" name="" placeholder="*****">
                        <input type="button" class="submitbutton" value="Sign In" v-on:click="login">
                            <div class="login-error" id="error" v-if="seen">
                                <p>
                                    Invalid creditentials!
                                </p>
                            </div>
                    </form>
                </div>
           </b-dropdown>
         </b-button-group>

       </b-navbar-nav>

     </b-collapse>
   </b-navbar>
    </div>
</template>

<script>
import Login from './Login'
import {loginUser} from '../API'
import router from '../router/index'


export default {
  name: 'Navbar',
  data () {
        
        return{
            seen: false,
            logged: localStorage.getItem("loginStatus")
		}
	},
	methods: {
		login: function() {
				
			if (this.$refs.username.value === "" || !this.$refs.pass.value === ""){
					this.seen = true;
			}else{ 	
				loginUser(
					this.$refs.username.value,
					this.$refs.pass.value
				)
				.then(response => {
                    //console.log(response.data)
                    
					if (response.data.loginstatus === "login-success") {

                         // Magic. Do not touch
                        //$forceUpdate();
                       
                       // Handle "session"
                        localStorage.setItem("loginStatus", true);
                        localStorage.setItem("currentUser", response.data.user.username);
                        localStorage.setItem("current_companyname", response.data.user.companyname);
                        console.log(localStorage.getItem("currentUser"));


                        // Switch login buttons
                        this.showLoginButtons = false;

                        // Redirect
						var redirectToHomeMap = {
							"customer": "/consumer_home",
							"companyRepresentative": "/company_rep_home",
							"companyAdmin": "/company_admin_home"
						};
                        this.$router.push( redirectToHomeMap[response.data.user.role] );
                        
                       
					}
					else{
						this.seen = true;
					}
				})
			}
        },
        
        // is_user_logged: function() {
        //     this.logged = localStorage.getItem("loginStatus") != null;
        // }
	}
}
</script>

<style lang="css">

.btn-navbar {
    width: 100px;
    border: #FFFFFF;
    border-radius: 6px;
}

.btn:hover {
	background:#FFFFFF;
	color:#262626;
    
}

.loginBox
{
	/* position: auto; */
	/* top:50%;
	left:50%; */
    /* transform:translate(-50%,-50%); */
	width:350px;
	/* height:420px; */
	padding:80px 40px;
	/* box-sizing:cover; */
	background:white;
    /* background-size:border-box; */
    /* margin-top: 173px; */
    /* margin-right: 0px; */
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	/* border-radius: 6px; */
	
}

h2
{
	margin:0;
	padding:0 0 20px;
	color: rgba(0, 0, 0, 1);
    text-align:center;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
.loginBox p 
{
	margin:0;
	padding:0 0 20px;
	color:rgba(0, 0, 0, 1);
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
	border-bottom:1px solid black;
	background:transparent;
	outline:none;
	height:40px;
	color:rgba(0, 0, 0, 1);
	font-size:16px;
}
::placeholder
{
    color: grey;
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    
}
.loginBox input[type="button"]
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
.loginBox input[type="button"]:hover
{
	background:rgba(0, 0, 0, 1);
	color:#FFFFFF;
}

.login-error p {
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	color: #FF4C4C;
	text-align: center;
	
}
</style>

