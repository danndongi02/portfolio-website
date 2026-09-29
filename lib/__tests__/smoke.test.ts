import { describe, expect, it } from 'vitest';
import { cn, truncateText } from '@/lib/utils';

describe('lib/utils', () => {
  it('cn merges conflicting Tailwind classes, last one wins', () => {
    expect(cn('px-2 py-1', false && 'hidden', 'px-4')).toBe('py-1 px-4');
  });

  it('truncateText leaves short text alone and truncates long text', () => {
    expect(truncateText('short', 10)).toBe('short');
    expect(truncateText('a long sentence', 6)).toBe('a long...');
  });
});
