import { Pipe, PipeTransform } from '@angular/core';
import * as i18nIsoCountries from "i18n-iso-countries";
import { Country } from '../interfaces';

@Pipe({
  name: 'CountryPipe'
})
export class CountryPipe implements PipeTransform {
  constructor() {
    i18nIsoCountries.registerLocale(require("i18n-iso-countries/langs/en.json"));
    i18nIsoCountries.registerLocale(require("i18n-iso-countries/langs/fr.json"));
    i18nIsoCountries.registerLocale(require("i18n-iso-countries/langs/de.json"));
  }
  private countries: Country[] = [];
  private previousLanguage: string;

  changeLanguage(currentLanguage: string) {
    this.countries = [];
    this.previousLanguage = currentLanguage;
    const countriesList = i18nIsoCountries.getNames(currentLanguage);
    for (const key in countriesList) {
      if (countriesList.hasOwnProperty(key)) {
        this.countries.push({
          alpha2code: key,
          name: countriesList[key]
        });
      }
    }
  }

  transform(alpha2code: string, currentLanguage: string): string {
    if (this.previousLanguage !== currentLanguage) {
      this.changeLanguage(currentLanguage);
    }
    const country = this.countries.find(c => c.alpha2code === alpha2code);
    return country ? country.name : "";
  }

}
