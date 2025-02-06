import { useEffect, ComponentType } from "react";
import { useAuth } from "@/app/providers/AuthProvider";

const withAuth = (WrappedComponent: ComponentType<any>) => {
  const WithAuthComponent = (props: any) => {
    const { user } = useAuth() || {};

    useEffect(() => {
      if (!user) {
        window.location.href = "/";
      }
    }, [user]);

    if (!user) {
      return null;
    }

    return <WrappedComponent {...props} user={user} />;
  };

  WithAuthComponent.displayName = `WithAuth(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return WithAuthComponent;
};

export default withAuth;
