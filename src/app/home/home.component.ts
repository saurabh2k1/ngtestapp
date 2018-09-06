import { Component, OnInit } from '@angular/core';
import { Profile } from '../profile';
import { ProfileService } from '../_services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  profile: Profile;

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.profileService.getProfile().subscribe(profile => {
      this.profile = profile;
    });
  }

}
