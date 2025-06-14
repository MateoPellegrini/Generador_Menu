import { useWizard } from "../context/WizardContext";
import { useRef } from "react";
import html2pdf from "html2pdf.js";

export default function Step4Preview() {
  const { design, categories, dispatch } = useWizard();
  const cartaRef = useRef();

  const avanzar = () => {
    dispatch({ type: "SET_STEP", payload: 5 });
  };

  const descargarPDF = () => {
    const opt = {
      margin: 0.5,
      filename: "carta_digital.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf().set(opt).from(cartaRef.current).save();
  };

  const fontClass = {
    sans: "font-sans",
    serif: "font-serif",
    mono: "font-mono",
  }[design.font];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center text-gray-800">Vista previa de la carta</h2>

      <div
        ref={cartaRef}
        className={`shadow-md p-6 ${fontClass}`}
        style={{
          backgroundColor: design.colors.background,
          color: design.colors.text,
          border: `${design.borderWidth} solid ${design.colors.border}`,
          borderRadius: design.borderRadius,
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
            <h2 className="text-xl font-semibold mb-2 border-b pb-1">{cat.name}</h2>
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

      <div className="flex flex-col gap-4 md:flex-row md:justify-between">
        <button
          onClick={descargarPDF}
          className="bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition"
        >
          Descargar PDF
        </button>

        <button
          onClick={avanzar}
          className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition"
        >
          Siguiente: Subir a Drive
        </button>
      </div>
    </div>
  );
}
