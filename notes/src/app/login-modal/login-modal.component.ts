import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss'],
})
export class LoginModalComponent  implements OnInit {
  private SWITCH_TO_SIGN_UP_QUESTION = "Don't have an account?";
  private SWITCH_TO_SIGN_UP_LINK = "Sign up!";

  private SWITCH_TO_SIGN_IN_QUESTION = "Already a member?";
  private SWITCH_TO_SIGN_IN_LINK = "Sign in!";

  protected showSignIn = true;
  protected switchQuesion!: string;
  protected switchLink!: string;

  constructor() { }

  ngOnInit() {
    this.initSwitchText()
  }

  public switch() {
    this.showSignIn = !this.showSignIn;
    this.initSwitchText()
  }

  public initSwitchText() {
    if (this.showSignIn) {
      this.switchQuesion = this.SWITCH_TO_SIGN_UP_QUESTION;
      this.switchLink = this.SWITCH_TO_SIGN_UP_LINK;
    } else {
      this.switchQuesion = this.SWITCH_TO_SIGN_IN_QUESTION;
      this.switchLink = this.SWITCH_TO_SIGN_IN_LINK;
    }
  }
}
