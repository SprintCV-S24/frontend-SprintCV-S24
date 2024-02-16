import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link } from "react-router-dom";
import {
    NavigationMenu,
  } from "@/components/ui/navigation-menu"


export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <NavigationMenu>
        <Button className="mr-4" variant="secondary">
          <Link to="/">
          Home
          </Link>
        </Button>
        <Button className="mr-4" variant="secondary">Resumes</Button>
        <Button className="mr-4" variant="secondary">Items</Button>
        <Button className="mr-4" variant="secondary">
          <Link to="/editor">
          Open Editor
          </Link>
        </Button>
        <Button className="mr-4" variant="secondary">AI Generated</Button>
    </NavigationMenu>
  )
}