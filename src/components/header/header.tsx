import "./header.css";

type HeaderProps = {
  className?: string;
  children: React.ReactNode;
};

export const Header = ({ className, children }: HeaderProps) => {
  return <div className={["header", className].join(" ")}>{children}</div>;
};
