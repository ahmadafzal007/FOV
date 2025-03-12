import logo from "../../assets/Frame.svg";

export default function Navbar() {
  return (
    <nav className="w-full p-10 flex justify-center">
      <img src={logo || "/placeholder.svg"} alt="Logo" />
    </nav>
  );
}
