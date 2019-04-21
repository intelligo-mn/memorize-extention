import { Component, OnInit } from '@angular/core';
import { WordService } from './word.service';
import { Word } from './word'
import { Observable } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  title = 'Memorize Extention';
  words: Observable<Word[]>;
  flashWord: Word;
  lastChangeDate = localStorage.lastChangeDate;
  todayDate = (new Date).getDate();
  length = 0;
  menuIsToggled = !1;
  pickerIsToggled = !1;
  memorizeIndex = 1;
  listIsToggled = !1;
  wordSize = 0;

  constructor(private wordService: WordService) { }

  ngOnInit() {
    this.reloadData();
    // this.applyDisplay();
    this.setIndex(length)
  }

  reloadData() {
    this.wordService.getWordsList().subscribe(resp => {
      // display its headers
      this.words = resp['memorize']
      this.wordSize = resp['memorize'].length
    });
  }

  setIndex(length){
    var index = 0,
    firstTimeUse = void 0 === this.lastChangeDate,
    newDay = this.todayDate != this.lastChangeDate;
    return firstTimeUse || newDay ? (index = Math.floor(Math.random() * length), localStorage.lastChangeDate = (new Date).getDate(), localStorage.lastMemorizeIndex = index, index) : index = localStorage.lastMemorizeIndex
  }

  setNewMemorize () {
    
    var newIndex = Math.floor(Math.random() * this.wordSize);
    localStorage.lastChangeDate = (new Date).getDate(), localStorage.lastMemorizeIndex = newIndex;
    this.flashWord = this.words[newIndex];
    
  }

  applyDisplay() {
    const duudlagaChanged = localStorage.duudlagaChanged;
    const meaningChanged = localStorage.meaningChanged;
    switch (duudlagaChanged) {
        case "changed":
            let duudlagaDisplay = localStorage.duudlagaDisplay;
            break;
        default:
            localStorage.duudlagaDisplay = "block", duudlagaDisplay = "block"
    }
    switch (meaningChanged) {
        case "changed":
            let meaningDisplay = localStorage.meaningDisplay;
            break;
        default:
            localStorage.meaningDisplay = "block", meaningDisplay = "block"
    }
  }

  toggleSettingsMenu(){
    this.menuIsToggled ? (
      ((document.querySelector("#settings-menu") as HTMLElement).style.display="none"), 
      this.menuIsToggled = !1, 
      this.hidePicker(), 
      document.querySelector("#list-wrapper").classList.remove('show-list')) : ((document.querySelector("#memorize-info") as HTMLElement).style.display="block"), 
      (document.querySelector("#settings-menu") as HTMLElement).style.display = "block", 
      this.menuIsToggled = !0
  }

  hidePicker() {
    (document.querySelector("#picker-wrapper") as HTMLElement).classList.remove("show-picker"), 
    (document.querySelector(".picker") as HTMLElement).style.display="none", this.pickerIsToggled = !1
  }

  showMemorizeInfo() {
    (document.querySelector("#memorize-info") as HTMLElement).style.display = "block", this.hidePicker()
  }

  toggleList() {
    this.listIsToggled ? ((document.querySelector("#list-wrapper") as HTMLElement).classList.remove("show-list"), 
    this.listIsToggled = !1) : (document.querySelector("#list-wrapper").className = "show-list", 
    (document.querySelector("#memorize-info") as HTMLElement).style.display = "none"), 
    this.hidePicker(), 
    this.listIsToggled = !0 
  }
}
