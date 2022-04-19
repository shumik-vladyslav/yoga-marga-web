import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireService } from '../angular-fire.service';
import {IVService} from "../iv.service"
@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit {

  constructor(
    private AFS: AngularFirestore,
    private AFService: AngularFireService,
    private AFAuth: AngularFireAuth,
    private IV: IVService
  ) {

    setTimeout(() => {


    }, 2400);




    this.AFService.GetPractices().subscribe(res => {
      this.practices = res;
      console.log(this.practices)
    })



  }
  practices

  userDataAll

  user

  userId

  status

  userData = {
    name: "",
    lastname: "",
    spiritalName: "",
    status: "",
    password: "",
    confirmPassword: "",
    course: ""
  }

  goalsArr: any = [];

  statuses: any = [];

  userEmail = this.AFService.userId;

  practiceName

  ngOnInit(): void {
    this.statuses = {
      "10": "Новичок",
      "11": "Заочный Символ Веры Санатана Дхармы",
      "12": "Заочный Символ Веры Прибежища",
      "13": "Очный Символ Веры Санатана Дхармы",
      "14": "Очный Символ Веры Прибежища",
      "15": "Грихастха",
      "16": "Карма-санньяси",
      "17": "Ванапрастха",
      "18": "Брахмачари",
      "19": "Санньяси"
    };
    this.getUserData();
  
  }


  onToggleMenu() {

    let i = document.getElementById("menu");
    i.classList.toggle("activeMenu")

    let t = document.getElementById("bg");
    t.classList.toggle("wrapper__bg")
  }

  async getUserData() {


    const auth = JSON.parse(localStorage.getItem("auth"));
    
    this.userId = auth.id;
    this.userData.spiritalName = auth.spiritual_name;
    this.userData.name = auth.name;
    this.userData.lastname = auth.lastname;
    this.userData.status = this.statuses[auth.status];
    this.userData.course = auth.course;
  
    this.init();
   
    /*
    await this.AFAuth.authState.subscribe(user => {
      this.userId = user.email;

      console.log(this.userId);

      this.AFS.doc(`users/${this.userId}`).valueChanges().subscribe(res => {
        this.userDataAll = res;
        console.log(this.userDataAll);
        this.userData.spiritalName = this.userDataAll.spiritual_name
        this.userData.name = this.userDataAll.full_name
        this.userData.status = this.userDataAll.status
        this.init()
      })
    })*/





  }

  init() {
    for (const key in this.userDataAll.practices) {

      if (Object.prototype.hasOwnProperty.call(this.userDataAll.practices, key)) {

        const element = this.userDataAll.practices[key];

        if (element.hasOwnProperty("spentTimeGoal") && element.spentTimeGoal > 0) {

          let Goalindex = ((element.spentTime / element.spentTimeGoal) * 100).toFixed(0)


          this.goalsArr.push([[key], element, Goalindex])


          console.log(this.goalsArr)

          this.practices.forEach(element => {

            if (element.id == [key]) {
              console.log([key])
              this.goalsArr.forEach(setting => {
                if (setting[0] == element.id && setting[3] !== null || undefined) {
                  setting.push(element)
                }
              });


            }

          });

        }
        if (element.hasOwnProperty("amountCounterGoal")) {
          console.log("uraaa!!!")
          let Goalindex1 = ((element.amountCounter / element.amountCounterGoal) * 100).toFixed(0)


          this.goalsArr.push([[key], element, Goalindex1])


          console.log(this.goalsArr)

          this.practices.forEach(element => {

            if (element.id == [key]) {
              console.log([key])
              this.goalsArr.forEach(setting => {
                if (setting[0] == element.id && setting[3] !== null || undefined) {
                  setting.push(element)
                }
              });


            }

          });
        }

      }
    }
    console.log(this.goalsArr)
  }


  changeUserData() {
    if(this.userData.password && this.userData.password != this.userData.confirmPassword) {
      alert("Пароли не совпадают");
      return false;
    }
    delete this.userData.course;
    delete this.userData.status;
    this.IV.api("profileUpdate", {id: this.userId, ...this.userData}).subscribe();
    alert("Успешно!");
    return true; 
    /*
    if (this.userDataAll !== null || undefined) {
      this.AFS.doc(`users/${this.userId}`).update(this.userDataAll)
    }*/
  }

  CheckButto() {
    console.log("checed")
  }
  CheckButton

  goldThemeCheckbox

  setAll(completed: boolean) {
    this.userDataAll.themeGold = completed;
    console.log(this.userDataAll);
    setTimeout(() => {
      if (this.userDataAll.themeGold == true) {
        let bg = document.getElementById('wrapper__bg');
        bg.classList.toggle("Gold")
      }
    }, 1000);

  }



  @Output() onChanged = new EventEmitter<boolean>();

  change(increased: any) {
    console.log(increased)
    this.onChanged.emit(true);
  }

}
