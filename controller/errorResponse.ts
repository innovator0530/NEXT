import { ErrorResponseBody } from "@models/api/ErrorResponseBody.model";
import { NextApiResponse } from "next";

export const sendBadRequestResponse = (res:NextApiResponse,error: ErrorResponseBody):void=>{
    res.status(400).send(error);
}