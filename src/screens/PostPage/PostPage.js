import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import Post from '../../components/Post/Post'
import Comment from '../../components/Comment/Comment'
import { useForm } from '../../hooks/UseForm'
import { useProtectedPage } from '../../hooks/UseProtectedPage'
import { BackToTop, CommentsContainer, NewCommentContainer, PostPageContainer, Loading } from './styles'
import { Button, TextField, Typography, CircularProgress } from '@material-ui/core'
import { useParams } from 'react-router-dom'
import { grey, red } from '@material-ui/core/colors'
import { KeyboardArrowUp } from '@material-ui/icons'
import Axios from 'axios'

const PostPage = () => {
    useProtectedPage()
    const params = useParams()
    const [postDetails,setPostDetails] = useState([])
    const [filteredPosts,setFilteredPosts] = useState([])
    const [searchContent,setSearchContent] = useState("")
    const {form, onChange, resetState} = useForm({ text: "", title: "" })

    const handleInputChange = (event) => {
        const { value, name } = event.target
        onChange(value, name)
    }

    useEffect(()=>{
        setInterval(updatePage, 180000)
        GetPostDetails()
        topFunction()
    },[])

    const GetPostDetails = () => {
        Axios.get(`https://us-central1-labenu-apis.cloudfunctions.net/labEddit/posts/${params.id}`,
        {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
        .then((res)=>{
            setPostDetails(res.data.post)
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    
    const SendComment = (event) => {
        event.preventDefault()
        const body = {
                "text": form.text
        }
        Axios.post(`https://us-central1-labenu-apis.cloudfunctions.net/labEddit/posts/${postDetails.id}/comment`, body,
        {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
        .then((res)=>{
            alert("Comentário enviado com sucesso")
            GetPostDetails()
            resetState()
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    const SearchFilter = (e) => {
        const searchArray = postDetails.comments.filter((post) => {
            const text = post.text.toLowerCase()
            const username = post.username.toLowerCase()
            return (
                text.includes(e.target.value.toLowerCase()) || username.includes(e.target.value.toLowerCase())
                )
             })
        setFilteredPosts(searchArray)
        setSearchContent(e.target.value)
    }

    const VoteOnSearchFilter = () => {
        console.log("votou com busca ativa")
    }

    let mybutton = document.getElementById("back-to-top")
    window.onscroll = function() {scrollFunction()}
    
    function scrollFunction() {
        if (postDetails.length===undefined) {
                if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                    mybutton.style.display = "block"
                } else {
                    mybutton.style.display = "none"
                }
        }
    }

    function topFunction() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    function updatePage() {
        GetPostDetails()
    }

    return (
        <div>
            <Header onChangeSearch={SearchFilter}/>
                <PostPageContainer>
                <Post
                    key={postDetails.id}
                    username={postDetails.username}
                    text={postDetails.text}
                    votesCount={postDetails.votesCount}
                    commentsCount={postDetails.commentsCount}
                    createdAt={postDetails.createdAt}
                    id={postDetails.id}
                    title={postDetails.title}
                    direction={postDetails.userVoteDirection}
                    getPosts={GetPostDetails}
                />
                <NewCommentContainer onSubmit={SendComment}>
                    <TextField
                        name='text'
                        value={form.text}
                        label="Novo Comentário"
                        variant="outlined"
                        color="primary"
                        style={{ backgroundColor: grey[50] }}
                        multiline
                        required
                        onChange={handleInputChange}
                        placeholder="Escreva um comentário aqui"
                    />
                    <Button type="submit" type="submit" variant="contained" color="primary">Enviar comentário</Button>
                </NewCommentContainer>
                <CommentsContainer>
                    {postDetails.length===0
                        ? 
                        <Loading>
                            <Typography variant="h5" color="primary">Carregando...</Typography>
                            <CircularProgress />
                        </Loading>
                        :
                        searchContent===""
                            ?
                            postDetails.comments.sort((a, b) => a.createdAt < b.createdAt ? 1:-1).map(post=> {
                                return(
                                    <Comment
                                        key={post.id}
                                        username={post.username}
                                        text={post.text}
                                        votesCount={post.votesCount}
                                        createdAt={post.createdAt}
                                        id={post.id}
                                        postId={params.id}
                                        direction={post.userVoteDirection}
                                        getPostDetails={GetPostDetails}
                                    />
                                )
                                })
                            :
                            <div>
                            <p><b>Foram encontradas {filteredPosts.length} ocorrências</b></p>
                            {filteredPosts.sort((a, b) => a.createdAt < b.createdAt ? 1:-1).map(post=> {
                                return(
                                    <Comment
                                        key={post.id}
                                        username={post.username}
                                        text={post.text}
                                        votesCount={post.votesCount}
                                        createdAt={post.createdAt}
                                        id={post.id}
                                        postId={params.id}
                                        direction={post.userVoteDirection}
                                        getPostDetails={GetPostDetails}
                                        voteOnSearch={VoteOnSearchFilter}
                                    />
                                )
                                })}
                            </div>
                    }
                </CommentsContainer>
                <BackToTop onClick={topFunction} id="back-to-top" style={{ backgroundColor: red[500] }}>
                    <KeyboardArrowUp style={{ color: grey[50] }}/>
                </BackToTop>
            </PostPageContainer>
        </div>
    )
}

export default PostPage