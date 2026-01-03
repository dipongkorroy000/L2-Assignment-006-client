import {Card, CardHeader, CardTitle, CardContent} from "@/components/ui/card";

export default function HowItWorksPage() {
  return (
    <section className="container mx-auto 2xl:py-20 xl:py-16 lg:py-12 py-10 2xl:space-y-10 space-y-8">
      <div className="2xl:space-y-5 xl:space-y-3 lg:space-y-2 space-y-1 text-center">
        <h1 className="2xl:text-4xl xl:text-3xl lg:text-2xl md:text-xl text-lg font-extrabold">How Our Parcel Delivery Works</h1>
        <p className="text-muted-foreground text-balance 2xl:text-lg text-sm">
          We make sending and receiving parcels simple, secure, and fast. Here’s the step‑by‑step process.
        </p>
      </div>

      <div className="grid xl:gap-8 gap-5 sm:grid-cols-2 lg:grid-cols-4 max-md:mx-10">
        {/* Step 1 */}
        <Card className="shadow-sm xl:gap-3 md:gap-2 gap-1">
          <CardHeader>
            <CardTitle className="xl:text-xl text-lg font-semibold">1. Book Your Delivery</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm sm:text-base">
            Enter pickup and drop‑off details, choose delivery speed, and confirm your booking.
          </CardContent>
        </Card>

        {/* Step 2 */}
        <Card className="shadow-sm xl:gap-3 md:gap-2 gap-1">
          <CardHeader>
            <CardTitle className="xl:text-xl text-lg font-semibold">2. Pickup</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm sm:text-base">
            Our courier collects your parcel from your doorstep or chosen location.
          </CardContent>
        </Card>

        {/* Step 3 */}
        <Card className="shadow-sm xl:gap-3 md:gap-2 gap-1">
          <CardHeader>
            <CardTitle className="xl:text-xl text-lg font-semibold">3. Tracking</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm sm:text-base">
            Track your parcel in real‑time with live updates until it reaches its destination.
          </CardContent>
        </Card>

        {/* Step 4 */}
        <Card className="shadow-sm xl:gap-3 md:gap-2 gap-1">
          <CardHeader>
            <CardTitle className="xl:text-xl text-lg font-semibold">4. Delivery</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm sm:text-base">
            Your parcel is safely delivered, and you receive instant confirmation.
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
