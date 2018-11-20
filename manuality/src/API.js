import axios from 'axios'

//axios.default.baseURL = 'http://localhost:8888/rest'

var url = "http://localhost:8888/rest/"




export function loginUser(username, password) {

    return axios.post('http://localhost:8888/rest/users/login', {
        "username": username,
        "password": password
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


//export default {postUser, getUserByEmail, getUserByName, getrepresentativeByEmail};