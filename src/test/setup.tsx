import React from 'react';
import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

afterEach(() => {
    cleanup();
});

// Mock Next.js Image
vi.mock('next/image', () => ({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    default: ({ src, alt, ...props }: any) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} {...props} />
    ),
}));
