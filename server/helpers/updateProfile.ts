import Users from '../models/Users';

// Helper
import { UpdateProfileInterface } from '../helpers/interface';

export default function (
    id: string,
    fullName: string,
    isUpload: boolean,
    avatar: string = '',
): UpdateProfileInterface {
    Users.findByIdAndUpdate(
        id,
        {
            fullName: fullName,
            avatar: avatar,
        },
        error => {
            if (error) throw error;
        },
    );

    return {
        profile: isUpload,
        fullName: fullName,
        avatar: avatar,
    };
}
