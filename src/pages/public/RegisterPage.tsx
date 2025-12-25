import { RegisterForm } from "@/components/shared/Authenticaton/register-form";
import { ParentRegisterForm } from "@/components/shared/Authenticaton/parent-register-form";

type Role = "student" | "parent";

const getRole = (): Role => {
  const role = localStorage.getItem("chosenRole");
  if (role === "parent") {
    return "parent";
  }
  return "student"; // Default to student
};

const RegisterPage = () => {
  const role = getRole();

  const FormComponent = role === "parent" ? ParentRegisterForm : RegisterForm;

  return (
    <div className="absolute flex justify-center items-center z-10 w-full h-full ">
      <FormComponent className="max-w-sm " />
    </div>
  );
};

export default RegisterPage;
