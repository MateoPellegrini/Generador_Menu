import { useWizard } from "../context/WizardContext";
import { useState } from "react";

export default function Step2Design() {
  const { design, dispatch } = useWizard();
  const [formData, setFormData] = useState(design);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes("colors.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        colors: { ...prev.colors, [key]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleLogo = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, logo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const continuar = () => {
    dispatch({ type: "SET_DESIGN", payload: formData });
    dispatch({ type: "SET_STEP", payload: 3 });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 text-center">Personalizá tu carta</h2>

      <div className="space-y-4">
        <label className="block">
          <span className="text-gray-700">Título</span>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 mt-1"
            placeholder="Ej: Carta de Don Mateo"
          />
        </label>

        <label className="block">
          <span className="text-gray-700">Logo (opcional)</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleLogo}
            className="mt-1"
          />
        </label>

        <div className="flex gap-4">
          <label className="flex-1">
            <span className="text-gray-700">Color fondo</span>
            <input
              type="color"
              name="colors.background"
              value={formData.colors.background}
              onChange={handleChange}
              className="w-full h-10 p-0 border-none"
            />
          </label>
          <label className="flex-1">
            <span className="text-gray-700">Color texto</span>
            <input
              type="color"
              name="colors.text"
              value={formData.colors.text}
              onChange={handleChange}
              className="w-full h-10 p-0 border-none"
            />
          </label>
          <label className="flex-1">
            <span className="text-gray-700">Color bordes</span>
            <input
              type="color"
              name="colors.border"
              value={formData.colors.border}
              onChange={handleChange}
              className="w-full h-10 p-0 border-none"
            />
          </label>
        </div>

        <label className="block">
          <span className="text-gray-700">Tipografía</span>
          <select
            name="font"
            value={formData.font}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 mt-1"
          >
            <option value="sans">Sans Serif</option>
            <option value="serif">Serif</option>
            <option value="mono">Monoespaciada</option>
          </select>
        </label>
      </div>

      <button
        onClick={continuar}
        className="bg-blue-600 text-white w-full py-3 rounded-lg hover:bg-blue-700 transition"
      >
        Siguiente: Agregar productos
      </button>
    </div>
  );
}
