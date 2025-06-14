import { createContext, useContext, useReducer } from "react";

// Estado inicial de la carta
const initialState = {
  currentStep: 1,           // Paso actual del flujo
  design: {
    title: "",
    logo: null,
    colors: {
      background: "#ffffff",
      text: "#000000",
      border: "#cccccc",
    },
    font: "sans",
  },
  categories: [],           // [{ name: 'Bebidas', products: [...] }]
  driveLink: "",            // URL del PDF subido
};

// Reducer para modificar el estado
function wizardReducer(state, action) {
  switch (action.type) {
    case "SET_STEP":
      return { ...state, currentStep: action.payload };
    case "SET_DESIGN":
      return { ...state, design: { ...state.design, ...action.payload } };
    case "SET_CATEGORIES":
      return { ...state, categories: action.payload };
    case "ADD_CATEGORY":
      return { ...state, categories: [...state.categories, action.payload] };
    case "UPDATE_CATEGORY":
      return {
        ...state,
        categories: state.categories.map((cat, idx) =>
          idx === action.payload.index ? action.payload.data : cat
        ),
      };
    case "SET_DRIVE_LINK":
      return { ...state, driveLink: action.payload };
    case "RESET_ALL":
      return initialState;
    default:
      return state;
  }
}

// Crear contexto
const WizardContext = createContext();

// Hook para usarlo fácilmente
export function useWizard() {
  return useContext(WizardContext);
}

// Proveedor
export function WizardProvider({ children }) {
  const [state, dispatch] = useReducer(wizardReducer, initialState);

  return (
    <WizardContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WizardContext.Provider>
  );
}
