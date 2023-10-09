export default class productDTO {
     postProduct = (product) =>{
        
        return {
            title:product.title|| '',
            description:product.description,
            price:product.price||'',
            thumbnail:product.thumbnail||'sin imagen',
            status:product.status,
            category:product.category,
            code:product.code,
            stock:product.stock,
        }
    }
}