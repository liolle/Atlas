import { GetFollows, UpdateFollows } from "@/src/db/portal";
import {
    APIDataTypes,
    APIMessage,
    BaseError,
    FollowType,
    LinkAction,
    isBaseError,
    isFollowType
} from "@/src/types";

describe("Follow", () => {
    describe("GetFollows", () => {
        const mockUsers: FollowType[] = [
            {
                name: "test-1",
                image: "https://test-image.test/random/test.png",
                following: false
            }
        ];

        describe("Input: Incorrect", () => {
            it("Empty string value : Should return an Error ", async () => {
                const response = await GetFollows({
                    input: {
                        self: "test-1",
                        field: "self",
                        value: " "
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
            it("By field : self ", async () => {
                const response = await GetFollows({
                    input: {
                        self: "test-1",
                        field: "self",
                        value: "test-2"
                    },
                    options: {
                        mock: {
                            mocked: true,
                            mockValue: mockUsers
                        }
                    }
                });

                const follow = response.data?.content as unknown as {
                    actions: LinkAction[];
                    item: APIDataTypes;
                }[];

                // Expect value existence
                expect(response).toBeDefined();
                expect(response.data).toBeDefined();
                expect(response.error).not.toBeDefined();
                expect(response.data?.type).toEqual("follows");
                expect(response.data?.count).toEqual(1);
                expect(isFollowType(follow[0].item)).toEqual(true);

                // Expect output value
                expect((follow[0].item as FollowType).name).toEqual("test-1");
            });

            it("By field : follow ", async () => {
                const response = await GetFollows({
                    input: {
                        self: "test-1",
                        field: "follow",
                        value: "test-2"
                    },
                    options: {
                        mock: {
                            mocked: true,
                            mockValue: mockUsers
                        }
                    }
                });

                const follow = response.data?.content as unknown as {
                    actions: LinkAction[];
                    item: APIDataTypes;
                }[];

                // Expect value existence
                expect(response).toBeDefined();
                expect(response.data).toBeDefined();
                expect(response.error).not.toBeDefined();
                expect(response.data?.type).toEqual("follows");
                expect(response.data?.count).toEqual(1);
                expect(isFollowType(follow[0].item)).toEqual(true);

                // Expect output value
                expect((follow[0].item as FollowType).name).toEqual("test-1");
            });
        });
    });

    describe("UpdateFollows", () => {
        const mockUserUpdate: APIMessage = {
            type: "UpdateFollow",
            message: "Update successful"
        };
        describe("Input: Incorrect", () => {
            it("Empty string self : Should return an Error ", async () => {
                const response = await UpdateFollows({
                    input: {
                        type: "follow",
                        self: "",
                        follow: "test-2"
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
                expect(error.error).toEqual("Empty string self");
            });

            it("Empty string follow : Should return an Error ", async () => {
                const response = await UpdateFollows({
                    input: {
                        type: "follow",
                        self: "test-1",
                        follow: ""
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
                expect(error.error).toEqual("Empty string follow");
            });
        });

        describe("Input: Correct", () => {
            it("Self & follow not empty ", async () => {
                const response = await UpdateFollows({
                    input: {
                        type: "follow",
                        self: "test-1",
                        follow: "test-2"
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
                expect(response.message?.type).toEqual("UpdateFollow");
                expect(response.message?.message).toEqual("Update successful");
            });
        });
    });
});
