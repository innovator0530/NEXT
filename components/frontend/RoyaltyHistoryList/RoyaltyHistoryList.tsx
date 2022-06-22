import Image from "next/image"
import Link from "next/link"
import { createRef, useState } from "react"
import { Earning, Payout } from "../../../models/earning.model"
import {
	DropdownButton,
	DropdownIcon,
	DropdownText,
	LeftColumn,
	ListContainer,
	ListItemContainer,
	MiddleColumn,
	RightColumn,
	Sum,
} from "./RoyaltyHistoryList_styles"

interface Entry {
	time: Date
	title: string
	contentDescription: string
	content: string
	amount: number
	downloadUrl?: string
	downloadFilename?: string
	type: "PAYOUT" | "EARNING"
}

const monthNames = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
]

function RoyaltyHistoryList(props) {
	const earnings: Earning[] = props.earnings
	const payouts: Payout[] = props.payouts

	const entries: any[] = [
		...payouts.map((p) => ({
			time: new Date(
				(p.status === "APPROVED" ? p.timeApproved : p.timeRequested) || null
			),
			title: "Payout",
			contentDescription: p.status === "APPROVED" ? "Paid on" : "Pending",
			content:
				p.status === "APPROVED" ? new Date(p.timeApproved).toDateString() : "",
			amount: p.paidAmountCents,
			type: "PAYOUT",
		})),
		...earnings.map((e) => ({
			time: new Date(e.time),
			title: monthNames[new Date(e.time).getMonth()],
			contentDescription: "Received on",
			content: new Date(e.time).toDateString(),
			amount: e.amountCents,
			downloadUrl: e.spreadsheetFileUrl,
			downloadFilename: `REWAVE - ${
				monthNames[new Date(e.time).getMonth()]
			} ${new Date(e.time).getFullYear()}.xlsx`,
			type: "EARNING",
		})),
	]

	entries.sort((a, b) => b.time.getTime() - a.time.getTime())

	return (
		<ListContainer>
			{entries.map((entry, index) => {
				const [dropdownOpen, setdropdownOpen] = useState<boolean>(false)
				const clickDownload = () => {
					fetch(entry.downloadUrl)
						.then((r) => r.blob())
						.then((blob) => {
							var url = window.URL.createObjectURL(blob)
							var a = document.createElement("a")
							a.href = url
							a.download = entry.downloadFilename
							document.body.appendChild(a) // we need to append the element to the dom -> otherwise it will not work in firefox
							a.click()
							a.remove() //afterwards we remove the element again
						})
				}
				const dropdownBtnRef = createRef<HTMLButtonElement>();
				const clickDropdown = ()=>{
					if(dropdownOpen){
						dropdownBtnRef.current?.blur();
					}
					else{
						setdropdownOpen(true);
					}
				}

				const dropdownBtnBlur = ()=>{
					setTimeout(()=>setdropdownOpen(false),400);
				}

				return (
					<ListItemContainer key={index}>
						<LeftColumn>{entry.title}</LeftColumn>
						<MiddleColumn>
							{entry.contentDescription}{" "}
							<span className="light">{entry.content}</span>
						</MiddleColumn>
						<RightColumn>
							{(entry.type !== "PAYOUT" || entry.amount > 0) && (
								<Sum>$ {entry.amount / 100} USD</Sum>
							)}
							<DropdownButton ref={dropdownBtnRef} onBlur={dropdownBtnBlur} onClick={clickDropdown} open={dropdownOpen} disabled={!entry.downloadUrl}>
								<div className="dot" />
								<div className="dot" />
								<div className="dot" />
								{dropdownOpen&&<div className="dropdown">
									<button onClick={clickDownload} className="dropdown-btn">
										<DropdownIcon>
											<Image src="/icons/download.svg" layout="fill" />
										</DropdownIcon>
										<DropdownText>Download&nbsp;Report</DropdownText>
									</button>
									<div  className="dropdown-comment">If you are unable to open the file, because you do not have Excel, please <a href="https://extendsclass.com/excel-viewer.html" target="_blank" style={{textDecoration:'underline'}} >"click here"</a> to view the report. </div>
								</div>}
							</DropdownButton>
						</RightColumn>
					</ListItemContainer>
				)
			})}
		</ListContainer>
	)
}

export default RoyaltyHistoryList
