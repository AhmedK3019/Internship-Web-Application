# Internship Management System

A comprehensive web application for managing internships at German University Cairo (GUC),  this application facilitates the entire internship lifecycle from application to evaluation.
This project is part of the CSEN 603 Software Engineering course in the GUC 

## Live Demo
https://ahmedk3019.github.io/Internship-Web-Application/


## 🚀 Features

### For Students
- **Profile Management**: Create and update detailed student profiles with academic information
- **Internship Discovery**: Browse and search available internships with advanced filtering
- **Application System**: Apply for internships with document upload capabilities
- **Progress Tracking**: Monitor application status and internship progress
- **Report Submission**: Submit internship reports and evaluations
- **Video Call Scheduling**: Schedule appointments with academic advisors
- **Workshop Registration**: Register for professional development workshops
- **Notifications**: Receive real-time updates about applications and deadlines

### For Pro Students (Advanced Students)
- **Enhanced Dashboard**: Additional features for senior students
- **Assessment Management**: Access and manage academic assessments
- **Advanced Reporting**: Submit detailed internship evaluations
- **Mentor Features**: Support junior students with guidance

### For Companies
- **Internship Posting**: Create and manage internship opportunities
- **Application Review**: Review and manage student applications
- **Intern Management**: Track intern progress and performance
- **Evaluation System**: Evaluate interns with detailed performance metrics
- **Supervisor Assignment**: Assign supervisors and manage internship details
- **Real-time Statistics**: View application statistics and analytics

### For SCAD Office (Student Career & Alumni Development)
- **Company Management**: Approve and manage company registrations
- **Internship Oversight**: Monitor all internship activities
- **Student Search**: Advanced student search and filtering
- **Report Management**: View and manage all submitted reports
- **Cycle Management**: Set and manage internship cycles
- **Workshop Management**: Create and manage professional workshops
- **Statistics Dashboard**: Comprehensive analytics and reporting

### For Faculty Members
- **Student Oversight**: Monitor student internship progress
- **Academic Integration**: Ensure internships align with academic requirements
- **Evaluation Review**: Review student and company evaluations

## 🛠️ Technology Stack

- **Frontend**: React 19.0.0 with modern hooks and functional components
- **Build Tool**: Vite 6.3.1 for fast development and optimized builds
- **Styling**: Custom CSS with responsive design
- **PDF Generation**: jsPDF and jsPDF-autotable for report generation
- **Code Quality**: ESLint for code linting and formatting
- **Development**: Hot module replacement and fast refresh

## 👥 User Roles & Access

### Student
- **Login**: `JohnDoe@gmail.com` / `johndoe123`
- **Login**: `JaneSmith@gmail.com` / `janesmith123`

### Pro Student
- **Login**: `AliceJohnson@gmail.com` / `alicejohnson123`

### Company Representative
- **Login**: `BobBrown@gmail.com` / `bobbrown123`

### SCAD Office Member
- **Login**: `CharlieDavis@gmail.com` / `charliedavis123`

### Faculty Member
- **Login**: `DavidWilson@gmail.com` / `davidwilson123`

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd kafr-el-sheikh-el-7abeeba
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## 🏗️ Project Structure

```
src/
├── App.jsx                           # Main application component
├── Login.jsx                         # Authentication and user routing
├── index.css                         # Global styles
├── main.jsx                          # Application entry point
│
├── Student Components/
│   ├── Student.jsx                   # Student dashboard
│   ├── ProStudent.jsx               # Pro student dashboard
│   ├── Profile.jsx                  # User profile management
│   ├── Listings.jsx                 # Internship listings
│   ├── MyInternships.jsx           # Student's internship history
│   ├── AppliedInternships.jsx      # Applied internship tracking
│   ├── IntershipApplication.jsx     # Application form
│   ├── Reportsubmission.jsx        # Report submission
│   └── SuggestedCompanies.jsx      # Company recommendations
│
├── Company Components/
│   ├── Company.jsx                  # Company dashboard
│   ├── CompanyInternships.jsx      # Company's internship posts
│   ├── CompanyAddInternship.jsx    # Create/edit internship posts
│   ├── CompanyAllApplications.jsx   # Application management
│   ├── CompanyInterns.jsx          # Intern management
│   └── CompanyInternEvaluationView.jsx # Intern evaluation
│
├── SCAD Components/
│   ├── SCAD.jsx                     # SCAD office dashboard
│   ├── SCADCompaniesRequests.jsx   # Company approval management
│   ├── SCADInternshipReports.jsx   # Report oversight
│   ├── SCADstudentsearch.jsx       # Student search functionality
│   ├── SCADWorkshops.jsx           # Workshop management
│   ├── SCADViewRealTimeStatistics.jsx # Analytics dashboard
│   └── SetInternshipCycle.jsx      # Cycle management
│
├── Shared Components/
│   ├── Majors.jsx                   # Academic majors information
│   ├── Faculty.jsx                  # Faculty member interface
│   ├── VideoCallAppointment.jsx    # Video call scheduling
│   ├── WorkshopRegisteration.jsx   # Workshop registration
│   ├── RegisteredWorkshops.jsx     # Workshop management
│   ├── ViewAssessments.jsx         # Assessment viewing
│   ├── Statistics.jsx              # Statistics display
│   └── InternshipReports.jsx       # Report viewing
│
└── Data/
    ├── InternshipsData.js          # Sample internship data
    ├── questions.js                # Assessment questions
    └── ReportsData.js              # Report data structure
```

## 🔄 Application Workflow

1. **Student Registration**: Students create profiles with academic information
2. **Company Registration**: Companies register and await SCAD approval
3. **Internship Posting**: Approved companies post internship opportunities
4. **Application Process**: Students browse and apply for internships
5. **Review & Selection**: Companies review applications and select candidates
6. **Internship Management**: Track progress with supervisor assignments
7. **Evaluation & Reporting**: Complete evaluations and submit reports
8. **Cycle Management**: SCAD manages internship cycles and deadlines

## 📊 Key Features

### Advanced Filtering
- Search by title, company, location
- Filter by duration, compensation, status
- Date range filtering for applications

### Document Management
- PDF resume upload
- Cover letter attachments
- Certificate submissions
- Automated report generation

### Real-time Updates
- Application status notifications
- Deadline reminders
- Workshop announcements
- System-wide alerts

### Analytics & Reporting
- Application statistics
- Internship completion rates
- Company performance metrics
- Student progress tracking

## 🎯 Business Logic

### Application States
- **Pending**: Initial application state
- **Finalized**: Application under review
- **Accepted**: Student accepted for internship
- **Rejected**: Application declined

### Internship Progress
- **Not Started**: Accepted but not yet begun
- **Current Intern**: Active internship
- **Internship Completed**: Successfully finished

### User Permissions
- Role-based access control
- Feature restrictions by user type
- Secure data isolation

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build optimized production bundle
- `npm run lint` - Run ESLint for code quality checks
- `npm run preview` - Preview production build locally

### Code Quality

- ESLint configuration for React best practices
- Consistent component structure
- Modular CSS architecture
- Error handling and validation

## 🌟 Future Enhancements

- **Database Integration**: Migrate from localStorage to proper database
- **Authentication System**: Implement JWT-based authentication
- **Email Notifications**: Automated email alerts for important events
- **Mobile App**: React Native mobile application
- **Advanced Analytics**: Machine learning-based recommendations
- **Multi-language Support**: Arabic and English localization

## 📝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is developed for educational purposes as part of the German University Cairo curriculum.

## 📞 Support

For technical support or questions about the application, please contact the development team or SCAD office at German University Cairo.

---
