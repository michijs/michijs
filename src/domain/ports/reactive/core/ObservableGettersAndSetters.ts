export interface ObservableGettersAndSetters<RV, SV> {
  (newValue: SV | RV): void;
  (): RV;
}
