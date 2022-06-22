import styled from "styled-components";

export const ListContainer = styled.ul`
    list-style: none;
    margin-top: 24px;
`

export const ListItemContainer = styled.li`
    margin-bottom: 24px;
    padding: 24px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    box-sizing: border-box;
    display: flex;
`

export const FirstColumnContainer = styled.div`
    width: 45%;
    min-width: 300px;
    display: flex;
    align-items: center;
`

export const ImageContainer = styled.div`
    position: relative;
    width: 64px;
    height: 64px;
    background: #2E2B2B;
`

export const SecondColumnContainer = styled.div`
    width: 65%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const StatusLabel = styled.div`
    font-weight: 500;
    font-size: 16px;
    padding: 10px 24px;
    color: ${props=>props.theme.fontColor || "rgba(226, 226, 235, 0.8)"};
    background: ${props=>props.theme.backgroundColor||"rgba(226, 226, 235, 0.1)"};
    border-radius: 12px;
`

export const ShowDetailsButton = styled.button`
    padding: 14px 40px;
    border-radius: 16px;
    border: none;
    font-weight: 500;
    font-size: 16px;
`

export const ReleaseInfoContainer = styled.div`
    margin-left: 16px;
`

export const ReleaseTitle = styled.div`
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    color: rgba(255, 255, 255, 0.8);
`
export const ReleaseDetails = styled.div`
    font-size: 16px;
    line-height: 19px;
    color: rgba(255, 255, 255, 0.35);
`

export const ReleaseArtists = styled.span`
    max-width: 120px;
    overflow: hidden;
    text-overflow: ellipsis; 
`