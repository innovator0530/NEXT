
import { SessionUser } from "../../models/user.models"


function AccountPending(props) {
    const message = props.banned ? 'Your account has been deactivated.' : 'Your account is pending for approval.'
    return (
        <div>
            {message}
        </div>
    )
}

// export const getServerSideProps = withSession(async function ({ req, res }) {
// 	const user:SessionUser = req.session.get("user")
// 	if (!user) {
// 		return {
// 			redirect: {
// 				destination: "/login",
// 				permanent: false,
// 			},
// 		}
// 	}
//     else if(user.status === 'APPROVED'||user.status==='APPROVAL_NEEDED'){
//         return{
//             redirect: {
//                 destination: '/app/dashboard',
//                 permanent: false
//             }
//         }
//     }
//     else{
//         return{
//             props: {
//                 banned: user.status === 'BANNED'
//             }
//         }
//     }
// })

export default AccountPending
