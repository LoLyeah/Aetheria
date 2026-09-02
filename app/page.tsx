'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { LearningProvider, useLearning } from '@/context/LearningContext';
import { Navbar } from '@/components/Navbar';
import { LandingPage } from '@/components/LandingPage';
import { LearningDashboard } from '@/components/LearningDashboard';
import { ModuleViewer } from '@/components/ModuleViewer';
import { ProgressTrackerModal } from '@/components/ProgressTrackerModal';
import { VersionModal } from '@/components/VersionModal';
import { Footer } from '@/components/Footer';

const AppContent: React.FC = () => {
  const { view } = useLearning();
  const [isProgressModalOpen, setIsProgressModalOpen] = useState(false);
  const [isVersionModalOpen, setIsVersionModalOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <Navbar
        onOpenProgress={() => setIsProgressModalOpen(true)}
        onOpenVersion={() => setIsVersionModalOpen(true)}
      />

      <main className="flex-grow relative overflow-hidden">
        <AnimatePresence mode="wait">
          {view === 'landing' && (
            <motion.div
              key="landing"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.28, ease: 'easeInOut' }}
            >
              <LandingPage />
            </motion.div>
          )}

          {view === 'learn' && (
            <motion.div
              key="learn"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.28, ease: 'easeInOut' }}
            >
              <LearningDashboard onOpenProgress={() => setIsProgressModalOpen(true)} />
            </motion.div>
          )}

          {view === 'module' && (
            <motion.div
              key="module"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.28, ease: 'easeInOut' }}
            >
              <ModuleViewer />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <ProgressTrackerModal
        isOpen={isProgressModalOpen}
        onClose={() => setIsProgressModalOpen(false)}
      />

      <VersionModal
        isOpen={isVersionModalOpen}
        onClose={() => setIsVersionModalOpen(false)}
      />

      <Footer onOpenVersion={() => setIsVersionModalOpen(true)} />
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
