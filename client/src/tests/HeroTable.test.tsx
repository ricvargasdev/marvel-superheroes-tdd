import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import HeroTable from '../components/HeroTable';
import '@testing-library/jest-dom';
import { mockHeroes } from '../mocks/handlers';

describe('HeroTable', () => {
  it('renders heroes from API with a delete button', async () => {
    render(<HeroTable />);

    for (const hero of mockHeroes) {
      expect(await screen.findByText(hero.name)).toBeInTheDocument();
    }

    expect(screen.getAllByText('Delete')).toHaveLength(mockHeroes.length);
  });

  it('removes a hero when the delete button is clicked', async () => {
    render(<HeroTable />);

    const spiderMan = await screen.findByText('Spider-Man');
    const deleteButtons = screen.getAllByText('Delete');

    fireEvent.click(deleteButtons[0]);

    await waitFor(() => expect(spiderMan).not.toBeInTheDocument());
  });
});
