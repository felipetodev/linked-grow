// Ref: https://github.com/midday-ai/midday/blob/907c51954ac103b14d40a2712428d5e7af982c7d/apps/dashboard/src/components/theme-switch.tsx
"use client";

import { IconDeviceHeartMonitor, IconMoon, IconSun } from "@tabler/icons-react"
import { useTheme } from "next-themes";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Theme = "dark" | "system" | "light";

type Props = {
  currentTheme?: Theme;
};

const ThemeIcon = ({ currentTheme }: Props) => {
  switch (currentTheme) {
    case "dark":
      return <IconMoon size={12} />;
    case "system":
      return <IconDeviceHeartMonitor size={12} />;
    default:
      return <IconSun size={12} />;
  }
};

export const ThemeSwitch = () => {
  const { theme, setTheme, themes } = useTheme();

  return (
    <div className="flex items-center relative">
      <Select
        defaultValue={theme}
        onValueChange={(value: Theme) => setTheme(value)}
      >
        <SelectTrigger className="w-full pl-6 pr-3 py-1.5 bg-transparent outline-none capitalize h-[32px] text-xs rounded-sm">
          <SelectValue placeholder="Select theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {themes.map((theme) => (
              <SelectItem key={theme} value={theme} className="capitalize">
                {theme}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <div className="absolute left-2 pointer-events-none">
        <ThemeIcon currentTheme={theme as Theme} />
      </div>
    </div>
  );
};
