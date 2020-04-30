import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Article } from '../models/article';
import { ArticleService } from '../services/article.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-article-creation',
  templateUrl: './article-creation.component.html',
  styleUrls: ['./article-creation.component.css']
})
export class ArticleCreationComponent implements OnInit {

  articleForm : FormGroup;
  private _articles : Observable<Article[]>;

  @Output()
  addArticle : EventEmitter<Article> = new EventEmitter();

  constructor(private fb : FormBuilder, private articleService: ArticleService ) {
    this.articleForm = this.fb.group({
      title: ["Fake Title",Validators.required],
      content : ['', Validators.required ],
      authors : ['', Validators.required ],
    });
   }

  ngOnInit() {
  }

  createArticle(){
    const formModel = this.articleForm.value;
    
    const newArticle = {
      title : formModel.title,
      content : formModel.content,
      authors : formModel.authors
    }

    //this.addArticle.emit(newArticle);
    this.articleService.addArticle( newArticle ).subscribe( () => {
      this._articles = this.articleService.get();
    });
  }

}
