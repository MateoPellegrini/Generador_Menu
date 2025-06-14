import { useWizard } from "../context/WizardContext";
import { useState } from "react";

export default function Step3Products() {
  const { categories, dispatch } = useWizard();
  const [localCats, setLocalCats] = useState(categories);

  const agregarCategoria = () => {
    setLocalCats([
      ...localCats,
      { name: "", products: [{ name: "", price: "" }] },
    ]);
  };

  const actualizarCategoria = (index, field, value) => {
    const nuevas = [...localCats];
    nuevas[index][field] = value;
    setLocalCats(nuevas);
  };

  const actualizarProducto = (catIndex, prodIndex, field, value) => {
    const nuevas = [...localCats];
    nuevas[catIndex].products[prodIndex][field] = value;
    setLocalCats(nuevas);
  };

  const agregarProducto = (catIndex) => {
    const nuevas = [...localCats];
    nuevas[catIndex].products.push({ name: "", price: "" });
    setLocalCats(nuevas);
  };

  const continuar = () => {
    dispatch({ type: "SET_CATEGORIES", payload: localCats });
    dispatch({ type: "SET_STEP", payload: 4 });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 text-center">
        Agregá productos a tu carta
      </h2>

      {localCats.map((cat, i) => (
        <div
          key={i}
          className="border rounded-xl p-4 space-y-4 bg-gray-50 shadow-sm"
        >
          <input
            type="text"
            placeholder="Nombre de la categoría"
            value={cat.name}
            onChange={(e) => actualizarCategoria(i, "name", e.target.value)}
            className="w-full border rounded px-3 py-2"
          />

          {cat.products.map((prod, j) => (
            <div key={j} className="flex gap-2">
              <input
                type="text"
                placeholder="Nombre del producto"
                value={prod.name}
                onChange={(e) =>
                  actualizarProducto(i, j, "name", e.target.value)
                }
                className="flex-1 border rounded px-3 py-2"
              />
              <input
                type="number"
                placeholder="$"
                value={prod.price}
                onChange={(e) =>
                  actualizarProducto(i, j, "price", e.target.value)
                }
                className="w-24 border rounded px-3 py-2"
              />
            </div>
          ))}

          <button
            onClick={() => agregarProducto(i)}
            className="text-sm text-blue-600 hover:underline"
          >
            + Agregar producto
          </button>
        </div>
      ))}

      <div className="flex flex-col gap-4">
        <button
          onClick={agregarCategoria}
          className="bg-gray-200 rounded py-2 text-gray-800 hover:bg-gray-300"
        >
          + Agregar categoría
        </button>

        <button
          onClick={continuar}
          className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Siguiente: Vista previa
        </button>
      </div>
    </div>
  );
}
