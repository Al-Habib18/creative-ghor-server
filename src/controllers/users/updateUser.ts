/** @format */

import { Request, Response } from "express";
import { clerkClient } from "../../config/clerk";

const updateUserController = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const userData = req.body;
    try {
        const user = await clerkClient.users.updateUserMetadata(userId, {
            publicMetadata: {
                userType: userData.publicMetadata.userType,
                settings: userData.publicMetadata.settings,
            },
        });
        res.status(200).json({
            message: "User updated Successfull",
            data: user,
        });
    } catch (error) {
        console.log("Error updating user:", error);
        res.status(500).json({ message: "Error Updating user", error });
    }
};

export default updateUserController;
