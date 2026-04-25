import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ErrorState } from "./ErrorState";

describe("ErrorState", () => {
    it("renders the default message when none is provided", () => {
        render(<ErrorState />);
        expect(
            screen.getByText("Something went wrong. Please try again."),
        ).toBeInTheDocument();
    });

    it("renders a custom message when provided", () => {
        render(<ErrorState message="No devices found" />);
        expect(screen.getByText("No devices found")).toBeInTheDocument();
    });
});
