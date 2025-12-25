import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import React, { createContext, useContext, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface Links {
  label: string;
  href: string;
  icon: React.JSX.Element | React.ReactNode;
}

interface SidebarContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  animate: boolean;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(
  undefined,
);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

export const SidebarProvider = ({
  children,
  open: openProp,
  setOpen: setOpenProp,
  animate = true,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  const [openState, setOpenState] = useState(false);

  const open = openProp !== undefined ? openProp : openState;
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

  return (
    <SidebarContext.Provider value={{ open, setOpen, animate: animate }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const Sidebar = ({
  children,
  open,
  setOpen,
  animate,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  return (
    <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
      {children}
    </SidebarProvider>
  );
};

export const SidebarBody = (props: React.ComponentProps<typeof motion.div>) => {
  return (
    <>
      <DesktopSidebar {...props} />
      <MobileSidebar {...(props as React.ComponentProps<"div">)} />
    </>
  );
};

export const DesktopSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof motion.div>) => {
  const { open, setOpen, animate } = useSidebar();
  return (
    <motion.div
      className={cn(
        "h-screen px-4 py-4 hidden md:flex md:flex-col w-[300px] shrink-0 sticky top-0",
        "bg-[var(--sidebar)] text-[var(--sidebar-foreground)] border-r border-[var(--sidebar-border)]",
        className,
      )}
      animate={{
        width: animate ? (open ? "300px" : "70px") : "300px",
      }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const MobileSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) => {
  const { open, setOpen } = useSidebar();
  return (
    <div
      className={cn(
        "sticky top-0 inset-x-0 z-50 h-14 px-4 py-2 flex flex-row md:hidden items-center justify-between border-b w-full",
        "bg-[var(--sidebar)] text-[var(--sidebar-foreground)] border-[var(--sidebar-border)]",
        className,
      )}
      {...props}
    >
      <div className="flex justify-end z-20 w-full">
        <Menu
          className="text-[var(--sidebar-foreground)]"
          onClick={() => setOpen(!open)}
        />
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
            className={cn(
              "fixed h-full w-full inset-0 p-10 z-[100] flex flex-col justify-between",
              "bg-[var(--sidebar)] text-[var(--sidebar-foreground)]",
              className,
            )}
          >
            <div
              className="absolute right-10 top-10 z-50 cursor-pointer text-[var(--sidebar-foreground)]"
              onClick={() => setOpen(!open)}
            >
              <X />
            </div>
            {/* ✅ Close sidebar when clicking inside links */}
            <div onClick={() => setOpen(false)}>{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const SidebarLink = ({
  link,
  className,
  ...props
}: {
  link: Links;
  className?: string;
  onClick?: () => void;
}) => {
  const { open, animate, setOpen } = useSidebar();
  const location = useLocation();

  const isActive = location.pathname === link.href;

  const commonClasses =
    "flex items-center group/sidebar py-2 w-full rounded-md px-2 transition-colors duration-200";

  const linkContent = (
    <>
      {/* ✅ Icon aligned to the far left with slight padding */}
      <div className="flex items-center justify-start w-6 h-6 shrink-0 mr-2">
        {link.icon}
      </div>

      {/* ✅ Smooth label animation */}
      <motion.div
        initial={false}
        animate={{
          width: animate ? (open ? "auto" : 0) : "auto",
          opacity: animate ? (open ? 1 : 0) : 1,
        }}
        className="overflow-hidden whitespace-pre text-sm transition-all duration-200"
      >
        {link.label}
      </motion.div>
    </>
  );

  const baseStyles = cn(
    commonClasses,
    isActive
      ? "bg-[var(--sidebar-accent)] text-[var(--sidebar-accent-foreground)]"
      : "hover:bg-[var(--sidebar-accent)] hover:text-[var(--sidebar-accent-foreground)]",
    className,
  );

  if (props.onClick) {
    return (
      <button className={baseStyles} onClick={props.onClick}>
        {linkContent}
      </button>
    );
  }

  return (
    <Link
      to={link.href}
      className={baseStyles}
      onClick={() => setOpen(false)}
      {...props}
    >
      {linkContent}
    </Link>
  );
};
