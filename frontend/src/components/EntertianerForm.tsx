import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // <-- Import here

const EntertainerForm: React.FC = () => {
  const navigate = useNavigate(); // <-- Use hook

  const [formData, setFormData] = useState({
    entStageName: '',
    entSsn: '',
    entStreetAddress: '',
    entCity: '',
    entState: '',
    entZipCode: '',
    entPhoneNumber: '',
    entWebPage: '',
    entEmailAddress: '',
    entDateEntered: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/entertainers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      navigate('/entertainers'); // <-- Redirect here
    } else {
      console.error('Failed to save entertainer:', await response.text());
      alert('Something went wrong!');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      {Object.entries(formData).map(([key, value]) => (
        <div className="mb-3" key={key}>
          <label htmlFor={key} className="form-label">
            {key.replace(/^ent/, '').replace(/([A-Z])/g, ' $1').trim()}
          </label>
          <input
            type="text"
            id={key}
            name={key}
            className="form-control"
            value={value}
            onChange={handleChange}
          />
        </div>
      ))}
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default EntertainerForm;
