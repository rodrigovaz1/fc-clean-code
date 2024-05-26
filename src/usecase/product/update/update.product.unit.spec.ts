import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateProductUseCase from "./update.product.usecase";

const product = ProductFactory.create(
    "a",
    "TV",
    1000
);

const input = {
    id: product.id,
    name: "TV 4K",
    price: 2000
};

const MockRepository = () => {
    return {
        create: jest.fn(),
        update: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
    }
}

describe("Unit Test update product use case", () => {

    it("should update a product", async () => {
        const productRepository = MockRepository();
        const usecase = new UpdateProductUseCase(productRepository);
        const output = await usecase.execute(input);
        
        expect(output.name).toEqual(input.name);
        expect(output.price).toEqual(input.price);
    });

});


