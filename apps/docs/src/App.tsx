import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { DocsSections } from './components/sections';

export function App() {
  return (
    <div
      className='mx-auto max-w-6xl rounded-3xl bg-white shadow-page'
      style={{ boxShadow: 'var(--shadow-page)' }}>
      <Header />
      <div className='flex items-start'>
        <Sidebar />
        <main className='min-w-0 flex-1 px-6 py-8 sm:px-10'>
          <DocsSections />
        </main>
      </div>
      <Footer />
    </div>
  );
}
