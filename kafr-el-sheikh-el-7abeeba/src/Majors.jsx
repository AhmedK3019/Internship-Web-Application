import React from 'react';
import './index.css';
import METImage from '/MET.jpg';
import IETImage from '/IET.jpg';
import MaterialEngineering from '/MaterialEngineering.jpg';

function Majors({ onBackMajors }) {
    const majors = [
        {
            id: 1,
            title: "Media Engineering and Technology - 10 semesters",
            description: "Media Engineering and Technology aims at the evolving field of nearly all aspects of information and multimedia processing. The study program in 'Media Engineering and Technology' rests on the same fundamentals as for Information Technology, i.e., mathematics, physics, electronics, computer science, communications, and their related methodologies, with specialization and extension to media technologies such as voice, audio and video, multimedia, media design, information retrieval and representation concepts",
            image: METImage,
            alt: "Media Engineering illustration",
        },
        {
            id: 2,
            title: "Information Engineering and Technology - 10 semesters",
            description: "Information Technology is one of the fastest progressing areas. It plays a key role in computer, communications and automation applications and is an enabling technology for the innovation of products and services. The study of Information Engineering and Technology enables graduates to master the basic concepts of Information Technology, to design new architectures and to apply them in the various application areas, such as communication systems and networks, production and process automation, automotive and traffic control, or integrated electronic circuit design",
            image: IETImage,
            alt: "Information Engineering and Technology"
        },
        {
            id: 3,
            title: "Engineering and Materials Science - 10 semesters",
            description: "Technical Progress in the development of new products and technologies is based on the evolution and creation of new and innovative materials as well as the processing technology. Directing this research work towards application is extremely important and needs engineers with an excellent knowledge of materials science, strength of materials as well as production engineering",
            image: MaterialEngineering,
            alt: "Media Technology Research"
        }
    ];

    return (
        <div className="page">
            
            <div className="majors-page-container">
            
                <h1 className="majors-main-title">Majors</h1>
                
                <div className="majors-content-wrapper">
                    
                    {majors.map((major) => (
                        <div key={major.id} className="major-card-layout">
                            <h2 className="major-title">{major.title}</h2>
                            <div className="major-content-row">
                                <img 
                                    src={major.image} 
                                    alt={major.alt} 
                                    className="major-image" 
                                />
                                <p className="major-description">
                                    {major.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
        </div>
    );
}

export default Majors;