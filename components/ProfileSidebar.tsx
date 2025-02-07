import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/app/providers/AuthProvider";
import { motion } from "framer-motion";
import Link from "next/link";

const navigationLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/dashboard/ideas", label: "Saved Ideas" },
];

type ProfileSidebarProps = {
  toggleSidebar: () => void;
};

const menuVariants = {
  open: { x: 0 },
  closed: { x: "100%" },
};

const ProfileSidebar = ({ toggleSidebar }: ProfileSidebarProps) => {
  const auth = useAuth();

  return (
    <motion.div
      variants={menuVariants}
      initial="closed"
      animate="open"
      exit="closed"
      transition={{ duration: 0.3, type: "tween", ease: "easeInOut" }}
      className="fixed p-4 right-0 top-0 h-screen bg-background w-64 shadow-2xl z-50"
    >
      <div className="flex justify-between items-center">
        <p className="text-foreground text-3xl font-semibold">Menu</p>
        <Button variant="ghost" onClick={toggleSidebar} className="p-4">
          <FontAwesomeIcon icon={faArrowRight} />
        </Button>
      </div>

      <div className="mt-8">
        {navigationLinks.map((link) => (
          <Link key={link.href} href={link.href} className="block p-2 text-lg">
            {link.label}
          </Link>
        ))}
      </div>

      <Button
        variant="destructive"
        onClick={() => auth?.signOut()}
        className="w-full text-left mt-4"
      >
        Sign Out
      </Button>
    </motion.div>
  );
};

export default ProfileSidebar;
