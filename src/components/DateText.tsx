"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

const getClientDate = () =>
    new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full",
    });

const getServerDate = () => "";

const DateText = () => {
    const date = useSyncExternalStore(subscribe, getClientDate, getServerDate);

    return <span suppressHydrationWarning>{date}</span>;
};

export default DateText;