import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BlackJackPage } from './black-jack.page';

describe('BlackJackPage', () => {
  let component: BlackJackPage;
  let fixture: ComponentFixture<BlackJackPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BlackJackPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
