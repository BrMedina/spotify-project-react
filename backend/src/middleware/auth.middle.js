import { clerkClient, getAuth } from "@clerk/express";

export const protectRoute = async (req, res, next) => {
    const auth = getAuth(req);
    if (!auth?.userId) {
        res.status(401).json({message: "Unauthorized - You must be logged in!"});
        return
    }
    // ponytail: stash for downstream middleware
    req.authUserId = auth.userId;
    next();
};

export const requireAdmin = async(req, res, next) => {
    try {
        const currentUser = await clerkClient.users.getUser(req.authUserId);
        const isAdmin = process.env.ADMIN_EMAIL === currentUser.primaryEmailAddress?.emailAddress;

        if (!isAdmin) {
            return res.status(403).json({message: "Unauthorized - You must be an Admin!"});
        }

        next();
    } catch (error) {
        next(error);
    }
};