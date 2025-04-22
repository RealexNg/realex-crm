"use client";
import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useGetProducts } from "./api-services/products-api";
import { useCartStore } from "./store/cart-store";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import {
  PackageSearch,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

function AdvertComponentContent() {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 0;
  const { data, isLoading } = useGetProducts(currentPage);
  const { addItem } = useCartStore();
  // console.log(data, "data");
  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    window.history.pushState({}, "", `?${params.toString()}`);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-4 space-y-4">
      <Link
        href="/crm"
        className={buttonVariants({ variant: "outline", size: "icon" })}
      >
        <ArrowLeft className="h-4 w-4" />
      </Link>
      {!data || data.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
          <PackageSearch className="h-16 w-16 text-gray-400" />
          <h3 className="text-xl font-semibold text-gray-600">
            No Products Found
          </h3>
          <p className="text-gray-500">
            There are no products available at the moment.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map((product) => (
            <div key={product.id} className="border rounded-lg p-4">
              <div className="relative h-48 mb-4">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-gray-600">₦{product.price.toLocaleString()}</p>
              <Button onClick={() => addItem(product)} className="mt-2 w-full">
                Add to Cart
              </Button>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-center gap-2 mt-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 0}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={!data || data.length === 0}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export default function AdvertComponent() {
  return (
    <Suspense fallback={null}>
      <AdvertComponentContent />
    </Suspense>
  );
}
