import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import ErrorPage from '../screens/ErrorPage/ErrorPage'
import FeedPage from '../screens/FeedPage/FeedPage'
import LoginPage from '../screens/LoginPage/LoginPage'
import PostPage from '../screens/PostPage/PostPage'
import SignUpPage from '../screens/SignUpPage/SignUpPage'

const Router = () => {
    return (    
        <BrowserRouter>
            <Switch>
                <Route exact path = {['/feed','/']}>
                    <FeedPage />
                </Route>
                <Route exact path = {'/login'}>
                    <LoginPage />
                </Route>
                <Route exact path = {'/post/:id'}>
                    <PostPage />
                </Route>
                <Route exact path = {'/signup'}>
                    <SignUpPage />
                </Route>
                <Route>
                    <ErrorPage />
                </Route>
            </Switch>
        </BrowserRouter>   
    )
}

export default Router