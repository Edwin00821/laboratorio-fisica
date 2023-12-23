import { render } from '@testing-library/react';
import { describe, it } from 'vitest';

import Home from '@/app/pages/home/page';

describe('Home Page', (): void => {
  it('should render', (): void => {
    render(<Home />);
  });
});
