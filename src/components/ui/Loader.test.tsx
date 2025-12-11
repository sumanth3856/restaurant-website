import { render } from '@testing-library/react';
import { Loader } from './Loader';
import { describe, it, expect } from 'vitest';

describe('Loader Component', () => {
    it('renders without crashing', () => {
        const { container } = render(<Loader />);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toBeInTheDocument();
    });

    it('matches snapshot', () => {
        const { container } = render(<Loader />);
        expect(container).toMatchSnapshot();
    });

    it('applies custom class names', () => {
        const { container } = render(<Loader className="text-red-500" />);
        // Check if the class is present in the SVG
        expect(container.querySelector('svg')).toHaveClass('text-red-500');
    });
});
