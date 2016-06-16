export class AppSettings {
   public static get APP_NAME(): string {
     return 'GO! Fetch!';
   }

   public static get TASKCAT_API_BASE(): string {
     return this.TASKCAT_BASE + 'api/';
   }

   public static get TASKCAT_BASE(): string{
     return 'http://taskcatdev.azurewebsites.net/'
   }
}
