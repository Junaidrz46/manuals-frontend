import axios from 'axios'

//axios.default.baseURL = 'http://localhost:8888/rest'

var url = "http://localhost:8888/rest/"

export function loginUser(username, password) {
    return axios.post('http://localhost:8888/rest/users/login', {
        "username": username,
        "password": password
    })
}

export function addRepresentative(firstname, lastName, username, email, password, companyId) {
    return axios.post('http://localhost:8888/rest/users/saveCompanyRepresentative', {
        "firstname": firstname,
        "lastName": lastName,
        "username": username,
        "emailaddress": email,
        "companyId": companyId,
        "password": password
    })
}

export function getAllCategories() {
    return axios.get('http://localhost:8888/rest/categories/findAllCategories')
        .then(response => {
            return response.data
        })
        .catch(function(error) {
            console.log(error);
        });
}

export function addProduct(categoryId, companyId, name, description, number) {
    return axios.post('http://localhost:8888/rest/categories//saveProductByCategroyAndCompany', {
        "categoryId": categoryId,
        "companyId": companyId,
        "product": {"name": name, "description": description, "productNumber": number, "companyId": companyId}
    })
}

export function addManuals(file, ProductId, description){
    var dataForm = new FormData();
    dataForm.append('ProductId', ProductId);
    dataForm.append('file', file);
    dataForm.append('Description', description);

    $.ajax({
        url: 'http://localhost:8888/rest/file/uploadFile',
        type: "POST",
        data: dataForm,
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        cache: false,
        success: function () {
            console.log("SUCCESS");
        },
        error: function () {
            console.log("FAIL");
        }
    });
}

export function findCompanyById(companyId){
    return axios.get('http://localhost:8888/rest/categories/findCompanyById?CompanyId='+companyId, {
        "CompanyId": companyId
    })
        .then(response => {
            return response.data
        })
        .catch(function(error) {
            console.log(error);
        });
}

export function findProductByCategoryId(categoryId){
    return axios.get('http://localhost:8888/rest/categories/findProductByCategoryId?CategoryId='+categoryId, {
        "CategoryId": categoryId
    })
        .then(response => {
            return response.data
        })
        .catch(function(error) {
            console.log(error);
        });
}

export function findProductById(ProductId){
    return axios.get('http://localhost:8888/rest/categories/findProductById?ProductId='+ProductId, {
        "ProductId": ProductId
    })
}

export function addImage(file, ProductId){
    var dataForm = new FormData();
    dataForm.append('ProductId', ProductId);
    dataForm.append('file', file);

    $.ajax({
        url: 'http://localhost:8888/rest/file/uploadProfileImage',
        type: "POST",
        data: dataForm,
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        cache: false,
        success: function () {
            console.log("SUCCESS");
        },
        error: function () {
            console.log("FAIL");
        }
    });
}

export function findMaterialById(material){

    return axios.get("http://localhost:8888/rest/categories/findMaterialById?materialId=" + material, {
        "materialId" : material
    })
    .then(response => {
        return response.data
    })
    .catch(function(error){
        console.log(error);
    });
    
}

export function searchProducts(query){
    return axios.get("http://localhost:8888/rest/categories/findProductsByCombinedCondition?condition=" + query, {
        "condition": query
    })
    .then(response => {
        return response.data
    })
    .catch(function(error) {
        console.log(error);
    });
}



export function deleteMaterialByID(materialId) {
    return axios.delete("http://localhost:8888/rest/file/deleteMaterialById?MaterialId=" + materialId, {
        "MaterialId" : materialId
    })
    .then(response => {
        console.log(response)
    })
    .catch(function(error){
        console.log("DELETING ERROR!!!")
        console.log(error)
    })
}

export function createAccount(fname, lname, username, password, email){
    return axios.post("http://localhost:8888/rest/users/saveConsumer", {
        "username": username,
        "emailaddress": email,
        "firstname": fname,
        "lastName": lname,
        "password": password
    })
    .then(response => {
        console.log("SUCCESS!")
    })
    .catch(function(error){
        console.log(error);
    })

}

export function saveLikedProduct(userId, productId){
    return axios.post("http://localhost:8888/rest/users/saveLikedProductsByUserId", {
        "userId": userId,
        "productId": productId
    })
    .then(response => {
        console.log("PRODUCT LIKED!")
    })
    .catch(function(error){
        console.log(error);
    })
}

<<<<<<< HEAD
export function findUserById(id){
    return axios.get("http://localhost:8888/rest/users/findUsersById?userId=" + id, {
        "userId": id
    }).then(response => {
        return response.data
    })
    .catch(function(error){
        console.log(error)
    })
}

export function saveSubscribeStatus(userId, message){
    return axios.post("http://localhost:8888/rest/users/saveAuthorizationByUserId?userId=" + userId + "&receiveMessage=" + message, {
        "userId": userId,
        "receiveMessage": message
    })
}


=======
export function rateMaterial(userId, materialId, rating){
    return axios.post("http://localhost:8888/rest/users/saveRatedMaterialByUserId", {
        "userId":userId,
        "materialId": materialId,
        "materiaRate": rating
    })
    .then(response => {
        console.log("Material rating sent!")
    })
    .catch(function(error){
        console.log("Material rate sending ERROR !")
        console.log(error);
    })

}

export function isMaterialRatedByUser(id, materialId){
    return axios.get("http://localhost:8888/rest/users/findUsersById?userId=" + id, {
        "userId":id
    })
    .then(response => {
        return response.data.ratedMaterials.includes(materialId)   
    })
    .catch(function(error){
        console.log("ERROR in isMaterialRatedByUser API!")
        console.log(error);
    })

}

export function getRatedMaterialsByuserId(id){
    return axios.get("http://localhost:8888/rest/users/findUsersById?userId=" + id, {
        "userId":id
    })
    .then(response => {
        return response.data.ratedMaterials   
    })
    .catch(function(error){
        console.log("ERROR in getRatedMaterialsByuserId API!")
        console.log(error);
    })

}
>>>>>>> new_4488-fil_scoring_with_API
// export function getUserByName(name) {
// return axios.get(url + 'findUserByUserName?userName='+name)
// 		.then(response => {
//             console.log(resopnse.data)
// 			return response.data
// 			})
// 		.catch(function (error) {
// 			console.log(error);
// 			});
// }


// function postUser(namePar, emailPar, rolePar) {
// 	return axios.post(url+'saveAdminUser', {
// 		userName: namePar,
// 		emailAddress: emailPar,
// 		role: rolePar
// 		})
// 		.catch(function (error) {
// 		console.log(error);
// 		});
// }

// function getUserByEmail(emailAddress) {
// return axios.get(url+'findUserByEmailAddress?emailAddress='+emailAddress)
// 		.then(response => {
// 			return response.data
// 			})
// 		.catch(function (error) {
// 			console.log(error);
// 			});
// }



// function getrepresentativeByEmail(emailAddress) {
// return axios.get(url+'findUserByEmailAddress?role=companyRepresentative&emailAddress='+emailAddress)
// 		.then(response => {
// 			return response.data
// 			})
// 		.catch(function (error) {
// 			console.log(error);
// 			});
