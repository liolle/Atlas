import { GetUsers, UpdateUser } from "@/src/db/portal";
import {
    APIDataTypes,
    APIMessage,
    BaseError,
    LinkAction,
    UserType,
    isBaseError,
    isUserType
} from "@/src/types";

describe("Users", () => {
    describe("GetUsers", () => {
        const mockUsers: UserType[] = [
            {
                id: "test-1",
                name: "test-1",
                email: "test@test.com",
                image: "test-1",
                created_at: new Date(),
                following: true
            }
        ];
        describe("Input: Incorrect", () => {
            it("Undefined value & field != all : Should return an Error", async () => {
                const response = await GetUsers({
                    input: {
                        self: "test",
                        field: "id"
                    },
                    options: {
                        mock: {
                            mocked: true,
                            mockValue: mockUsers
                        }
                    }
                });

                const error = response.error as unknown as BaseError;

                expect(response).toBeDefined();
                expect(response.error).toBeDefined();
                expect(isBaseError(error)).toEqual(true);
                expect(response.data).not.toBeDefined();
                expect(response.rel).not.toBeDefined();
                expect(error.error).toEqual("Empty string value");
            });

            it("Empty string value & field != all : Should return an Error", async () => {
                const response = await GetUsers({
                    input: {
                        self: "test",
                        field: "id",
                        value: ""
                    },
                    options: {
                        mock: {
                            mocked: true,
                            mockValue: mockUsers
                        }
                    }
                });

                const error = response.error as unknown as BaseError;

                expect(response).toBeDefined();
                expect(response.error).toBeDefined();
                expect(isBaseError(error)).toEqual(true);
                expect(response.data).not.toBeDefined();
                expect(response.rel).not.toBeDefined();
                expect(error.error).toEqual("Empty string value");
            });
        });

        describe("Input: Correct", () => {
            it("By field : id ", async () => {
                const response = await GetUsers({
                    input: {
                        self: "test",
                        field: "id",
                        value: "test-1"
                    },
                    options: {
                        mock: {
                            mocked: true,
                            mockValue: mockUsers
                        }
                    }
                });
                const users = response.data?.content as unknown as {
                    actions: LinkAction[];
                    item: APIDataTypes;
                }[];

                // Expect value existence
                expect(response).toBeDefined();
                expect(response.data).toBeDefined();
                expect(response.error).not.toBeDefined();
                expect(response.data?.type).toEqual("user");
                expect(response.data?.count).toEqual(1);
                expect(isUserType(users[0].item)).toEqual(true);

                // Expect output value
                expect((users[0].item as UserType).id).toEqual("test-1");
            });

            it("By field : name ", async () => {
                const response = await GetUsers({
                    input: {
                        self: "test",
                        field: "name",
                        value: "test-1"
                    },
                    options: {
                        mock: {
                            mocked: true,
                            mockValue: mockUsers
                        }
                    }
                });

                const users = response.data?.content as unknown as {
                    actions: LinkAction[];
                    item: APIDataTypes;
                }[];

                // Expect value existence
                expect(response).toBeDefined();
                expect(response.data).toBeDefined();
                expect(response.error).not.toBeDefined();
                expect(response.data?.type).toEqual("user");
                expect(response.data?.count).toEqual(1);
                expect(isUserType(users[0].item)).toEqual(true);

                // Expect output value
                expect((users[0].item as UserType).name).toEqual("test-1");
            });

            it("By field : email ", async () => {
                const response = await GetUsers({
                    input: {
                        self: "test",
                        field: "email",
                        value: "test@test.com"
                    },
                    options: {
                        mock: {
                            mocked: true,
                            mockValue: mockUsers
                        }
                    }
                });

                const users = response.data?.content as unknown as {
                    actions: LinkAction[];
                    item: APIDataTypes;
                }[];

                // Expect value existence
                expect(response).toBeDefined();
                expect(response.data).toBeDefined();
                expect(response.error).not.toBeDefined();
                expect(response.data?.type).toEqual("user");
                expect(response.data?.count).toEqual(1);
                expect(isUserType(users[0].item)).toEqual(true);

                // Expect output value
                expect((users[0].item as UserType).name).toEqual("test-1");
            });
        });
    });

    describe("UpdateUser", () => {
        const mockUserUpdate: APIMessage = {
            type: "UpdateUser",
            message: "Update successful"
        };
        describe("Input: Incorrect", () => {
            it("Empty string value: Should return an Error", async () => {
                const response = await UpdateUser({
                    input: {
                        field: "name",
                        value: "",
                        email: "test@test.com"
                    },
                    options: {
                        mock: {
                            mocked: true,
                            mockValue: mockUserUpdate
                        }
                    }
                });

                const error = response.error as unknown as BaseError;

                expect(response).toBeDefined();
                expect(response.error).toBeDefined();
                expect(isBaseError(error)).toEqual(true);
                expect(response.data).not.toBeDefined();
                expect(response.rel).not.toBeDefined();
                expect(error.error).toEqual("Empty string value");
            });

            it("Wrong email format: Should return an Error", async () => {
                const response = await UpdateUser({
                    input: {
                        field: "name",
                        value: "test-2",
                        email: "test@test"
                    },
                    options: {
                        mock: {
                            mocked: true,
                            mockValue: mockUserUpdate
                        }
                    }
                });

                const error = response.error as unknown as BaseError;

                expect(response).toBeDefined();
                expect(response.error).toBeDefined();
                expect(isBaseError(error)).toEqual(true);
                expect(response.data).not.toBeDefined();
                expect(response.rel).not.toBeDefined();
                expect(error.error).toEqual("Invalid email format");
            });
        });

        describe("Input: Correct", () => {
            it("By field : name ", async () => {
                const response = await UpdateUser({
                    input: {
                        field: "name",
                        value: "test-2",
                        email: "test@test.com"
                    },
                    options: {
                        mock: {
                            mocked: true,
                            mockValue: mockUserUpdate
                        }
                    }
                });

                expect(response).toBeDefined();
                expect(response.message).toBeDefined();
                expect(response.message?.message).toEqual("Update successful");
            });

            it("By field : image ", async () => {
                const response = await UpdateUser({
                    input: {
                        field: "image",
                        value: "https://test-image.test/random/test.png",
                        email: "test@test.com"
                    },
                    options: {
                        mock: {
                            mocked: true,
                            mockValue: mockUserUpdate
                        }
                    }
                });

                expect(response).toBeDefined();
                expect(response.message).toBeDefined();
                expect(response.message?.type).toEqual("UpdateUser");
                expect(response.message?.message).toEqual("Update successful");
            });
        });
    });
});
