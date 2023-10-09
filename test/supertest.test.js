import chai from 'chai';
import { describe } from 'mocha';
import supertest from 'supertest';
const expect = chai.expect;
const requester = supertest('http://127.0.0.1:8080');

let cookieName;
let cookieValue;
const mockUser ={
    email : 'test@gmail.com',
    password:'123'
}
const mockUSer_2 ={
    email : 'test1@gmail.com',
    password:'123'
}
/* describe('Test sessions', () => {
    
    it('Debe logearse y delvolver la cookie de identificación', async () => {
        const result = await requester.post('/api/sessions/login').send({
            email: mockUser.email,
            password: mockUser.password,
          });
       
        const cookie = result.headers['set-cookie'][0];
        expect(cookie).to.be.ok;
        cookieName = cookie.split('=')[0];
        cookieValue = cookie.split('=')[1];
        expect(cookieName).to.be.ok
        expect(cookieValue).to.be.ok;
      
    });
   
     it('Debe sustraer la informacion del usuario logueado', async () => {
        const result = await requester.get('/api/sessions/current').set('Cookie', [`${cookieName}=${cookieValue}`])
        expect(result.body.payload).to.be.ok
     });
     it('Debe desloargearse ', async () => {
        const result = await requester.get('/api/sessions/logout')
        expect(result.status).to.be.oneOf([302, 200]);
     });
});

describe('Test products', () => {
    let idProduct
    const  mockProduct ={
        title: "producto test",
        description: "Este es un producto prueba",
        price: 2000,
        thumbnail: "",
        status: true,
        category:"food",
        code: "5558kkc",
        stock: 25
    }
    before(async()=>{
        const result = await requester.post('/api/sessions/login').send({
            email: mockUser.email,
            password: mockUser.password,
          });
       
        const cookie = result.headers['set-cookie'][0];
        expect(cookie).to.be.ok;
        cookieName = cookie.split('=')[0];
        cookieValue = cookie.split('=')[1];
        expect(cookieName).to.be.ok
        expect(cookieValue).to.be.ok;

    });
    it('Debe llamar a todos los productos en las base de datos', async () => {
       const result = await requester.get('/api/products')

      expect(result.status).to.be.eql(200);
      expect(result.body.payload).to.be.an('array'); // Verificar que payload sea un array
      if (result.body.payload.length > 0) {
        // Si hay elementos en el array, verificar que al menos uno de ellos tenga la propiedad '_id'
        expect(result.body.payload[0]).to.have.property('_id');
      }
    });

    it('Debe LLamar un limite de producto en la base dde datos ', async () => {
        const limit = '1'
        const result = await requester.get(`/api/products?limit=${limit}`)
 
       expect(result.status).to.be.eql(200);
       expect(result.body.payload).to.be.an('array'); // Verificar que payload sea un array
       if (result.body.payload.length > 0) {
         // Si hay elementos en el array, verificar que al menos uno de ellos tenga la propiedad '_id'
         expect(result.body.payload[0]).to.have.property('_id');
       }
    });
    it('Debe Agregar un producto ', async () => {
        const result = await requester.post('/api/products').send(mockProduct).set('Cookie', [`${cookieName}=${cookieValue}`])
        expect(result.body.data).to.have.property('_id')
        idProduct=result.body.data._id
        expect(result.status).to.be.oneOf([302, 200,201]);
                
     });
     it('Debe modificar un o varios campos de un producto ', async () => {
        const mockProductModify = mockProduct

        mockProductModify.title='producto_test_modificado'
        const result = await requester.put(`/api/products/${idProduct}`).send(mockProductModify).set('Cookie', [`${cookieName}=${cookieValue}`])
        expect(result.body).to.be.ok
        
                
     });
     it('Eliminar producto por Id ', async () => {
         const result = await requester.delete(`/api/products/${idProduct}`).set('Cookie', [`${cookieName}=${cookieValue}`])
         expect(result.body.data).to.be.ok      
         
      });

}); */

describe('Test carts',()=>{
    let idCarts
    let cookieName_2
    let cookieValue_2
    before(async()=>{
        const result = await requester.post('/api/sessions/login').send({
            email: mockUSer_2.email,
            password:mockUSer_2.password,
          });
       
        const cookie = result.headers['set-cookie'][0];
        expect(cookie).to.be.ok;
        cookieName_2 = cookie.split('=')[0];
        cookieValue_2 = cookie.split('=')[1];
        expect(cookieName_2).to.be.ok
        expect(cookieValue_2).to.be.ok;

    });
    it('Debe crear un carrito',async()=>{
        const result = await requester.post('/api/carts')
        expect(result.body.data).to.have.property('_id')
        idCarts = result.body.data._id
    });

});


      
