import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
/**
 * MenuItem
 */
type MenuItem = {
  title: string;
  link: string;
  isOpen: boolean;
};

/**
 * HeaderComponent
 * - List of menu items
 * - Title
 * - Authentication status
 */
@Component({
    selector: 'lab-header',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [RouterLink],
    template: `
    <header>
      <nav>
        <a routerLink="">
          <b>{{ title }}</b>
        </a>
        <section>
          @for (item of menu; track item.link) { @if (canLink(item)) {
          <span>
            <a [routerLink]="item.link">{{ item.title }}</a>
          </span>
          } }
        </section>
      </nav>
    </header>
  `
})
export class HeaderComponent {
  /**
   * Title
   */
  title = '🚀 AstroBookings System';
  /**
   * Authentication status
   */
  isAuthenticated = false;
  /**
   * Menu items
   */
  menu: MenuItem[] = [
    {
      title: '🌍 Home',
      link: '/',
      isOpen: true,
    },
    {
      title: '🎟️ Bookings',
      link: '/bookings',
      isOpen: false,
    },
    {
      title: '📘 About us',
      link: '/about',
      isOpen: true,
    },
    {
      title: '🔐 Log In',
      link: '/login',
      isOpen: true,
    },
    {
      title: '🔏 Register',
      link: '/register',
      isOpen: true,
    },
  ];
  /**
   * Check if the menu item can be linked to
   * @param item - Menu item
   * @returns - True if the menu item can be linked to, false otherwise
   */
  canLink(item: MenuItem) {
    return this.isAuthenticated || item.isOpen;
  }
}
