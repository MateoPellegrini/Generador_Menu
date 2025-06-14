import { useWizard } from "../context/WizardContext";
import { useRef, useState } from "react";
import html2pdf from "html2pdf.js";

export default function Step4Preview() {
  const { design, categories, dispatch } = useWizard();
  const [loading, setLoading] = useState(false);
  const cartaRef = useRef();

  const avanzar = () => {
    dispatch({ type: "SET_STEP", payload: 5 });
  };

  const descargarPDF = () => {
    const element = cartaRef.current;
    if (!element) return;

    // Guardamos estilos previos
    const prevStyles = {
      width: element.style.width,
      minHeight: element.style.minHeight,
      margin: element.style.margin,
    };
    setLoading(true);
    
    // Ajustamos A4
    element.style.width = "210mm";
    element.style.minHeight = "297mm";
    element.style.margin = "0";

    const opt = {
      margin: 0,
      filename: "carta_digital.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    setTimeout(() => {
      html2pdf()
        .set(opt)
        .from(element)
        .toPdf()
        .get("pdf")
        .then((pdf) => {
          // Si hay más de una página, borramos las extras
          const total = pdf.internal.getNumberOfPages();
          for (let i = total; i > 1; i--) {
            pdf.deletePage(i);
          }
        })
        .save() // guarda ya sin las páginas extras
        .finally(() => {
          setLoading(false);

          // Revertimos los estilos para la UI
          element.style.width = prevStyles.width;
          element.style.minHeight = prevStyles.minHeight;
          element.style.margin = prevStyles.margin;
        });
    }, 50);
  };

  const fontClass = {
    sans: "font-sans",
    serif: "font-serif",
    mono: "font-mono",
  }[design.font];

  return (
    <div className="relative space-y-6 overflow-hidden">
      {loading && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-white">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-800 mb-4">Generando tu PDF…</p>
          </div>
        </div>
      )}

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
          disabled={loading}
          className="bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Descargar PDF
        </button>

        <button
          onClick={avanzar}
          disabled={loading}
          className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Siguiente: Subir a Drive
        </button>
      </div>
    </div>

  );
}
