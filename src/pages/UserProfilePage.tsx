import { useGetMyUser, useUpdateMyUser } from "@/api/MyUserApi";
import UserProfileForm from "@/forms/user-profile-form/UserProfileForm";

const UserProfilePage = () => {
  const { updateUser, isPending } = useUpdateMyUser();
  const { currentUser, isLoading: isGetLoading } = useGetMyUser();

  if (isGetLoading) {
    return <span>Loading...</span>;
  }

  if (!currentUser) {
    return <span>Unable to load User Profile</span>;
  }

  return (
    <div className="container m-auto sm:container">
      <UserProfileForm
        currentUser={currentUser}
        onSave={updateUser}
        isLoading={isPending}
      />
    </div>
  );
};

export default UserProfilePage;
