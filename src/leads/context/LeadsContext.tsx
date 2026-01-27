import {
  createContext,
  useEffect,
  useReducer,
  type PropsWithChildren,
} from "react";
import type { Lead } from "../domain/lead.interfact";
import type { LeadsState } from "../domain/leads-state.interface";
import { leadsReducer } from "../reducer/leadsReducer";

interface LeadsContext extends LeadsState {
  //methods
  addLead: (lead: Omit<Lead, "id" | "dateAdded">) => void;
  updateLead: (leadId: string, leadData: Partial<Lead>) => void;
  setLeads: (leads: Lead[]) => void;
  deleteLead: (leadId: string) => void;
}

export const LeadsContext = createContext<LeadsContext>({} as LeadsContext);

const getLeadsFromLocalStorage = (): Lead[] => {
  const leads = localStorage.getItem("leads");
  return leads ? JSON.parse(leads) : [];
};

const getInitialState = (): LeadsState => {
  const leads = getLeadsFromLocalStorage();
  return {
    leads,
    leadsCount: leads.length,
    newLeadsCount: leads.filter((lead) => lead.status === "NEW").length,
    qualifiedLeadsCount: leads.filter((lead) => lead.status === "QUALIFIED")
      .length,
  };
};

export const LeadsProvider = ({ children }: PropsWithChildren) => {
  const initialState = getInitialState();

  const [state, dispatch] = useReducer(leadsReducer, initialState);

  const addLead = (lead: Omit<Lead, "id" | "dateAdded">) => {
    dispatch({ type: "ADD_LEAD", payload: lead });
  };

  const deleteLead = (leadId: string) => {
    dispatch({ type: "DELETE_LEAD", payload: leadId });
  };

  const updateLead = (leadId: string, leadData: Partial<Lead>) => {
    dispatch({
      type: "UPDATE_LEAD",
      payload: { id: leadId, leadData },
    });
  };

  const setLeads = (leads: Lead[]) => {
    dispatch({ type: "SET_LEADS", payload: leads });
  };

  useEffect(() => {
    localStorage.setItem("leads", JSON.stringify(state.leads));
  }, [state.leads]);

  return (
    <LeadsContext
      value={{
        ...state,
        addLead,
        updateLead,
        setLeads,
        deleteLead,
      }}
    >
      {children}
    </LeadsContext>
  );
};
