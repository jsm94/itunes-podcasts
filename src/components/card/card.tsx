import "./card.css";

type CardProps = {
  className?: string;
  children: React.ReactNode;
};

export const Card = ({ className, children }: CardProps) => {
  return <div className={["card", className].join(" ")}>{children}</div>;
};
