import { Component, type ErrorInfo, type ReactNode } from 'react';
import { BUSINESS_INFO } from '../config/business';
import { buildTelHref } from '../utils/commerce';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('Application render error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-[#0B132B] px-4 py-12 text-white">
          <div className="w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900/90 p-8 text-center shadow-2xl">
            <h1 className="font-display text-2xl font-bold text-white">{BUSINESS_INFO.name}</h1>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">
              Something went wrong while loading this page. Please reload, or contact our team
              directly by telephone.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-500"
              >
                Reload Page
              </button>
              {BUSINESS_INFO.phones.map((phone) => (
                <a
                  key={phone.id}
                  href={buildTelHref(phone.number)}
                  className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-slate-700 px-4 py-2.5 font-mono-tabular text-sm font-semibold text-white hover:border-blue-500"
                >
                  {phone.number}
                </a>
              ))}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
