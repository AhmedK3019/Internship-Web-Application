import React, { useState } from 'react';
import './index.css';
import CompanyInternships from './CompanyInternships';

function Company({email}){
    const [view, setView] = useState('');

    return (
        <div className="pageAlt">
          <div className="sidebar">
            <div className='sidebar-header'>
              <div className="menu-wrapper">
                <span className="menu-icon">☰</span>
                <span className="menu-label">Company Menu</span>
              </div>
            </div>
            <div className="sidebar-buttons">
              <button onClick={() => setView('internships')}>View Internships</button>
            </div>
          </div>
          <div className='main-content'>
            {view === 'internships' && (
              <CompanyInternships/>
            )}
          </div>
        </div>
      );
}

export default Company;