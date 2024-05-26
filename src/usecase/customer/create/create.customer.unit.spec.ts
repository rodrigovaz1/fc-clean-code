import CreateCustomerUseCase from "./create.customer.usecase";

const input = {
    name: "John",
    address: {
        street: "Street",
        city: "City",
        number: 123,
        zip: "Zip",
    },
};

const MockRepository = () => {
    return {
        create: jest.fn(),
        update: jest.fn(),
        find: jest.fn(),
        findAll: jest.fn(),
    };
}

describe("Unit Test create customer use case", () => {

    it("should create a customer", async () => {
        const customerRepository = MockRepository();
        const usecase = new CreateCustomerUseCase(customerRepository);
        const output = await usecase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            address: {
                street: input.address.street,
                city: input.address.city,
                number: input.address.number,
                zip: input.address.zip,
            }
        });
    });

    it("should thrown an error when name is missing", async () => {
        
        input.name = "";

        const customerRepository = MockRepository();
        const usecase = new CreateCustomerUseCase(customerRepository);
        
        await expect(usecase.execute(input)).rejects.toThrowError("Name is required");

    });
});

