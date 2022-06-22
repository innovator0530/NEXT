import { NextApiRequest, NextApiResponse } from "next";
import { createHandler } from "../../../middleware";
import User from "../../../models/database/user";
import { validatePasswordHash } from "../../../lib/password";
import { SessionUser } from "../../../models/user.models";


const handler = createHandler();


export default handler;