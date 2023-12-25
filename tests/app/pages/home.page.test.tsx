import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';

import Home from '@/app/pages/home/page';

describe('Home Page', (): void => {
  it('should render', async (): Promise<void> => {
    render(<Home />);
    await screen.findByText('Laboratorio de Física');
  });
});
