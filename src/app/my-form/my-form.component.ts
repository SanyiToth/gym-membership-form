import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-my-form',
  templateUrl: './my-form.component.html',
  styleUrls: ['./my-form.component.css']
})
export class MyFormComponent implements OnInit {
  myForm: FormGroup;
  levels: string[] = ['beginner', 'amateur', 'advanced', 'expert'];

  constructor(private formBuilder: FormBuilder) {
    this.myForm = this.createMyForm();
  }

  createMyForm(): FormGroup {
    return this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(5)]],
      email: [null, [Validators.required, Validators.email]],
      gender: [null, Validators.required],
      exercises: this.formBuilder.array([
        this.formBuilder.group({
          name: 'Running',
          level: null
        }),
        this.formBuilder.group({
          name: 'Skipping',
          level: null
        }),
        this.formBuilder.group({
          name: 'Weight lifting',
          level: null
        })
      ])
    });
  }

  onSubmit(): void {
    console.log('myForm', this.myForm.value);
  }

  addExercise(): void {
    const newExercise = this.formBuilder.group({
      name: null,
      level: null
    });
    this.exercises.push(newExercise);
  }

  removeExercise(index: number): void {
    this.exercises.removeAt(index);
  }

  ngOnInit(): void {
    console.log('exercises', this.exercises);
  }

  get exercises(): FormArray {
    return this.myForm.get('exercises') as FormArray;
  }
}
