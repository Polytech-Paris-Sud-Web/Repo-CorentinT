import {Injectable} from '@angular/core';
import {Article} from "../models/article";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class ArticleService {

  private _article : Observable<Article[]>;

  constructor(private http : HttpClient) {
  }

  public get(): Observable<Article[]> {
    return this.http.get<Article[]>("http://localhost:3000/articles");
  }

  public delete(id:number): Observable<void> {
    return this.http.delete<void>(`http://localhost:3000/articles/${id}`);
  }

  public addArticle(article:Article) : Observable<Article>{
    return this.http.post<Article>("http://localhost:3000/articles",article);
  }

  public getArticle(article:Article) : Observable<Article>{
    return this.http.get<Article>(`http://localhost:3000/articles/${article.id}`);
  }
}
