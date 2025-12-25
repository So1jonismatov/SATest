import { SidebarLink } from "@/components/ui/sidebar";
import { useAuth } from "@/context/AuthContext";
import { UserAvatar } from "@/components/shared/User/UserAvatar";

export const UserProfileLink = () => {
  const { user } = useAuth();

  // If there's no user, we don't need to show the link
  if (!user) {
    return null;
  }

  // Dynamically create the link based on the user's role
  const profileHref = `/${user.role}/profile`;

  return (
    <SidebarLink
      link={{
        label: user.name,
        href: profileHref,
        icon: <UserAvatar user={user} />,
      }}
    />
  );
};
