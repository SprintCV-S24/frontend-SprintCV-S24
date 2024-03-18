import { Card } from "./ui/card";

export const ItemFrame: React.FC<{
  onClick: () => void;
  children: React.ReactNode;
}> = ({ onClick, children }) => {
  return (
    <Card className="w-[150px] h-[150px] cursor-pointer" onClick={onClick}>
      {children}
    </Card>
  );
};
