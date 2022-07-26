import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ContentEditorComponent } from '../shared/entities/ContentEditorComponent';
import { CodeEditorService } from '../shared/services/code-editor.service';
import { CodeSourceDao } from './codeSourceDao';
import { OutputDao } from './outputDao';

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.sass']
})
export class CodeEditorComponent implements OnInit, OnChanges, ContentEditorComponent {
  @Input() output: String | undefined;
  @Input() data: any;
  @Output() deleteEvent = new EventEmitter<number>();
  @Input() languages = [
    {name: 'python', value: 'python'},
    {name: 'javascript', value: 'js'},
  ]

  @ViewChild('languageSelector')
  languageSelector!: ElementRef;

  constructor(private codeEditorService: CodeEditorService) { }

  ngOnChanges(): void {
  }

  ngOnInit(): void {}

  runCode( code: string): void {
    console.log( this.languageSelector.nativeElement.value);


    const codeSource: CodeSourceDao = {
      language: this.data.language,
      code: code
    };

    this.codeEditorService.postCode(codeSource).subscribe(
      (response) => {
        this.output = JSON.stringify(response.output);
        console.log(response);
      }
    );

  }

  destroyComponent (): void {
    this.deleteEvent.emit(this.data.index);
  }

  onCodeChange(event: any){
    this.data.code = event;
  }

  onLanguageChange(event: any){
    this.data.language = event;
  }


  tabIndentation(): void {
    console.log("tabIndent");
  }

}
