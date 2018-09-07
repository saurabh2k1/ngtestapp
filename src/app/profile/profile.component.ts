import { Component, OnInit } from '@angular/core';
import { Profile } from '../profile';
import { ProfileService } from '../_services';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profiles: Profile[] = [];

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
  }

  getProfiles(): void {
    this.profileService.getProfiles()
    .pipe(first()).subscribe(profiles => {
      this.profiles = profiles;
    });
  }

}
