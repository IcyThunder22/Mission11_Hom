import { useEffect, useState } from 'react';

interface Entertainer {
  entertainerID: number;
  entStageName: string;
  entSsn: string;
  entStreetAddress: string;
  entCity: string;
  entState: string;
  entZipCode: string;
  entPhoneNumber: string;
  entWebPage: string;
  entEmailAddress: string;
  entDateEntered: string;
}

interface Props {
  entertainerId: number;
  onClose: () => void;
}

const EntertainerModal: React.FC<Props> = ({ entertainerId, onClose }) => {
  const [entertainer, setEntertainer] = useState<Entertainer | null>(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/entertainers/${entertainerId}`)
      .then((res) => res.json())
      .then((data) => setEntertainer(data));
  }, [entertainerId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (entertainer) {
      setEntertainer({ ...entertainer, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = () => {
    fetch(`${import.meta.env.VITE_API_URL}/api/entertainers/${entertainerId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entertainer),
    })
      .then(() => {
        alert('Entertainer updated!');
        onClose();
      })
      .catch((err) => console.error('Update error:', err));
  };

  if (!entertainer) return null;

  return (
    <div className="modal d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content p-4">
          <h5 className="modal-title mb-3">Edit Entertainer</h5>
          <div className="modal-body">
            {[
              'entStageName',
              'entSsn',
              'entStreetAddress',
              'entCity',
              'entState',
              'entZipCode',
              'entPhoneNumber',
              'entWebPage',
              'entEmailAddress',
              'entDateEntered',
            ].map((field) => (
              <div className="mb-3" key={field}>
                <label className="form-label">
                  {field.replace('ent', '').replace(/([A-Z])/g, ' $1')}
                </label>
                <input
                  className="form-control"
                  type="text"
                  name={field}
                  value={(entertainer as any)[field]}
                  onChange={handleChange}
                />
              </div>
            ))}
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>Close</button>
            <button className="btn btn-primary" onClick={handleSubmit}>Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntertainerModal;
