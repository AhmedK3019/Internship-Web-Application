import React from 'react';
import GoogleImage from '/google.png';
import SchneiderImage from '/schneider.jpg';
import ElSewedyImage from '/elsewedy.png';

function Companies({ onBack }) {
  

    return (
        <div class ="page">
            <div>
            <h1>Suggested Companies</h1>
                <div className="companies-page box1">
                    <img src={GoogleImage} alt = 'Google Image' class = "GoogleImage"/>
                    <p class = "CompanyText GoogleText">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat nobis possimus, sunt nemo nisi quae, corrupti amet impedit consequatur facere nulla asperiores laborum optio mollitia, quo ullam. Eos, fugiat sit?</p>
                </div>

                <div className="companies-page box2">
                    <img src={SchneiderImage} alt = 'Google Image' class = "SchneiderImage"/>
                    <p class = "CompanyText SchneiderText">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat nobis possimus, sunt nemo nisi quae, corrupti amet impedit consequatur facere nulla asperiores laborum optio mollitia, quo ullam. Eos, fugiat sit?</p>
                </div>

                <div className="companies-page box3">
                    <img src={ElSewedyImage} alt = 'Google Image' class = "ElSewedyImage"/>
                    <p class = "CompanyText ElSewedyText">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat nobis possimus, sunt nemo nisi quae, corrupti amet impedit consequatur facere nulla asperiores laborum optio mollitia, quo ullam. Eos, fugiat sit?</p>
                </div>
            
                <div class = "back-button">
                    <button onClick={onBack} className="back-button">
                            Back to Student Dashboard
                    </button>
                </div>
                
            
            </div>
             
            
        </div>
        
    );
}

export default Companies;