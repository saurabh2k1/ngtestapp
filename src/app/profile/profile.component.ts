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
  profile: Profile = {
    id: 1,
    name: 'Saurabh Sharma',
    email: 'saurabh@petronetlng.com',
    bio: 'I am programmer',
    image: null
  }
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
