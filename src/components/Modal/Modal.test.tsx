import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import Modal from './Modal';

describe('Modal', () => {
  it('renders its children', () => {
    render(
      <Modal handleClick={vi.fn()}>
        <p>Modal body</p>
      </Modal>
    );

    expect(screen.getByText('Modal body')).toBeInTheDocument();
  });

  it('calls handleClick when the backdrop overlay is clicked', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    const { container } = render(
      <Modal handleClick={handleClick}>
        <p>Modal body</p>
      </Modal>
    );

    await user.click(container.querySelector('.modal')!);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call handleClick when clicking inside the modal content', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    render(
      <Modal handleClick={handleClick}>
        <p>Modal body</p>
      </Modal>
    );

    await user.click(screen.getByText('Modal body'));

    expect(handleClick).not.toHaveBeenCalled();
  });

  it('calls handleClick when the close button is clicked', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    render(
      <Modal handleClick={handleClick}>
        <p>Modal body</p>
      </Modal>
    );

    await user.click(screen.getByRole('button', { name: 'Close' }));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('appends the optional backdrop class name', () => {
    const { container } = render(
      <Modal handleClick={vi.fn()} backdropClassName="contact-modal-backdrop">
        <p>Modal body</p>
      </Modal>
    );

    expect(container.querySelector('.modal-backdrop')).toHaveClass('contact-modal-backdrop');
  });
});
