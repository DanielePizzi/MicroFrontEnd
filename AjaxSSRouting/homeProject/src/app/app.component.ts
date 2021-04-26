import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'homeProject';
  background = true;

  @ViewChild("logo", {static:false}) click: ElementRef;


  constructor(public router: Router) {
  }
  ngAfterViewInit(): void {
   this.click.nativeElement.click()
  }

  ngOnInit() {

    this.playAudio();
    setTimeout(()=>{
      this.background=false;
    }, 3000);
  }

  playAudio(){
    let audio = new Audio('assets/audio/intro.mp3');
    audio.load();
    audio.play();
  }

  navigate() {
    window.location.href ='http://localhost:9090/information';
  }

}
