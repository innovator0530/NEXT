import { NextApiRequest, NextApiResponse } from "next"
import nextConnect, { NextConnect } from "next-connect"
import databaseMiddleware from "./database"

export function createHandler(...middleware):NextConnect<NextApiRequest,NextApiResponse> {
	return nextConnect().use(databaseMiddleware, ...middleware)
}
