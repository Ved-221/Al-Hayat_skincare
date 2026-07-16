/**
 * /admin/products/[id]/edit — Edit Product (Server Component shell)
 * -----------------------------------------------------------------
 * Fetches the product by numeric id from Supabase, pre-fills ProductForm,
 * and binds updateProductAction to that id.
 *
 * Route: /admin/products/123/edit
 */

import { requireAdmin } from "@/lib/auth";
import { getAdminProductById } from "@/services/adminProductService";
import { updateProductAction } from "../../actions";
import ProductForm from "../../ProductForm";
import Link from "next/link";
import { notFound } from "next/navigation";

export const metadata = { title: "Edit Product — Admin | AL-HAYAT" };

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: Props) {
  await requireAdmin();

  const { id: idStr } = await params;
  const id = parseInt(idStr, 10);

  if (isNaN(id)) notFound();

  let product;
  try {
    product = await getAdminProductById(id);
  } catch {
    notFound();
  }

  // Bind only the product id — leaves (prevState, formData) for useActionState.
  // updateProductAction signature: (id, prevState, formData)
  // After bind: (prevState, formData) — exactly what useActionState expects.
  const boundAction = updateProductAction.bind(null, id);

  return (
    <div className="p-8">
      {/* Breadcrumb */}
      <nav className="mb-4 flex items-center gap-2 text-sm text-gray-500">
        <Link href="/admin" className="hover:text-gray-800">
          Dashboard
        </Link>
        <span>/</span>
        <Link href="/admin/products" className="hover:text-gray-800">
          Products
        </Link>
        <span>/</span>
        <span className="text-gray-900">Edit #{product.id}</span>
      </nav>

      <h1 className="mb-6 text-2xl font-bold text-gray-900">
        Edit: {product.name}
      </h1>

      <ProductForm
        action={boundAction}
        defaultValues={product}
        submitLabel="Update Product"
      />
    </div>
  );
}
