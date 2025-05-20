import Link from "next/link";

interface NavLinkProps{
  href: string;
  label: string;
  isActive?: boolean;
}

const NavLink = ({ href, label, isActive }: NavLinkProps) =>{
  return (
    <Link href={href} className={"nav-link" + (isActive ? ' active' : ' ')}>
      {label}
    </Link>
  );
}

export default NavLink;