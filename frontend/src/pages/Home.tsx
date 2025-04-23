import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>🎭 Welcome to the Entertainment Agency</h1>
      <p>Manage your entertainers, view booking data, and keep everything organized — all in one place.</p>

      <div style={{ marginTop: '2rem' }}>
        <Link to="/entertainers">
          <button style={{ padding: '1rem 2rem', fontSize: '1rem', cursor: 'pointer' }}>
            View Entertainers
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
