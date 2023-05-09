import { renderHook, act } from '@testing-library/react-hooks';
import { useDebounce } from './useDebounce.ts';

describe('useDebounce', () => {
    it('should debounce the value', () => {
        jest.useFakeTimers();

        const { result, rerender } = renderHook(({ value, delay }) => useDebounce({ value, delay }), {
            initialProps: { value: 'hello', delay: 1000 },
        });

        expect(result.current).toEqual('hello');

        act(() => {
            rerender({ value: 'hello world', delay: 1000 });
        });

        expect(result.current).toEqual('hello');

        jest.advanceTimersByTime(500);

        act(() => {
            rerender({ value: 'hello world', delay: 1000 });
        });

        expect(result.current).toEqual('hello');

        jest.advanceTimersByTime(500);

        expect(result.current).toEqual('hello world');

        jest.useRealTimers();
    });
});
