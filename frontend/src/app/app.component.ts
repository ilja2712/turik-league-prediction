import { Component } from '@angular/core';
import { NbMenuItem, NbMenuService, NbSidebarService } from '@nebular/theme';
import { TokenStorageService } from './_services/token-storage.service';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
  role?: string;
  items: NbMenuItem[] = [];

  constructor(private tokenStorageService: TokenStorageService, private readonly sidebarService: NbSidebarService, private nbMenuService: NbMenuService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.role = user.roles[0];

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MOD');

      this.username = user.username;
    }

    this.nbMenuService.onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'my-context-menu'),
        map(({ item: { title } }) => title),
      )
      .subscribe(title => title == "Выход" ? this.logout() : null );

      this.items = [
        {
          title: 'Главная',
          icon: 'home-outline',
          link: '/home',
          home: true
        },
        {
          title: 'Пользователи',
          icon: 'people-outline',
          link: '/admin',
          hidden: !(this.showAdminBoard || this.showModeratorBoard)
        },
        {
          title: 'Панель модератора',
          icon: 'color-palette-outline',
          link: '/moderator',
          hidden: !(this.showAdminBoard || this.showModeratorBoard)
        }
      ]
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle();
    return false;
  }

    menu_users: NbMenuItem[] = [
      {
        title: 'Профиль',
        icon: 'people-outline',
        link: '/profile',
      },
      {
        title: 'Выход',
        icon: 'log-out-outline'
      }
    ]
}
