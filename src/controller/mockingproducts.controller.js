import { faker } from "@faker-js/faker"


class mockingProducts {
    get =  async (req,res)=>{
        let numOFProducts = 100;
        let products=[];
        for (let i=0 ; i<numOFProducts;i++){
            products.push(this.#getproducts());
            //console.log(products.length);
        }
        return res.status(200).json({ msg:'ok' , data: products})
    }
    #getproducts = ()=>{
        return {
            title: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            price : faker.commerce.price(),
            stock: faker.string.numeric(1),
            id: faker.database.mongodbObjectId(),
            thumbail:faker.image.urlPicsumPhotos(),
            category:faker.commerce.department(),
            code:faker.finance.iban(),
            status: faker.datatype.boolean(),


        }
    }
};

export const mockingProduct = new mockingProducts()