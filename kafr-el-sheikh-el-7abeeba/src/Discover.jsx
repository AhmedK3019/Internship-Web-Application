import React from "react";
import "./index.css";
import METImage from "/MET.jpg";
import IETImage from "/IET.jpg";
import MaterialEngineering from "/MaterialEngineering.jpg";

function Discover({ onBackUpdate }) {
  const discover = [
    {
      id: 1,
      title: "Which Internships Count for My Major?",
      description:
        "Learn valuable tips on selecting the right internship company that aligns with your career goals and provides meaningful experience.",
      videoId: "GgsbG3WEmHs",
      alt: "YouTube video about choosing internship companies",
    },
    {
      id: 2,
      title: "Discovery 2",
      description:
        "Information Technology is one of the fastest progressing areas. It plays a key role in computer, communications and automation applications and is an enabling technology for the innovation of products and services. The study of Information Engineering and Technology enables graduates to master the basic concepts of Information Technology, to design new architectures and to apply them in the various application areas, such as communication systems and networks, production and process automation, automotive and traffic control, or integrated electronic circuit design",
      image: IETImage,
      alt: "Information Engineering and Technology",
    },
    {
      id: 3,
      title: "Discovery 3",
      description:
        "Technical Progress in the development of new products and technologies is based on the evolution and creation of new and innovative materials as well as the processing technology. Directing this research work towards application is extremely important and needs engineers with an excellent knowledge of materials science, strength of materials as well as production engineering",
      image: MaterialEngineering,
      alt: "Media Technology Research",
    },
  ];

  return (
    <div className="discover-page-container">
      <div className="discover-content-wrapper">
        {discover.map((item) => (
          <div key={item.id} className="discover-card-layout">
            <h2 className="discover-title">{item.title}</h2>
            <div className="discover-content-row">
              {item.videoId ? (
                <>
                  <div className="video-container">
                    <iframe
                      width="560"
                      height="315"
                      src={`https://www.youtube.com/embed/${item.videoId}`}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <p className="video-description">{item.description}</p>
                </>
              ) : (
                <>
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="discover-image"
                  />
                  <p className="discover-description">{item.description}</p>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Discover;
