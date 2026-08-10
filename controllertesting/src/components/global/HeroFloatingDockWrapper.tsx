import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconCrosshair,
  IconStethoscope,
  IconClick,
  IconAdjustments,
  IconGauge,
  IconCircleDashed,
  IconAward,
} from "@tabler/icons-react";

export default function HeroFloatingDockWrapper() {
  const tools = [
    {
      title: "Stick Drift Detector",
      useCase: "0.1% Axis Drift & Deadzone Calibration",
      icon: <IconCrosshair className="h-full w-full text-blue-400" />,
      href: "/test/controller/drift",
    },
    {
      title: "Full Diagnostic",
      useCase: "5-Step Automated Gamepad Health Checkup",
      icon: <IconStethoscope className="h-full w-full text-purple-400" />,
      href: "/test/controller/full-diagnostic",
    },
    {
      title: "Button Tester",
      useCase: "Face Button, D-Pad & Bumper Ghosting Check",
      icon: <IconClick className="h-full w-full text-emerald-400" />,
      href: "/test/controller/buttons",
    },
    {
      title: "Trigger Pressure",
      useCase: "Analog L2/R2 Linearity & Pressure Curve Test",
      icon: <IconAdjustments className="h-full w-full text-cyan-400" />,
      href: "/test/controller/triggers",
    },
    {
      title: "Polling Rate (Hz)",
      useCase: "Real-Time Input Report Frequency Timer",
      icon: <IconGauge className="h-full w-full text-amber-400" />,
      href: "/test/controller/polling-rate",
    },
    {
      title: "Circularity Test",
      useCase: "360° Outer Range Perimeter Boundary Audit",
      icon: <IconCircleDashed className="h-full w-full text-indigo-400" />,
      href: "/test/controller/circularity",
    },
    {
      title: "Health Score™",
      useCase: "0–100 Hardware Grade & Verification Report",
      icon: <IconAward className="h-full w-full text-pink-400" />,
      href: "/test/controller/health-score",
    },
  ];

  return (
    <div className="w-full flex flex-col items-center justify-center py-4 relative z-30">
      <FloatingDock items={tools} />
    </div>
  );
}
