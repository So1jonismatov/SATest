import { Link } from "react-router-dom";
import { CardSpotlightComponent } from "@/components/shared/choose-role/CardSpotlight";
import roleData from "@/data/home-page/role-data";
import { type ChooseOneProps } from "@/types";

export const ChooseRole = ({ maxWidth = "1600px" }: ChooseOneProps) => {
  return (
    <div className="mx-auto p-4" style={{ maxWidth }}>
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Choose Your Role
        </h2>
        <p className="mt-3 text-xl text-muted-foreground sm:mt-4">
          Select the role that best describes you to get started.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {roleData.map((role) => (
          <Link
            to={role.path}
            key={role.title}
            className="block h-full"
            onClick={() =>
              localStorage.setItem("chosenRole", role.title.toLowerCase())
            } // ✅ store role
          >
            <CardSpotlightComponent
              title={role.title}
              description={role.description}
              icon={role.icon}
              gradientClasses={role.gradientClasses}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};
