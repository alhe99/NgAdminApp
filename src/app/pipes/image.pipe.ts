import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  private API: string = '';

  constructor() {
    this.API = environment.URL_API;
  }
  transform(image: string, type: string = 'user'): unknown {

    const URL = this.API + '/image';

    if (!image) {
      return URL + '/users/noimage';
    }

    if (image.indexOf('https') >= 0) {
      return image;
    }

    switch (type) {
      case 'user':
        return URL + '/users/' + image;
        break;
      case 'doctor':
        return URL + '/doctors/' + image;
        break;
      case 'hospital':
        return URL + '/hospitals/' + image;
        break;
    }
    return 'WORKS';
  }

}
