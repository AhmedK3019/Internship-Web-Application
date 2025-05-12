import React from "react";
import GoogleImage from "/google.png";
import SchneiderImage from "/schneider.jpg";
import ElSewedyImage from "/elsewedy.png";

function SuggestedCompanies({ onBackSuggestedCompanies }) {
  return (
    <div class="page">
      <div>
        <h1>Suggested Companies</h1>
        <div className="companies-page box1">
          <img src={GoogleImage} alt="Google Image" class="GoogleImage" />
          <p class="CompanyText GoogleText">
            Google is a global tech giant best known for its search engine.
            Founded in 1998, it's now part of Alphabet Inc. Google offers a wide
            range of products and services including Android, Chrome, YouTube,
            Google Cloud, and AI tools. It leads in innovation, data-driven
            services, and online advertising.
          </p>
        </div>

        <div className="companies-page box2">
          <img src={SchneiderImage} alt="Google Image" class="SchneiderImage" />
          <p class="CompanyText SchneiderText">
            Schneider Electric is a French multinational specializing in energy
            management and automation. It provides hardware, software, and
            services for smart buildings, industrial automation, and electrical
            distribution. The company emphasizes sustainability and digital
            transformation in the energy sector.
          </p>
        </div>

        <div className="companies-page box3">
          <img src={ElSewedyImage} alt="Google Image" class="ElSewedyImage" />
          <p class="CompanyText ElSewedyText">
            ElSewedy Electric is an Egyptian multinational in the energy and
            infrastructure sectors. It manufactures cables, meters,
            transformers, and develops turnkey energy projects. Known for
            supporting renewable energy and large-scale infrastructure projects
            across Africa and the Middle East.
          </p>
        </div>
      </div>
    </div>
  );
}

export default SuggestedCompanies;
