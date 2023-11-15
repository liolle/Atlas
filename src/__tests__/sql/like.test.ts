import { LikeX } from "@/src/db/portal";
import { APIMessage, BaseError, isBaseError } from "@/src/types";

describe("Like", () => {
    describe("LikeX", () => {
        const mockLike: APIMessage = {
            type: "Like",
            message: "Update successful"
        };

        it("Post", async () => {
            const response = await LikeX({
                input: { type: "posts", id: "testId-1", name: "test-1" },
                options: {
                    mock: {
                        mocked: true,
                        mockValue: mockLike
                    }
                }
            });

            expect(response).toBeDefined();
            expect(response.message).toBeDefined();
            expect(response.message?.type).toEqual("Like");
            expect(response.message?.message).toEqual("Update successful");
        });

        describe("Input: Incorrect", () => {
            it("Empty sting id", async () => {
                const response = await LikeX({
                    input: { type: "posts", id: "", name: "test-1" },
                    options: {
                        mock: {
                            mocked: true,
                            mockValue: mockLike
                        }
                    }
                });

                const error = response.error as unknown as BaseError;

                expect(response).toBeDefined();
                expect(response.error).toBeDefined();
                expect(isBaseError(error)).toEqual(true);
                expect(response.data).not.toBeDefined();
                expect(response.rel).not.toBeDefined();
                expect(error.error).toEqual("Empty string id");
            });

            it("Empty sting name", async () => {
                const response = await LikeX({
                    input: { type: "posts", id: "testId-1", name: "" },
                    options: {
                        mock: {
                            mocked: true,
                            mockValue: mockLike
                        }
                    }
                });

                const error = response.error as unknown as BaseError;

                expect(response).toBeDefined();
                expect(response.error).toBeDefined();
                expect(isBaseError(error)).toEqual(true);
                expect(response.data).not.toBeDefined();
                expect(response.rel).not.toBeDefined();
                expect(error.error).toEqual("Empty string name");
            });
        });

        describe("Input: Correct", () => {
            it("Post", async () => {
                const response = await LikeX({
                    input: { type: "posts", id: "testId-1", name: "test-1" },
                    options: {
                        mock: {
                            mocked: true,
                            mockValue: mockLike
                        }
                    }
                });

                expect(response).toBeDefined();
                expect(response.message).toBeDefined();
                expect(response.message?.type).toEqual("Like");
                expect(response.message?.message).toEqual("Update successful");
            });
        });
    });
});
