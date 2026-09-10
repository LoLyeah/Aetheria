'use client';

import React, { useState } from 'react';
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

export const AppContent: React.FC = () => {
  const { view, language, navigateTo, returnFromSettings, selectedModuleId, selectedTopicId, activeTab } = useLearning();
  const [isProgressModalOpen, setIsProgressModalOpen] = useState(false);
  const [isVersionModalOpen, setIsVersionModalOpen] = useState(false);
  const [isGlossaryModalOpen, setIsGlossaryModalOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <Navbar
        onOpenProgress={() => setIsProgressModalOpen(true)}
        onOpenVersion={() => setIsVersionModalOpen(true)}
        onOpenSettings={() => navigateTo('settings')}
        onOpenGlossary={() => setIsGlossaryModalOpen(true)}
      />

      <main className="flex-grow relative overflow-hidden">
        <AnimatePresence
          mode="wait"
          onExitComplete={() => {
            if (typeof window !== 'undefined') {
              window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
            }
          }}
        >
          {view === 'landing' && (
            <motion.div
              key="landing"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="w-full min-w-0"
            >
              <LandingPage />
            </motion.div>
          )}

          {(view === 'learn' || view === 'settings') && (
            <motion.div
              key={`learn-${selectedTopicId || 'root'}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="w-full min-w-0"
            >
              <LearningDashboard
                topicId={selectedTopicId}
                onOpenProgress={() => setIsProgressModalOpen(true)}
              />
            </motion.div>
          )}

          {view === 'module' && (
            <motion.div
              key={`module-${selectedModuleId || 'default'}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="w-full min-w-0"
            >
              <ModuleViewer
                moduleId={selectedModuleId}
                topicId={selectedTopicId}
                initialTab={activeTab}
                onOpenGlossary={() => setIsGlossaryModalOpen(true)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Settings Modal (synchronized with /settings route) */}
      <SettingsModal
        isOpen={view === 'settings'}
        onClose={returnFromSettings}
        onOpenGlossary={() => setIsGlossaryModalOpen(true)}
      />

      {/* Modals */}
      <ProgressTrackerModal
        isOpen={isProgressModalOpen}
        onClose={() => setIsProgressModalOpen(false)}
      />

      <VersionModal
        isOpen={isVersionModalOpen}
        onClose={() => setIsVersionModalOpen(false)}
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
        onOpenSettings={() => navigateTo('settings')}
      />
    </div>
  );
};

export default function ClientApp({ initialSlug }: { initialSlug?: string[] }) {
  return (
    <LearningProvider initialSlug={initialSlug}>
      <AppContent />
    </LearningProvider>
  );
}
