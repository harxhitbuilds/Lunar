import { FaGoogle } from "react-icons/fa";

import lunar from "@/assets/lunar.png";
import { Button } from "@/components/ui/button";
import useAuthStore from "@/stores/useAuthStore";

const Navbar = () => {
  const { signup, signingIn } = useAuthStore();

  const handleSignup = async () => {
    try {
      await signup();
    } catch (error) {
      console.log("Signup error:", error);
    }
  };

  return (
    <nav className="flex h-20 w-full items-center justify-between px-8 sm:px-16">
      <div className="flex items-center gap-2">
        <img src={lunar} alt="Lunar Logo" className="h-6 w-6 invert" />
        <h1 className="michroma mb-1 text-xl font-medium">Lunar</h1>
      </div>
      <div>
        <Button
          onClick={handleSignup}
          disabled={signingIn}
          className="flex items-center gap-2 rounded-full border border-zinc-600 bg-transparent py-3 text-white hover:bg-transparent"
        >
          <FaGoogle className="h-6 w-6" />
          <span>{signingIn ? "Signing In..." : "Sign In"}</span>
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
