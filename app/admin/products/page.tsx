import { requireAdmin } from "@/lib/admin/auth"
import { getProducts } from "@/lib/content"
import { CollectionManager } from "@/components/admin/CollectionManager"

export const dynamic = "force-dynamic"

export default async function AdminProductsPage() {
  await requireAdmin()
  const products = await getProducts()

  return (
    <div>
      <h1 className="font-display text-3xl font-bold tracking-display">
        Shop products
      </h1>
      <p className="mt-1 text-sm text-ink-secondary dark:text-ink-ondark/60">
        Everything sold on the Shop page — prices are in US dollars.
      </p>
      <CollectionManager
        collection="products"
        itemName="product"
        titleKey="name"
        initial={products}
        newItem={{
          slug: "my-new-product",
          name: "",
          description: "",
          priceUsd: 4.99,
          kind: "template",
          image: "",
        }}
        fields={[
          { key: "name", label: "Name", type: "text" },
          {
            key: "slug",
            label: "Slug (URL)",
            type: "text",
            help: "Lowercase with dashes — unique for each product.",
          },
          { key: "description", label: "Description", type: "textarea" },
          { key: "priceUsd", label: "Price (USD)", type: "number" },
          {
            key: "kind",
            label: "Type",
            type: "select",
            options: ["template", "checklist", "mini-course"],
          },
          {
            key: "image",
            label: "Product photo",
            type: "image",
            optional: true,
          },
        ]}
      />
    </div>
  )
}
