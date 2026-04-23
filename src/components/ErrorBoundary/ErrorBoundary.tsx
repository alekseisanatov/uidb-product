import { Component, type ErrorInfo, type ReactNode } from "react";
import { ErrorState } from "../ErrorState/ErrorState";

interface ErrorBoundaryProps {
    children: ReactNode;
    fallback?: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

export class ErrorBoundary extends Component<
    ErrorBoundaryProps,
    ErrorBoundaryState
> {
    state: ErrorBoundaryState = { hasError: false };

    static getDerivedStateFromError(): ErrorBoundaryState {
        return { hasError: true };
    }

    componentDidCatch(error: Error, info: ErrorInfo) {
        if (import.meta.env.DEV) {
            console.error("ErrorBoundary caught:", error, info);
        }
    }

    render() {
        if (this.state.hasError) {
            return (
                this.props.fallback ?? (
                    <ErrorState message="Something went wrong." />
                )
            );
        }
        return this.props.children;
    }
}
