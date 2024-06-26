import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { NavigationMenu } from "@/components/ui/navigation-menu";
import LogoImage from "../assets/sprintcv_logo.png";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <div className="w-full">
    <NavigationMenu className="drop-shadow-sm">
      <Link to="/">
        <img
          src={LogoImage}
          alt="mylogo"
          className="mr-4 h-[35px] w-[50px]"
        ></img>
      </Link>
      <Button className="mr-4" variant="secondary">
        <Link to="/">
          Home
        </Link>
      </Button>
    </NavigationMenu>
    </div>
  );
}
