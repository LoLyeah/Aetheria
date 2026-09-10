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

// 5. Specific Modules (test ALL 36 modules across all 8 disciplines)
const allMods = getAllModules();
assert.equal(allMods.length, 36, 'Expected 36 total modules across disciplines');

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

// 11. Deep Curriculum & KaTeX Formula Integrity Verification across all 36 modules
import katex from 'katex';
import { allBadges } from '../lib/content/badges';
import { GLOSSARY_TERMS } from '../lib/glossaryData';

console.log('📐 Verifying KaTeX formulas, bilingual content, and badge integrity across all 36 modules...');

// Check badge configurations
const hybridBadge = allBadges.find((b) => b.id === 'hybrid-master');
assert.ok(hybridBadge, 'hybrid-master badge must exist');
assert.deepEqual(
  hybridBadge.requiredModuleIds,
  ['hyb-mod-1', 'hyb-mod-2', 'hyb-mod-3', 'hyb-mod-4', 'hyb-mod-5'],
  'hybrid-master badge must require all 5 hybrid modules'
);

const grandPolymath = allBadges.find((b) => b.id === 'polymath');
assert.ok(grandPolymath, 'polymath badge must exist');
assert.match(grandPolymath.description.en, /36 modules/, 'grand-polymath must mention 36 modules in English');
assert.match(grandPolymath.description.id, /36 modul/, 'grand-polymath must mention 36 modul in Indonesian');

// Verify every module's bilingual integrity, order, quizzes, and KaTeX formulas
let testedFormulasCount = 0;

for (const { topic, module: mod } of allMods) {
  assert.ok(mod.title.en && mod.title.en.trim().length > 0, `Module ${mod.id} missing en title`);
  assert.ok(mod.title.id && mod.title.id.trim().length > 0, `Module ${mod.id} missing id title`);
  assert.ok(mod.shortDescription.en && mod.shortDescription.en.trim().length > 0, `Module ${mod.id} missing en description`);
  assert.ok(mod.shortDescription.id && mod.shortDescription.id.trim().length > 0, `Module ${mod.id} missing id description`);
  assert.ok(mod.sections.length > 0, `Module ${mod.id} must have at least one section`);
  assert.ok(mod.quiz.length >= 1, `Module ${mod.id} must have at least 1 quiz question`);
  if (mod.topicId === 'hybrid-vehicles') {
    assert.ok(mod.quiz.length >= 2, `Hybrid module ${mod.id} must have at least 2 quiz questions`);
  }

  // Sections
  for (const sec of mod.sections) {
    assert.ok(sec.title.en && sec.title.en.trim().length > 0, `Section ${sec.id} missing en title`);
    assert.ok(sec.title.id && sec.title.id.trim().length > 0, `Section ${sec.id} missing id title`);
    assert.ok(sec.content.en && sec.content.en.trim().length > 0, `Section ${sec.id} missing en content`);
    assert.ok(sec.content.id && sec.content.id.trim().length > 0, `Section ${sec.id} missing id content`);

    // KaTeX formula in section
    if (sec.formula) {
      const formulaStr = sec.formula;
      assert.doesNotThrow(() => {
        try {
          katex.renderToString(formulaStr, { throwOnError: true, displayMode: true, strict: (errorCode: string, errorMsg: string) => {
            console.warn(`[KaTeX Warn in sec.formula] ${mod.id} / ${sec.id}: ${errorMsg}`);
            return 'warn';
          }});
        } catch (e: any) {
          throw new Error(`Section ${sec.id} formula failed: ${formulaStr} (${e.message})`);
        }
      });
      testedFormulasCount++;
    }

    // KaTeX formula in variables
    if (sec.variables) {
      for (const v of sec.variables) {
        assert.ok(v.name.en && v.name.id, `Variable in ${sec.id} missing name`);
        assert.ok(v.description.en && v.description.id, `Variable in ${sec.id} missing description`);
        assert.doesNotThrow(() => {
          try {
            katex.renderToString(v.symbol, { throwOnError: true, displayMode: false, strict: (errorCode: string, errorMsg: string) => {
              console.warn(`[KaTeX Warn in variable] ${mod.id} / ${sec.id}: ${v.symbol} -> ${errorMsg}`);
              return 'warn';
            }});
          } catch (e: any) {
            throw new Error(`Variable symbol in ${sec.id} failed: ${v.symbol} (${e.message})`);
          }
        });
        testedFormulasCount++;
      }
    }

    // KaTeX formula in derivation steps
    if (sec.derivationSteps) {
      for (const step of sec.derivationSteps) {
        assert.ok(step.title.en && step.title.id, `Derivation step in ${sec.id} missing title`);
        assert.ok(step.explanation.en && step.explanation.id, `Derivation step in ${sec.id} missing explanation`);
        if (step.math) {
          const stepMath = step.math;
          assert.doesNotThrow(() => {
            try {
              katex.renderToString(stepMath, { throwOnError: true, displayMode: true, strict: (errorCode: string, errorMsg: string) => {
                console.warn(`[KaTeX Warn in derivation] ${mod.id} / ${sec.id}: ${stepMath} -> ${errorMsg}`);
                return 'warn';
              }});
            } catch (e: any) {
              throw new Error(`Derivation step math in ${sec.id} failed: ${stepMath} (${e.message})`);
            }
          });
          testedFormulasCount++;
        }
      }
    }
  }

  // Quizzes
  for (const q of mod.quiz) {
    assert.ok(q.question.en && q.question.id, `Quiz ${q.id} missing question text`);
    assert.ok(q.options.en.length >= 2 && q.options.id.length >= 2, `Quiz ${q.id} must have >= 2 options`);
    assert.equal(q.options.en.length, q.options.id.length, `Quiz ${q.id} option count mismatch between en/id`);
    assert.ok(q.correctAnswerIndex >= 0 && q.correctAnswerIndex < q.options.en.length, `Quiz ${q.id} invalid correct index`);
    assert.ok(q.explanation.en && q.explanation.id, `Quiz ${q.id} missing explanation`);
  }
}

// Check glossary symbols with KaTeX
for (const term of GLOSSARY_TERMS) {
  if (term.symbol) {
    const sym = term.symbol;
    assert.doesNotThrow(() => {
      try {
        katex.renderToString(sym, { throwOnError: true, displayMode: false, strict: (errorCode: string, errorMsg: string) => {
          console.warn(`[KaTeX Warn in glossary] ${term.id}: ${sym} -> ${errorMsg}`);
          return 'warn';
        }});
      } catch (e: any) {
        throw new Error(`Glossary term ${term.id} symbol failed: ${sym} (${e.message})`);
      }
    }, `Glossary term ${term.id} symbol failed KaTeX render: ${sym}`);
    testedFormulasCount++;
  }
}

console.log(`✅ Successfully validated ${testedFormulasCount} KaTeX mathematical formulas & variables without error!`);
console.log('✅ ALL PRODUCTION ROUTING & DEEP-LINK TESTS PASSED (36 modules, 8 topics, edge cases)!');
