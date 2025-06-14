import { useWizard } from "../context/WizardContext";

export default function Step4Preview() {
  const { design, categories, dispatch } = useWizard();

  const avanzar = () => {
    dispatch({ type: "SET_STEP", payload: 5 });
  };

  const fontClass = {
    sans: "font-sans",
    serif: "font-serif",
    mono: "font-mono",
  }[design.font];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center text-gray-800">
        Vista previa de la carta
      </h2>

      <div
        className={`rounded-xl shadow-md p-6 ${fontClass}`}
        style={{
          backgroundColor: design.colors.background,
          color: design.colors.text,
          border: `2px solid ${design.colors.border}`,
        }}
      >
        {design.logo && (
          <div className="flex justify-center mb-4">
            <img
              src={design.logo}
              alt="Logo"
              className="max-h-24 object-contain"
            />
          </div>
        )}

        <h1 className="text-3xl font-bold text-center mb-6">
          {design.title || "Mi Carta"}
        </h1>

        {categories.map((cat, i) => (
          <div key={i} className="mb-6">
            <h2 className="text-xl font-semibold mb-2 border-b pb-1">
              {cat.name}
            </h2>
            <ul className="space-y-1">
              {cat.products.map((prod, j) => (
                <li key={j} className="flex justify-between">
                  <span>{prod.name}</span>
                  <span>${prod.price}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <button
        onClick={avanzar}
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
      >
        Siguiente: Subir carta a Drive
      </button>
    </div>
  );
}
