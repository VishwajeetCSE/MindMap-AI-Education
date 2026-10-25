"use client";

import { useToast } from "./use-toast";
import { Toast } from "./toast";

export function Toaster() {
  const { toasts, dismiss } = useToast();

  return (
    <div
      className="fixed bottom-0 right-0 z-[100] flex max-h-screen w-full flex-col-reverse gap-2 p-4 sm:bottom-4 sm:right-4 sm:max-w-[420px]"
      aria-label="Notifications"
    >
      {toasts.map((t) => (
        <Toast key={t.id} toast={t} onDismiss={dismiss} />
      ))}
    </div>
  );
}

Toaster.displayName = "Toaster";
