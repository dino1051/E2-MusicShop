import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  tieneError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { tieneError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { tieneError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("ErrorBoundary capturado: ", error, errorInfo.componentStack);
  }

  render() {
    if (this.state.tieneError) {
      return (
        this.props.fallback ?? (
          <div
            role="alert"
            className="p-6 text-center border border-red-200 bg-red-50 rounded-2xl"
          >
            <p className="text-lg font-bold text-red-600">Salió mal</p>
            <p className="text-sm text-slate-600 my-2">
              {this.state.error?.message}
            </p>
            <button
              type="button"
              onClick={() => this.setState({ tieneError: false, error: null })}
              className="px-4 py-2 bg-marca-600 text-white rounded-xl hover:bg-marca-700 transition font-medium"
            >
              Intentar de nuevo
            </button>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
