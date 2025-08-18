import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Hatchdinosaur } from './hatchdinosaur';

describe('Hatchdinosaur', () => {
  let component: Hatchdinosaur;
  let fixture: ComponentFixture<Hatchdinosaur>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Hatchdinosaur]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Hatchdinosaur);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
