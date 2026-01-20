import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/server/better-auth/client";
import { clientUrls } from "@/utils/urls";

import type { User } from "better-auth";

type Props = {
  user: User;
};

export const AccountDropdown: React.FC<Props> = ({ user }) => {
  const router = useRouter();

  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true);
      await authClient.signOut();
      router.refresh();
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <span className="max-w-36 truncate">{user.name}</span>
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href={clientUrls.resumes}>My Resumes</Link>
          </DropdownMenuItem>
          {/* <DropdownMenuItem disabled>Settings</DropdownMenuItem> */}
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleSignOut} disabled={isSigningOut}>
            Sign out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
