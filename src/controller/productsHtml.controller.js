import { products } from "../services/products.service"

class productsHtmlcontrollers {

    viewProducts = async (req, res) => {
  
        const {limit , page} = req.query
        const {category}= req.params
        const  users ={
          firstname : req.session.user.firstName,
          admin :req.session.user.rol,
          email: req.session.email
    
        }
        let isAdmin = false
        if(users.admin=='admin'){isAdmin = true }
        
        try {
          
          const productsAll = await products.getAll(limit,page,category);
          let productsView = productsAll.docs.map(products=>{
            return {
              id:products._id.toString(),
              title:products.title,
              description:products.description,
              price: products.price,
              thumbnail: products.thumbnail,
              code: products.code,
              status: products.status,
              category:products.category,
              stock: products.stock
            };
          })
           let pagination = {
            totalPages:productsAll.totalPages,
            prevPages: productsAll.prevPage,
            nextPage: productsAll.prevPage,
            page: productsAll.page,
            hasPrevPage: productsAll.hasPrevPage,
            hasNextPage: productsAll.hasNextPage,
            prevLink: productsAll.hasPrevPage ? `http://localhost:8080/api/products?page=${productsAll.prevPage}`: null,
            nextLink: productsAll.hasNextPage ? `http://localhost:8080/api/products?page=${productsAll.nextPage}`: null
          }
         return res.status(200).render('products',{products:productsView , pagination, users, isAdmin})
              
          
        } catch (error) {
          console.log(error);
          return res.status(500).json({
            status: "error",
            msg: "something went wrong :(",
            data: {},
          });
        
      }
      }

}

export const productsHtmlcontroller = new productsHtmlcontrollers ()