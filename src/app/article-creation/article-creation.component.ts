import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Article } from '../models/article';
import { ArticleService } from '../services/article.service';
import { Observable } from 'rxjs';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

//Modal in order to confirme the creation
@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Article added !</h4>
    </div>
    <div class="modal-body">
      <p>Your article has been added. Return in the list to display it.</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
    </div>
  `
})
export class NgbdModalContent {
  @Input() name;

  constructor(public activeModal: NgbActiveModal) { }
}

//ArticleCreationComponet
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

  constructor(private fb : FormBuilder, private articleService: ArticleService,private modalService : NgbModal ) {
    this.articleForm = this.fb.group({
      title: ["",Validators.required],
      content : ['', Validators.required ],
      authors : ['', Validators.required ],
    });
   }

  ngOnInit() {}

  createArticle(){
    const formModel = this.articleForm.value;
    
    const newArticle = {
      title : formModel.title,
      content : formModel.content,
      authors : formModel.authors
    }

    this.articleService.addArticle( newArticle ).subscribe( () => {
      this._articles = this.articleService.get();
      this.confirmCreation();
    });
  }


  confirmCreation(){
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.name = 'World';
  }

}
