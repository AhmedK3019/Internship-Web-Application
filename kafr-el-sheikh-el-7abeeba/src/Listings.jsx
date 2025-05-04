import React, { useState } from 'react';
import './index.css';

function Listings() {
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [selectedIndustry, setSelectedIndustry] = useState('');
    const [customIndustry, setCustomIndustry] = useState('');
    const [selectedDuration, setSelectedDuration] = useState('');
    const [customDuration, setCustomDuration] = useState('');
    const [selectedPaid, setSelectedPaid] = useState('');
    const [customPaid, setCustomPaid] = useState('');
    const [selectedInternship, setSelectedInternship] = useState(null);

    
    const dummyData = [
        {
            id: 1,
            company: "Tech Innovators",
            title: "Frontend Developer",
            industry: "Technology",
            duration: "3 Months",
            location: "Cairo",
            salary: "5000 EGP/month",
            description: "Work on cutting-edge React applications"
        },
        {
            id: 2,
            company: "Digital Solutions",
            title: "UX Designer",
            industry: "Design",
            duration: "6 Months",
            location: "Remote",
            salary: "Unpaid",
            skills: ["Figma", "Adobe XD"],
            description: "Design user interfaces for enterprise applications"
        },
        {
            id: 3,
            company: "Digital Solutions",
            title: "UX Designer",
            industry: "Design",
            duration: "6 Months",
            location: "Remote",
            salary: "Unpaid",
            skills: ["Figma", "Adobe XD"],
            description: "Design user interfaces for enterprise applications"
        },
        {
            id: 4,
            company: "Data Analytics Co.",
            title: "Data Analyst Intern",
            industry: "Data Science",
            duration: "4 Months",
            location: "Alexandria",
            salary: "3000 EGP/month",
            skills: ["Python", "SQL"],
            description: "Analyze data and generate reports"
        },
        {
            id: 5,
            company: "Creative Minds",
            title: "Marketing Intern",
            industry: "Marketing",
            duration: "2 Months",
            location: "Cairo",
            salary: "2000 EGP/month",
            skills: ["Social Media", "Content Creation"],
            description: "Assist in marketing campaigns and social media management"
        }
    ];
    
    function handleIndustryChange(event) {
        setSelectedIndustry(event.target.value);
        setCustomIndustry('');
    }

    function handleCustomIndustryChange(event) {
        setCustomIndustry(event.target.value);
        setSelectedIndustry('');
    }

    function handleDurationChange(event) {
        setSelectedDuration(event.target.value);
        setCustomDuration(''); 
    }

    function handleCustomDurationChange(event) {
        setCustomDuration(event.target.value);
        setSelectedDuration(''); 
    }

    function handlePaidChange(event) {
        setSelectedPaid(event.target.value);
        setCustomPaid(''); 
    }

    function handleCustomPaidChange(event) {
        setCustomPaid(event.target.value);
        setSelectedPaid(''); 
    }

    const filteredData = dummyData.filter(internship => {
        const searchLower = searchQuery.toLowerCase();
        
       
        const searchMatch = internship.title.toLowerCase().includes(searchLower) ||
                          internship.company.toLowerCase().includes(searchLower);

        
        const industryFilter = selectedIndustry || customIndustry;
        const industryMatch = industryFilter ?
            internship.industry.toLowerCase().includes(industryFilter.toLowerCase()) : true;

        
        const durationFilter = selectedDuration || customDuration;
        const durationMatch = durationFilter ?
            internship.duration.toLowerCase().includes(durationFilter.toLowerCase()) : true;

    
        const paidFilter = selectedPaid || customPaid;
        const paidMatch = paidFilter ? 
            internship.salary.toLowerCase().includes(paidFilter.toLowerCase()) ||
            (paidFilter.toLowerCase() === 'paid' && internship.salary !== 'Unpaid') ||
            (paidFilter.toLowerCase() === 'unpaid' && internship.salary === 'Unpaid') : true;

        return searchMatch && industryMatch && durationMatch && paidMatch;
    });
    
    
    return (
        <div className='internship-background'>
            <div className="listings-container">
                <h1>
                    {searchQuery ? 
                        `Search Results for "${searchQuery}"` : 
                        'All Internship Opportunities'
                    }
                </h1>
                <div className="filters-container">
                    <div className="search-filter-row">
                        <input
                            type="text"
                            placeholder="Search by title or company..."
                            className="search-input"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button 
                            style={{ marginTop: '10px' }}
                            onClick={() => setShowFilters(!showFilters)}
                        >
                            {showFilters ? 'Hide Filter' : 'Show Filter'}
                        </button>
                    </div>

                    
                    {showFilters && (

                    <div className="filter-row">
                        
                        <div className="filter-group">
                            <label>Industry:</label>
                            <div className="filter-combo">
                                <select
                                    className="filter-select"
                                    value={selectedIndustry}
                                    onChange={handleIndustryChange}
                                >
                                    <option value="">Select Industry</option>
                                    <option value="Technology">Technology</option>
                                    <option value="Design">Design</option>
                                    <option value="Data Science">Data Science</option>
                                    <option value="Marketing">Marketing</option>
                                </select>
                                <span className="filter-or">OR</span>
                                <input
                                    type="text"
                                    placeholder="Type industry..."
                                    className="filter-input"
                                    value={customIndustry}
                                    onChange={handleCustomIndustryChange}
                                />
                            </div>
                        </div>

                        
                        <div className="filter-group">
                            <label>Duration:</label>
                            <div className="filter-combo">
                                <select
                                    className="filter-select"
                                    value={selectedDuration}
                                    onChange={handleDurationChange}
                                >
                                    <option value="">Select Duration</option>
                                    <option value="3">3 Months</option>
                                    <option value="6">6 Months</option>
                                    <option value="12">1 Year</option>
                                </select>
                                <span className="filter-or">OR</span>
                                <input
                                    type="text"
                                    placeholder="Type duration..."
                                    className="filter-input"
                                    value={customDuration}
                                    onChange={handleCustomDurationChange}
                                />
                            </div>
                        </div>

                        
                        <div className="filter-group">
                            <label>Compensation:</label>
                            <div className="filter-combo">
                                <select
                                    className="filter-select"
                                    value={selectedPaid}
                                    onChange={handlePaidChange}
                                >
                                    <option value="">All Types</option>
                                    <option value="paid">Paid</option>
                                    <option value="unpaid">Unpaid</option>
                                </select>
                                <span className="filter-or">OR</span>
                                <input
                                    type="text"
                                    placeholder="Type compensation..."
                                    className="filter-input"
                                    value={customPaid}
                                    onChange={handleCustomPaidChange}
                                />
                            </div>
                        </div>
                    </div>
                    )}
                </div>

                <div className="internship-list">
                    {filteredData.length === 0 ? (
                        <div className="no-results">
                            {searchQuery ? 
                                `No internships found for "${searchQuery}"` : 
                                "No internships currently available"
                            }
                        </div>
                    ) : (
                        filteredData.map((internship) => (
                            <div 
                                key={internship.id} 
                                className={`internship-card ${selectedInternship === internship.id ? 'selected' : ''}`}
                                onClick={() => {
                                    if (selectedInternship === internship.id) {
                                        setSelectedInternship(null);
                                    } else {
                                        setSelectedInternship(internship.id);
                                    }
                                }}>
                                <div>
                                    <h2>{internship.title}</h2>
                                    <h3>{internship.company}</h3>
                                </div>
                                <div className="expand-indicator">
                                    {selectedInternship === internship.id ? '▼' : '▶'}
                                </div>
                                    <div style={{borderBottom : '1px solid rgba(126, 200, 227, 0.2)'}}>
                                    <h4 style={{ display: 'flex', justifyContent: 'space-between',fontWeight:"normal" }}>
                                    <span style={{color: '#7EC8E3' }}>Duration:</span>
                                    <span style={{color: 'white'}}>{internship.duration}</span>
                                    </h4> 
                                    </div>
                                {selectedInternship === internship.id && (
                                <div className="details-grid">
                                    <div className="detail-item">
                                        <span className="detail-label">Location:</span>
                                        <span className="detail-value">{internship.location}</span>
                                    </div>
                                    <div className="detail-item">
                                        <span className="detail-label">Compensation:</span>
                                        <span className="detail-value">{internship.salary}</span>
                                    </div>
                                    
                                        <div className="detail-item">
                                            <span className="detail-label">Skills Required:</span>
                                            <span className="detail-value">{internship.skills?.join(", ") || "No specific skills required"}</span>
                                        </div>
                                        <div className='detail-item'>
                                            <span className="detail-label">Description:</span>
                                        </div>
                                            <p style={{color: 'white'}}> {internship.description}</p>
                                </div>
                            
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
            </div>
    );
}

export default Listings;