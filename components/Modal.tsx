"use client";

import { Dialog, DialogOverlay, DialogContent } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";

export default function Modal({children, title} : {children: React.ReactNode, title: string}) {
    const router = useRouter();

    const handleOpenChange = () => {
        router.back();
    }

    return (
        <Dialog defaultOpen={true} open={true} onOpenChange={handleOpenChange}>
            <DialogOverlay />
            <DialogContent>
                <DialogTitle style={{height: "fit-content"}} className="c-white t-16 tw-600 w-100 p-x-32 p-y-24">{title}</DialogTitle>
                {children}
            </DialogContent>
        </Dialog>
    )
}