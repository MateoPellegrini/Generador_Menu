import { useWizard } from "../context/WizardContext";
import { useState } from "react";

export default function Step5UploadDrive() {
  const { dispatch } = useWizard();
  const [driveUrl, setDriveUrl] = useState("");

  const continuar = () => {
    if (!driveUrl.includes("https://")) {
      alert("Por favor ingresá un enlace válido de Google Drive.");
      return;
    }

    dispatch({ type: "SET_QR_LINK", payload: driveUrl });
    dispatch({ type: "SET_STEP", payload: 6 });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 text-center">Subí tu carta a Google Drive</h2>

      <ol className="list-decimal space-y-2 text-gray-700 px-4">
        <li>Descargá tu carta en formato PDF <em>(opcional por ahora)</em>.</li>
        <li>Subila a <strong>Google Drive</strong>.</li>
        <li>Hacé clic derecho en el archivo y elegí <strong>"Compartir"</strong>.</li>
        <li>Configurá el acceso como <strong>"Cualquiera con el enlace" y en modo lector</strong>.</li>
        <li>Copiá el enlace generado y pegalo acá abajo:</li>
      </ol>

      <input
        type="url"
        placeholder="https://drive.google.com/..."
        value={driveUrl}
        onChange={(e) => setDriveUrl(e.target.value)}
        className="w-full border rounded px-3 py-2"
      />

      <button
        onClick={continuar}
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
      >
        Generar QR
      </button>
    </div>
  );
}
