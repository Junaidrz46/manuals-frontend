<template>
    <div id="company_admin_home">
        <div class="signup">
            <form>
                <h2>Add Representatives</h2>
                <p>Username</p>
                <input type="text" name="" placeholder="Type username...">
                <p>E-mail</p>
                <input type="text" name="" placeholder="Type e-mail...">
                <p>Password</p>
                <input type="password" name="" placeholder="*******">
                <p>Confirm Password</p>
                <input type="password" name="" placeholder="*******">
                <input type="Submit" name="" value="Sign Up">
            </form>
        </div>
    </div>
</template>


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
.signup input[type="Submit"]
{
	border:none;
	outline:none;
	height:40px;
	color:#fff;
	font-size:16px;
	background:#708090;
	cursor:pointer;
	border-radius:20px;
}
.signup input[type="Submit"]:hover
{
	background:black;
	color:white;
}


</style>
 