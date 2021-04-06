import styled from 'styled-components'
import { Typography } from '@material-ui/core'

export const CommentContainer = styled.div `
    display: flex;
    flex-direction: column;
    width: 80vw;
    max-width: 465px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 15px;
    margin-bottom: 15px;
    padding: 15px;
`
export const CountContainer = styled.div `
    display: flex;
    justify-content: space-between;
    padding: 10px;
`
export const VotesContainer = styled.div `
    display: flex;
`
export const CommentText = styled(Typography) `
    padding: 5px;
`
export const PostedContainer = styled.div `
    display: flex;
    justify-content: center;
    margin-top: 5px;

    @media (max-width: 500px) {
        flex-direction: column;
        margin-top: 10px;
    }
`
export const PostedText = styled.p `
    margin-right: 8px;
    
    @media (max-width: 500px) {
        margin: 0;
        padding: 0;
    }
`