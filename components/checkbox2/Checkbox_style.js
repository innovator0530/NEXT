import styled from "styled-components";

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  // Hide checkbox visually but remain accessible to screen readers.
  // Source: https://polished.js.org/docs/#hidevisually
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`
const StyledCheckbox = styled.div`
  display: inline-block;
  width: 18px;
  height: 18px;
  background: ${props => props.checked ? 'rgb(255,255,255)' : '#0000'};
  border-radius: 4px;
  transition: all 150ms;
  border: 1px solid rgba(255, 255, 255, 0.15);
`
const Icon = styled.svg`
  fill: none;
  stroke: ${props=>props.checked?'#212121':'none'};
  stroke-width: 2px;
`

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
`

export const FinalCheckbox = ({ className, checked, ...props }) => (
    <CheckboxContainer className={className}>
      <HiddenCheckbox checked={checked} {...props} />
      <StyledCheckbox checked={checked}>
        <Icon checked={checked} viewBox="0 0 24 24">
          <polyline points="20 6 9 17 4 12" />
        </Icon>
      </StyledCheckbox>
    </CheckboxContainer>
  )


export const Container = styled.div`
    padding: 16px 0;
`

export const LabelText = styled.span`
    margin-left: 12px;
    font-size: 16px;
line-height: 19px;

color: #FFFFFF;

opacity: 0.8;
`