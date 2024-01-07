import Link from "next/link";

export default function Navbar() {
  return (
    <div>
      <Link href={"/"}>Home</Link>
      <Link href={"/login"}>login</Link>
      <Link href={"/register"}>register</Link>
    </div>
  );
}
