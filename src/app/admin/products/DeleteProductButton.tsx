"use client";

/**
 * DeleteProductButton.tsx
 * -----------------------
 * Renders a <form> that submits to deleteProductAction via a Server Action.
 * Uses useTransition so the button shows a pending state.
 *
 * Why a Client Component?
 * The delete action needs a native confirm() dialog which requires JS.
 * The form approach keeps it progressively enhanced and avoids API routes.
 */

import { useTransition } from "react";
import { deleteProductAction } from "./actions";

type Props = { id: number; name: string };

export default function DeleteProductButton({ id, name }: Props) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;

    startTransition(async () => {
      const result = await deleteProductAction(id);
      if (!result.success) {
        alert(result.errors._form?.join(". ") ?? "Failed to delete product.");
      }
    });
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="text-sm text-red-600 hover:underline disabled:opacity-50"
      type="button"
    >
      {isPending ? "Deleting…" : "Delete"}
    </button>
  );
}
