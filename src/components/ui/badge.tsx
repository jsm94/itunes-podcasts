import React from "react";

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  className?: string;
};

export const Badge = React.forwardRef<HTMLInputElement, BadgeProps>(
  ({ className, ...props }, ref) => {
    return (
      <span
        role="status"
        className={["badge", className].join(" ")}
        ref={ref}
        {...props}
      />
    );
  },
);

Badge.displayName = "Badge";
