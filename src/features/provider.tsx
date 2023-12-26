"use client";
import { configureStore } from "@reduxjs/toolkit";
import UserPopupReducer from "../features/UserPopup";
import NotificationPopupReducer from "../features/NotificationPopup";
import EventPopupReducer from "../features/EventPopup";
import RefetchEventsReducer from "../features/RefetchEvents";
import RefetchTodosReducer from "../features/RefetchTodos";
import EditEventReducer from "../features/EditEvent";
import SmallEditEventPopupReducer from "./SmallEditEventPopup";
import { Provider } from "react-redux";

const store = configureStore({
  reducer: {
    UserPopup: UserPopupReducer,
    NotificationPopup: NotificationPopupReducer,
    EventPopup: EventPopupReducer,
    RefetchEvents: RefetchEventsReducer,
    RefetchTodos: RefetchTodosReducer,
    EditEvent: EditEventReducer,
    SmallEditEventPopup: SmallEditEventPopupReducer,
  },
});

export function ReduxProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
