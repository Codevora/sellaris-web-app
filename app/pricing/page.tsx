// app/pricing/page.tsx
import PricingWrapper from "@/components/layouts/PricingWrapper";

export default function PricingPage() {
 return (
  <main className="container mx-auto px-4 py-8">
   <h1 className="text-3xl font-bold text-center mb-8">Our Pricing Plans</h1>
   <PricingWrapper />
  </main>
 );
}
