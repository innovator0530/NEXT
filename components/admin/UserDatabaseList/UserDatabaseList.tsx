import { IUserQueryResult } from "@controller/user-database/queryUsers"
import Image from "next/image"
import React, { FC, Ref } from "react"
import {
	Container,
	Divider,
	ListEntry,
	ListEntryCaret,
	ListHeader,
	ListRow,
} from "./UserDatabaseList_styles"

const UserDatabaseList:FC<{
	users:IUserQueryResult[],
	openUser: (userId:string)=>void,
	lastElementRef: Ref<any>
}> =function ({ users,openUser,lastElementRef }) {
	return (
		<Container>
			<ListHeader>
				<div>E-Mail</div>
				<div>Date joined</div>
				<div>Total Earnings</div>
				<div>E.n. requested</div>
				<div>Releases</div>
				<div>Tracks</div>
				<div>Rejected</div>
			</ListHeader>

			{users.map((u,index,arr) => {
				return (
                    <React.Fragment key={u.id}>
					<ListRow ref={(index===(arr.length-1))?lastElementRef:null}  onClick={()=>openUser(u.id)}>
						<ListEntry>{u.email}</ListEntry>
						<ListEntry>{(new Date(u.createdAt)).toLocaleDateString('de-DE')}</ListEntry>
						<ListEntry>$ {u.earningsAmountCents/100}</ListEntry>
						<ListEntry>{u.payoutsCount}</ListEntry>
						<ListEntry>{u.releasesCount}</ListEntry>
						<ListEntry>{u.trackCount}</ListEntry>
						<ListEntry>{u.rejectedCount}</ListEntry>
						<ListEntryCaret className="caret">
							<Image
								src="/icons/caret-right.svg"
								layout="fixed"
								width="7"
								height="14"
							/>
						</ListEntryCaret>
					</ListRow>
                    {index<(arr.length-1) && <Divider />}
                    </React.Fragment>
				)
			})}

			
		</Container>
	)
}

export default UserDatabaseList
