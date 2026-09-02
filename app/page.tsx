'use client';

import React, { useState } from 'react';
import { LearningProvider, useLearning } from '@/context/LearningContext';
import { Navbar } from '@/components/Navbar';
import { LandingPage } from '@/components/LandingPage';
import { LearningDashboard } from '@/components/LearningDashboard';
import { ModuleViewer } from '@/components/ModuleViewer';
import { ProgressTrackerModal } from '@/components/ProgressTrackerModal';
import { Footer } from '@/components/Footer';

const AppContent: React.FC = () => {
  const { view } = useLearning();
  const [isProgressModalOpen, setIsProgressModalOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <Navbar onOpenProgress={() => setIsProgressModalOpen(true)} />

      <main className="flex-grow">
        {view === 'landing' && <LandingPage />}
        {view === 'learn' && <LearningDashboard onOpenProgress={() => setIsProgressModalOpen(true)} />}
        {view === 'module' && <ModuleViewer />}
      </main>

      <ProgressTrackerModal
        isOpen={isProgressModalOpen}
        onClose={() => setIsProgressModalOpen(false)}
      />

      <Footer />
    </div>
  );
};

export default function Home() {
  return (
    <LearningProvider>
      <AppContent />
    </LearningProvider>
  );
}
