import { Card } from "./ui/card";

export const ItemFrame: React.FC<{
  onClick: () => void;
  children: React.ReactNode;
}> = ({ onClick, children }) => {
  return (
    <Card className="w-[160px] h-[160px] cursor-pointer" onClick={onClick}>
      {children}
    </Card>
  );
};
