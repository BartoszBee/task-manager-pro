import type { ReactNode } from "react";
import { Component } from "react";

type Props = { children: ReactNode; fallback?: ReactNode };
type State = { hasError: boolean; message?: string };

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(err: unknown): State {
    return {
      hasError: true,
      message: err instanceof Error ? err.message : "Unknown error",
    };
  }

  componentDidCatch(error: unknown, info: unknown) {
    console.error("ErrorBoundary:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div style={{ maxWidth: 600, margin: "2rem auto", color: "#b91c1c" }}>
            <h2>Coś poszło nie tak</h2>
            <p>{this.state.message}</p>
            <button onClick={() => this.setState({ hasError: false })}>
              Spróbuj ponownie
            </button>
          </div>
        )
      );
    }
    return this.props.children;
  }
}
