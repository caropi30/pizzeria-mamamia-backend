import CartModel from "../model/carts.model.js";

class CartManager {

    async createNewCart() {
        try {
            const nuevoCarrito = new CartModel({ products: [] })
            await nuevoCarrito.save()
            return nuevoCarrito
 
        } catch (error) {
            throw Error (`Error al crear el carrito: ${error}`);
        }
    }

    async getAllCarts() {
        try {
            const carts = CartModel.find();
            return await carts;
        } catch (error) {
            throw Error (`Error al obtener el carrito: ${error}`);
        }
    }

    async getCartById(id){
        try {
            const cart = await CartModel.findById(id).populate('products.product').lean()

            if (!cart) throw Error (`Error al encontrar el carrito por el ID: ${id}`);

            return await cart;

        } catch (error) {
            throw Error (`Error al obtener el carrito por ID ${error}`)
        }
    }

 
    async addProductToCart(cartId, productId, quantity = 1) {
        try {
          const cart = await this.getCartById(cartId);
    
          const productExists = cart.products.find((prod) => prod.product.toString() === productId);
    
          if (productExists) {
            existeProducto.quantity += quantity;
          } else {
            cart.products.push({ product: productId, quantity });
          }
    
         await cart.save();

          return cart;

        } catch (error) {
          console.error(
            `Error al agregar el producto ${productId} al carrito ${cartId}: ${}`,
            error.message
          );
          throw error; // Propaga el error para que pueda ser manejado externamente
        }
    }

    async removeProductFromCart(cid, pid){
        try {
            const cart = await CartModel.findById(cid)
            if(!cart) throw Error (`Error al buscar carrito`)
            
            cart.products = cart.products.filter(
                prod => prod.product._id.toString()!== pid
            )
            await cart.save()
            return cart;

        } catch (error) {
                throw Error (`Error al eliminar producto del carrito: ${error}`);
        }
    }


    async updateCart(id, upProd) {
        try {
            const cart = await CartModel.findById(id)

            if (!cart)  throw Error (`Error al obtener el carrito por ID ${error}`)
            
            cart.products= upProd;

            await cart.save();
        
            return cart;
        }

        catch (error) {
            throw Error (`Error al actualizar el carrito: ${error}`);
        }
}

       

    async clearCart(req, res){
        try {
            const {cid} = req.params
            const carrito = await Cart.findById(cid)
            if(!carrito) return console.log('Cart no encontrado')

            carrito.products = []
            await carrito.save()
            return carrito
        } catch (error) {
            console.error('Error al vaciar Cart - CM:', error);
                throw error;
        }
    }
    async updateProductQuantity(req, res){
        try {
            const {cid, pid} = req.params
            const {quantity} = req.body
            if(quantity <1 || !quantity ) return res.status(404).json({message:"Cantidad dene ser mayor a 0"}) 
            
            const carrito = await Cart.findById(cid)
            if(!carrito) return res.status(404).json({message:"Cart no encontrado"})

            const indiceProducto = carrito.products.findIndex(prod => prod.product.toString()=== pid)
            if(indiceProducto===-1) return res.status(404).json({message:"Producto no encontrado", carrito})

            carrito.products[indiceProducto].quantity = quantity
            await carrito.save()
            return carrito

        } catch (error) {
            return res.status(500).json({ message: "Error interno del servidor", error: error.message })
        }
    }
}

export default CartManager