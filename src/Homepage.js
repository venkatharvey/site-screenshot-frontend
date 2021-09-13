import React, { useState } from 'react'
import './Homepage.css'
import image from './imgbin_camera-logo-png.png'
import SaveAlt from '@material-ui/icons/SaveAlt'
import axios from 'axios'


function Homepage() {  
const takeScreenShot=async(e)=>{
    e.preventDefault();
    SetDown("Downloading..");
    axios.post('https://site-screenshot.herokuapp.com/screenshot', {
        url: String(data.url),
        height: parseInt(data.height),
        width:parseInt(data.width),
        format:String(data.format)
      },{
          responseType:'blob'
      }
      )
      .then(function (res) {
        SetDown("Downloading..");
        const url=window.URL.createObjectURL(new Blob([res.data]));
        const link=document.createElement('a');
        link.href=url;
        link.setAttribute('download',`image.${data.format}`);
        document.body.appendChild(link);
        link.click();
        SetDown("Downloaded");
      })
      .catch(function (error) {
          alert("Enter valid url");
      });
}

const [data,setData]=useState(
    {
        url:"",
        height:2000,
        width:1300,
        format:"png",
    }
)


const[active,setActive]=useState("false");
const[down,SetDown]=useState("");

function clickHandler(){
    setActive(!active);
}
function changeHandler(e){
    SetDown("");
    const newData={...data};
    newData[e.target.id]=e.target.value;
    setData(newData);
}
    return (
        <div className="container">
        <div className="attri">
            <div className="search__box">
            
            <label>Height:</label>   
            <input id="height" onChange={(e)=>changeHandler(e)} className="htwd"  type="number"  value={data.height}/>
            <label>Width:</label>
            <input id="width" onChange={(e)=>changeHandler(e)}className="htwd" type="number"  value={data.width}/>
            
            <select id="format" onChange={(e)=>changeHandler(e)} className="htwd" name="format">
            <option value="png">PNG</option>
            <option value="jpg">JPG</option>
            <option value="jpeg">JPEG</option>
            </select>
            </div>
        </div>
        <div className="main">
            <div className="search__box">
             <form onSubmit={e=>takeScreenShot(e)}>   
            <img onClick={clickHandler} id="camImage" src={image} alt=""/>
            
            <input required id="url" onChange={(e)=>changeHandler(e)} className={active?"input__box":"active"} placeholder=  "  Enter the URL"/>
            
            <button type="submit"><SaveAlt/></button>
            </form>
            </div>
        </div>
        <p><b>{down}</b></p>
        </div>    
        )
}

export default Homepage
