import axios from 'axios'

axios.default.baseURL = 'http://localhost:8080'

var url = "http://localhost:8080/rest/"


export function loginUser(username, password) {
    // test
    return {match: 0, role: "company_admin"}
    //not test
    return axios.post('/users/login')
    .then(response => {
        return { asd: "asd"}
        // TODO decide which type of response we will use depending on the back implementation
        
        // response.data
        
        // {
        //     match: response.data["match"],
        //     role: response.data["role"]
        // }
    })
}


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

// function getUserByName(name) {
// return axios.get(url+'findUserByUserName?userName='+name)
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