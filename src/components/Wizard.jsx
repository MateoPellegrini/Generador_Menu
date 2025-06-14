import Step1 from "../steps/Step1Welcome";
import Step2 from "../steps/Step2Design";
import Step3 from "../steps/Step3Products";
import Step4 from "../steps/Step4Preview";
import Step5 from "../steps/Step5UploadDrive";
import Step6 from "../steps/Step6GenerateQR";
import { useWizard } from "../context/WizardContext";
import { AnimatePresence, motion } from "framer-motion";

const steps = [Step1, Step2, Step3, Step4, Step5, Step6];

export default function Wizard() {
  const { currentStep, dispatch } = useWizard();
  // currentStep is 1-based, subtract 1 for array index
  const index = Math.max(0, Math.min(steps.length - 1, currentStep - 1));
  const StepComponent = steps[index];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <StepComponent />
        <div className="flex justify-center mt-6">
          {currentStep > 1 && (
            <button
              onClick={() => dispatch({ type: "SET_STEP", payload: currentStep - 1 })}
              className="button-secondary"
            >
              Atrás
            </button>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
