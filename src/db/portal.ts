import { curateError } from "../lib/utils";
import {
    BaseError,
    GetUserFollowType,
    GetUserType,
    ReserveNameType,
    UpdateFollowStrField,
    UpdateUserType,
    UserGetStrField,
    UserUpdateStrField,
    isBaseError
} from "../types";
import { UnFollowUsers } from "./sql/follows/delete";
import { getFollow } from "./sql/follows/get";
import { FollowUsers } from "./sql/follows/post";
import { getAllUsers, getUsers } from "./sql/users/get";
import ReserveName from "./sql/users/reserveName";
import updateUser from "./sql/users/update";

export const QueryReserveName = async (
    options: ReserveNameType["input"]
): Promise<ReserveNameType["output"] | BaseError | null> => {
    return ReserveName(options);
};

export const GetUsers = async (
    options: UserGetStrField
): Promise<GetUserType["output"][] | BaseError | null> => {
    const result =
        options.field == "all" ? await getAllUsers() : await getUsers(options);

    if (!result) return null;

    if (isBaseError(result)) {
        // TODO Log error using log service
        console.log("<TODO Log Error>");
        return result;
    }

    return result;
};

export const UpdateUser = async (
    options: UserUpdateStrField
): Promise<UpdateUserType["output"] | BaseError | null> => {
    const result = await updateUser(options);

    if (!result) return null;

    if (isBaseError(result)) {
        // TODO Log error using log service
        console.log("<TODO Log Error>");

        result.details = curateError(result.details);
        return result;
    }

    return result;
};

export const GetFollows = async (
    options: GetUserFollowType["input"]
): Promise<GetUserFollowType["output"] | BaseError | null> => {
    const result = await getFollow(options);

    if (!result) return null;

    if (isBaseError(result)) {
        // TODO Log error using log service
        console.log("<TODO Log Error>");

        return result;
    }

    return result;
};

export const UpdateFollows = async (
    options: UpdateFollowStrField
): Promise<BaseError | null> => {
    const result =
        options.type == "follow"
            ? await FollowUsers(options)
            : await UnFollowUsers(options);

    if (!result) return null;

    if (isBaseError(result)) {
        // TODO Log error using log service

        console.log("<TODO Log Error>");

        result.details = curateError(result.details);
        return result;
    }

    return result;
};
