"use client";

import * as React from "react";

export type ToastVariant = "default" | "destructive" | "success";

export interface ToastData {
  id: string;
  title?: string;
  description?: string;
  variant?: ToastVariant;
}

const TOAST_LIMIT = 5;
const TOAST_REMOVE_DELAY = 5000;

type ToastAction =
  | { type: "ADD_TOAST"; toast: ToastData }
  | { type: "DISMISS_TOAST"; toastId: string }
  | { type: "REMOVE_TOAST"; toastId: string };

let count = 0;

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

function addToRemoveQueue(toastId: string, dispatch: React.Dispatch<ToastAction>) {
  if (toastTimeouts.has(toastId)) {
    return;
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({ type: "REMOVE_TOAST", toastId });
  }, TOAST_REMOVE_DELAY);

  toastTimeouts.set(toastId, timeout);
}

function reducer(state: ToastData[], action: ToastAction): ToastData[] {
  switch (action.type) {
    case "ADD_TOAST":
      return [action.toast, ...state].slice(0, TOAST_LIMIT);

    case "DISMISS_TOAST":
      return state.filter((t) => t.id !== action.toastId);

    case "REMOVE_TOAST":
      return state.filter((t) => t.id !== action.toastId);

    default:
      return state;
  }
}

// Global listeners for external `toast()` calls
const listeners: Array<(toast: ToastData) => void> = [];

function subscribe(listener: (toast: ToastData) => void) {
  listeners.push(listener);
  return () => {
    const index = listeners.indexOf(listener);
    if (index > -1) {
      listeners.splice(index, 1);
    }
  };
}

export function toast(props: Omit<ToastData, "id">) {
  const id = genId();
  const toastData: ToastData = { ...props, id };
  listeners.forEach((listener) => listener(toastData));
  return id;
}

export function useToast() {
  const [toasts, dispatch] = React.useReducer(reducer, []);

  React.useEffect(() => {
    return subscribe((newToast) => {
      dispatch({ type: "ADD_TOAST", toast: newToast });
    });
  }, []);

  // Auto-dismiss toasts after delay
  React.useEffect(() => {
    toasts.forEach((t) => {
      addToRemoveQueue(t.id, dispatch);
    });
  }, [toasts]);

  const dismiss = React.useCallback((toastId: string) => {
    dispatch({ type: "DISMISS_TOAST", toastId });
  }, []);

  return {
    toasts,
    dismiss,
    toast,
  };
}
