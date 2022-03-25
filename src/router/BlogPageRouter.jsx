import React, { Component } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Anchor } from 'antd';
// import App from '../pages/App'
// import SignUpPage from '../pages/SignUp/SignUpPage'
// import SignInPage from '../pages/SignIn/SignInPage'
import Blogpage from '../pages/blogpage'
import api from '../api';

export default class BlogPageRouter extends Component {
    componentDidUpdate(props) {
    }
    render() {
        return (
            <Routes>
            {
                this.props.blogdata.map((blog, index) => {
                    console.log(blog)
                    return <Route key={index} path={`/blogpage/lyra${encodeURI(blog.title)}`} element={<Blogpage {...blog} />} />
                })
            }
            </Routes>

        )

    }
}
