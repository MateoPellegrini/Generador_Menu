import { useWizard } from "../context/WizardContext";

export default function Step1Welcome() {
  const { dispatch } = useWizard();

  const avanzar = () => {
    dispatch({ type: "SET_STEP", payload: 2 });
  };

  return (
    <div className="text-center space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Bienvenido</h1>
      <p className="text-gray-600">
        Creá tu carta digital paso a paso y generá un código QR listo para imprimir.
      </p>
      <button
        onClick={avanzar}
        className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition"
      >
        Comenzar
      </button>
    </div>
  );
}
