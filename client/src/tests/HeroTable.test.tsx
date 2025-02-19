import { render, screen, fireEvent } from '@testing-library/react';
import HeroTable from '../components/HeroTable';
import '@testing-library/jest-dom';

describe('HeroTable', () => {
  it('should render heroes with a delete button', () => {
    const heroes = [
      { id: 1, name: 'Spider-Man', description: 'Web-slinger', thumbnail: 'url' },
      { id: 2, name: 'Iron Man', description: 'Genius billionaire', thumbnail: 'url' },
    ];

    render(<HeroTable />);

    // Check if delete buttons are rendered
    heroes.forEach(hero => {
      // expect(screen.getByText(hero.name)).toBeInTheDocument();
      expect(screen.getByText('Delete')).toBeInTheDocument();
    });
  });

  it('should delete a hero when the delete button is clicked', () => {
    const heroes = [
      { id: 1, name: 'Spider-Man', description: 'Web-slinger', thumbnail: 'url' },
      { id: 2, name: 'Iron Man', description: 'Genius billionaire', thumbnail: 'url' },
    ];

    render(<HeroTable />);

    // Click the delete button for the first hero
    const deleteButton = screen.getAllByText('Delete')[0];
    fireEvent.click(deleteButton);

    // After click, Spider-Man should not appear in the table anymore
    expect(screen.queryByText('Spider-Man')).not.toBeInTheDocument();
  });
});
