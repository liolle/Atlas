import { curateError } from "../lib/utils";
import {
    BaseError,
    GetUserType,
    ReserveNameType,
    UpdateUserType,
    UserGetStrField,
    UserUpdateStrField,
    isBaseError
} from "../types";
import { getUsers } from "./sql/users/getUser";
import ReserveName from "./sql/users/reserveName";
import updateUser from "./sql/users/updateUser";

export const QueryReserveName = async (
    options: ReserveNameType["input"]
): Promise<ReserveNameType["output"] | BaseError | null> => {
    return ReserveName(options);
};

export const GetUsers = async (
    options: UserGetStrField
): Promise<GetUserType["output"] | BaseError | null> => {
    const result = await getUsers(options);

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
