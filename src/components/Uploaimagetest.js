import React, {useState} from "react";

import {MdCloudUpload, MdDelete} from "react-icons/md";
import  {AiFillFileImage} from "react-icons/ai"


function Uploaimagetest({ image, setImage, fileName, setFileName }){

    // const [image, setImage] = useState(null)
    // const [fileName, setFileName] = useState("No selected file");

    return(
        <main>
            <form className='upload-image' action=""
            onClick={() => document.querySelector(".input-field").click()}>
                <input className='input-field' type="file" accept='image/*' hidden
                onChange={({target: {files}}) =>{
                    files[0] && setFileName(files[0].name)
                    if (files){
                        setImage(URL.createObjectURL(files[0]))
                    }
                }}
                />

                {image ?
                <img src={image} width={60} height={70} alt={fileName}/>
                    :
                    <>
                    <MdCloudUpload color='#C1DCDC' size = {60 }/>
                    <p>Browse Files to upload</p>
                    </>
                }
            </form>

            <section className='uploaded-row'>
                <AiFillFileImage color='#C1DCDC'/>
                <span className='upload-content'>
                    {fileName}
                    <MdDelete onClick={()=>{
                        setFileName("No selected File")
                        setImage(null)
                    }}/>
                </span>
            </section>

        </main>
    )
}

export default Uploaimagetest;