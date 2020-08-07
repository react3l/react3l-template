import { RefObject } from "react";
import React from "react";
import { Subscription } from "rxjs";

export const commonWebService = {
    useClickOutside(ref: RefObject<HTMLDivElement>, callback: () => void) {
        const handleClickOutside = React.useCallback(
            (event) => {
                if (ref.current && !ref.current.contains(event.target)) {
                    if (typeof callback === "function") {
                        callback();
                    }
                }
            },
            [callback, ref],
        );

        React.useEffect(
            () => {
                document.addEventListener('mousedown', handleClickOutside);
                return function cleanup() {
                    document.removeEventListener("mousedown", handleClickOutside);
                };
            },
            [callback, handleClickOutside, ref],
        );
    },
};