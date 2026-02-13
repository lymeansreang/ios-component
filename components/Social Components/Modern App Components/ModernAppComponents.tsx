"use client";

import AvatarView from "./AvatarView";
import StoryCircle from "./StoryCircle";
import ReactionPicker from "./ReactionPicker";
import LikeButtonAnimated from "./LikeButtonAnimated";
import ExpandableText from "./ExpandableText";
import CommentInputBar from "./CommentInputBar";
import ImprovedImageCarousel from "./ImprovedImageCarousel";
import PhotoGalleryGrid from "./PhotoGalleryGrid";
import ChatInputToolbar from "./ChatInputToolbar";
import TypingIndicator from "./TypingIndicator";

export default function ModernAppComponents() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <AvatarView status="online" />
        <AvatarView status="away" />
        <AvatarView status="offline" />
      </div>

      <div className="flex gap-3 overflow-x-auto">
        <StoryCircle username="alex" />
        <StoryCircle username="mia" seen />
        <StoryCircle username="noah" />
        <StoryCircle username="ivy" seen />
      </div>

      <div className="flex flex-wrap gap-3">
        <ReactionPicker />
        <LikeButtonAnimated />
      </div>

      <ExpandableText text="This is a long social post example. It starts short and can be expanded with a Read more action so users can decide when to view full content without losing feed density." />

      <CommentInputBar />
      <ChatInputToolbar />
      <TypingIndicator />

      <ImprovedImageCarousel />
      <PhotoGalleryGrid />
    </div>
  );
}
