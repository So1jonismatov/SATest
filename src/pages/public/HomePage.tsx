import { ChooseRole } from "@/components/shared/choose-role/ChooseRole";

const HomePage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <section className="py-20 flex flex-col items-center justify-center">
        <ChooseRole />
      </section>
    </div>
  );
};

export default HomePage;
