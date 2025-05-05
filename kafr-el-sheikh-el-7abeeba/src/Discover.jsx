import React from 'react';
import './index.css';
import METImage from '/MET.jpg';
import IETImage from '/IET.jpg';
import MaterialEngineering from '/MaterialEngineering.jpg';

function Discover({ onBackUpdate }) {
    const discover = [
        {
            id: 1,
            title: "Discovery 1",
            description: "Media Engineering and Technology aims at the evolving field of nearly all aspects of information and multimedia processing. The study program in 'Media Engineering and Technology' rests on the same fundamentals as for Information Technology, i.e., mathematics, physics, electronics, computer science, communications, and their related methodologies, with specialization and extension to media technologies such as voice, audio and video, multimedia, media design, information retrieval and representation concepts",
            image: METImage,
            alt: "Media Engineering illustration",
        },
        {
            id: 2,
            title: "Discovery 2",
            description: "Information Technology is one of the fastest progressing areas. It plays a key role in computer, communications and automation applications and is an enabling technology for the innovation of products and services. The study of Information Engineering and Technology enables graduates to master the basic concepts of Information Technology, to design new architectures and to apply them in the various application areas, such as communication systems and networks, production and process automation, automotive and traffic control, or integrated electronic circuit design",
            image: IETImage,
            alt: "Information Engineering and Technology"
        },
        {
            id: 3,
            title: "Discovery 3",
            description: "Technical Progress in the development of new products and technologies is based on the evolution and creation of new and innovative materials as well as the processing technology. Directing this research work towards application is extremely important and needs engineers with an excellent knowledge of materials science, strength of materials as well as production engineering",
            image: MaterialEngineering,
            alt: "Media Technology Research"
        }
    ];

    return (
        <div className="page">
            <div className="discover-page-container">                
                <div className="discover-content-wrapper">
                    {discover.map((discover) => (
                        <div key={discover.id} className="discover-card-layout">
                            <h2 className="discover-title">{discover.title}</h2>
                            <div className="discover-content-row">
                                <img 
                                    src={discover.image} 
                                    alt={discover.alt} 
                                    className="discover-image" 
                                />
                                <p className="discover-description">
                                    {discover.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Discover;