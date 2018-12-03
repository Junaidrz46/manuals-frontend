<template>
    <div id="navbar">
        <b-navbar toggleable="md" type="navbar navbar-expand-sm bg-dark navbar-dark" variant="info">

     <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
     <b-navbar-brand>
         <a href="/">
           <img src="../assets/logo_white.png" class="d-inline-block align-top" style="height: 40px" alt="BV">
         </a>
         <p style="color: white; font-size: 19px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;" v-if="isLogged">{{ fname}} {{ lname }} representing {{ companyname }}</p>
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

        <b-button v-if="isLogged === true" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;" v-on:click="logout"> Sign out </b-button>
         <b-button-group size="lg" v-if="isLogged === false">
           <b-button style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">Sign up</b-button>
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
import bus from '../bus'

export default {

  //loggedIn: localStorage.getItem("loginStatus"),
  name: 'Navbar', 
  data () {
        return{
            seen: false,
            isLogged: this.checkIfIsLogged(),
            companyname: localStorage.getItem("current_companyname"),
            fname: localStorage.getItem("fname"),
            lname: localStorage.getItem("lname"),
		}
    },
    beforeRouteUpdate (to,from,next) {
         this.$eventHub.$on('logged', () => {
            this.isLogged = this.checkIfIsLogged()
        })
        console.log("HERE");
        next()
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

                        // Handle "session"
                        localStorage.setItem("loginstatus", response.data.loginstatus);
                        localStorage.setItem("currentUser", response.data.user.username);
                        localStorage.setItem("current_companyname", response.data.user.companyname);
                        localStorage.setItem("fname", response.data.user.firstname);
                        localStorage.setItem("lname", response.data.user.lastName);
                        this.fname = localStorage.getItem("fname");
                        this.lname = localStorage.getItem("lname");
                        this. greetingSeen = true;
                        console.log(this.user);

                        // Redirect
						var redirectToHomeMap = {
							"customer": "/consumer_home",
							"companyRepresentative": "/company_rep_home",
							"companyAdmin": "/company_admin_home"
						};
                        this.$router.push( redirectToHomeMap[response.data.user.role] );
                        
                        // HOLY LINE OF CODE
                        location.reload();
                       
					}
					else{
						this.seen = true;
					}
				})
			}
        },
        logout : function() {
            localStorage.clear();
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

