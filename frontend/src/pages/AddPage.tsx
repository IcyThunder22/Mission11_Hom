import EntertainerForm from '../components/EntertianerForm';

const AddPage: React.FC = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Add New Entertainer</h1>
      <EntertainerForm onSave={() => alert('Entertainer saved!')} />
    </div>
  );
};

export default AddPage;
