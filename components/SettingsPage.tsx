'use client';

import React from 'react';
import { useLearning } from '@/context/LearningContext';
import { SettingsModal } from './SettingsModal';

export const SettingsPage: React.FC<{ onOpenGlossary?: () => void }> = ({ onOpenGlossary }) => {
  const { navigateTo } = useLearning();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <SettingsModal
        isOpen={true}
        onClose={() => navigateTo('learn')}
        onOpenGlossary={onOpenGlossary}
      />
    </div>
  );
};
