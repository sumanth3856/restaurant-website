import { describe, it, expect } from 'vitest';
import { bookingSchema } from './validations';

describe('Booking Schema Validation', () => {
    it('validates a correct booking object', () => {
        const validBooking = {
            date: '2025-12-25',
            time: '19:00',
            partySize: 4,
            name: 'John Doe',
            email: 'john@example.com',
            phone: '1234567890',
            requests: 'None'
        };
        const result = bookingSchema.safeParse(validBooking);
        expect(result.success).toBe(true);
    });

    it('fails validation for invalid email', () => {
        const invalidBooking = {
            date: '2025-12-25',
            time: '19:00',
            partySize: 4,
            name: 'John Doe',
            email: 'not-an-email',
            phone: '1234567890'
        };
        const result = bookingSchema.safeParse(invalidBooking);
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.issues[0].message).toBe('Invalid email address');
        }
    });

    it('fails if party size is too small', () => {
        const invalidBooking = {
            date: '2025-12-25',
            time: '19:00',
            partySize: 0,
            name: 'John Doe',
            email: 'john@example.com',
            phone: '1234567890'
        };
        const result = bookingSchema.safeParse(invalidBooking);
        expect(result.success).toBe(false);
    });
});
