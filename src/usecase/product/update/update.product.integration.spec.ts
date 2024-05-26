import { Sequelize } from "sequelize-typescript";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import UpdateProductUseCase from "./update.product.usecase";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";


describe("Test update product use case", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:", 
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should update a product", async () => {

        const productRepository = new ProductRepository();
        
        const product = ProductFactory.create("a", "TV", 1000);
        await productRepository.create(product);

        const input = {
            id: product.id,
            name: "TV 4K",
            price: 2000
        };

        const usecase = new UpdateProductUseCase(productRepository);
        const output = await usecase.execute(input);
        
        expect(output.name).toEqual(input.name);
        expect(output.price).toEqual(input.price);
    });

});