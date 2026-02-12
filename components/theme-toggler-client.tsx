"use client";

import { useEffect, useState } from "react";
import { ThemeTogglerButton } from "@/components/animate-ui/components/buttons/theme-toggler";

export default function ThemeTogglerClient() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return <ThemeTogglerButton size="lg" modes={["light", "dark"]} />;
}
