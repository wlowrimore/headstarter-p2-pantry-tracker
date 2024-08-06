import { useSession } from "next-auth/react";
export function useExtractFirstName() {
  const { data: session } = useSession();
  if (session) {
    const firstName = session?.user?.name?.split(" ")[0];
    return firstName;
  } else {
    return null;
  }
}
