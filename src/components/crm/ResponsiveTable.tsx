import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface MobileCardProps {
  children: ReactNode;
  onClick?: () => void;
}

export function MobileCard({ children, onClick }: MobileCardProps) {
  return (
    <Card 
      className="border-border hover:shadow-sm transition-shadow lg:hidden cursor-pointer"
      onClick={onClick}
    >
      <CardContent className="p-4">
        {children}
      </CardContent>
    </Card>
  );
}

interface ResponsiveTableProps {
  desktopView: ReactNode;
  mobileView: ReactNode;
}

export function ResponsiveTable({ desktopView, mobileView }: ResponsiveTableProps) {
  return (
    <>
      <div className="hidden lg:block">{desktopView}</div>
      <div className="lg:hidden space-y-2">{mobileView}</div>
    </>
  );
}
