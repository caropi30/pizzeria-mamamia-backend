import ProductModel from "../models/products.model";
import { unlink } from "fs/promises";

class ProductManager {
  async addProduct(product) {
    try {
      const {
        title,
        description,
        price,
        code,
        stock,
        category,
        status = true,
        thumbnails,
      } = product;

      if (!title || !description || !price || !code || !stock || !category) {
        throw new Error(
          "Todos los campos son obligatorios, excepto thumbnails."
        );
      }

      const existingProduct = await ProductModel.findOne({ code });
      if (existingProduct) {
        throw new Error("El código ya existe. Por favor, usa un código único.");
      }

      const newProduct = new ProductModel({
        title,
        description,
        price,
        code,
        stock,
        category,
        status,
        thumbnails,
      });

      await newProduct.save();
      return newProduct;
    } catch (error) {
      throw new Error(`Error al guardar el producto: ${error.message}`);
    }
  }

  async getProducts({
    limit = 10,
    page = 1,
    query = {},
    sort,
    lean = true,
  } = {}) {
    try {
      const options = {
        limit,
        page,
        sort,
        lean,
      };

      const data = await ProductModel.paginate(query, options);
      return data;
    } catch (error) {
      throw new Error(`Error al obtener los productos: ${error.message}`);
    }
  }

  async getProductById(id) {
    try {
      const data = await ProductModel.findById(id).lean();

      if (!data) {
        throw new Error(`No existe un producto con ID ${id}.`);
      }

      return data;
    } catch (error) {
      throw new Error(`Error al obtener el producto por ID: ${error.message}`);
    }
  }

  async changeProductById(id, updateData) {
    try {
      const updatedProduct = await ProductModel.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
      );

      if (!updatedProduct) {
        throw new Error(
          `No se encontró un producto con ID ${id} para actualizar.`
        );
      }

      return updatedProduct;
    } catch (error) {
      throw new Error(`Error al actualizar el producto: ${error.message}`);
    }
  }

  async deleteProductById(id) {
    try {
      const productToDelete = await ProductModel.findById(id);

      if (!productToDelete) {
        throw new Error(
          `No se encontró un producto con ID ${id} para eliminar.`
        );
      }


      await ProductModel.findByIdAndDelete(id);
      return { message: "Producto eliminado con éxito" };
    } catch (error) {
      throw new Error(`Error al eliminar el producto: ${error.message}`);
    }
  }
}

export default ProductManager;
