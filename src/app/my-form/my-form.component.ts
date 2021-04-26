import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-my-form',
  templateUrl: './my-form.component.html',
  styleUrls: ['./my-form.component.css']
})
export class MyFormComponent implements OnInit {
  myForm: FormGroup;

  /*  exercises = new FormArray([
      new FormControl(),
      new FormControl(),
      new FormControl()
    ]);*/


  constructor(private formBuilder: FormBuilder) {


    this.myForm = this.createMyForm();
  }

  createMyForm(): FormGroup {
    return this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(5)]],
      email: [null, [Validators.required, Validators.email]],
      exercises: this.formBuilder.array([
        'Running',
        'Skipping',
        'Weight lifting'
      ]),

    });
  }

  onSubmit(): void {
    console.log('myForm', this.myForm.value);
  }

  addExercise(): void {
    this.exercises.push(new FormControl());
  }

  ngOnInit(): void {
  }

  get exercises(): FormArray {
    return this.myForm.get('exercises') as FormArray;
  }
}
