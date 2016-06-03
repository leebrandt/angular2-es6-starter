import { TestComponentBuilder } from '@angular/compiler/testing';

import { AboutComponent } from './about.component';

describe('AboutComponent', () => {
  let subjectElement;

  beforeEachProviders(() => [
    TestComponentBuilder
  ]);

  beforeEach(async(inject([TestComponentBuilder], (componentBuilder) => {
    return componentBuilder
      .createAsync(AboutComponent)
      .then(fixture => {
        subjectElement = fixture.nativeElement;
      });
  })));

  it('should display title', () => {
    let header = subjectElement.querySelector('h1');

    expect(header.textContent).toEqual('About');
  });
});
