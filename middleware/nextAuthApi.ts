import { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import User from "../models/database/user";

export interface RequestWithSession extends NextApiRequest { session: Session };


// Just adds the NextAuth Session Object to the Request
export const userSession = async (req: RequestWithSession , res: NextApiResponse, next) => {

    const session: Session | null = (await getSession({ req })) ;

    req.session = session;
    return next();

};

// Just adds the NextAuth Session Object to the Request
export const adminOnlySession = async (req: RequestWithSession , res: NextApiResponse, next) => {
    
    const session: Session | null = (await getSession({ req })) ;

    if (!(session?.user)||session.user.type!=='ADMIN') {
        res.status(403).json({ message: "Unauthorized" })
        return
    }	

    req.session = session;
    return next();

};

// If this Middleware is used instead, 
// and the request from the frontend adds "?allowadmincontext=true"
// to the request, the user in the session object is replaced by the "context user"
export const adminUserContext = async (req: NextApiRequest & { session: Session }, res: NextApiResponse, next) => {

    const session: Session | null = (await getSession({ req })) ;


    const allowAdminContext = req.query.allowadmincontext==='true';

    if (allowAdminContext && session?.user.type === 'ADMIN' && session.adminContextUser) {
        const contextUser = await User.findOne({ _id: session.adminContextUser })
        if (!contextUser || contextUser.type !== 'USER') {
            return next()
        }
        session.user = {
            isContextUser: true,
            email: contextUser.email,
            type: 'USER',
            completionStatus: contextUser.completionStatus,
            id: contextUser.id
        }
    }

    if (!(session?.user)) {
        res.status(403).json({ message: "Unauthorized" })
        return
    }		

    req.session = session;
    return next();

};