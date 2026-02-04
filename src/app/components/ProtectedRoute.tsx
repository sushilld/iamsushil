"use client";

import React from "react";
import { Navigate } from "react-router";
import { storage } from "@/app/utils/storage";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const isAdmin = storage.isAdmin();

    if (!isAdmin) {
        return <Navigate to="/gallery" replace />;
    }

    return <>{children}</>;
}
