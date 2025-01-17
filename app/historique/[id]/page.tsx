"use client";

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function HistoriqueId() {
    const router = useRouter();

    useEffect(() => {
        router.push("/historique");
    }, [router]);

    return <></>;
}