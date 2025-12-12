import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { logger } from './logger';

describe('Logger', () => {
    const originalEnv = process.env;

    let logSpy: any;
    let errorSpy: any;
    let warnSpy: any;
    let infoSpy: any;

    beforeEach(() => {
        logSpy = vi.spyOn(console, 'log').mockImplementation(() => { });
        errorSpy = vi.spyOn(console, 'error').mockImplementation(() => { });
        warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => { });
        infoSpy = vi.spyOn(console, 'info').mockImplementation(() => { });
        vi.resetModules();
    });

    afterEach(() => {
        vi.restoreAllMocks();
        process.env = originalEnv;
    });

    it('log: only logs in development', () => {
        process.env.NODE_ENV = 'development';
        logger.log('dev log');
        expect(logSpy).toHaveBeenCalledWith('dev log');

        process.env.NODE_ENV = 'production';
        logSpy.mockClear();
        logger.log('prod log');
        expect(logSpy).not.toHaveBeenCalled();
    });

    it('info: only logs in development', () => {
        process.env.NODE_ENV = 'development';
        logger.info('dev info');
        expect(infoSpy).toHaveBeenCalledWith('dev info');

        process.env.NODE_ENV = 'production';
        infoSpy.mockClear();
        logger.info('prod info');
        expect(infoSpy).not.toHaveBeenCalled();
    });

    it('warn: always logs', () => {
        process.env.NODE_ENV = 'development';
        logger.warn('dev warn');
        expect(warnSpy).toHaveBeenCalledWith('dev warn');

        process.env.NODE_ENV = 'production';
        warnSpy.mockClear();
        logger.warn('prod warn');
        expect(warnSpy).toHaveBeenCalledWith('prod warn');
    });

    it('error: always logs', () => {
        process.env.NODE_ENV = 'development';
        logger.error('dev error');
        expect(errorSpy).toHaveBeenCalledWith('dev error');

        process.env.NODE_ENV = 'production';
        errorSpy.mockClear();
        logger.error('prod error');
        expect(errorSpy).toHaveBeenCalledWith('prod error');
    });
});
