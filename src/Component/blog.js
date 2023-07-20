import {useState,useRef,useEffect, useReducer} from "react";

import { db } from "../firebaseinit";

import { collection, addDoc, getDoc, getDocs, onSnapshot, deleteDoc,doc } from "firebase/firestore"; 


// function blogsReducer(state,action){
//     switch(action.type){
//         case "ADD":
//             return [action.blog, ...state];
//         case "REMOVE":
//             return state.filter((blog,index) => index !== action.index);
//         default :
//         return [];
//     }

// }


export default function Blog(){

    // const [title,setTitle] = useState("");
    // const [content,setContent] = useState("");

    const [formData,setFormData] = useState({title:"",content:""})
    
    const [blogs,setBlogs] = useState([]);

//// UseReducer()
    // const [blogs,dispatch] = useReducer(blogsReducer,[]);

    const titleRef = useRef(null);

    //for focus on title after submit
    useEffect(() => {
        titleRef.current.focus();
    },[]);

    // for assign tab name as title name
    useEffect(() =>{
        if(blogs.length && blogs[0].title){
            document.title = blogs[0].title
        }else{
            document.title ="No Blogs!"
        }
       
    },[blogs])


    // To fetch data on screen
    useEffect(() =>{
        // async function fetchData(){
        //     const snapShot = await getDocs(collection(db,"Blogs"));
        //   console.log(snapShot);

        //   const blogs = snapShot.docs.map((doc)=> {

        //     return{
        //         id:doc.id,
        //         ...doc.data()
        //     }

        //   })
        //   console.log(blogs);
        // //   Before setting this make sure you disable custom hook synatx in code
        //   setBlogs(blogs)
        // }
        // fetchData();


//   Use of onsnapShot for update will notified to all device and automatic update
        const unsub =  onSnapshot(collection(db,"Blogs"),(snapShot) =>{

            const blogs = snapShot.docs.map((doc)=> {

                    return{
                        id:doc.id,
                        ...doc.data()
                    }
        
                  })
                  console.log(blogs);
                //   Before setting this make sure you disable custom hook synatx in code
                  setBlogs(blogs)
        })
    },[]);
    
    //Handel-submit Function 
   async function handleSubmit(e){
        e.preventDefault();
        titleRef.current.focus();


// here use of rest operator as [ ...blogs]
        // setBlogs([{title:formData.title,content:formData.content},...blogs]);

        // dispatch({type: "ADD",blog:{title:formData.title,content:formData.content}})



// FIREBASE DB //
// Add a new document with a generated id.
const docRef = await addDoc(collection(db, "Blogs"), {
  title: formData.title,
  content: formData.content,
  createdON : new Date()
});
// console.log("Document written with ID: ", docRef.id);



// for making input field empty after submit
       setFormData({title:"",content:""});
       titleRef.current.focus();
        console.log(blogs);
    }

    async function removeBlog(id){
    //    setBlogs(blogs.filter((blog,index) => i !== index));

    const docRef = doc(db,"Blogs",id);
    await deleteDoc(docRef);
    
    //    dispatch({type: "REMOVE" ,index :i})

    }


    return(
        <>
        <h1>Write a Blog!</h1>

        <div className="section">

            <form onSubmit={handleSubmit}>

                <Row label="Title">
                        <input className="input"
                                placeholder="Enter the Title of the Blog here.."
                                value={formData.title}
                                ref = {titleRef}
                                onChange={(e) => setFormData({title:e.target.value,content:formData.content})}
                                />
                </Row >

                <Row label="Content">
                        <textarea className="input content"
                                placeholder="Content of the Blog goes here.."
                                value={formData.content}
                                required
                                onChange={(e) => setFormData({content:e.target.value,title:formData.title})}/>
                </Row >

                <button className = "btn">ADD</button>
            </form>
                     
        </div>

        <hr/>

        <h2> Blogs </h2>
        {blogs.map((blog,i) => (
            <div className="blog" key ={i}>
                <h3>{blog.title}</h3>
                <p>{blog.content}</p>
          
              <div className="blog-btn">
                   <button onClick={() => removeBlog(blog.id)} className="btn remove">Delete</button>
              </div>
            </div>
        ))}

       
        
        </>
        )
    }



//Row component to introduce a new row section in the form
function Row(props){
    const{label} = props;
    return(
        <>
        <label>{label}<br/></label>
        {props.children}
        <hr />
        </>
    )
}
