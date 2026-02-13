"use client";

import GlassMorphCard from "./GlassMorphCard";
import GradientContainer from "./GradientContainer";
import ShimmerLoader from "./ShimmerLoader";
import BlurContainer from "./BlurContainer";
import Badge from "./Badge";
import Tag from "./Tag";
import RibbonLabel from "./RibbonLabel";
import FloatingLabel from "./FloatingLabel";
import EmptyStateView from "./EmptyStateView";
import ErrorStateView from "./ErrorStateView";

export default function VisualDecorationComponents() {
  return (
    <div className="space-y-5">
      <GlassMorphCard />
      <GradientContainer />
      <ShimmerLoader variant="line" />
      <ShimmerLoader variant="card" />
      <ShimmerLoader variant="avatar-line" />
      <BlurContainer />
      <div className="flex gap-2">
        <Badge />
        <Tag />
        <RibbonLabel />
      </div>
      <FloatingLabel />
      <EmptyStateView />
      <ErrorStateView />
    </div>
  );
}
