import ProductFactory from "../../../domain/product/factory/product.factory";
import ListProductUseCase from "./list.product.usecase";

const product1 = ProductFactory.create("a", "TV", 1000);
const product2 = ProductFactory.create("b", "Radio", 500);

const MockRepository = () => {
    return {
      create: jest.fn(),
      update: jest.fn(),
      find: jest.fn(),
      findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
    };
}

describe("Unit Test list product use case", () => {

    it("should list all products", async () => {
        const productRepository = MockRepository();
        const usecase = new ListProductUseCase(productRepository);
       
        const output = await usecase.execute({});

        expect(output.products.length).toBe(2);
        expect(output.products[0].id).toBe(product1.id);
        expect(output.products[0].name).toBe(product1.name);
        expect(output.products[0].price).toBe(product1.price);
        expect(output.products[1].id).toBe(product2.id);
        expect(output.products[1].name).toBe(product2.name);
        expect(output.products[1].price).toBe(product2.price);
    });
});