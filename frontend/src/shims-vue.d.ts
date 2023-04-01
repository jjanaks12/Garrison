declare module '*.vue' {
  import Vue from 'vue'
  export default Vue

  interface ComponentCustomProperties {
    $ability: AppAbility;
    $can(this: this, ...args: Parameters<this['$ability']['can']>): boolean;
  }
}
