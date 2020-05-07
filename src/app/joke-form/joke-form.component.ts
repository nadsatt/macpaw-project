import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { JokeService } from '../_services/joke.service';

@Component({
  selector: 'app-joke-form',
  templateUrl: './joke-form.component.html',
  styleUrls: ['./joke-form.component.scss']
})

export class JokeFormComponent implements OnInit {

  public categories: string[];
  public jokeForm: FormGroup;
  @Output() public getJokeByRandom = new EventEmitter();
  @Output() public getJokeByCategory = new EventEmitter<string>();
  @Output() public getJokeBySearch = new EventEmitter<string>();

  constructor(private jokeService: JokeService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.categories = [];
    this.GetJokeCategories();
    this.jokeForm = this.fb.group({
      getJokeBy: 'getJokeByRandom',
      category: '',
      search: ''
    });
  }

  public GetJokeCategories(): void {
    this.jokeService.GetJokeCategories().subscribe({
      next: categories => {
        this.categories = categories;
        this.jokeForm.patchValue({'category': this.categories[0]});},
      error:  err => console.error(err)
    });
  }

  public SelectCategory(category: string): void {
    this.jokeForm.patchValue({'category': category});
  }

  public EmitGetJokeEvent(): void {
    if (this.jokeForm.get('getJokeBy').value === 'getJokeByRandom') {
      this.getJokeByRandom.emit();
    }
    else if (this.jokeForm.get('getJokeBy').value === 'getJokeByCategory') {
      let category = this.jokeForm.get('category').value;
      this.getJokeByCategory.emit(category);
    }
    else {
      let search = this.jokeForm.get('search').value;
      this.getJokeBySearch.emit(search);
    }
  }
}
