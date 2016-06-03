import { TestComponentBuilder } from '@angular/compiler/testing';
import { Injector } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { MenuComponent } from './menu.component';
import { CORE_TESTING_PROVIDERS, RouterMock } from '../../testing';
import { AUTH_TESTING_PROVIDERS, UserServiceMock } from '../../../auth/testing';
import { enTranslation } from '../../../i18n';

describe('MenuComponent', () => {
  let builder;

  beforeEachProviders(() => [
    TestComponentBuilder,
    HTTP_PROVIDERS,
    AUTH_TESTING_PROVIDERS,
    CORE_TESTING_PROVIDERS
  ]);

  beforeEach(inject([Injector], (injector) => {
    builder = injector.get(TestComponentBuilder);
  }));

  it('should display page title', (done) => {
    builder.createAsync(MenuComponent).then((fixture) => {
      fixture.detectChanges();
      let header = fixture.nativeElement.querySelector('.navbar-brand');

      expect(header.textContent).toEqual(enTranslation.page_title);
      done();
    }).catch(e => done.fail(e));
  });

  it('should logout user', (done) => {
    spyOn(UserServiceMock.prototype, 'logout');
    spyOn(RouterMock.prototype, 'navigate');

    builder.createAsync(MenuComponent).then((fixture) => {
      let subject = fixture.componentInstance;

      let result = subject.logout();

      expect(UserServiceMock.prototype.logout).toHaveBeenCalled();
      expect(RouterMock.prototype.navigate).toHaveBeenCalledWith(['List']);
      expect(result).toBeFalsy();
      done();
    }).catch(e => done.fail(e));
  });

  it('should show logout button and logout clicking on it', (done) => {
    spyOn(UserServiceMock.prototype, 'logout');
    spyOn(RouterMock.prototype, 'navigate');

    builder.createAsync(MenuComponent).then((fixture) => {
      fixture.detectChanges();
      let menuItems = fixture.nativeElement.querySelectorAll('li > a');

      expect(menuItems[2].textContent).toEqual(enTranslation.menu_logout);

      menuItems[2].click();

      expect(UserServiceMock.prototype.logout).toHaveBeenCalled();
      expect(RouterMock.prototype.navigate).toHaveBeenCalledWith(['List']);
      done();
    }).catch(e => done.fail(e));
  });

  it('should show login button when logged out', (done) => {
    spyOn(UserServiceMock.prototype, 'getLoggedIn').and.returnValue(Observable.of(false));

    builder.createAsync(MenuComponent).then((fixture) => {
      fixture.detectChanges();
      let menuItems = fixture.nativeElement.querySelectorAll('li > a');

      expect(menuItems[2].textContent).toEqual(enTranslation.menu_login);
      done();
    }).catch(e => done.fail(e));
  });
});
