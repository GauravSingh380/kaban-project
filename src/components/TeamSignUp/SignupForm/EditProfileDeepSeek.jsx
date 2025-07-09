import SignupForm from './SignupForm';

const EditProfileDeepSeek = ({ user }) => {
  const handleSubmit = (updatedData) => {
    // Handle profile update
    console.log('Updated data:', updatedData);
  };

  return (
    <SignupForm 
      onSubmit={handleSubmit}
      initialFormData={user}
      formTitle="Update Your Profile"
      formSubtitle="Keep your information up to date"
      submitButtonText="Save Changes"
      showLoginLink={false}
    />
  );
};

export default EditProfileDeepSeek;