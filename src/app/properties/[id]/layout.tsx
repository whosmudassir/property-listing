// app/properties/[id]/layout.tsx
export default function PropertyDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="p-4 bg-white shadow-sm rounded-md">
      <h2 className="text-2xl font-semibold border-b pb-2 mb-4">
        Property Details
      </h2>
      {children}
    </div>
  );
}
