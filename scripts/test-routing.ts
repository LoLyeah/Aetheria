import assert from 'node:assert/strict';
import {
  parseSlugToState,
  parseUrlToState,
  getUrlForState,
  isValidTopicId,
  isValidModuleTab,
  copyTextToClipboard,
} from '../lib/routing';
import { allTopics, getAllModules } from '../lib/content';

console.log('🧪 Running comprehensive URL routing & deep-link test suite against real lib/routing.ts...\n');

// 1. Topic & Tab Validators with real content
assert.equal(isValidTopicId('quantum-mechanics'), true, 'Valid topic ID quantum-mechanics');
assert.equal(isValidTopicId('QUANTUM-MECHANICS'), true, 'Case-insensitive topic ID');
assert.equal(isValidTopicId('ev-battery'), true, 'Valid topic ID ev-battery');
assert.equal(isValidTopicId('invalid-topic-xyz'), false, 'Invalid topic ID');
assert.equal(isValidTopicId(null), false, 'Null topic ID');
assert.equal(isValidTopicId(''), false, 'Empty topic ID');

for (const topic of allTopics) {
  assert.equal(isValidTopicId(topic.id), true, `Topic ${topic.id} from allTopics must be valid`);
}

assert.equal(isValidModuleTab('theory'), true);
assert.equal(isValidModuleTab('interactive'), true);
assert.equal(isValidModuleTab('quiz'), true);
assert.equal(isValidModuleTab('notes'), true);
assert.equal(isValidModuleTab('INTERACTIVE'), true, 'Case-insensitive module tab');
assert.equal(isValidModuleTab('invalid_tab'), false);
assert.equal(isValidModuleTab(null), false);

// 2. Root / Landing
assert.deepEqual(parseUrlToState('/', ''), {
  view: 'landing',
  topicId: null,
  moduleId: null,
  tab: 'theory',
});
assert.equal(getUrlForState('landing'), '/');

// 3. Topics Catalog
assert.deepEqual(parseUrlToState('/learn', ''), {
  view: 'learn',
  topicId: null,
  moduleId: null,
  tab: 'theory',
});
assert.deepEqual(parseUrlToState('/learn/', ''), {
  view: 'learn',
  topicId: null,
  moduleId: null,
  tab: 'theory',
});
assert.equal(getUrlForState('learn'), '/learn');

// 4. Specific Topic
for (const topic of allTopics) {
  assert.deepEqual(parseUrlToState(`/learn/${topic.id}`, ''), {
    view: 'learn',
    topicId: topic.id,
    moduleId: null,
    tab: 'theory',
  });
  assert.equal(getUrlForState('learn', topic.id), `/learn/${topic.id}`);
}

// 5. Specific Modules (test ALL 35 modules across all 8 disciplines)
const allMods = getAllModules();
assert.equal(allMods.length, 35, 'Expected 35 total modules across disciplines');

for (const { topic, module: mod } of allMods) {
  // Test canonical path: /learn/:topicId/:moduleId
  const parsed = parseUrlToState(`/learn/${topic.id}/${mod.id}`, '');
  assert.deepEqual(parsed, {
    view: 'module',
    topicId: topic.id,
    moduleId: mod.id,
    tab: 'theory',
  });
  assert.equal(getUrlForState('module', topic.id, mod.id), `/learn/${topic.id}/${mod.id}`);

  // Test with ?tab=interactive, ?tab=quiz, ?tab=notes
  for (const tab of ['interactive', 'quiz', 'notes'] as const) {
    const parsedWithTab = parseUrlToState(`/learn/${topic.id}/${mod.id}`, `?tab=${tab}`);
    assert.deepEqual(parsedWithTab, {
      view: 'module',
      topicId: topic.id,
      moduleId: mod.id,
      tab,
    });
    assert.equal(getUrlForState('module', topic.id, mod.id, tab), `/learn/${topic.id}/${mod.id}?tab=${tab}`);
  }

  // Canonical theory tab should omit ?tab=theory
  assert.equal(getUrlForState('module', topic.id, mod.id, 'theory'), `/learn/${topic.id}/${mod.id}`);
}

// 6. Direct module shortcut: /learn/qm-mod-1
assert.deepEqual(parseUrlToState('/learn/qm-mod-1', ''), {
  view: 'module',
  topicId: 'quantum-mechanics',
  moduleId: 'qm-mod-1',
  tab: 'theory',
});

// 7. Auto-resolve topicId in getUrlForState even if wrong or null topicId is passed
assert.equal(getUrlForState('module', null, 'qm-mod-1'), '/learn/quantum-mechanics/qm-mod-1');
assert.equal(getUrlForState('module', 'ev-battery' as any, 'qm-mod-1'), '/learn/quantum-mechanics/qm-mod-1');
assert.equal(getUrlForState('module', null, 'bat-mod-2', 'interactive'), '/learn/ev-battery/bat-mod-2?tab=interactive');
assert.equal(getUrlForState('module', 'quantum-mechanics' as any, 'bat-mod-2', 'interactive'), '/learn/ev-battery/bat-mod-2?tab=interactive');
assert.equal(getUrlForState('module', null, 'hyb-mod-2', 'interactive'), '/learn/hybrid-vehicles/hyb-mod-2?tab=interactive');
assert.equal(getUrlForState('module', 'quantum-mechanics' as any, 'hyb-mod-2', 'interactive'), '/learn/hybrid-vehicles/hyb-mod-2?tab=interactive');

// 8. Settings Route
assert.deepEqual(parseUrlToState('/settings', ''), {
  view: 'settings',
  topicId: null,
  moduleId: null,
  tab: 'theory',
});
assert.equal(getUrlForState('settings'), '/settings');

// 9. Legacy Query Parameter Backward Compatibility
// 9a. /?topic=quantum-mechanics
assert.deepEqual(parseUrlToState('/', '?topic=quantum-mechanics'), {
  view: 'learn',
  topicId: 'quantum-mechanics',
  moduleId: null,
  tab: 'theory',
});

// 9b. /?topic=ev-battery&module=bat-mod-2&tab=interactive
assert.deepEqual(parseUrlToState('/', '?topic=ev-battery&module=bat-mod-2&tab=interactive'), {
  view: 'module',
  topicId: 'ev-battery',
  moduleId: 'bat-mod-2',
  tab: 'interactive',
});

// 9c. /?module=cardiac-mod-3
assert.deepEqual(parseUrlToState('/', '?module=cardiac-mod-3'), {
  view: 'module',
  topicId: 'cardiac-arrest',
  moduleId: 'cardiac-mod-3',
  tab: 'theory',
});

// 9d. Legacy params on non-root paths: /learn?module=qm-mod-1
assert.deepEqual(parseUrlToState('/learn', '?module=qm-mod-1'), {
  view: 'module',
  topicId: 'quantum-mechanics',
  moduleId: 'qm-mod-1',
  tab: 'theory',
});

// 10. Robust Edge Cases: Casing, duplicate slashes, whitespace, and unrecognized tabs
assert.deepEqual(parseUrlToState('//learn//Quantum-Mechanics///qm-mod-1//', '?tab=INTERACTIVE'), {
  view: 'module',
  topicId: 'quantum-mechanics',
  moduleId: 'qm-mod-1',
  tab: 'interactive',
});

// Invalid tab gracefully defaults to theory
assert.equal(parseUrlToState('/learn/quantum-mechanics/qm-mod-1', '?tab=unknown_tab').tab, 'theory');

// Non-module view ignores tab query parameter
assert.deepEqual(parseUrlToState('/learn', '?tab=interactive'), {
  view: 'learn',
  topicId: null,
  moduleId: null,
  tab: 'theory',
});

// Unrecognized topic fallback to learn catalog
assert.deepEqual(parseUrlToState('/learn/alien-science-discipline', ''), {
  view: 'learn',
  topicId: null,
  moduleId: null,
  tab: 'theory',
});

// Clipboard utility export sanity
assert.equal(typeof copyTextToClipboard, 'function');

console.log('✅ ALL PRODUCTION ROUTING & DEEP-LINK TESTS PASSED (35 modules, 8 topics, edge cases)!');
