import User from "@models/database/user"
import { FailedResult, UserMethodResult } from "@models/database/user/interface"
import Link from "next/link"


function verifyEmail(props) {
    return (
        <div>
            <Link href="/login">Go to login</Link>
        </div>
    )
}

export default verifyEmail


export const getServerSideProps = async ({req,query}) =>{
    const result:UserMethodResult = await User.verifyEmail(query.email,query.token)
    // const fr = await fetch(`${server}/api/users/verify-email?email=${query.email}&token=${query.token}`,{method:'PUT'})
    let exceptionMessage;
    if(!result.successful) exceptionMessage = (result as FailedResult).exceptionMessage
    return{
        redirect:{
            destination: '/login?message='+(result.successful?encodeURIComponent('Your email has been verified succesfully'):encodeURIComponent(`The email verification failed (${exceptionMessage})`))
        }
    }
}