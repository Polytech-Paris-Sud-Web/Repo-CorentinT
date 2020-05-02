import {Component, OnInit} from '@angular/core';
import {Article} from "../models/article";
import {ArticleService} from "../services/article.service";
import {Observable} from "rxjs";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  _articles : Article[];
  _all_articles : Article[];
  searchForm: FormGroup;

  constructor(private fb: FormBuilder,private articleService: ArticleService) {
    this.searchForm = this.fb.group({
      search: ["", Validators.required],
    });
  }

  //Dynamic update of articles
  majArticles(){
    this.articleService.get().subscribe((arr_articles) => {
      this._articles = arr_articles;
      this._all_articles = this._articles;
    });
  }

  //Init
  ngOnInit() {
    this.majArticles();
    this.onChanges();
  }

  //Check if search input is updated
  onChanges() {
    this.searchForm.get('search').valueChanges.subscribe(val => {
      //Just display all the articles if empty val.
      if(val == undefined || val == "")
         this._articles = this._all_articles;
      else{
        //Filter the loading artiles
        this._articles = this._all_articles.filter(
          (customArticle) => 
            customArticle.title.toLowerCase().match(val.toLowerCase()) || //Search by title
            customArticle.content.toLowerCase().match(val.toLowerCase()) || //Search by content
            customArticle.authors.toLowerCase().match(val.toLowerCase()) //Search by authors
          );
      }
    });
   
  }

  //Delete an article
  delete(article: Article){
    this.articleService.delete(article.id).subscribe(()=>{
      this.majArticles();
    });
  }

  //Add an article
  add(article : Article){
    this.articleService.addArticle( article ).subscribe( () => {
      this.majArticles();
    });
  }

}
