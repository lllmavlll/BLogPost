import React from 'react'
import './home.css'
import NoteCard from '../note card/NoteCard'
import notes from '../Data/Data'
import {useNavigate} from "react-router-dom"

const Home = () => {

    const navigate = useNavigate()

  return (
  <>
     <div class="ceter-container">
        <h2>blog<span>Post</span></h2>
        <ul class="navLi">
            <li>profile</li>
            <li>about</li>
            <li>lear more</li>
        </ul>
        <div class="signLinks">
            <ul class="linkLi">
                <li><a href="signin">logout</a></li>
            </ul>
        </div>
    </div>
    <div class="header-post ">
        <h2>Post your new blog</h2>
        <button class="new-post-btn" onClick={()=>{navigate('/newpost')}}>new post</button>
    </div>
    <div className='note-container'>
        {
            notes.map((props)=>{
                return(
                    <NoteCard title= {props.title} date= {props.date.toLocaleDateString()}  description={props.description}/> 
                )
            })
        }
        {/* <NoteCard title="test ttile" date="12/054/6545" description="test description"/>  */}
    </div>
  </>
  )
}

export default Home
