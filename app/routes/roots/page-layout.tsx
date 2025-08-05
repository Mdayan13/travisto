import { Link, NavLink, useLoaderData, useNavigate } from 'react-router';
import { logoutUser } from '~/appWrite/auth';

const pageLayout = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    await logoutUser();
    navigate('/sign-in');
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, #1e1b4b 0%, #2a2a72 100%)',
      minHeight: '100vh',
      color: '#f1f5f9',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      textAlign: 'center',
      transition: 'background 0.5s ease',
    }}>
      <h1 style={{
        fontSize: '2.5rem',
        fontWeight: 'bold',
        marginBottom: '2rem',
        background: 'linear-gradient(to right, #7c3aed, #a855f7)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}>
        Welcome Back!
      </h1>
      <div style={{
        display: 'flex',
        gap: '1rem',
      }}>
        <button
          onClick={handleLogout}
          style={{
            cursor: 'pointer',
            background: 'linear-gradient(to right, #4c1d95, #6b21a8)',
            border: 'none',
            borderRadius: '8px',
            padding: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'transform 0.2s ease, background 0.3s ease, box-shadow 0.3s ease',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(167, 139, 250, 0.4)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <img
            src='/assets/icons/logout.svg'
            alt='Logout'
            style={{ width: '30px', height: '30px' }}
          />
        </button>
        <button
          onClick={() => { navigate("/dashboard"); }}
          style={{
            cursor: 'pointer',
            background: 'linear-gradient(to right, #6b21a8, #7c3aed)',
            border: 'none',
            borderRadius: '8px',
            padding: '12px 24px',
            color: '#f1f5f9',
            fontSize: '1rem',
            fontWeight: '500',
            transition: 'transform 0.2s ease, background 0.3s ease, box-shadow 0.3s ease',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(167, 139, 250, 0.4)';
            e.currentTarget.style.background = 'linear-gradient(to right, #7c3aed, #a855f7)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = 'none';
            e.currentTarget.style.background = 'linear-gradient(to right, #6b21a8, #7c3aed)';
          }}
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default pageLayout;