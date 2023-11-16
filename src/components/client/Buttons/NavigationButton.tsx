"use client";
import { useRouter } from "next/navigation";
import React, { ReactNode, forwardRef } from "react";
import { Button } from "@/src/components/ui/button";

interface NavButtonProps {
  route?: string;
  text?: string;
  children?: ReactNode;
  action?: (...args: unknown[]) => void;
}

const NavButton = forwardRef<HTMLButtonElement, NavButtonProps>(
  (props, ref) => {
    const router = useRouter();

    const execute = () => {
      if (props.action) return props.action();
      if (props.route) return router.push(props.route);
    };

    return (
      <Button ref={ref} className="" onClick={execute}>
        {props.children}
      </Button>
    );
  }
);

NavButton.displayName = "NavButton";

export default NavButton;
