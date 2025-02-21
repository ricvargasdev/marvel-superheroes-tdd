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

    // TODO: Implement DELETE
    // expect(screen.getAllByText('Delete')).toHaveLength(mockHeroes.length);
  });

  // TODO: Implement DELETE
  // it('removes a hero when the delete button is clicked', async () => {
  //   render(<HeroTable />);

  //   const ironMan = await screen.findByText('Iron Man');
  //   const spiderMan = await screen.findByText('Spider-Man');
  //   const deleteButtons = screen.getAllByText('Delete');

  //   fireEvent.click(deleteButtons[0]);

  //   await waitFor(() => expect(ironMan).not.toBeInTheDocument());
  //   await waitFor(() => expect(spiderMan).toBeInTheDocument());
  // });
});
