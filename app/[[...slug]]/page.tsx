import type { Metadata } from 'next';
import ClientApp from '@/components/ClientApp';
import { allTopics, getTopicById, getModuleById } from '@/lib/content';
import { parseSlugToState } from '@/lib/routing';

export function generateStaticParams() {
  const params: { slug: string[] }[] = [
    { slug: [] },
    { slug: ['learn'] },
    { slug: ['settings'] },
  ];

  for (const topic of allTopics) {
    params.push({ slug: ['learn', topic.id] });
    for (const mod of topic.modules) {
      params.push({ slug: ['learn', topic.id, mod.id] });
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const state = parseSlugToState(resolvedParams?.slug);

  if (state.view === 'module' && state.moduleId) {
    const info = getModuleById(state.moduleId);
    if (info) {
      const pageTitle = `${info.module.title.en} - ${info.topic.title.en} | Aetheria`;
      const desc = info.module.shortDescription.en;
      return {
        title: pageTitle,
        description: desc,
        openGraph: {
          title: pageTitle,
          description: desc,
        },
      };
    }
  }

  if (state.view === 'learn') {
    if (state.topicId) {
      const topic = getTopicById(state.topicId);
      if (topic) {
        const pageTitle = `${topic.title.en} | Aetheria`;
        const desc = topic.description.en;
        return {
          title: pageTitle,
          description: desc,
          openGraph: {
            title: pageTitle,
            description: desc,
          },
        };
      }
    }
    return {
      title: 'Explore STEM Disciplines & 3D Simulations | Aetheria',
      description: 'Explore interactive WebGPU/WebGL 3D science simulations across Quantum Mechanics, Embryonic Biology, EV Battery Technology, and Medicine.',
    };
  }

  if (state.view === 'settings') {
    return {
      title: 'Laboratory & System Settings | Aetheria',
      description: 'Customize rendering graphics quality, physics engine, math formatting, and speech settings in Aetheria.',
    };
  }

  return {
    title: 'Aetheria - Interactive 3D Science & Tech Learning Platform',
    description: 'An interactive WebGPU and 3D science laboratory featuring Quantum Mechanics, Embryonic Morphogenesis, EV Battery Dynamics, and Cardiovascular Electrophysiology.',
  };
}

export default async function CatchAllPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const resolvedParams = await params;
  return <ClientApp initialSlug={resolvedParams?.slug} />;
}
