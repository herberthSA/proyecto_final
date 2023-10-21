export default class usersDTO {
    getAllusers = (users) =>{
       const usersInformation =users.map(user =>{
        return {
            name : user.firstName + ' ' + user.lastName,
            email : user.email,
            rol : user.rol
        }
       })
       return usersInformation;
   }
}

