import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { useState } from "react";
import { UserProfileLink } from "@/components/shared/User/UserProfileLink";
import { LogoSmall as Logo } from "@/components/shared/Logos";
import LogoIcon from "@/components/shared/Logos/LogoIcon";
import { useAuth } from "@/context/AuthContext";
import { ModeToggle } from "@/components/ui/mode-toggle";

interface Links {
  label: string;
  href: string;
  icon: React.JSX.Element | React.ReactNode;
}

interface GenericSidebarComponentProps {
  linksData: Links[];
}

export const GenericSidebarComponent: React.FC<
  GenericSidebarComponentProps
> = ({ linksData }) => {
  const [open, setOpen] = useState(false);
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const sidebarContent = (
    <>
      {/* Top section: Logo */}
      <div className="p-1">{open ? <Logo /> : <LogoIcon />}</div>

      {/* Middle section: Nav links */}
      <div className="flex-1 mt-8 flex flex-col gap-2 overflow-x-hidden overflow-y-auto">
        {linksData.map((link, idx) => (
          <SidebarLink
            key={idx}
            link={link}
            onClick={
              link.label.localeCompare("Logout") === 0
                ? handleLogout
                : undefined
            }
          />
        ))}
      </div>

      {/* Bottom section: Profile & ModeToggle */}
      <div className="flex items-center justify-center w-full gap-2">
        <UserProfileLink />
        {open && <ModeToggle />}
      </div>
    </>
  );

  return (
    <Sidebar open={open} setOpen={setOpen}>
      <SidebarBody className="justify-between">{sidebarContent}</SidebarBody>
    </Sidebar>
  );
};
