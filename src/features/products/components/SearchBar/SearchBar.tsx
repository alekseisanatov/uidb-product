import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useStore } from "../../../../store/useStore";
import { SearchIcon } from "../../../../components/icons";
import {
    fetchDevices,
    DEVICES_QUERY_KEY,
    DEVICES_STALE_TIME,
} from "../../../../lib/api";
import type { T_Device } from "../../../../types/product";
import styles from "./SearchBar.module.css";

const MAX_SUGGESTIONS = 5;

function HighlightMatch({ text, query }: { text: string; query: string }) {
    const idx = text.toLowerCase().indexOf(query.toLowerCase());
    if (idx === -1) return <>{text}</>;
    return (
        <>
            {text.slice(0, idx)}
            <mark className={styles.highlight}>
                {text.slice(idx, idx + query.length)}
            </mark>
            {text.slice(idx + query.length)}
        </>
    );
}

export const SearchBar = () => {
    const { search, setSearch } = useStore();
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const wrapperRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const suggestionRefs = useRef<(HTMLLIElement | null)[]>([]);

    const { data: allDevices = [] } = useQuery({
        queryKey: DEVICES_QUERY_KEY,
        queryFn: fetchDevices,
        staleTime: DEVICES_STALE_TIME,
    });

    const suggestions = search.trim()
        ? allDevices
              .filter((d) => {
                  const q = search.toLowerCase();
                  return (
                      d.product?.name.toLowerCase().includes(q) ||
                      d.shortnames?.some((s) => s.toLowerCase().includes(q))
                  );
              })
              .slice(0, MAX_SUGGESTIONS)
        : [];

    const handleSelect = (device: T_Device) => {
        setSearch("");
        setIsOpen(false);
        navigate(`/devices/${device.id}`);
    };

    const handleWrapperBlur = (e: React.FocusEvent) => {
        if (!wrapperRef.current?.contains(e.relatedTarget as Node)) {
            setIsOpen(false);
        }
    };

    const handleInputKeyDown = (e: React.KeyboardEvent) => {
        if (!isOpen || suggestions.length === 0) return;
        if (e.key === "Tab" && !e.shiftKey) {
            e.preventDefault();
            suggestionRefs.current[0]?.focus();
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            suggestionRefs.current[0]?.focus();
        } else if (e.key === "Escape") {
            setIsOpen(false);
        }
    };

    const handleSuggestionKeyDown = (
        e: React.KeyboardEvent,
        index: number,
        device: T_Device,
    ) => {
        if (e.key === "Enter") {
            handleSelect(device);
        } else if (e.key === "Escape") {
            setIsOpen(false);
            inputRef.current?.focus();
        } else if (e.key === "ArrowDown" || (e.key === "Tab" && !e.shiftKey)) {
            e.preventDefault();
            const next = suggestionRefs.current[index + 1];
            if (next) {
                next.focus();
            } else {
                inputRef.current?.focus();
            }
        } else if (e.key === "ArrowUp" || (e.key === "Tab" && e.shiftKey)) {
            e.preventDefault();
            if (index === 0) {
                inputRef.current?.focus();
            } else {
                suggestionRefs.current[index - 1]?.focus();
            }
        }
    };

    return (
        <div
            ref={wrapperRef}
            className={styles.wrapper}
            aria-label="Search devices"
            onBlur={handleWrapperBlur}
        >
            <SearchIcon />
            <input
                ref={inputRef}
                className={styles.input}
                type="search"
                placeholder="Search"
                aria-label="Search devices"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onFocus={() => setIsOpen(true)}
                onKeyDown={handleInputKeyDown}
            />
            {isOpen && suggestions.length > 0 && (
                <ul className={styles.dropdown} role="listbox">
                    {suggestions.map((device, index) => (
                        <li
                            key={device.id}
                            ref={(el) => {
                                suggestionRefs.current[index] = el;
                            }}
                            className={styles.suggestion}
                            role="option"
                            tabIndex={0}
                            onMouseDown={(e) => {
                                e.preventDefault();
                                handleSelect(device);
                            }}
                            onKeyDown={(e) =>
                                handleSuggestionKeyDown(e, index, device)
                            }
                        >
                            <span>
                                <HighlightMatch
                                    text={device.product?.name ?? ""}
                                    query={search}
                                />
                            </span>
                            <span className={styles.shortname}>
                                {device.shortnames?.[0]}
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
