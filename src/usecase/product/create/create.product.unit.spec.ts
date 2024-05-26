import CreateProductUseCase from "./create.product.usecase";

const input = {
    type: "a",
    name: "TV",
    price: 1000,
};

const MockRepository = () => {
    return {
        create: jest.fn(),
        update: jest.fn(),
        find: jest.fn(),
        findAll: jest.fn(),
    };
}

describe("Unit Test create product use case", () => {

    it("should create a product", async () => {
        const productRepository = MockRepository();
        const usecase = new CreateProductUseCase(productRepository);
        const output = await usecase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price
        });
    });

    it("should thrown an error when name is missing", async () => {
        
        input.name = "";

        const productRepository = MockRepository();
        const usecase = new CreateProductUseCase(productRepository);
        
        await expect(usecase.execute(input)).rejects.toThrowError("Name is required");

    });

    it("Should throw an error when the price is less than or equal to zero.", async () => {
        
        input.name = "Smartphone";
        input.price = -1;

        const productRepository = MockRepository();
        const usecase = new CreateProductUseCase(productRepository);
        
        await expect(usecase.execute(input)).rejects.toThrowError("Price must be greater than zero");

    });
});

