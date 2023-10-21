import { DateTime } from 'luxon';
import { user } from '../DAO/Mongo/users.mongo.js'
import { emailTransport } from '../utils/email.js';
class userDatas {
    async usersInformation(id){
        const viewCart = await user.get(id);
        return viewCart;
    }
    
    async get (){
       
        const viewUsers = await user.getAll();
        return viewUsers;

    }

    async deleteUsers (){
        let id
        const deleteTime = 0.5
        const deletionResults = [];
        const timeNow = DateTime.now().setZone('America/Mexico_City');
        const viewUsers = await user.getAll();
        for ( const users of viewUsers){
            const subtractTime=timeNow-users.lastLogin;
            const minutesTime = subtractTime*(1/60000);
            const hourTime = minutesTime/60;
            const dayTime = hourTime/24
            
        if (hourTime > deleteTime && users.rol == 'user' ){
            const deleteUsers = await user.deleteUsers(users._id.toString());
            deletionResults.push(deleteUsers);
            const result = await emailTransport.sendMail({
                from: process.env.GOOGLE_EMAIL,
                to: users.email,
                subject: "Se elimino su usuario",
                html: `
                          <div>
                              <p>Se elemino por falta de conexión a su cuenta</p>
                          </div>
                      `,
                
              }
                
              );

             
        }
        
        }
        return deletionResults
        
    }

    
}

export const userData = new userDatas()