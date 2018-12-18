<template>
    <div id="navbar">
        <b-navbar toggleable="md" type="navbar navbar-expand-sm bg-dark navbar-dark" variant="info">

     <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
     <b-navbar-brand>
         <a href="/">
           <img src="../assets/logo_white.png" class="d-inline-block align-top" style="height: 40px" alt="BV">
         </a>
         <p style="color: white; font-size: 19px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; text-align: center;" v-if="!isConsumer && isLogged">{{fname}} {{lname}}, {{companyName}}</p>
     </b-navbar-brand>

     <b-collapse is-nav id="nav_collapse">
       <!-- Right aligned nav items -->
       <b-navbar-nav class="ml-auto">
           
       <!-- Search bar -->
        <div style="margin-right: 650px; display: flex;">
           <b-form-input size="lg" class="mr-sm-2" type="text" placeholder="Search" name="SearchInput" />
           <b-button size="lg" style="margin-left:0px;" type="submit" v-on:click="searchProds">Search</b-button>
        </div>
      
        <b-dropdown v-if="isLogged === true" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;" right text="Options" size="lg">
            <div>
                <b-dropdown-item-button v-on:click="redirectToPage">{{fname}}</b-dropdown-item-button>
                <b-dropdown-item-button>Option 2</b-dropdown-item-button>
                <b-dropdown-divider></b-dropdown-divider>
                <b-dropdown-item-button v-on:click="logout"><strong>Sign out</strong></b-dropdown-item-button>
            </div>
        </b-dropdown>
        <!-- <b-button size="lg" v-if="isLogged === true" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;" v-on:click="logout"> Sign out </b-button> -->
         <b-button-group size="lg" v-if="isLogged === false">
           <b-button style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;" v-on:click="redirectSignUp">Sign up</b-button>
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

import {loginUser} from '../API'
import router from '../router/index'
import {findCompanyById} from '../API'

export default {

  name: 'Navbar', 
  data () {
        return{
            seen: false,
            isLogged: this.checkIfIsLogged(),
            company: '',
            companyName: localStorage.getItem("companyName"),
            fname: localStorage.getItem("fname"),
            lname: localStorage.getItem("lname"),
            isConsumer: false,
            role: localStorage.getItem("role")
		}
    },
    created : function(){
        findCompanyById(localStorage.getItem("company")).then(response => {
            this.companyName = response.name
        })
        if(localStorage.getItem("permissions") === "consumer"){
            this.isConsumer = true;
        }
    },
	methods: {

        redirectToPage: function(){
            var permissions = {
                "companyAdmin" : 'company_admin',
                "companyRepresentative" : 'company_representative', 
                "customer" : 'consumer'
            }
            var redirectToHomeMap = {
				"customer": "/consumer_home",
				"companyRepresentative": "/company_rep_home",
				"companyAdmin": "/company_admin_home"
			};
            this.$router.push( redirectToHomeMap[this.role] )
            location.reload();
        },

        redirectSignUp: function(){
            this.$router.push("/signup");
            location.reload();
        },

        searchProds : function(){
            var query = document.getElementsByName("SearchInput")[0].value;
            if(query){
                this.$router.push( "/search/" + query )
                location.reload();
            }
        },

		login: function() {
            
			if (this.$refs.username.value === "" || !this.$refs.pass.value === ""){
					this.seen = true;
			}else{ 	
				loginUser(
					this.$refs.username.value,
					this.$refs.pass.value
				)
				.then(response => {
                    
					if (response.data.loginstatus === "login-success") {

                        //Sessions
                        localStorage.setItem("id", response.data.user.id);
                        localStorage.setItem("loginstatus", response.data.loginstatus);
                        localStorage.setItem("currentUser", response.data.user.username);
                        localStorage.setItem("company", response.data.user.companyId);
                        localStorage.setItem("fname", response.data.user.firstname);
                        localStorage.setItem("lname", response.data.user.lastName);
                        localStorage.setItem("role", response.data.user.role);
                        localStorage.setItem("email", response.data.user.emailaddress);

                        this.greetingSeen = true;
                        this.greet = localStorage.getItem("fname") + " " + localStorage.getItem("lname")
                        this.company = localStorage.getItem("company");
                        console.log(this.user);

                        // Permissons
                        var permissions = {
                            "companyAdmin" : 'company_admin',
                            "companyRepresentative" : 'company_representative',
                            "customer" : 'consumer'
                        }

                        // For redirection
                        this.$acl.change( permissions[response.data.user.role] )
                        
                        // For session
                        localStorage.setItem("permissions", permissions[response.data.user.role])

                        // Redirect
						var redirectToHomeMap = {
							"customer": "/consumer_home",
							"companyRepresentative": "/company_rep_home",
							"companyAdmin": "/company_admin_home"
						};
                        this.$router.push( redirectToHomeMap[response.data.user.role] )
                        location.reload();
                        // if(localStorage.getItem("role") === "costumer"){
                            // this.isConsumer = true
                        // }
                       
					}
					else{
						this.seen = true;
					}
				})
			}
        },
        logout : function() {
            localStorage.clear();
            this.$acl.change( 'public' );
            this.$router.push({path: '/'});
            location.reload();
        },
        checkIfIsLogged : function() {
            let status = localStorage.getItem("loginstatus")
            if (status === "login-success") {
                return true
            } else {
                return false
        }
    }
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
	width:350px;
	padding:80px 40px;
	background:white;
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
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

