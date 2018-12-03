<template>
    <div id="RepresentativeHome">
        <!-- <h2 class="greeting-message">Welcome, {{ fname }} {{ lname }} from {{ companyname }}! </h2> -->
        <div class="body">
        <div class="product">
            <form>
                <h2>Create Product</h2>
                <p class="err" v-if="seen">
                    {{ message }}
                </p>
                <h6 class="desc">Product Name</h6>
                <input type="text" ref="name" name="" placeholder="Product name....">
                <h6 class="desc">Description</h6>
                <input type="text" ref="desc" name="" placeholder="Description...">
                <h6 class="desc">Catergory</h6>
                <select v-model="selected" @change="handleChange">
                    <option :value="null">Choose a category</option>
                    <option :value="category.id" v-for="category in categories" v-bind:key="category.id">
                        {{ category.name }}
                    </option>
                </select>
                <h6 class="desc">Brand</h6>
                <select v-model="selected2">
                    <option :value="null">Choose a brand</option>
                    <option :value="brand.id" v-for="brand in brands" v-bind:key="brand.id">
                        {{ brand.name }}
                    </option>
                </select>
                <input id="submit1" type="button" value="Save product" v-on:click="addProduct">
            </form>
            <p class="succ" v-if="seenSuccess">
                {{ messageSuccess }}
            </p>
            <div class="box">
                <form id="uploadForm" method="post" @submit.prevent="sendFile" enctype="multipart/form-data">
                    <strong class="desc">Upload file: </strong> 
                    <input type="file" id="file" ref="file"/>
                    <div id="selectedFiles"></div>
                    <input type="button" value="Add file" v-on:click="addManuals">
                    <p class="succ" v-if="seenFileSuccess">
                        {{ messageFile }}
                    </p>
                    <p class="err" v-if="seenFile">
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



export default {
    name: 'RepresentativeHome',
    data () {
        return{
            fileInput: '',
            selected: null,
            selected2: null,
            categories: [],
            brands: [],
            fname: localStorage.getItem("fname"),
            lname: localStorage.getItem("lname"),
            companyname : localStorage.getItem("current_companyname"),
            message: '',
            messageSuccess: '',
            seen: false,
            seenSuccess: false,
            seenFile: false,
            seenFileSuccess: false,
            messageFile: ''
		}
    },
    beforeMount: function() {
            getAllCategories().then(response => {
                
                response.forEach(element => {
                    this.categories.push(element)
                });

                console.log(this.selected)

            })
            localStorage.setItem("latestAddedProduct", '5bfd83619110f2297fc7de38');
        },
    methods: {
        // getCategories : function(){
        //     getAllCategories().then(response => {
                
        //         response.forEach(element => {
        //             this.cat.push(element)
        //         });
        //         console.log(this.cat)

        //     })
        // },

        handleChange: function(){

            this.brands = [];

            findBrandByCat(this.selected).then(response => {

                response.data.forEach(element => {
                    this.brands.push(element)
                });

                console.log(this.brands)
            });
        },

        addProduct: function (){
            if (this.$refs.name.value === "" || this.selected2 === null || this.$refs.desc.value === "" || this.selected === null){
                this.message = 'Please fill all the fields!'
                this.seen = true
            }else{

                console.log(this.selected)
                console.log(this.selected2)
                addProduct(
                    this.selected2,
                    this.$refs.name.value,
                    this.$refs.desc.value,
                    this.companyname
                )
                .then(response => {

                    localStorage.setItem("latestAddedProduct", response.data.id);

                })

                document.getElementById("submit1").disabled = true;
                this.seen = false;
                this.messageSuccess = 'Product successfully added! Reloading...'
                this.seenSuccess = true;
                this.waitFunc();

            }
        },

        addManuals: async function (){

            var product = localStorage.getItem("latestAddedProduct");

            if(this.$refs.file.value === ''){
                this.messageFile = 'Add a file please!';
                this.seenFile = true; 
            }else{

                addManuals(this.$refs.file.files[0], product);
                this.messageFile = 'Successfully added file! Reloading...'
                this.seen = false;
                this.seenFileSuccess = true;
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
    height: 700px;
    background: #F0F0F0;
    border: 1px solid #CCC;
    margin: 20px auto;
	position:absolute;
	top:50%;
	left:50%;
	transform:translate(-50%,-50%);
	padding:80px 40px;
	background:#FFFFFF;
	border-radius:10px;

	
}

h2
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
.succ {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	color: green;
	text-align: center;
}

.err {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	color: #FF4C4C;
	text-align: center;
}
</style>

