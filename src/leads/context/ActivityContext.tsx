import {
  createContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import type { ActivityState } from "../domain/activity-state.interface";
import type { Activity } from "../domain/activity.interface";

interface ActivityContext extends ActivityState {
  addActivity: (activity: Omit<Activity, "id" | "dateCreated">) => void;
  deleteActivity: (activityId: string) => void;
}

export const ActivityContext = createContext<ActivityContext>(
  {} as ActivityContext,
);

const getActivitiesFromLocalStorage = (): Activity[] => {
  const activities = localStorage.getItem("activities");
  return activities
    ? JSON.parse(activities).sort(
        (a: Activity, b: Activity) =>
          new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime(),
      )
    : [];
};

const getInitialState = (): ActivityState => {
  const activities = getActivitiesFromLocalStorage();
  return {
    activities,
  };
};

export const ActivityProvider = ({ children }: PropsWithChildren) => {
  const initialState = getInitialState();

  const [activities, setActivities] = useState(initialState.activities);

  const addActivity = (activity: Omit<Activity, "id" | "dateCreated">) => {
    //add activity as last created
    const newActivity: Activity = {
      ...activity,
      id: crypto.randomUUID(),
      dateCreated: new Date().toISOString(),
    };
    setActivities((prevState) => [newActivity, ...prevState]);
  };

  const deleteActivity = (activityId: string) => {
    // Implementation to delete activity
    setActivities((prevState) =>
      prevState.filter((activity) => activity.id !== activityId),
    );
  };

  useEffect(() => {
    localStorage.setItem("activities", JSON.stringify(activities));
  }, [activities]);

  return (
    <ActivityContext
      value={{
        activities,
        addActivity,
        deleteActivity,
      }}
    >
      {children}
    </ActivityContext>
  );
};
