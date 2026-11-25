import { describe, it, expect } from 'vitest';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { Priorities } = require('./helpers/load-renderer.js').loadRenderer();

describe('Priorities', () => {
  it('dört seviye vardır: High, Medium, Low, None', () => {
    expect([...Priorities.LEVELS]).toEqual(['high', 'medium', 'low', 'none']);
  });
  it('bilinmeyen değeri none yapar', () => {
    expect(Priorities.normalize('urgent')).toBe('none');
    expect(Priorities.normalize(undefined)).toBe('none');
    expect(Priorities.normalize('low')).toBe('low');
  });
});
