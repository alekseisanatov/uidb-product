import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Spinner } from "./Spinner";

const getInner = (container: HTMLElement): HTMLElement => {
    const wrapper = container.firstChild as HTMLElement;
    return wrapper.firstChild as HTMLElement;
};

describe("Spinner", () => {
    it("renders with default size of 32px", () => {
        const { container } = render(<Spinner />);
        const inner = getInner(container);
        expect(inner).toBeInTheDocument();
        expect(inner.style.width).toBe("32px");
        expect(inner.style.height).toBe("32px");
    });

    it("respects a custom size", () => {
        const { container } = render(<Spinner size={64} />);
        const inner = getInner(container);
        expect(inner.style.width).toBe("64px");
        expect(inner.style.height).toBe("64px");
    });
});
