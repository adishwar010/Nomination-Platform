import React from 'react'
import './TestForm.css'
import logo1 from "../../../images/logo.png";

export default function TestForm() {
    return (
        <div className='TestForm-Box'>
            <div className='TestForm-Box-Heading'>
                <div className='TestForm-Box-Heading-Left'>
                    <div className='TestForm-Box-Heading-Left-top'>Assessment </div>
                    <div className='TestForm-Box-Heading-Left-bottom'>Platform</div>
                </div>
                <div className='TestForm-Box-Heading-Right'>
                  <img src={logo1} alt ='LOGO'></img>
                </div>
            </div>
            <div className='TestForm-Box-Body'>
                <div className='TestForm-Box-Body-details'>
                    <div className='TestForm-Box-Body-details-Box'>
                        <div className='TestForm-Box-Body-details-Box-Title'>Name</div>
                        <div className='TestForm-Box-Body-details-Box-Title-Name'>Adishwar Sharma</div>
                    </div>
                    <div className='TestForm-Box-Body-details-BBox'>
                        <div className='TestForm-Box-Body-details-Box-Title'>Role</div>
                        <div className='TestForm-Box-Body-details-Box-Title-Name'>Full stack developer Test</div>
                    </div>
                </div>
                <div className='TestForm-Box-Body-right'>
                    <div className='TestForm-Box-Body-right-Circle'>
                        <div className='TestForm-Box-Body-right-InnerCircle'>
                            <div className='TestForm-Box-Body-right-InnerCircle-title'>Test Score</div>
                            <div className='TestForm-Box-Body-right-InnerCircle-score'>726/1000</div>
                        </div>
                    </div>
                </div>

            </div>
            <div className='TestForm-Main-Body'>
                <hr></hr>
            </div>
                <div className='TestForm-Main-Body-Skills'>
                    <div className='TestForm-Main-Body-Skills-left'>
                       <h3> Skills and Areas of Knowledge</h3>
                    </div>
                    <div className='TestForm-Main-Body-Skills-right'>
                       Score
                    </div>
            </div>

            {/* first */}
            <div className='TestForm-Main-Body'>
                <hr></hr>
            </div>
            <div className='TestForm-Main-Body-box'>
                <div className='TestForm-Main-Body-box-title'>Title</div>
                <div className='TestForm-Main-Body-box-Content'> 
                <div  className='TestForm-Main-Body-box-Content-desc' >Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.</div>
                <div  className='TestForm-Main-Body-box-Content-Marks' >76/120</div>
                </div>
            </div>  





            {/* second */}
            <div className='TestForm-Main-Body'>
                <hr></hr>
            </div>
            <div className='TestForm-Main-Body-box'>
                <div className='TestForm-Main-Body-box-title'>Title</div>
                <div className='TestForm-Main-Body-box-Content'> 
                <div  className='TestForm-Main-Body-box-Content-desc' >Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.</div>
                <div  className='TestForm-Main-Body-box-Content-Marks' >76/120</div>
                </div>
            </div>  
        </div>
    )
}
