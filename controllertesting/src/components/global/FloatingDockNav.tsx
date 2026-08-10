import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import { 
  Gamepad2, 
  Mouse, 
  Keyboard, 
  Activity, 
  Gauge, 
  Stethoscope 
} from "lucide-react";

export default function FloatingDockNav() {
  const links = [
    {
      title: "Full Diagnostic",
      icon: (
        <Stethoscope className="h-full w-full text-blue-500 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
      ),
      href: "/test/controller/full-diagnostic",
    },
    {
      title: "PS5 Tester",
      icon: (
        <Gamepad2 className="h-full w-full text-indigo-500 drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
      ),
      href: "/test/controller/ps5",
    },
    {
      title: "Xbox Tester",
      icon: (
        <Gamepad2 className="h-full w-full text-green-500 drop-shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
      ),
      href: "/test/controller/xbox",
    },
    {
      title: "Stick Drift",
      icon: (
        <Activity className="h-full w-full text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
      ),
      href: "/test/controller/drift",
    },
    {
      title: "Polling Rate",
      icon: (
        <Gauge className="h-full w-full text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
      ),
      href: "/test/controller/polling-rate",
    },
    {
      title: "Mouse Test",
      icon: (
        <Mouse className="h-full w-full text-pink-500 drop-shadow-[0_0_8px_rgba(236,72,153,0.5)]" />
      ),
      href: "/test/mouse",
    },
    {
      title: "Keyboard Test",
      icon: (
        <Keyboard className="h-full w-full text-teal-400 drop-shadow-[0_0_8px_rgba(45,212,191,0.5)]" />
      ),
      href: "/test/keyboard",
    },
  ];
  return (
    <div className="flex items-center justify-center w-full py-4">
      {/* We pass a custom class to adapt the dock to the dark UI of ControllerTesting */}
      <FloatingDock 
        items={links} 
        desktopClassName="bg-surface-1 border border-surface-2 shadow-2xl backdrop-blur-xl dark:bg-transparent"
        mobileClassName="translate-y-0"
      />
    </div>
  );
}
