import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import UpdateCustomerUseCase from "./update.customer.usecase";

const customer = CustomerFactory.createWithAddress(
    "John Doe",
    new Address("Main Street", 123, "Zip", "Springfield")
);

const input = {
    id: customer.id,
    name: "John Doe Updated",
    address: {
        street: "Main Street Updated",
        number: 1234,
        zip: "Zip Updated",
        city: "Springfield Updated"
    }
};

const MockRepository = () => {
    return {
        create: jest.fn(),
        update: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
    }
}

describe("Unit Test update customer use case", () => {

    it("should update a customer", async () => {
        const customerRepository = MockRepository();
        const usecase = new UpdateCustomerUseCase(customerRepository);
        const output = await usecase.execute(input);

        expect(output).toEqual(input);
    });

    /*it("should thrown an error when name is missing", async () => {
        
        input.name = "";

        const customerRepository = MockRepository();
        const usecase = new UpdateCustomerUseCase(customerRepository);
        
        await expect(usecase.execute(input)).rejects.toThrowError("Name is required");

    }); */
});


