import { Request, Response } from 'express';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';

// Helper
import updateProfile from '../../helpers/updateProfile';

export const postAvatar = (req: Request, res: Response): void => {
    // Reques Body
    const id: string = req.body.id;
    const fullName: string = req.body.fullName;
    const upload: string = req.body.upload;

    // Reques File
    const filePath: string = req.file.path;

    const isUpload: boolean = JSON.parse(upload);

    if (isUpload) {
        cloudinary.uploader.upload(
            filePath,
            (error, result: UploadApiResponse): void => {
                if (error) throw error;

                const url: string = result.url;
                const response = updateProfile(
                    id,
                    fullName,
                    isUpload,
                    url,
                );

                res.json(response);
            },
        );
    } else {
        const response = updateProfile(id, fullName, isUpload);

        res.json(response);
    }
};
