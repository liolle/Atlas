import { getAllUsers } from "@/src/db/sql/users/get";
import { BaseError, UserType, isBaseError, isUserType } from "@/src/types";

const mockUsers: UserType[] = [
    {
        id: "test-01",
        name: "string",
        email: "string",
        image: "string",
        created_at: new Date(),
        following: true
    }
];

describe("Users", () => {
    describe("getAllUsers", () => {
        describe("Input: Undefined value & field != all", () => {
            it("Should return an Error", async () => {
                const response = await getAllUsers(
                    {
                        self: "test",
                        field: "id"
                    },
                    {
                        mocked: true,
                        mockValue: mockUsers
                    }
                );

                const error = response as unknown as BaseError;

                expect(response).toBeDefined();
                expect(isBaseError(response)).toEqual(true);
                expect(error.error).toEqual("Incorrect input combination");
            });
        });

        describe("Input: correct", () => {
            it("Should return an array of user UserType[]", async () => {
                const response = await getAllUsers(
                    {
                        self: "test",
                        field: "id",
                        value: "test-01"
                    },
                    {
                        mocked: true,
                        mockValue: mockUsers
                    }
                );

                const users = response as unknown as UserType[];

                expect(response).toBeDefined();
                expect(users.length).toEqual(1);
                expect(isUserType(users[0])).toEqual(true);
                expect(users[0].id).toEqual("test-01");
            });
        });
    });
});
