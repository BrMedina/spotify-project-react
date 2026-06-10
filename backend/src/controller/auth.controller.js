import { User } from "../models/user.model.js";

export const authCallback = async(req, res, next) => {
    try {
        const { id, firstName, lastName, imageUrl } = req.body;

        const fullname = [firstName, lastName].filter(Boolean).join(" ").trim() || "Unknown User";

        await User.findOneAndUpdate(
            { clerkId: id },
            {
                clerkId: id,
                fullname,
                imageUrl,
            },
            { upsert: true, returnDocument: "after", runValidators: true }
        );

        res.status(200).json({success:true})
    } catch (error) {
        console.log("error in auth callback", error);
        next(error);
        
    }
};