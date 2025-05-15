import './About.css'; // Import CSS for component styling

// Array of team members with their information and GitHub links
const teamMembers = [
  {
    id: 1,
    name: 'Antonio Gallardo Girela',
    role: 'Project leader with technical understanding.',
    image: '/images/antonio.png',
    github: 'https://github.com/herrgallardo',
  },
  {
    id: 2,
    name: 'Jonni Åkesson',
    role: 'Backend specialist with experience in databases and APIs.',
    image: '/images/jonni.png',
    github: 'https://github.com/devbyjonni',
  },
  {
    id: 3,
    name: 'Jonathan Persson',
    role: 'Frontend developer with a focus on user experience.',
    image: '/images/jonathan.png',
    github: 'https://github.com/JonathanPersson12',
  },
  {
    id: 4,
    name: 'Mirjana Vasic',
    role: 'Creative problem solver with a passion for innovation.',
    image: '/images/mirjana.png',
    github: 'https://github.com/Mirjana1234',
  },
];

const About = () => {
  return (
    <div className="about-page">
      {/* Main container for all about page content */}
      <div className="about-container">
        {/* Page title and introduction */}
        <h1>About us</h1>
        <p>
          We are a group of four individuals, each with different backgrounds
          and experiences, who have come together to work on our first shared
          project.
        </p>

        {/* Team section with member cards */}
        <h2>Our Team</h2>
        <div className="team-container">
          {/* Map through team members array to create individual cards */}
          {teamMembers.map((member) => (
            <div className="team-member" key={member.id}>
              {/* Team member profile image */}
              <img src={member.image} alt={member.name} />

              {/* Container for member name and role */}
              <div className="member-info">
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </div>

              {/* Link to member's GitHub profile */}
              <a
                href={member.github}
                target="_blank" // Opens in new tab
                rel="noopener noreferrer" // Security attributes for external links
                className="github-link"
              >
                Visit GitHub
              </a>
            </div>
          ))}
        </div>

        {/* Technical overview section describing the project */}
        <div className="technical-overview">
          <h2>Our Project</h2>

          {/* Project description paragraph */}
          <p>
            We've developed a comprehensive quiz application that provides an
            interactive learning experience with dynamic question generation and
            user authentication. The application allows users to customize their
            quiz experience by selecting categories, difficulty levels, and
            question types from the Open Trivia Database API.
          </p>

          {/* Key features list */}
          <p>
            <strong>Key Features:</strong>
            <br />
            • User authentication and profile management with Firebase Auth
            <br />
            • Real-time score tracking and leaderboard system
            <br />
            • Quiz customization with multiple difficulty levels and categories
            <br />
            • Responsive design that works seamlessly across all devices
            <br />
            • Session persistence to resume incomplete quizzes
            <br />• Animated UI transitions and smooth user interactions
          </p>

          {/* Technology stack information */}
          <p>
            <strong>Technology Stack:</strong>
            <br />• <strong>Frontend:</strong> React 19 with functional
            components and hooks
            <br />• <strong>Routing:</strong> React Router for application
            navigation
            <br />• <strong>Authentication:</strong> Firebase Authentication
            <br />• <strong>Database:</strong> Firebase Firestore for user data
            and score storage
            <br />• <strong>API:</strong> Open Trivia Database for quiz
            questions
            <br />• <strong>Styling:</strong> Modern CSS with gradients and
            animations
            <br />• <strong>Icons:</strong> FontAwesome React components
            <br />• <strong>Deployment:</strong> Deployed on Vercel with
            continuous integration
            <br />• <strong>Development Tools:</strong> Create React App,
            Prettier for code formatting
          </p>
        </div>

        {/* Contact section */}
        <h2>Contact</h2>
        <p>
          Do you have any questions or want to collaborate with us? Feel free to
          reach out! <br />
        </p>
      </div>
    </div>
  );
};

export default About;
