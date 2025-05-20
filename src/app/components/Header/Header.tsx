import Image from "next/image";
import NavLink from "./NavLink";
import "./styles.scss";
import { ChevronDown, User } from "lucide-react";
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import SearchInput from "./SearchInput";


export default function Header(){
  return(
    <header>
      <div className="logo-container">
        <Image src="/logo.png" alt="" width={201.5} height={125} />
      </div>
      <div className="actions-container">
        <SearchInput />
        <nav>
          <NavLink href="google.com" label="Google" isActive />
          <NavLink href="google.com" label="Google"/>
          <NavLink href="google.com" label="Google"/>
          
        </nav>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <User size={24} />
            <ChevronDown size={10} />

          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              teste
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {/* <DropdownMenu>
          <DropdownMenuTrigger>

          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu> */}
      </div>
    </header>
    
  )
}