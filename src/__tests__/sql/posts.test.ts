import { AddPost, GetPosts } from "@/src/db/portal";
import {
  APIDataTypes,
  APIMessage,
  BaseError,
  LinkAction,
  PostType,
  isBaseError,
  isPostType
} from "@/src/types";

describe("Post", () => {
  describe("GetPosts", () => {
    const mockPost: PostType[] = [
      {
        id: "testId-1",
        reference: "",
        content: "test",
        comments: 1,
        likes: 1,
        created_at: new Date(),
        owner: "test-1",
        image: "https://test-image/random/test.png",
        liked: true,
        files: []
      }
    ];

    describe("Input: Incorrect", () => {
      it("Empty string reference : Should return an Error ", async () => {
        const response = await GetPosts({
          input: {
            self: "test-1",
            field: "id",
            value: "test",
            reference: ""
          },
          options: {
            mock: {
              mocked: true,
              mockValue: mockPost
            }
          }
        });

        const error = response.error as unknown as BaseError;

        expect(response).toBeDefined();
        expect(response.error).toBeDefined();
        expect(isBaseError(error)).toEqual(true);
        expect(response.data).not.toBeDefined();
        expect(response.rel).not.toBeDefined();
        expect(error.error).toEqual("Empty string reference");
      });

      it("Empty string value : Should return an Error ", async () => {
        const response = await GetPosts({
          input: {
            self: "test-1",
            field: "id",
            value: ""
          },
          options: {
            mock: {
              mocked: true,
              mockValue: mockPost
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

      it("Empty string self : Should return an Error ", async () => {
        const response = await GetPosts({
          input: {
            self: "",
            field: "id",
            value: "test"
          },
          options: {
            mock: {
              mocked: true,
              mockValue: mockPost
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
    });

    describe("Input: Correct", () => {
      const mockPost: PostType[] = [
        {
          id: "testId-1",
          reference: "",
          content: "test",
          comments: 1,
          likes: 1,
          created_at: new Date(),
          owner: "test-1",
          image: "https://test-image/random/test.png",
          liked: true,
          files: []
        }
      ];

      it("By field : self ", async () => {
        const response = await GetPosts({
          input: {
            self: "test-1",
            field: "id",
            value: "test"
          },
          options: {
            mock: {
              mocked: true,
              mockValue: mockPost
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
        expect(response.data?.type).toEqual("posts");
        expect(response.data?.count).toEqual(1);
        expect(isPostType(users[0].item)).toEqual(true);

        // Expect output value
        expect((users[0].item as PostType).id).toEqual("testId-1");
      });

      it("By field : owner ", async () => {
        const response = await GetPosts({
          input: {
            self: "test-1",
            field: "owner",
            value: "test-1"
          },
          options: {
            mock: {
              mocked: true,
              mockValue: mockPost
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
        expect(response.data?.type).toEqual("posts");
        expect(response.data?.count).toEqual(1);
        expect(isPostType(follow[0].item)).toEqual(true);

        // Expect output value
        expect((follow[0].item as PostType).id).toEqual("testId-1");
      });

      it("By field : all ", async () => {
        const response = await GetPosts({
          input: {
            self: "test-1",
            field: "all",
            value: "test-1"
          },
          options: {
            mock: {
              mocked: true,
              mockValue: mockPost
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
        expect(response.data?.type).toEqual("posts");
        expect(response.data?.count).toEqual(1);
        expect(isPostType(follow[0].item)).toEqual(true);

        // Expect output value
        expect((follow[0].item as PostType).id).toEqual("testId-1");
      });
    });
  });

  describe("AddPost", () => {
    const mockUserUpdate: APIMessage = {
      type: "AddPost",
      message: "Post added successfully",
      content: "testId-1"
    };

    describe("Input: Incorrect", () => {
      it("Empty string reference : Should return an Error ", async () => {
        const response = await AddPost({
          input: {
            id: "testId-1",
            reference: "",
            owner: "test-1",
            content: "test",
            files: []
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
        expect(error.error).toEqual("Empty string reference");
      });
    });

    describe("Input: Correct", () => {
      it(" Base case ", async () => {
        const response = await AddPost({
          input: {
            id: "testId-1",
            reference: "testId-1",
            owner: "test-1",
            content: "test",
            files: []
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
        expect(response.message?.type).toEqual("AddPost");
        expect(response.message?.message).toEqual("Post added successfully");
      });
    });
  });
});
