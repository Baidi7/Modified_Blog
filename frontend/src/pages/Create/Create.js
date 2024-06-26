import React from 'react'
import styled from 'styled-components'
import {ImCross} from 'react-icons/im'
import { useContext, useState } from 'react'
// import Navbar from '../../components/Navbar'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import {URL} from '../../url'
import {UserContext} from '../../context/UserContext'
import { Add, Button, Cat, Cate, Categ, ConWrap, Content, FileInput, Form, FormButton, FormColumn, FormRow, FormSection, FormTitle, Input, Text, Wrapper } from './CreateStyles'
import { Container, Section } from '../../GlobalStyles'
import Hero from '../../components/Hero/Hero'
import Navbar from '../../components/Navbar/Navbar'

const Create = () => {
    const [title,setTitle]=useState("")
    const [desc,setDesc] = useState("")
    const [file,setFile] = useState(null)
    const {user} = useContext(UserContext)
    const [cat,setCat] = useState("")
    const [cats,setCats] = useState([])

    const navigate = useNavigate()

    const deleteCategory=(i)=>{
        let updatedCats=[...cats]
        updatedCats.splice(i)
        setCats(updatedCats)
    }
    const addCategory=()=>{
        let updatedCats=[...cats]
        updatedCats.push(cat)
        setCats("")
        setCats(updatedCats)
    }
    const handleCreate=async(e)=>{
        e.preventDefault()
        const post={
            title,
            desc,
            username:user.username,
            userId:user._id,
            categories:cats
        }
        if(file){
            const data=new FormData()
            const filename=Date.now()+file.name
            data.append("img",filename)
            data.append("file",file)
            post.photo=filename
            try {
                const imgUpload = await axios.post(URL+"/api/upload",data)
            } catch (error) {
                console.log(error)
            }
        }
        //post upload
        try{
            const res=await axios.post(URL+"/api/posts/create",post,{withCredentails:true})
            navigate("/posts/post/"+res.data._id)
        }catch(error){
            console.log(error);
        }
    }

    

  return (
    <>
      <Navbar/>
    <Hero/>
        <FormSection>     
            <Container>
        {/* <Navbar/> */}
        <FormTitle>Create a post</FormTitle>
        <Form>
            <FormRow>
            <FormColumn>
                
            <Input onChange={(e)=>setTitle(e.target.value)} type="text" placeholder="Enter post title" style={{marginBottom:"20px"}}/>
            <FileInput onChange={(e)=>setFile(e.target.files[0])} type="file" />       
                    <Input value={cat}  onChange={(e)=>setCat(e.target.value)} type="text" placeholder="Enter post category"/>
                    <FormButton onClick={addCategory} >Add</FormButton>
                

                {/* categories */}
                <Categ>
                    {cats?.map((c,i)=>(
                        <Cate key={i}>
                            <p>{c}</p>
                            <Cat onClick={()=>deleteCategory(i)}><ImCross/></Cat>
                        </Cate>
                    ))}
                </Categ>
            
            <Text  onChange={(e)=>setDesc(e.target.value)} rows={15} cols={30} placeholder="Enter post description" />
            <FormButton onClick={handleCreate}>Create</FormButton>
            </FormColumn>
            </FormRow>
        </Form>
        </Container>
        </FormSection>
        </>
  )
}


export default Create