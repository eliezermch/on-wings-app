import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getUser } from "@/actions/auth";

export const AvatarProfile = async () => {
    const user = await getUser();
    return (
        <Link href="/me" className="flex items-center w-8 h-8 rounded-full overflow-hidden">
            <Avatar>
                <AvatarImage className="w-full h-full object-cover" src={user?.avatar} />
                <AvatarFallback>{user?.first_name?.charAt(0).toUpperCase() + user?.last_name?.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
        </Link>
    )
}