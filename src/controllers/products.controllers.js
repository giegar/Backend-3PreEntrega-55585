import ProductServices from "../services/products.services.js";

// Obtener productos con paginacion y filters
export const getProducts = async (req,res) =>{

    try{
        const limit = parseInt(req.query?.limit ?? 10);
        const page = parseInt(req.query?.page ?? 1);
        const sort = req.query.sort ?? '' ;
        const category = req.query.category ?? '' ;
        const stock = parseInt(req.query.stock) ?? '' ;

        const products = await ProductServices.getProducts(limit, page, sort, category, stock)

        res.send(products)

    }catch(error){
        //return res.status(500).send("Cannot get the products" + error)
    }

}

// Buscar un producto especifico por ID
export const getProductById = async (req,res) =>{
    const { pid } = req.params;

    try{
        const product = await ProductServices.getProductById(pid);
        return res.status(200).json({ message: "Product found", product })
    }catch(error){
        return res.status(404).json({ message: error.message })
    }
}

// Crear un producto
export const addProduct = async (req,res) =>{
    try{
        const data = req.body;
        //const product = await ProductModel.create(data)
        const product = await ProductServices.addProduct(data)

        return res.status(200).json({ message: "New product added", product})
        
    } catch(error){
        return res.status(400).json({ message: error.message })
    }
}

// Modificar un producto
export const updateProduct = async (req,res) =>{
    try{
        let { pid } = req.params;
        let update = req.body;
        await ProductServices.updateProduct({ _id: pid }, update)

        return res.status(200).json({ message: "Product updated"})

    } catch(error){
        return res.status(400).json({ message: error.message })
    }
}

// Eliminar un producto
export const deleteProduct = async (req,res) =>{
    const { pid } = req.params;

    try{
        const result = await ProductService.deleteProduct(pid)
        if(result === null) {
            return res.status(404).json({ status: 'error', error: `Product ID ${pid} not found` })}

        return res.status(200).json({ message: "Product deleted"})

    } catch(error){
        return res.status(500).json({ message: error.message })
    }
}