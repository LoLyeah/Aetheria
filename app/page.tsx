'use client';

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { LearningProvider, useLearning } from '@/context/LearningContext';
import { Navbar } from '@/components/Navbar';
import { LandingPage } from '@/components/LandingPage';
import { LearningDashboard } from '@/components/LearningDashboard';
import { ModuleViewer } from '@/components/ModuleViewer';
import { SettingsModal } from '@/components/SettingsModal';
import { GlossaryModal } from '@/components/GlossaryModal';
import { ProgressTrackerModal } from '@/components/ProgressTrackerModal';
import { VersionModal } from '@/components/VersionModal';
import { Footer } from '@/components/Footer';

const AppContent: React.FC = () => {
  const { view, language, navigateTo, selectedModuleId } = useLearning();
  const [isProgressModalOpen, setIsProgressModalOpen] = useState(false);
  const [isVersionModalOpen, setIsVersionModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isGlossaryModalOpen, setIsGlossaryModalOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <Navbar
        onOpenProgress={() => setIsProgressModalOpen(true)}
        onOpenVersion={() => setIsVersionModalOpen(true)}
        onOpenSettings={() => setIsSettingsModalOpen(true)}
        onOpenGlossary={() => setIsGlossaryModalOpen(true)}
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
              key={`module-${selectedModuleId || 'default'}`}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.28, ease: 'easeInOut' }}
            >
              <ModuleViewer key={selectedModuleId || 'default'} onOpenGlossary={() => setIsGlossaryModalOpen(true)} />
            </motion.div>
          )}

          {view === 'settings' && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.28, ease: 'easeInOut' }}
              className="py-12"
            >
              <div className="max-w-3xl mx-auto px-4">
                <SettingsModal
                  isOpen={true}
                  onClose={() => navigateTo('learn')}
                  onOpenGlossary={() => setIsGlossaryModalOpen(true)}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Modals */}
      <ProgressTrackerModal
        isOpen={isProgressModalOpen}
        onClose={() => setIsProgressModalOpen(false)}
      />

      <VersionModal
        isOpen={isVersionModalOpen}
        onClose={() => setIsVersionModalOpen(false)}
      />

      <SettingsModal
        isOpen={isSettingsModalOpen && view !== 'settings'}
        onClose={() => setIsSettingsModalOpen(false)}
        onOpenGlossary={() => {
          setIsSettingsModalOpen(false);
          setIsGlossaryModalOpen(true);
        }}
      />

      <GlossaryModal
        isOpen={isGlossaryModalOpen}
        onClose={() => setIsGlossaryModalOpen(false)}
        language={language}
      />

      <Footer
        onOpenVersion={() => setIsVersionModalOpen(true)}
        onOpenProgress={() => setIsProgressModalOpen(true)}
        onOpenGlossary={() => setIsGlossaryModalOpen(true)}
        onOpenSettings={() => setIsSettingsModalOpen(true)}
      />
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
