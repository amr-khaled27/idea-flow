import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/app/providers/AuthProvider";
import { motion } from "framer-motion";

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

      <div className="p-4">
        <Button
          variant="outline"
          onClick={() => auth?.signOut()}
          className="w-full text-left"
        >
          Sign Out
        </Button>
      </div>
    </motion.div>
  );
};

export default ProfileSidebar;
