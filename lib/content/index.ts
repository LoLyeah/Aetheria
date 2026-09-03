import { Topic, LearningModule, TopicId } from '@/types/learning';
import { quantumMechanicsTopic } from './quantum';
import { fetusDevelopmentTopic } from './embryo';
import { evBatteryTopic } from './battery';
import { pulmonologyPneumoniaTopic } from './pneumonia';
import { allBadges } from './badges';

export const allTopics: Topic[] = [
  quantumMechanicsTopic,
  fetusDevelopmentTopic,
  evBatteryTopic,
  pulmonologyPneumoniaTopic,
];

export { quantumMechanicsTopic, fetusDevelopmentTopic, evBatteryTopic, pulmonologyPneumoniaTopic, allBadges };

export function getTopicById(topicId: string): Topic | undefined {
  return allTopics.find((t) => t.id === topicId);
}

export function getModuleById(moduleId: string): { topic: Topic; module: LearningModule } | undefined {
  for (const topic of allTopics) {
    const mod = topic.modules.find((m) => m.id === moduleId);
    if (mod) {
      return { topic, module: mod };
    }
  }
  return undefined;
}

export function getAllModules(): { topic: Topic; module: LearningModule }[] {
  const list: { topic: Topic; module: LearningModule }[] = [];
  for (const topic of allTopics) {
    for (const mod of topic.modules) {
      list.push({ topic, module: mod });
    }
  }
  return list;
}
