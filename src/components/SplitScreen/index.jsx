import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;

`
const Pane = styled.div`
    max-width: 700px;
    min-width: 300px;
    flex-direction: row;
    flex-wrap: nowrap;
    margin: 20px;
    display: flex;
    justify-content: center;
`
const SplitScreen = ({
    // left:Left,
    // right:Right,
    children,
    leftWeight=1,
    rightWeight=1,
    middleWeight=1,
}) => {
    const [left,middle,right] = children
  return (
    <Container>
        <Pane weight={leftWeight}>
            {/* <Left></Left> */}
            {left}
        </Pane>
        <Pane weight={middleWeight}>
            {/* <Right></Right> */}
            {middle}
        </Pane>
        <Pane weight={rightWeight}>
            {/* <Right></Right> */}
            {right}
        </Pane>
    </Container>
  )
}

export default SplitScreen