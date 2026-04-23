export interface ObservableGettersAndSetters<RV, SV> {
  <T extends SV | RV>(newValue: T): void;
  (): RV;
}
