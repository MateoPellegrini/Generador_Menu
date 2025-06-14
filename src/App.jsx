import { WizardProvider } from "./context/WizardContext";
import Wizard from "./components/Wizard";

export default function App() {
  return (
    <WizardProvider>
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 p-4 md:p-10">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-10">
          <Wizard />
        </div>
      </div>
    </WizardProvider>
  );
}