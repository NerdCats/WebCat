export class AppSettings {
   public static get APP_NAME(): string {
     return 'GO! Fetch!';
   }

   public static get TASKCAT_API_BASE(): string {
     return this.TASKCAT_BASE + 'api/';
   }

   public static get TASKCAT_BASE(): string{
     return 'http://gofetch.cloudapp.net/'
   }

   public static get CLIENT_ID(): string {
     return 'GoFetchDevWebApp';
   }

   public static get SHADOWCAT_API_BASE(): string {
     return this.SHADOWCAT_BASE + "api/"
   }

   public static get SHADOWCAT_BASE(): string {
     return "http://gofetch.cloudapp.net:1337/"
   }

   public static get GOOGLE_MAP_API_KEY(): string {
     return 'AIzaSyCKMIEYdB0YPJkDr89n0WuaG3qQDjE9ndY';
   }
}
