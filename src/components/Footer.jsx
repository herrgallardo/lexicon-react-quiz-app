import './Footer.css';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <p>
        © {year} Quizify Quiz App — Built with love by an awesome team{' '}
        <span role="img" aria-label="purple heart">
          🤍
        </span>
      </p>
    </footer>
  );
};

export default Footer;
