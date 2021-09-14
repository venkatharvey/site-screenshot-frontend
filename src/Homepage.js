import React, { useState } from 'react'
import './Homepage.css'
import image from './imgbin_camera-logo-png.png'
import SaveAlt from '@material-ui/icons/SaveAlt'
import axios from 'axios'


function Homepage() {  


const takeScreenShot=async(e)=>{
    
    SetDown("Downloading..");
    e.preventDefault();

    axios.post('https://site-screenshot.herokuapp.com/screenshot', {
        
        quality:parseInt(data.quality),
        fullscreen:String(data.fullscreen),
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
        console.log(res);
        const url=window.URL.createObjectURL(new Blob([res.data]));
        const link=document.createElement('a');
        link.href=url;
        link.setAttribute('download',`image.${data.format}`);
        document.body.appendChild(link);
        link.click();
        SetDown("Downloaded");
      })
      .catch(function (error) {
          SetDown("");
          alert("Please enter url with http:// or https://");
      });
}
function clickHandler(){
    setActive(!active);
}
function changeHandler(e){
    SetDown("");
    const newData={...data};
    newData[e.target.id]=e.target.value;
    setData(newData);
    console.log(newData);
}

const [data,setData]=useState(
    {
        url:"",
        quality:50,
        height:800,
        width:800,
        format:"png",
        fullscreen:"yes",
    }
);
const[active,setActive]=useState("false");
const[down,SetDown]=useState("");


    return (
        <>
        <div className="title">
                <h1>Capture Websites</h1>
            </div>
        <div className="container">
        <div className="attri">   
            <div className="search__box">
            <label>Quality:</label>   
            <input id="quality" onChange={(e)=>changeHandler(e)} className="htwdt"  type="number" min={0} max={100} value={data.quality}/>
            <label>Height:</label>   
            <input id="height" onChange={(e)=>changeHandler(e)} className="htwdt"  type="number"  value={data.height}/>
            <label>Width:</label>
            <input id="width" onChange={(e)=>changeHandler(e)}className="htwdt" type="number"  value={data.width}/>
            <label>Format:</label>
            <select id="format" onChange={(e)=>changeHandler(e)} className="htwd" name="format">
            <option value="png">PNG</option>
            <option value="jpeg">JPEG</option>
            </select>
            <label>Fullscreen:</label>
            <select id="fullscreen" onChange={(e)=>changeHandler(e)} className="htwd" name="fullscreen">
            <option value="yes">YES</option>
            <option value="no">NO</option>
            </select>
            </div>
        </div>
        <div className="main">
            <div className="search__box">
             <form onSubmit={e=>takeScreenShot(e)}>   
            <img onClick={clickHandler} id="camImage" src={image} alt=""/>
            
            <input required id="url" onChange={(e)=>changeHandler(e)} className={active?"input__box":"active"} placeholder=  "  Enter the URL with http:// or https:// "/>
            
            <button type="submit"><SaveAlt/></button>
            </form>
            </div>
        </div>
        <p><b>{down}</b></p>
        </div>
        </>    
        )
}

export default Homepage
