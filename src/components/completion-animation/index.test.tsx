import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import CompletionAnimation from './index';

describe('CompletionAnimation', () => {
  it('renders with confetti animation', () => {
    render(<CompletionAnimation animationType="confetti" message="Test Complete!" />);
    expect(screen.getByText('Test Complete!')).toBeInTheDocument();
  });

  it('renders with fade animation', () => {
    render(<CompletionAnimation animationType="fade" message="Well Done!" />);
    expect(screen.getByText('Well Done!')).toBeInTheDocument();
  });

  it('renders with zoom animation', () => {
    render(<CompletionAnimation animationType="zoom" message="Success!" />);
    expect(screen.getByText('Success!')).toBeInTheDocument();
  });

  it('does not render when type is none', () => {
    const { container } = render(<CompletionAnimation animationType="none" message="Hidden" />);
    expect(container.firstChild).toBeNull();
  });

  it('calls onAnimationComplete after duration', () => {
    vi.useFakeTimers();
    const onComplete = vi.fn();
    render(
      <CompletionAnimation
        animationType="fade"
        message="Test"
        duration={1000}
        onAnimationComplete={onComplete}
      />
    );

    expect(onComplete).not.toHaveBeenCalled();
    vi.advanceTimersByTime(1000);
    expect(onComplete).toHaveBeenCalledOnce();
    vi.useRealTimers();
  });

  it('uses custom className', () => {
    const { container } = render(
      <CompletionAnimation animationType="fade" message="Test" className="custom-class" />
    );
    expect(container.querySelector('.custom-class')).toBeInTheDocument();
  });
});

