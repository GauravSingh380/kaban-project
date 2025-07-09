import SignupForm from "./SignupForm";


const TeamMemberSignupDeepSeek = () => {
  const handleSubmit = (formData) => {
    // Handle form submission
    console.log('Form data:', formData);
    // Send to API, etc.
  };

  return (
    <SignupForm
      onSubmit={handleSubmit}
      formTitle="Join Our Team"
      formSubtitle="Register as a team member to get started"
    />
  );
};

export default TeamMemberSignupDeepSeek;