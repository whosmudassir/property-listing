import PropertySearchClient from "@/components/client/PropertySearchClient";
import { Suspense } from "react";

export default function PropertySearchPage() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <PropertySearchClient />
      </Suspense>
    </div>
  );
}
