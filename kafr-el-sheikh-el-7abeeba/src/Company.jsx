import './index.css';

function Company({email}){
    const [view, setView] = useState('internships');
    const [internships, setInternships] = useState([]);
    const [newTitle, setNewTitle] = useState('');
    const [newDuration, setNewDuration] = useState('Not Specified');
    const [newPay, setNewPay] = useState('Unpaid');
    const [newSalary, setNewSalary] = useState('');
    const [skills, setSkills] = useState([]);
    const [newDesc, setNewDesc] = useState('');
    const [message, setMessage] = useState('');

    function addInternship() {
        if (!newTitle || !newDesc || !newDuration || !newPay || !skills || (newPay === 'Paid' && !newSalary)){
            setMessage('Please fill in all fields.');
            return;
        } 
        setInternships([...internships, {
            id: Date.now(),
            title: newTitle,
            duration: newDuration,
            pay: newPay,
            salary: newSalary,
            skills: skills, 
            desc: newDesc}]);
        setNewTitle('');
        setNewDuration('Not Specified');
        setNewPay('Unpaid');
        setNewSalary('');
        setSkills([]);
        setNewDesc('');
    }

    function deleteInternship(id) {
        setInternships(internships.filter(intern => intern.id !== id));
    }

    function updateInternship(id, title, duration, pay, salary, skills, desc) {
        const updated = internships.map(intern =>
          intern.id === id ? { ...intern, title, duration, pay, salary, skills, desc } : intern
        );
        setInternships(updated);
    }

    return (
        <div className="page" style={{ display: 'flex' }}>
      {/* Sidebar */}
      <div className="sidebar" style={{ width: '200px', backgroundColor: '#f4f4f4', padding: '20px' }}>
        <h3>Company Menu</h3>
        <button onClick={() => setView('internships')}>View Internships</button>
      </div>

      {/* Main Content */}
      <div className="main-content" style={{ flex: 1, padding: '20px' }}>
        <h2>Welcome, {email}</h2>

        {view === 'internships' && (
          <>
            <h3>Your Internships</h3>

            {/* Add Internship Form */}
            <input
              type="text"
              placeholder="Internship Title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
            <br />
            <textarea
              placeholder="Internship Description"
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
            />
            <br />
            <button onClick={addInternship}>Add Internship</button>

            {/* List */}
            <ul>
              {internships.map((intern) => (
                <li key={intern.id} style={{ marginTop: '10px' }}>
                  <strong>{intern.title}</strong>
                  <p>{intern.desc.slice(0, 100)}...</p>
                  <button onClick={() => deleteInternship(intern.id)}>Delete</button>
                  {/* For update, you can add an edit form or popup later */}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
    );

}

export default Company;