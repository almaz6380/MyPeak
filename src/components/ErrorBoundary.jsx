import { Component } from 'react';

// Auffangnetz: Ein JS-Fehler irgendwo in der App führt sonst zu einer
// dauerhaft weißen Seite ohne jeden Hinweis.
export default class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('App crashed:', error, info?.componentStack);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    const de = (localStorage.getItem('language') || 'de') === 'de';
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center gap-4 p-6 text-center">
        <img src="/fullrep-icon-v2.svg" alt="FullRep" className="w-20 h-20 opacity-60" />
        <h1 className="text-xl font-bold text-white">
          {de ? 'Ups — etwas ist schiefgelaufen' : 'Oops — something went wrong'}
        </h1>
        <p className="text-sm text-slate-400 max-w-xs">
          {de
            ? 'Die App ist auf einen Fehler gestoßen. Deine Daten sind sicher gespeichert.'
            : 'The app ran into an error. Your data is safely stored.'}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-2xl transition-colors"
        >
          {de ? 'App neu laden' : 'Reload app'}
        </button>
      </div>
    );
  }
}
