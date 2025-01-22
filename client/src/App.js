import './App.css';
import React from 'react';
import Post from './Post';
import Header from './Header';
import {Routes, Route} from "react-router-dom"
import Layout from './Layout';
import IndexPage from './pages/IndexPage';
import AdminPage from './pages/AdminPage';
import RegisterPage from './pages/RegisterPage';
import OngoingProjectsPage from './pages/OngoingProjectsPage';
import WorkExperiencePage from './pages/WorkExperiencePage';
import PastProjectsPage from './pages/PastProjectsPage';
import InsightsBlogsPage from './pages/InsightsBlogsPage';
import { UserContext } from './UserContext';
import {UserContextProvider} from './UserContext';
import PostPage from './pages/PostPage';
import PostEntryPage from './pages/PostEntryPage';
import EditPage from './pages/EditPage';

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout/>}>
            <Route index element={<IndexPage/>}/>
            <Route path = {'/ongoing-projects'} element = {<OngoingProjectsPage/>}/>
            <Route path = {'/past-projects'} element = {<PastProjectsPage/>}/>
            <Route path = {'/work-experience'} element = {<WorkExperiencePage/>}/>
            <Route path = {'/insights-blogs'} element = {<InsightsBlogsPage/>}/>
            <Route path = {'/admin'} element = {<AdminPage/>}/>
            <Route path = {'/register'} element = {<RegisterPage/>}/>
            <Route path = {'/create'} element = {<PostPage/>}/>
            <Route path = {'/post/:id'} element = {<PostEntryPage/>}/>
            <Route path = {'/edit/:id'} element = {<EditPage/>}/>
        </Route>
      </Routes>
    </UserContextProvider>

  );
}

export default App;
