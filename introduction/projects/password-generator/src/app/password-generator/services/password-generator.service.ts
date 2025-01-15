import * as Generator from 'generate-password-browser';
import {PasswordSettings} from '../../types';

export class PasswordGeneratorService {
  generate(settings: PasswordSettings) {
      return Generator.generate(settings);
  }
}
