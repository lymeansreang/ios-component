"use client";

import ProductCard from "./ProductCard";
import QuantitySelector from "./QuantitySelector";
import PriceSummaryView from "./PriceSummaryView";
import PromoCodeField from "./PromoCodeField";
import CheckoutProgressStepper from "./CheckoutProgressStepper";
import OrderStatusTimeline from "./OrderStatusTimeline";
import CartItemCell from "./CartItemCell";
import RatingReviewCard from "./RatingReviewCard";

export default function EcommerceComponents() {
  return (
    <div className="space-y-6">
      <ProductCard />
      <QuantitySelector />
      <PriceSummaryView />
      <PromoCodeField />
      <CheckoutProgressStepper />
      <OrderStatusTimeline />
      <CartItemCell />
      <RatingReviewCard />
    </div>
  );
}
