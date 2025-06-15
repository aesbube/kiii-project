import { Component } from '@angular/core';
import { HomeCardComponent } from "../home-card/home-card.component";

@Component({
  selector: 'app-home2',
  imports: [HomeCardComponent],
  templateUrl: './home2.component.html',
  styleUrl: './home2.component.css',
  host: {
    '[style.--custom-flex]': 'getFlexSize()',
  },
})
export class Home2Component {

  flex = 1
  flexUp1 = false
  flexUp2 = false

  getFlexSize(){
    return this.flex
  }

  setFlex(customFlex : number): void{
    if(customFlex == 0){
      this.flexUp1 = false
      this.flexUp2 = false
    }
    else if (customFlex == 1){
      this.flexUp1 = true
    }
    else if (customFlex == 2){
      this.flexUp2 = true
    }
    console.log(this.flex)
  }

}
