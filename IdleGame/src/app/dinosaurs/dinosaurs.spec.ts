import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dinosaurs } from './dinosaurs';

describe('Dinosaurs', () => {
  let component: Dinosaurs;
  let fixture: ComponentFixture<Dinosaurs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dinosaurs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Dinosaurs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
