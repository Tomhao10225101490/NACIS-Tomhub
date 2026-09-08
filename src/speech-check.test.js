import { describe, it, expect, vi, afterEach } from 'vitest';
import {
  normalizeHeard,
  scoreHeard,
  canListen,
  listenForWord,
  stopListening,
  isListening,
} from './speech-check.js';

describe('normalizeHeard', () => {
  it('lowercases and strips punctuation', () => {
    expect(normalizeHeard('  “Headlong,” ')).toBe('headlong');
  });
  it('keeps a phrase', () => {
    expect(normalizeHeard('Make  a  bet!')).toBe('make a bet');
  });
});

describe('scoreHeard', () => {
  it('passes case-insensitive exact words', () => {
    expect(scoreHeard('Ubiquitous', 'ubiquitous').ok).toBe(true);
  });
  it('passes a full phrase', () => {
    expect(scoreHeard('make a bet', 'make a bet').ok).toBe(true);
  });
  it('passes a close misspelling', () => {
    expect(scoreHeard('helo', 'hello').ok).toBe(true);
  });
  it('fails a totally different word', () => {
    const r = scoreHeard('banana', 'ubiquitous');
    expect(r.ok).toBe(false);
    expect(r.heard).toBe('banana');
  });
  it('passes when the target is one token in a longer utterance', () => {
    expect(scoreHeard('the word is courage', 'courage').ok).toBe(true);
  });
});

class FakeRec {
  constructor() {
    this.lang = '';
    this.interimResults = false;
    this.maxAlternatives = 1;
    this.continuous = false;
    this.onresult = null;
    this.onerror = null;
    this.onend = null;
    FakeRec.instances.push(this);
  }
  start() {
    this.started = true;
  }
  stop() {
    this.stopped = true;
  }
  abort() {
    this.aborted = true;
  }
}

describe('listenForWord', () => {
  afterEach(() => {
    stopListening();
    delete window.SpeechRecognition;
    delete window.webkitSpeechRecognition;
    FakeRec.instances = [];
    vi.useRealTimers();
  });

  it('reports unavailable when the browser has no recognizer', () => {
    const onError = vi.fn();
    expect(canListen()).toBe(false);
    expect(listenForWord('hello', { onError })).toBe(false);
    expect(onError).toHaveBeenCalledWith('unavailable');
  });

  it('scores alternatives from a recognition result', async () => {
    FakeRec.instances = [];
    window.webkitSpeechRecognition = FakeRec;
    expect(canListen()).toBe(true);
    const onResult = vi.fn();
    listenForWord('hello', { onResult });
    expect(isListening()).toBe(true);
    const rec = FakeRec.instances[0];
    rec.onresult({
      results: {
        length: 1,
        0: {
          length: 2,
          0: { transcript: 'yellow' },
          1: { transcript: 'hello' },
        },
      },
    });
    expect(onResult).toHaveBeenCalledTimes(1);
    expect(onResult.mock.calls[0][0].ok).toBe(true);
    expect(isListening()).toBe(false);
  });

  it('treats a network error as unavailable', () => {
    FakeRec.instances = [];
    window.SpeechRecognition = FakeRec;
    const onError = vi.fn();
    listenForWord('fast', { onError });
    FakeRec.instances[0].onerror({ error: 'network' });
    expect(onError).toHaveBeenCalledWith('network');
  });
});
