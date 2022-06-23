import { IUserQueryResult } from "@controller/user-database/queryUsers"
import Image from "next/image"
import React, { FC, Ref ,useState } from "react"
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
	const [resutls, setResult] = useState<IUserQueryResult[]>(users)
	const [sortIndex, setSortIndex] = useState<string>("Tab-1");
	const [sortDir, setSortDir] = useState<number>(-1);
	
	const changeTab = (event: React.MouseEvent<HTMLElement>) => {
		let data = resutls;
		if(sortIndex == event.currentTarget.id)
			setSortDir(-sortDir);
		else 
			setSortDir(1);
		let val;
		if(event.currentTarget.id =="Tab-1")
			val = "email";
		if(event.currentTarget.id =="Tab-2")
			val = "createdAt";
		if(event.currentTarget.id =="Tab-3")
			val = "earningsAmountCents";
		if(event.currentTarget.id =="Tab-4")
			val = "payoutsCount";
		if(event.currentTarget.id =="Tab-5")
			val = "releasesCount";
		if(event.currentTarget.id =="Tab-6")
			val = "trackCount";
		if(event.currentTarget.id =="Tab-7")
			val = "rejectedCount";
		if(event.currentTarget.id =="Tab-8")
			val = "status";
		if(sortDir > 0)
			data = data.sort((a, b) => a[val]>b[val]?1:-1);
		else
			data = data.sort((a, b) => a[val]<b[val]?1:-1);
		setResult(data);
		setSortIndex(event.currentTarget.id);
	}
	return (
		<Container>
			<ListHeader>
				<div className="tab" id="Tab-1" onClick={changeTab}>E-Mail<i className={sortIndex=="Tab-1"?(sortDir>0?"fa fa-fw fa-sort-asc":"fa fa-fw fa-sort-desc"):""}></i></div>
				<div className="tab" id="Tab-2" onClick={changeTab}>Date joined<i className={sortIndex=="Tab-2"?(sortDir>0?"fa fa-fw fa-sort-asc":"fa fa-fw fa-sort-desc"):""}></i></div>
				<div className="tab" id="Tab-3" onClick={changeTab}>Total Earnings<i className={sortIndex=="Tab-3"?(sortDir>0?"fa fa-fw fa-sort-asc":"fa fa-fw fa-sort-desc"):""}></i></div>
				<div className="tab" id="Tab-4" onClick={changeTab}>E.n. requested<i className={sortIndex=="Tab-4"?(sortDir>0?"fa fa-fw fa-sort-asc":"fa fa-fw fa-sort-desc"):""}></i></div>
				<div className="tab" id="Tab-5" onClick={changeTab}>Releases<i className={sortIndex=="Tab-5"?(sortDir>0?"fa fa-fw fa-sort-asc":"fa fa-fw fa-sort-desc"):""}></i></div>
				<div className="tab" id="Tab-6" onClick={changeTab}>Tracks<i className={sortIndex=="Tab-6"?(sortDir>0?"fa fa-fw fa-sort-asc":"fa fa-fw fa-sort-desc"):""}></i></div>
				<div className="tab" id="Tab-7" onClick={changeTab}>Rejected<i className={sortIndex=="Tab-7"?(sortDir>0?"fa fa-fw fa-sort-asc":"fa fa-fw fa-sort-desc"):""}></i></div>
				<div className="tab" id="Tab-8" onClick={changeTab}>Approved<i className={sortIndex=="Tab-8"?(sortDir>0?"fa fa-fw fa-sort-asc":"fa fa-fw fa-sort-desc"):""}></i></div>
			</ListHeader>

			{resutls.map((u,index,arr) => {
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
						<ListEntry>{u.status}</ListEntry>
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
