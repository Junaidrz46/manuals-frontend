<template>
    <div id="RepresentativeHome">
        <!-- <h2 class="greeting-message">Welcome, {{ fname }} {{ lname }} from {{ companyname }}! </h2> -->
        <div class="body">
        <div class="product">
            <form id="myForm" readonly>
                <fieldset id="fs">
                <h3>Create Product</h3>
                <h6 class="desc">Product Name</h6>
                <input type="text" ref="name" name="" placeholder="Product name...">
                <h6 class="desc">Product Number</h6>
                <input type="text" ref="number" name="" placeholder="Product number...">
                <h6 class="desc">Description</h6>
                <input type="text" ref="desc" name="" placeholder="Description...">
                <h6 class="desc">Catergory</h6>
                <select v-model="selected">
                    <option :value="null">Choose a category</option>
                    <option :value="category.id" v-for="category in categories" v-bind:key="category.id">
                        {{ category.name }}
                    </option>
                </select>
                
                <input id="submit1" type="button" value="Save product" v-on:click="addProduct">
                </fieldset>
            </form>
            <p id="message1" v-bind:class="[classA, isB ? classB: '']" v-if="seen">
                {{ message }}
            </p>
            <div class="box">
                <form id="uploadForm" method="post" @submit.prevent="sendFile" enctype="multipart/form-data">
                    <strong class="desc">Upload file: </strong> 
                    <input type="file" id="file" ref="file"/>
                    <div id="selectedFiles"></div>
                    <input type="button" value="Add file" v-on:click="addManuals">
                    <p id="message2" v-bind:class="[classA, isB ? classB: '']" v-if="seenFile">
                        {{ messageFile }}
                    </p>
                 </form>
            </div>
            </div>
        </div>
    </div>
</template>
<script>
import {getAllCategories} from '../API'
import {addProduct} from '../API'
import {addManuals} from '../API'
import {findBrandByCat} from '../API'
import axios from 'axios'
import jQuery from 'jquery'
import {findCompanyById} from '../API'
export default {
    name: 'RepresentativeHome',
    data () {
        return{
            classA: 'class-a',
            classB: 'class-b',
            isB: false,
            fileInput: '',
            selected: null,
            categories: [],
            fname: localStorage.getItem("fname"),
            lname: localStorage.getItem("lname"),
            company: '',
            message: '',
            messageFile: '',
            seen: false,
            seenFile: false
		}
    },
    beforeMount: function() {
            getAllCategories().then(response => {
                
                response.forEach(element => {
                    this.categories.push(element)
                });  
            })
            localStorage.removeItem("latestAddedProduct");
        },
    methods: {
        addProduct: function (){
            if (this.$refs.name.value === "" || this.$refs.desc.value === "" || this.selected === null || this.$refs.number.value === ""){
                this.message = 'Please fill all the fields!'
                this.seen = true
            }else{
                var company = localStorage.getItem("company");
                addProduct(
                    this.selected,
                    company,
                    this.$refs.name.value,
                    this.$refs.desc.value,
                    this.$refs.number.value,
                )
                .then(response => {
                    localStorage.setItem("latestAddedProduct", response.data.id);
                })
                document.getElementById("submit1").disabled = true;
                this.isB = true;
                this.message = 'Product successfully added! Please add manuals for it...'
                this.seen = true;
            }
        },
        addManuals: async function (){
            var product = localStorage.getItem("latestAddedProduct");
            if(this.$refs.file.value === ''){
                this.isB = false;
                this.messageFile = 'Add a file please!';
                this.seenFile = true; 
            }else if(localStorage.getItem("latestAddedProduct") === null){
                this.isB = false;
                this.messageFile = 'You need to add a product first!'
                this.seenFile = true;
            }else{
                addManuals(this.$refs.file.files[0], product);
                this.isB = true;
                this.messageFile = 'Manuals added! Reloading...'
                this.seenFile = true;
                this.waitFunc();
            }
        },
        handleFileUpload: function(){
            this.file = this.$refs.file.files[0];
        },
        waitFunc: function(){
           
            setTimeout(function(){ location.reload(); }, 2000);
        }
    }  
}
</script>
<style>
.body{
margin:0px;
padding:0px;
background-size:cover;
font-family:sans-serif;
background-color:white;
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
.greeting-message{
	color: #262626;
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	float: left;
	margin-top: 30px;
	margin-left: 50px;
}
.product
{
	width:600px;
    height: 775px;
    background: #F0F0F0;
    border: 1px solid #000;
	position:absolute;
	padding:80px 40px;
	background:#FFFFFF;
	border-radius:10px;
    margin-left: 20%;
	margin-top: 35px; 
	
}
h3
{
	padding:20px;
	padding-top:0px;
	color:black;
	text-align:center;
    margin-top: -50px;
}
.desc
{
	color:black;
    float: left;
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
.product select
{
	border:none;
	border-bottom:1px solid #000;
	background:transparent;
	outline:none;
	height:30px;
	width:100%;
	color:black;
	font-size:16px;
    margin-bottom: 20px;
	
}
.product input
{
	padding:10px;
	width:100%;
	margin-bottom:25px;
    /* margin-top: 10px; */
}
.product input[type="text"], .product input[type="text"], .product input[type="text"]
{
	padding-bottom:5px;
	padding-top:5px;
	border:none;
	border-bottom:1px solid #000;
	background:transparent;
	outline:none;
	color:black;
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
::placeholder
{
	margin-bottom:10px;
	color:light-gray;
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
.product input[type="button"]
{
	margin-top:20px;
	border:none;
	outline:none;
	height:40px;
    width: 150px;
	color:#fff;
	background:#708090;
	cursor:pointer;
	border-radius:20px;
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
.product input[type="button"]:hover
{
	background:black;
	color:white;
}
.class-a {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	text-align: center;
    color: red;
}
.class-b {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	text-align: center;
    color: green;
}
</style>