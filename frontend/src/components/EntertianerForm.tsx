import { useState, useEffect, FormEvent } from 'react';

export interface Entertainer {
  entertainerID?: number;
  entStageName: string;
  entSsn: string;
  entStreetAddress: string;
  entCity: string;
  entState: string;
  entZipCode: string;
  entPhoneNumber: string;
  entWebPage: string;
  entEmailAddress: string;
  entStatus: string;
}

interface EntertainerFormProps {
  existingData?: Entertainer;
  onSave?: () => void;
}

const EntertainerForm: React.FC<EntertainerFormProps> = ({ existingData, onSave }) => {
  const [formData, setFormData] = useState<Entertainer>({
    entStageName: '',
    entSsn: '',
    entStreetAddress: '',
    entCity: '',
    entState: '',
    entZipCode: '',
    entPhoneNumber: '',
    entWebPage: '',
    entEmailAddress: '',
    entStatus: ''
  });

  useEffect(() => {
    if (existingData) {
      setFormData(existingData);
    }
  }, [existingData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const method = existingData ? 'PUT' : 'POST';
    const url = existingData
      ? `${import.meta.env.VITE_API_URL}/api/entertainers/${existingData.entertainerID}`
      : `${import.meta.env.VITE_API_URL}/api/entertainers`;

    await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    if (onSave) onSave();
    if (!existingData) {
      setFormData({
        entStageName: '',
        entSsn: '',
        entStreetAddress: '',
        entCity: '',
        entState: '',
        entZipCode: '',
        entPhoneNumber: '',
        entWebPage: '',
        entEmailAddress: '',
        entStatus: ''
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{existingData ? 'Edit' : 'Add'} Entertainer</h3>
      {Object.entries(formData).map(([key, value]) => (
        <div key={key} style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block' }}>{key}:</label>
          <input
            type="text"
            name={key}
            value={value as string}
            onChange={handleChange}
            style={{ width: '100%' }}
            required
          />
        </div>
      ))}
      <button type="submit">{existingData ? 'Update' : 'Create'}</button>
    </form>
  );
};

export default EntertainerForm;
