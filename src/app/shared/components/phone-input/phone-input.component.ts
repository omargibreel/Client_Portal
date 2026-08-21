import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewChild,
  forwardRef,
  inject,
  signal,
  computed
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  Validator,
  AbstractControl,
  ValidationErrors,
  FormsModule
} from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import {
  AsYouType,
  parsePhoneNumberFromString,
  CountryCode,
  getExampleNumber
} from 'libphonenumber-js';

export interface CountryData {
  code: CountryCode;
  nameEn: string;
  nameAr: string;
  dialCode: string;
  flag: string;
  placeholder: string;
}

export const COUNTRIES: CountryData[] = [
  // Primary MENA & Region
  { code: 'EG', nameEn: 'Egypt', nameAr: 'مصر', dialCode: '+20', flag: '🇪🇬', placeholder: '010 1234 5678' },
  { code: 'SA', nameEn: 'Saudi Arabia', nameAr: 'المملكة العربية السعودية', dialCode: '+966', flag: '🇸🇦', placeholder: '50 123 4567' },
  { code: 'AE', nameEn: 'United Arab Emirates', nameAr: 'الإمارات العربية المتحدة', dialCode: '+971', flag: '🇦🇪', placeholder: '50 123 4567' },
  { code: 'KW', nameEn: 'Kuwait', nameAr: 'الكويت', dialCode: '+965', flag: '🇰🇼', placeholder: '5012 3456' },
  { code: 'QA', nameEn: 'Qatar', nameAr: 'قطر', dialCode: '+974', flag: '🇶🇦', placeholder: '3312 3456' },
  { code: 'BH', nameEn: 'Bahrain', nameAr: 'البحرين', dialCode: '+973', flag: '🇧🇭', placeholder: '3600 1234' },
  { code: 'OM', nameEn: 'Oman', nameAr: 'عُمان', dialCode: '+968', flag: '🇴🇲', placeholder: '9123 4567' },
  { code: 'JO', nameEn: 'Jordan', nameAr: 'الأردن', dialCode: '+962', flag: '🇯🇴', placeholder: '7 9012 3456' },
  { code: 'LB', nameEn: 'Lebanon', nameAr: 'لبنان', dialCode: '+961', flag: '🇱🇧', placeholder: '70 123 456' },
  { code: 'IQ', nameEn: 'Iraq', nameAr: 'العراق', dialCode: '+964', flag: '🇮🇶', placeholder: '770 123 4567' },
  { code: 'MA', nameEn: 'Morocco', nameAr: 'المغرب', dialCode: '+212', flag: '🇲🇦', placeholder: '612-345678' },
  { code: 'DZ', nameEn: 'Algeria', nameAr: 'الجزائر', dialCode: '+213', flag: '🇩🇿', placeholder: '551 23 45 67' },
  { code: 'TN', nameEn: 'Tunisia', nameAr: 'تونس', dialCode: '+216', flag: '🇹🇳', placeholder: '20 123 456' },
  { code: 'LY', nameEn: 'Libya', nameAr: 'ليبيا', dialCode: '+218', flag: '🇱🇾', placeholder: '91 234 5678' },
  { code: 'SD', nameEn: 'Sudan', nameAr: 'السودان', dialCode: '+249', flag: '🇸🇩', placeholder: '91 234 5678' },
  { code: 'PS', nameEn: 'Palestine', nameAr: 'فلسطين', dialCode: '+970', flag: '🇵🇸', placeholder: '59 123 4567' },
  { code: 'YE', nameEn: 'Yemen', nameAr: 'اليمن', dialCode: '+967', flag: '🇾🇪', placeholder: '71 234 567' },
  { code: 'SY', nameEn: 'Syria', nameAr: 'سوريا', dialCode: '+963', flag: '🇸🇾', placeholder: '94 123 4567' },

  // Global & Americas / Europe / Asia
  { code: 'US', nameEn: 'United States', nameAr: 'الولايات المتحدة', dialCode: '+1', flag: '🇺🇸', placeholder: '(555) 123-4567' },
  { code: 'GB', nameEn: 'United Kingdom', nameAr: 'المملكة المتحدة', dialCode: '+44', flag: '🇬🇧', placeholder: '07123 456789' },
  { code: 'CA', nameEn: 'Canada', nameAr: 'كندا', dialCode: '+1', flag: '🇨🇦', placeholder: '(555) 123-4567' },
  { code: 'DE', nameEn: 'Germany', nameAr: 'ألمانيا', dialCode: '+49', flag: '🇩🇪', placeholder: '0151 12345678' },
  { code: 'FR', nameEn: 'France', nameAr: 'فرنسا', dialCode: '+33', flag: '🇫🇷', placeholder: '06 12 34 56 78' },
  { code: 'IT', nameEn: 'Italy', nameAr: 'إيطاليا', dialCode: '+39', flag: '🇮🇹', placeholder: '312 345 6789' },
  { code: 'ES', nameEn: 'Spain', nameAr: 'إسبانيا', dialCode: '+34', flag: '🇪🇸', placeholder: '612 34 56 78' },
  { code: 'TR', nameEn: 'Turkey', nameAr: 'تركيا', dialCode: '+90', flag: '🇹🇷', placeholder: '501 234 56 78' },
  { code: 'NL', nameEn: 'Netherlands', nameAr: 'هولندا', dialCode: '+31', flag: '🇳🇱', placeholder: '06 12345678' },
  { code: 'CH', nameEn: 'Switzerland', nameAr: 'سويسرا', dialCode: '+41', flag: '🇨🇭', placeholder: '078 123 45 67' },
  { code: 'SE', nameEn: 'Sweden', nameAr: 'السويد', dialCode: '+46', flag: '🇸🇪', placeholder: '070-123 45 67' },
  { code: 'NO', nameEn: 'Norway', nameAr: 'النرويج', dialCode: '+47', flag: '🇳🇴', placeholder: '412 34 567' },
  { code: 'IN', nameEn: 'India', nameAr: 'الهند', dialCode: '+91', flag: '🇮🇳', placeholder: '98123 45678' },
  { code: 'PK', nameEn: 'Pakistan', nameAr: 'باكستان', dialCode: '+92', flag: '🇵🇰', placeholder: '0301 2345678' },
  { code: 'CN', nameEn: 'China', nameAr: 'الصين', dialCode: '+86', flag: '🇨🇳', placeholder: '131 2345 6789' },
  { code: 'JP', nameEn: 'Japan', nameAr: 'اليابان', dialCode: '+81', flag: '🇯🇵', placeholder: '090-1234-5678' },
  { code: 'KR', nameEn: 'South Korea', nameAr: 'كوريا الجنوبية', dialCode: '+82', flag: '🇰🇷', placeholder: '010-1234-5678' },
  { code: 'AU', nameEn: 'Australia', nameAr: 'أستراليا', dialCode: '+61', flag: '🇦🇺', placeholder: '0412 345 678' },
  { code: 'BR', nameEn: 'Brazil', nameAr: 'البرازيل', dialCode: '+55', flag: '🇧🇷', placeholder: '(11) 91234-5678' },
  { code: 'ZA', nameEn: 'South Africa', nameAr: 'جنوب أفريقيا', dialCode: '+27', flag: '🇿🇦', placeholder: '082 123 4567' },
  { code: 'NG', nameEn: 'Nigeria', nameAr: 'نيجيريا', dialCode: '+234', flag: '🇳🇬', placeholder: '0802 123 4567' },
  { code: 'SG', nameEn: 'Singapore', nameAr: 'سنغافورة', dialCode: '+65', flag: '🇸🇬', placeholder: '8123 4567' },
  { code: 'MY', nameEn: 'Malaysia', nameAr: 'ماليزيا', dialCode: '+60', flag: '🇲🇾', placeholder: '012-345 6789' }
];

export function isValidEgyptMobile(raw: string): boolean {
  if (!raw) return false;
  let digits = raw.replace(/\D/g, '');
  if (digits.startsWith('20') && digits.length >= 12) {
    digits = digits.substring(2);
  }
  if (digits.startsWith('0')) {
    return /^(010|011|012|015)\d{8}$/.test(digits);
  }
  return /^(10|11|12|15)\d{8}$/.test(digits);
}

@Component({
  selector: 'app-phone-input',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PhoneInputComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => PhoneInputComponent),
      multi: true
    }
  ],
  template: `
    <div
      class="phone-input-wrapper"
      [class.is-open]="isDropdownOpen()"
      [class.is-focused]="isInputFocused()"
      [class.is-disabled]="isDisabled"
      [class.is-invalid]="hasError()"
    >
      <!-- Country Dropdown Trigger Button -->
      <button
        type="button"
        class="country-picker-btn"
        (click)="toggleDropdown($event)"
        [attr.aria-expanded]="isDropdownOpen()"
        [attr.aria-label]="selectedCountry().nameEn + ' ' + selectedCountry().dialCode"
        [disabled]="isDisabled"
      >
        <span class="flag-icon" aria-hidden="true">{{ selectedCountry().flag }}</span>
        <span class="dial-code" dir="ltr">{{ selectedCountry().dialCode }}</span>
        <svg
          class="chevron-icon"
          [class.rotate]="isDropdownOpen()"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>

      <div class="divider-line" aria-hidden="true"></div>

      <!-- Phone Number National Text Input -->
      <div class="national-input-box">
        <input
          #phoneInput
          [id]="id"
          type="tel"
          class="phone-text-input"
          [placeholder]="selectedCountry().placeholder"
          [value]="nationalDisplayValue()"
          (input)="onInputChange($event)"
          (keydown)="onInputKeyDown($event)"
          (focus)="onInputFocus()"
          (blur)="onInputBlur()"
          (paste)="onPaste($event)"
          [disabled]="isDisabled"
          autocomplete="tel-national"
          dir="ltr"
        />
      </div>

      <!-- Country Dropdown Overlay -->
      <div *ngIf="isDropdownOpen()" class="country-dropdown-panel" role="listbox">
        <!-- Search Field inside Dropdown -->
        <div class="search-box">
          <svg
            class="search-icon"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            #searchInput
            type="text"
            class="search-input"
            [placeholder]="'form.phoneSearchPlaceholder' | translate"
            [value]="searchQuery()"
            (input)="onSearchInput($event)"
            (keydown)="onSearchKeyDown($event)"
            aria-label="Search countries"
          />
        </div>

        <!-- Filtered Country List -->
        <ul class="country-list" tabindex="-1">
          <li
            *ngFor="let country of filteredCountries(); let idx = index"
            class="country-item"
            [class.selected]="country.code === selectedCountry().code"
            (click)="selectCountry(country, $event)"
            role="option"
            [attr.aria-selected]="country.code === selectedCountry().code"
          >
            <span class="country-flag">{{ country.flag }}</span>
            <span class="country-name">
              {{ isArabic() ? country.nameAr : country.nameEn }}
            </span>
            <span class="country-code" dir="ltr">{{ country.dialCode }}</span>
            <span *ngIf="country.code === selectedCountry().code" class="check-mark" aria-hidden="true">✓</span>
          </li>
          <li *ngIf="filteredCountries().length === 0" class="no-results">
            {{ 'form.noCountriesFound' | translate }}
          </li>
        </ul>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
      position: relative;
    }

    .phone-input-wrapper {
      display: flex;
      align-items: center;
      width: 100%;
      background-color: var(--color-neutral-50, #FAF8F7);
      border: 1.5px solid var(--color-neutral-300, #C9C0C2);
      border-radius: var(--radius-md, 12px);
      transition: var(--transition-standard, all 0.25s cubic-bezier(0.16, 1, 0.3, 1));
      position: relative;
      user-select: none;

      &.is-focused,
      &.is-open {
        border-color: var(--color-primary-500, #643951);
        background-color: #ffffff;
        box-shadow: 0 0 0 4px rgba(100, 57, 81, 0.1);
      }

      &.is-invalid {
        border-color: var(--color-error, #b8443f);
        background-color: #fffaf9;

        &.is-focused {
          box-shadow: 0 0 0 4px rgba(184, 68, 63, 0.12);
        }
      }

      &.is-disabled {
        opacity: 0.6;
        cursor: not-allowed;
        background-color: var(--color-neutral-100, #F1ECEC);
      }
    }

    .country-picker-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.45rem;
      padding: 0.75rem 0.85rem;
      background: transparent;
      border: none;
      color: var(--color-primary-900, #1C1017);
      font-size: 0.95rem;
      font-weight: 600;
      cursor: pointer;
      flex-shrink: 0;
      border-radius: var(--radius-md, 12px) 0 0 var(--radius-md, 12px);
      transition: background-color 0.2s ease;

      [dir="rtl"] & {
        border-radius: 0 var(--radius-md, 12px) var(--radius-md, 12px) 0;
      }

      &:hover:not(:disabled) {
        background-color: rgba(100, 57, 81, 0.05);
      }

      .flag-icon {
        font-size: 1.25rem;
        line-height: 1;
        display: inline-block;
      }

      .dial-code {
        font-size: 0.92rem;
        font-weight: 700;
        color: var(--color-primary-800, #2E1A25);
      }

      .chevron-icon {
        color: var(--color-neutral-500, #8B7F82);
        transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);

        &.rotate {
          transform: rotate(180deg);
        }
      }
    }

    .divider-line {
      width: 1px;
      height: 24px;
      background-color: var(--color-neutral-300, #C9C0C2);
      flex-shrink: 0;
    }

    .national-input-box {
      flex: 1;
      min-width: 0;
      display: flex;
      align-items: center;
    }

    .phone-text-input {
      width: 100%;
      padding: 0.75rem 0.9rem;
      font-size: 0.95rem;
      font-weight: 500;
      color: var(--color-text, #1C1017);
      background: transparent;
      border: none;
      outline: none;
      font-family: inherit;
      letter-spacing: 0.02em;

      &::placeholder {
        color: var(--color-neutral-500, #8B7F82);
        opacity: 0.7;
        font-weight: 400;
      }

      &:disabled {
        cursor: not-allowed;
      }
    }

    /* Country Dropdown Panel */
    .country-dropdown-panel {
      position: absolute;
      top: calc(100% + 6px);
      inset-inline-start: 0;
      width: 320px;
      max-width: calc(100vw - 2rem);
      max-height: 320px;
      background: #ffffff;
      border: 1px solid rgba(100, 57, 81, 0.18);
      border-radius: var(--radius-md, 12px);
      box-shadow: 0 14px 40px rgba(28, 16, 23, 0.18), 0 4px 12px rgba(0, 0, 0, 0.06);
      z-index: 1050;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      animation: dropdownFadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    .search-box {
      padding: 0.65rem 0.75rem;
      background-color: var(--color-neutral-50, #FAF8F7);
      border-block-end: 1px solid var(--color-neutral-100, #F1ECEC);
      display: flex;
      align-items: center;
      gap: 0.5rem;
      position: sticky;
      top: 0;
      z-index: 2;

      .search-icon {
        color: var(--color-neutral-500, #8B7F82);
        flex-shrink: 0;
      }

      .search-input {
        width: 100%;
        border: none;
        background: transparent;
        font-size: 0.88rem;
        color: var(--color-text, #1C1017);
        outline: none;
        font-family: inherit;

        &::placeholder {
          color: var(--color-neutral-500, #8B7F82);
          opacity: 0.75;
        }
      }
    }

    .country-list {
      list-style: none;
      margin: 0;
      padding: 0.35rem 0;
      overflow-y: auto;
      max-height: 250px;
      scrollbar-width: thin;
      scrollbar-color: var(--color-neutral-300) transparent;

      &::-webkit-scrollbar {
        width: 6px;
      }
      &::-webkit-scrollbar-thumb {
        background-color: var(--color-neutral-300);
        border-radius: 4px;
      }
    }

    .country-item {
      display: flex;
      align-items: center;
      gap: 0.65rem;
      padding: 0.55rem 0.85rem;
      font-size: 0.88rem;
      cursor: pointer;
      transition: background-color 0.15s ease;
      color: var(--color-primary-900, #1C1017);

      &:hover {
        background-color: var(--color-primary-50, #F6EEF2);
      }

      &.selected {
        background-color: rgba(100, 57, 81, 0.08);
        font-weight: 700;
        color: var(--color-primary-600, #522E42);
      }

      .country-flag {
        font-size: 1.15rem;
        line-height: 1;
        flex-shrink: 0;
      }

      .country-name {
        flex: 1;
        min-width: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .country-code {
        color: var(--color-neutral-500, #8B7F82);
        font-weight: 600;
        font-size: 0.82rem;
        flex-shrink: 0;
      }

      .check-mark {
        color: var(--color-primary-500, #643951);
        font-weight: 900;
        font-size: 0.85rem;
        margin-inline-start: 0.25rem;
      }
    }

    .no-results {
      padding: 1.25rem;
      text-align: center;
      font-size: 0.85rem;
      color: var(--color-neutral-500, #8B7F82);
    }

    @keyframes dropdownFadeIn {
      from {
        opacity: 0;
        transform: translateY(-6px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `]
})
export class PhoneInputComponent implements OnInit, ControlValueAccessor, Validator {
  @Input() id = 'phone';
  @Input() defaultCountryCode: CountryCode = 'EG';
  @Input() required = false;

  @ViewChild('phoneInput', { static: false }) phoneInputRef?: ElementRef<HTMLInputElement>;

  private readonly elementRef = inject(ElementRef);
  private readonly translate = inject(TranslateService);

  readonly allCountries = COUNTRIES;
  selectedCountry = signal<CountryData>(COUNTRIES[0]);
  nationalDisplayValue = signal<string>('');
  rawE164Value = signal<string>('');
  isDropdownOpen = signal<boolean>(false);
  isInputFocused = signal<boolean>(false);
  searchQuery = signal<string>('');
  hasError = signal<boolean>(false);
  isDisabled = false;

  readonly isArabic = computed(() => this.translate.currentLang === 'ar' || this.translate.defaultLang === 'ar');

  readonly filteredCountries = computed(() => {
    const q = this.searchQuery().trim().toLowerCase();
    if (!q) {
      return this.allCountries;
    }
    return this.allCountries.filter((c) => {
      const nameEnMatch = c.nameEn.toLowerCase().includes(q);
      const nameArMatch = c.nameAr.toLowerCase().includes(q);
      const dialCodeMatch = c.dialCode.replace('+', '').includes(q.replace('+', ''));
      const codeMatch = c.code.toLowerCase().includes(q);
      return nameEnMatch || nameArMatch || dialCodeMatch || codeMatch;
    });
  });

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  ngOnInit(): void {
    const found = this.allCountries.find((c) => c.code === this.defaultCountryCode);
    if (found) {
      this.selectedCountry.set(found);
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.closeDropdown();
    }
  }

  @HostListener('keydown.escape')
  onEscape(): void {
    this.closeDropdown();
  }

  toggleDropdown(event: Event): void {
    event.stopPropagation();
    if (this.isDisabled) return;
    if (this.isDropdownOpen()) {
      this.closeDropdown();
    } else {
      this.openDropdown();
    }
  }

  openDropdown(): void {
    this.isDropdownOpen.set(true);
    this.searchQuery.set('');
    setTimeout(() => {
      const searchInput = this.elementRef.nativeElement.querySelector('.search-input') as HTMLInputElement | null;
      searchInput?.focus();
    }, 50);
  }

  closeDropdown(): void {
    this.isDropdownOpen.set(false);
    this.searchQuery.set('');
  }

  selectCountry(country: CountryData, event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    this.selectedCountry.set(country);
    this.closeDropdown();

    // Re-format current national number with the new country code
    this.updateFormattedValue(this.nationalDisplayValue(), country.code);
  }

  onSearchInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery.set(input.value);
  }

  onSearchKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      const filtered = this.filteredCountries();
      if (filtered.length > 0) {
        this.selectCountry(filtered[0]);
      }
    }
  }

  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const oldCursor = input.selectionStart ?? input.value.length;
    const digitsBeforeCursor = (input.value.slice(0, oldCursor).match(/\d/g) || []).length;
    this.updateFormattedValue(input.value, this.selectedCountry().code, digitsBeforeCursor);
  }

  onInputKeyDown(event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement;
    if (event.key === 'Backspace') {
      const start = input.selectionStart ?? 0;
      const end = input.selectionEnd ?? 0;
      if (start === end && start > 0) {
        const charBefore = input.value[start - 1];
        if (/\D/.test(charBefore)) {
          // User is deleting right after a space or non-digit separator
          event.preventDefault();
          const before = input.value.slice(0, start - 1);
          const after = input.value.slice(start);
          const digitsBefore = (before.match(/\d/g) || []).length;
          if (digitsBefore > 0) {
            let lastDigitCount = 0;
            let cutIdx = -1;
            for (let i = 0; i < before.length; i++) {
              if (/\d/.test(before[i])) {
                lastDigitCount++;
                if (lastDigitCount === digitsBefore) {
                  cutIdx = i;
                  break;
                }
              }
            }
            const newRaw = (cutIdx !== -1 ? before.slice(0, cutIdx) + before.slice(cutIdx + 1) : before) + after;
            this.updateFormattedValue(newRaw, this.selectedCountry().code, digitsBefore - 1);
          }
        }
      }
    }
  }

  onPaste(event: ClipboardEvent): void {
    const pastedText = event.clipboardData?.getData('text') ?? '';
    if (pastedText.startsWith('+') || pastedText.startsWith('00')) {
      const cleaned = pastedText.replace(/^00/, '+');
      const parsed = parsePhoneNumberFromString(cleaned);
      if (parsed && parsed.country) {
        const countryMatch = this.allCountries.find((c) => c.code === parsed.country);
        if (countryMatch) {
          event.preventDefault();
          this.selectedCountry.set(countryMatch);
          this.updateFormattedValue(parsed.nationalNumber, countryMatch.code);
          return;
        }
      }
    }
  }

  private updateFormattedValue(
    inputVal: string,
    countryCode: CountryCode,
    desiredCursorDigits?: number
  ): void {
    // Strip non-digits except if starting with leading +
    const rawDigits = inputVal.replace(/[^\d+]/g, '');

    // Format using AsYouType
    const asYouType = new AsYouType(countryCode);
    const formatted = asYouType.input(rawDigits);
    this.nationalDisplayValue.set(formatted);

    // Keep cursor position stable on the input element
    if (this.phoneInputRef?.nativeElement) {
      const inputEl = this.phoneInputRef.nativeElement;
      inputEl.value = formatted;

      if (desiredCursorDigits !== undefined) {
        let newPos = 0;
        let digitsCounted = 0;
        for (let i = 0; i < formatted.length; i++) {
          if (/\d/.test(formatted[i])) {
            digitsCounted++;
          }
          if (digitsCounted === desiredCursorDigits) {
            newPos = i + 1;
            break;
          }
        }
        if (desiredCursorDigits === 0) {
          newPos = 0;
        }
        setTimeout(() => {
          inputEl.setSelectionRange(newPos, newPos);
        }, 0);
      }
    }

    // Validation & E.164 conversion
    if (countryCode === 'EG') {
      const isEgValid = isValidEgyptMobile(rawDigits);
      if (isEgValid) {
        let cleanDigits = rawDigits.replace(/\D/g, '');
        if (cleanDigits.startsWith('20') && cleanDigits.length >= 12) {
          cleanDigits = cleanDigits.substring(2);
        }
        const nationalWithoutZero = cleanDigits.replace(/^0/, '');
        const e164 = `+20${nationalWithoutZero}`;
        this.rawE164Value.set(e164);
        this.onChange(e164);
        this.hasError.set(false);
      } else {
        if (rawDigits.length > 0) {
          const cleanDigits = rawDigits.replace(/\D/g, '').replace(/^0+/, '');
          const fallbackE164 = `+20${cleanDigits}`;
          this.rawE164Value.set(fallbackE164);
          this.onChange(fallbackE164);
        } else {
          this.rawE164Value.set('');
          this.onChange('');
        }
        this.hasError.set(rawDigits.length > 0);
      }
    } else {
      const parsed = parsePhoneNumberFromString(rawDigits, countryCode);
      if (parsed && parsed.isValid()) {
        const e164 = parsed.format('E.164');
        this.rawE164Value.set(e164);
        this.onChange(e164);
        this.hasError.set(false);
      } else {
        if (rawDigits.length > 0) {
          const fallbackE164 = this.selectedCountry().dialCode + rawDigits.replace(/^0+/, '');
          this.rawE164Value.set(fallbackE164);
          this.onChange(fallbackE164);
        } else {
          this.rawE164Value.set('');
          this.onChange('');
        }
        this.hasError.set(rawDigits.length > 0);
      }
    }
  }

  onInputFocus(): void {
    this.isInputFocused.set(true);
  }

  onInputBlur(): void {
    this.isInputFocused.set(false);
    this.onTouched();
  }

  // ControlValueAccessor implementations
  writeValue(value: unknown): void {
    if (typeof value === 'string' && value.trim()) {
      const parsed = parsePhoneNumberFromString(value);
      if (parsed && parsed.country) {
        const countryMatch = this.allCountries.find((c) => c.code === parsed.country);
        if (countryMatch) {
          this.selectedCountry.set(countryMatch);
        }
        const asYouType = new AsYouType(parsed.country);
        this.nationalDisplayValue.set(asYouType.input(parsed.nationalNumber));
        this.rawE164Value.set(parsed.format('E.164'));
        return;
      }

      // Fallback
      this.nationalDisplayValue.set(value);
      this.rawE164Value.set(value);
    } else {
      this.nationalDisplayValue.set('');
      this.rawE164Value.set('');
    }
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  // Validator implementation
  validate(control: AbstractControl): ValidationErrors | null {
    const val = control.value;
    if (!val || !val.trim()) {
      if (this.required) {
        this.hasError.set(true);
        return { required: true };
      }
      this.hasError.set(false);
      return null;
    }

    const selectedCode = this.selectedCountry().code;
    if (selectedCode === 'EG') {
      if (!isValidEgyptMobile(val)) {
        this.hasError.set(true);
        return { invalidPhone: true };
      }
    } else {
      const parsed = parsePhoneNumberFromString(val, selectedCode);
      if (!parsed || !parsed.isValid()) {
        this.hasError.set(true);
        return { invalidPhone: true };
      }
    }

    this.hasError.set(false);
    return null;
  }
}
