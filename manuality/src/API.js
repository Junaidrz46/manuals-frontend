import axios from 'axios'

//axios.default.baseURL = 'http://localhost:8888/rest'

var url = "http://localhost:8888/rest/"

export function loginUser(username, password) {
    return axios.post('http://localhost:8888/rest/users/login', {
        "username": username,
        "password": password
    })
}

export function addRepresentative(firstname, lastName, username, email, password, companyname) {
    return axios.post('http://localhost:8888/rest/users/saveCompanyRepresentative', {
        "firstname": firstname,
        "lastName": lastName,
        "username": username,
        "emailaddress": email,
        "companyname": companyname,
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

export function addProduct(categoryId, name, description) {
    return axios.post('http://localhost:8888/rest/categories/saveProductByCatergoryId', {
        "categoryId": categoryId,
        "brand": {"name": name, "description": description}
    })
}

export function addManuals(file, ProductId){
    return axios.post('http://localhost:8888/rest/file/uploadFile', {
        "file": file,
        "ProductId": ProductId,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

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
// }