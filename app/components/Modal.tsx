"use client";

import { useRouter } from "next/navigation";

export default function Modal({children} : {children: React.ReactNode}) {
    const router = useRouter();

    const handleOpenChange = () => {
        router.back();
    }
}