import styled from 'styled-components'

const ProgressWrapper = styled.div`
  position: relative;
  height: 10px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.2);
`

const ProgressTotal = styled.div<{ distance: number }>`
  position: absolute;
  height: 10px;
  background: #2cfff3;
  left: 0;
  width: ${(props) => props.distance}%;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  border-radius: 8px;
`

const ProgressCircle = styled.div<{ distance: number }>`
  position: absolute;
  width: 40px;
  height: 40px;
  background: #2cfff3;
  border: 3px solid #008981;
  border-radius: 50%;
  left: calc(${(props) => props.distance}% - 20px);
  top: 50%;
  transform: translateY(-50%);
`

export default function Progress({ progress, slideable = false }: { progress: number; slideable?: boolean }) {
  return (
    <ProgressWrapper>
      <ProgressTotal distance={progress}></ProgressTotal>
      {slideable && <ProgressCircle distance={progress}></ProgressCircle>}
    </ProgressWrapper>
  )
}
