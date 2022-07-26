import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ContentEditorComponent } from '../shared/entities/ContentEditorComponent';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss']
})
export class TextEditorComponent implements OnInit, ContentEditorComponent {
  @Input() data: any;
  @Output() deleteEvent = new EventEmitter<number>();


  constructor() { }

  ngOnInit(): void {
  }

  destroyComponent (): void {
    this.deleteEvent.emit(this.data.index);
  }


  onTextChange(event: any){
    this.data.text = event;
  }
}
