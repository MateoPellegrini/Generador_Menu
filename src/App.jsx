import Step1Welcome from "./steps/Step1Welcome";
import Step2Design from "./steps/Step2Design";
import Step3Products from "./steps/Step3Products";
import Step4Preview from "./steps/Step4Preview";
import Step5UploadDrive from "./steps/Step5UploadDrive";
import Step6GenerateQR from "./steps/Step6GenerateQR";

import { useWizard } from "./context/WizardContext";

function App() {
  const { currentStep } = useWizard();

  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6">
        {currentStep === 1 && <Step1Welcome />}
        {currentStep === 2 && <Step2Design />}
        {currentStep === 3 && <Step3Products />}
        {currentStep === 4 && <Step4Preview />}
        {currentStep === 5 && <Step5UploadDrive />}
        {currentStep === 6 && <Step6GenerateQR />}
      </div>
    </main>
  );
}

export default App;
