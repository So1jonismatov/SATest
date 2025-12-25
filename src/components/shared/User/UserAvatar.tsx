import { type User } from "@/types";

interface UserAvatarProps {
  user: User | null;
}

// A generic SVG for the user avatar background
const GenericAvatar = () => (
  <svg
    className="h-full w-full text-muted-foreground"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

export const UserAvatar = ({ user }: UserAvatarProps) => {
  if (!user) {
    return (
      <div className="flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-full bg-secondary">
        <GenericAvatar />
      </div>
    );
  }

  // Get the first initial of the user's name
  const initial = user.name ? user.name.charAt(0).toUpperCase() : null;

  return (
    <div className="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary">
      <GenericAvatar />
      {/* Overlay the initial on top of the generic avatar */}
      {initial && (
        <span className="absolute text-sm font-semibold text-background">
          {initial}
        </span>
      )}
    </div>
  );
};
