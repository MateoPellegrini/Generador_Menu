import { useWizard } from "../context/WizardContext";
import { QRCodeCanvas } from "qrcode.react";
import { useRef } from "react";

export default function Step6GenerateQR() {
  const { driveLink } = useWizard();
  const qrRef = useRef(null);

    console.log(driveLink);

  const descargarQR = () => {
    const canvas = qrRef.current.querySelector("canvas");
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = "codigo_qr_carta.png";
    a.click();
  };

  return (
    <div className="text-center space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">¡Tu QR está listo!</h2>

      <p className="text-gray-600">Este QR abre tu carta desde el enlace que cargaste:</p>

      <div ref={qrRef} className="inline-block p-4 bg-white rounded-xl shadow mb-4">
        <QRCodeCanvas
          value={driveLink}
          size={220}
          bgColor="#ffffff"
          fgColor="#000000"
          level="H"
        />
      </div>

      {/* Aquí va el botón debajo del QR */}
      <div className="mt-4">
        <button
          onClick={descargarQR}
          className="bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition"
        >
          Descargar QR
        </button>
      </div>

      <p className="mt-4 text-sm text-gray-500">
        Ahora podés imprimirlo, compartirlo o pegarlo donde quieras 📌
      </p>
    </div>
  );
}
