import styled from "styled-components"

export const ListContainer = styled.div`
	margin-top: 32px;
`

export const ListItemContainer = styled.div`
	display: grid;
	grid-template-columns: ${(props) =>
		props.gridTemplateColumns || "40% 20% 20% 20% 20%"};
	background: #ffffff;
	border: 1px solid rgba(0, 0, 0, 0.1);
	box-sizing: border-box;
	box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.05);
	border-radius: 10px;
	height: 102px;
	margin-bottom: 12px;
`

export const ReleaseInfoContainer = styled.div`
	display: flex;
	align-items: center;
`

export const ReleaseCoverContainer = styled.div`
	height: 54px;
	width: 54px;
	background: rgba(0, 0, 0, 0.1);
	border-radius: 8px;
	position: relative;
	overflow: hidden;
	margin-left: 24px;
`

export const ReleaseDetailsContainer = styled.div`
	margin-left: 12px;
`

export const ReleaseTitle = styled.div`
	font-size: 16px;
	line-height: 19px;
	color: #000000;
	opacity: 0.8;
`

export const ReleaseSubtitle = styled.div`
	font-size: 14px;
	line-height: 17px;
	color: rgba(0, 0, 0, 0.35);
`

const StoresSubtitleContainer = styled.div`
	font-size: 14px;
	line-height: 17px;
	color: rgba(0, 0, 0, 0.35);
	position: relative;
    :hover .hover-tooltip{
        display: block
    }
`
const StoresSubtitleHoverField = styled.div`
    display: none;
    position: absolute;
    background: #fff;
    border-radius: 8px;
    padding: 8px 10px;
    max-width: 200px;
    z-index:100;
    border: 1px solid rgba(0, 0, 0, 0.09);
`
export const StoresSubtitle = ({storesStr}) => {
	return <StoresSubtitleContainer>
        {storesStr.length >30 ? storesStr.substring(0,30)+'...':storesStr}
        {storesStr.length > 30 &&
            <StoresSubtitleHoverField className="hover-tooltip">{storesStr}</StoresSubtitleHoverField>
        }
    </StoresSubtitleContainer>
}

export const ReleaseSubmittedContainer = styled.div`
	font-size: 16px;
	line-height: 19px;
	color: #000000;
	opacity: 0.8;
	display: flex;
	align-items: center;
`

export const ResubmittedSuperscript = styled.div`
	margin-left: 4px;
	margin-top: -4px;
	font-size: 9px;
	line-height: 12px;
	text-transform: uppercase;
	color: rgba(0, 0, 0, 0.4);
`

export const TrackCountContainer = styled.div`
	display: flex;
	align-items: center;
	font-size: 16px;
	line-height: 19px;
	color: #000000;
	opacity: 0.8;
`

export const ReleaseOptionsContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	border-left: 1px solid #d9d9d9;
`

export const ModerateButton = styled.button`
	cursor: pointer;
	background: ${(props) => (props.light ? "none" : "rgba(0, 0, 0, 0.04)")};
	outline: none;
	border: ${(props) =>
		!props.light ? "none" : "1px solid rgba(0, 0, 0, 0.09)"};
	border-radius: 10px;
	font-weight: 500;
	font-size: 16px;
	line-height: 19px;
	color: #000000;
	margin-right: ${(props) => (props.light ? "0" : "8px")};
	opacity: ${(props) => (!props.light ? "1" : ".5")};
	padding: 10px 17px;
	:hover {
		background: rgba(0, 0, 0, 0.02);
	}
	:focus {
		outline: none;
	}
	:active {
		background: #fff0;
	}
	${(props) =>
		props.light
			? `
        width: 39px;
        height: 39px;
        padding: 0;
        font-size: 20px;
        letter-spacing: -1px;
    `
			: ""}
`
