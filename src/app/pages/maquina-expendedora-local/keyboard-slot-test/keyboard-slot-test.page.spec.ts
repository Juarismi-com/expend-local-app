import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KeyboardSlotTestPage } from './keyboard-slot-test.page';

describe('KeyboardSlotTestPage', () => {
  let component: KeyboardSlotTestPage;
  let fixture: ComponentFixture<KeyboardSlotTestPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyboardSlotTestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
