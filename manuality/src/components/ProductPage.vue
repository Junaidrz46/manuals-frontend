<template>
    <div id="product">
        <div class="body">
        <form>
		<h1>Specific product name</h1>
		<div class="productdetails">	
			<h3>Product Brand</h3>
			<h3>Product Name</h3>
			<h3>Product ID</h3>
		</div>
		<div class="materaildetails">
			<fieldset>
				<legend>Materails (manuals)</legend>
				<div class="matname">Material 1 (Name and description)</div>
				<button type="button" class="matbtn">Download/View</button>
				<div class="space">
				<div class="matname1">Material 2 (Name and description)</div>
				<button type="button" class="matbtn1">Download/View</button>
                </div>
			</fieldset>
		</div>
		</form>
        </div>
    </div>
</template>

<style>
h1
{
	margin:200;
	text-align:center;
	color:#101010;
}

.body
{
	margin:0;
	padding:0;
	background-size:cover;
	font-family:sans-serif;
	background-color:white;
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.productdetails
{	
	width:300px;
	height:150px;
	position: relative;
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
	height:auto;
	position: relative;
	left:250px;
	top:100px;
	background-color:#C0C0C0;
	border-radius:20px;
	padding-left:20px;

	
}
.matname
{
	float:left;
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
</style>

