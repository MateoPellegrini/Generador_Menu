import { useWizard } from "../context/WizardContext";
import { useState } from "react";

export default function Step2Design() {
  const { design, dispatch } = useWizard();
  const [formData, setFormData] = useState(design);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "template") {
      if (value === "") {
        setFormData(prev => ({ ...prev, template: "" }));
      } else {
        const preset = PRESET_STYLES[value];
        setFormData(prev => ({
          ...prev,
          template: value,
          ...preset,
        }));
      }
    } else if (name.includes("colors.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        colors: { ...prev.colors, [key]: value },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
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

  const isTemplateSelected = formData.template !== "";

  // Añadilo en Step2Design.jsx, justo antes de los pickers de color
  const presets = [
    { id: '', name: 'Ninguno', preview: '/assets/presets/none.png' },
    { id: 'minimal', name: 'Minimal', preview: '/assets/presets/minimal.png' },
    { id: 'classic', name: 'Clásico', preview: '/assets/presets/classic.png' },
    { id: 'fancy', name: 'Elegante', preview: '/assets/presets/fancy.png' },
  ];

  const PRESET_STYLES = {
    minimal: {
      colors: { background: '#ffffff', text: '#111111', border: '#dddddd' },
      font: 'sans',
      borderWidth: '1px',
      borderRadius: '0.25rem',
    },
    classic: {
      colors: { background: '#faf5e6', text: '#333333', border: '#cccccc' },
      font: 'serif',
      borderWidth: '2px',
      borderRadius: '0.5rem',
    },
    fancy: {
      colors: { background: '#f0f0f5', text: '#222222', border: '#aaaaaa' },
      font: 'serif',
      borderWidth: '4px',
      borderRadius: '1rem',
    },
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



        <label className="block">
          <span className="text-gray-700">Estilo de carta</span>
          <div className="flex gap-4 mt-2">
            {presets.map(p => (
              <div key={p.id} className="cursor-pointer text-center">
                <img
                  src={p.preview}
                  alt={p.name}
                  className={`w-24 h-24 object-cover rounded-lg border-2 
            ${formData.template === p.id
                      ? 'border-blue-600'
                      : 'border-transparent hover:border-gray-400'}`}
                  onClick={() => {
                    const preset = PRESET_STYLES[p.id];
                    setFormData(prev => ({
                      ...prev,
                      template: p.id,
                      ...preset
                    }));
                  }}
                />
                <p className="text-sm mt-1">{p.name}</p>
              </div>
            ))}
          </div>
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
              disabled={isTemplateSelected}
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
              disabled={isTemplateSelected}
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
              disabled={isTemplateSelected}
            />
          </label>
        </div>

        <label className="block">
          <span className="text-gray-700 mr-1">Grosor de bordes</span>
          <select
            name="borderWidth"
            value={formData.borderWidth}
            onChange={handleChange}
            className="input mt-1"
            disabled={isTemplateSelected}
          >
            <option value="1px">Delgado</option>
            <option value="2px">Medio</option>
            <option value="4px">Grueso</option>
          </select>
        </label>

        <label className="block">
          <span className="text-gray-700 mr-1">Radio de esquinas</span>
          <select
            name="borderRadius"
            value={formData.borderRadius}
            onChange={handleChange}
            className="input mt-1"
            disabled={isTemplateSelected}
          >
            <option value="0.25rem">Suave</option>
            <option value="0.5rem">Medio</option>
            <option value="1rem">Redondeado</option>
          </select>
        </label>

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
