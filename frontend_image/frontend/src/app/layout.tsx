'use client';
import "./globals.css";
import React from "react";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import MainToolbar from "@/components/MainToolbar";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";

export default function RootLayout(
    {
        children,
    }: Readonly<{
        children: React.ReactNode;
    }>) {

    return (
        <html>
        <head>
            <title>Question</title>
            <meta httpEquiv="Pragma" content="no-cache"/>
            <meta httpEquiv="Expires" content="0"/>
        </head>
        <body>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <MainToolbar/>
            {children}
        </LocalizationProvider>
        </body>
        </html>
    );
}
