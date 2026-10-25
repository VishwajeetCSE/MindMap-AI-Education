"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import type { ToastData } from "./use-toast";

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-4 pr-8 shadow-lg transition-all data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-80 data-[state=open]:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border-zinc-800 bg-zinc-900 text-zinc-100",
        destructive:
          "border-red-900/50 bg-red-950 text-red-100",
        success:
          "border-emerald-900/50 bg-emerald-950 text-emerald-100",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface ToastProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof toastVariants> {
  toast: ToastData;
  onDismiss: (id: string) => void;
}

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ className, toast: toastData, variant, onDismiss, ...props }, ref) => {
    const resolvedVariant = toastData.variant ?? variant ?? "default";

    return (
      <div
        ref={ref}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        data-state="open"
        className={cn(toastVariants({ variant: resolvedVariant }), className)}
        {...props}
      >
        <div className="grid gap-1">
          {toastData.title && (
            <div className="text-sm font-semibold">{toastData.title}</div>
          )}
          {toastData.description && (
            <div className="text-sm opacity-90">{toastData.description}</div>
          )}
        </div>
        <button
          type="button"
          onClick={() => onDismiss(toastData.id)}
          className="absolute right-2 top-2 rounded-md p-1 text-zinc-400 opacity-0 transition-opacity hover:text-zinc-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 group-hover:opacity-100"
          aria-label="Dismiss notification"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }
);
Toast.displayName = "Toast";

export { Toast, toastVariants };
