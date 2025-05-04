import React, { useState } from 'react';
import './index.css';
import CompanyInternships from './CompanyInternships';
import Listings from './Listings'

function Company({email}){
    const [view, setView] = useState('');

    return (
        <div className="page">
          <div className="sidebar">
            <div className='sidebar-header'>
              <div className="menu-wrapper">
                <span className="menu-icon">☰</span>
                <span className="menu-label">Company Menu</span>
              </div>
            </div>
            <div className="sidebar-buttons">
              <button onClick={() => setView('internships')}>View my internships</button>
              <button onClick={() => setView('listings')}>View all internships</button>
            </div>
          </div>
          <div className='main-content'>
            {view === 'internships' && (
              <CompanyInternships/>
            )}
            {view === 'listings' && (
              <Listings/>
            )}
          </div>
        </div>
      );
}

export default Company;