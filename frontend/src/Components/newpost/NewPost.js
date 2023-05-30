import React from 'react'
import {useState} from 'react'
import { useNavigate } from 'react-router-dom'

const NewPost = () => {
 
    const navigate = useNavigate()


    const [title, setTitle]= useState('')
    const [description, setDescription]= useState('')

    const titleChangeHandler =(e)=>{
        const name = e.target.name
        if (name==='title') {
            
            setTitle(e.target.value)
        } else {
            
            setDescription(e.target.value)
        }

    }
    // console.log(title,description)

    const newPost = async (e)=>{
        e.preventDefault()
        try {
            const res = await fetch("/home/newpost", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ title:title,description:description }),
            });
              const data = await res.json();
              console.error(data)
            //   data.message? window.alert(data.message):"" 
            if (data.message) {
                alert('title already exisits')
            } 
                navigate("/newpost/show")
            

        } catch (error) {


            console.error(error)
            
        }

    }

  return (

    
    <div className="create-new-post">
        <h1>Add a new Post</h1>
        <form>
            <div className="form-fields">
                <label htmlFor="title"  value="">Title</label><br/>
                <input required value={title} type="title"  name="title" onChange={titleChangeHandler}/>
            </div>

            <div className="form-fields">
                <label htmlFor="description"  value="">Description</label><br/>
                <textarea required value={description} name="description" id="description" onChange={titleChangeHandler}></textarea>
            </div>
            <div className="login-btn">
                <button onClick={()=>{navigate('/')}}>home</button>
                <input type="submit" onClick={newPost} value="POST"/>
            </div>
               
        </form>

    </div>
    
  )
}

export default NewPost
