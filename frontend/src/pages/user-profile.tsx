import { Sidebar } from "../components/common/sidebar";
import { SettingsForm } from "../components/user-profile/settings";


const UserProfile = () => {
  return (
    <div className="flex h-screen bg-[#03060B] overflow-hidden">
    <Sidebar activeItem="settings" />
    <main className="flex-1 overflow-hidden">
      <SettingsForm />
    </main>
  </div>
)
};

export default UserProfile;
