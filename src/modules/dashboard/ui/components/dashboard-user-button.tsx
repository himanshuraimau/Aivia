import { authClient } from "@/lib/auth-client";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarImage } from "@/components/ui/avatar";

export const DashboardUserButton = () => {
    const { data, isPending } = authClient.useSession();


    if (isPending) {
        return (
            <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">Loading...</span>
            </div>
        );
    }
    if (!data) {
        return (
            <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">Not logged in</span>
            </div>
        );
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="rounded-lg border border-border/10 p-3 w-full flex
        items-center justify-between bg-white/5 hover:bg-white/10
        overflow-hidden">
                {
                    data.user.image ? (
                        <Avatar>
                            <AvatarImage />
                        </Avatar>
                    ) :
                        null
                }
            </DropdownMenuTrigger>
        </DropdownMenu>
    );
}