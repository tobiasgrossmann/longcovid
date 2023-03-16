import { Injectable } from "@angular/core";
import { Directory, Encoding, Filesystem } from "@capacitor/filesystem";
import { TranslateService } from "@ngx-translate/core";
import moment from "moment";
import { DatabaseCrudService } from "./database-crud.service";
import { ToastServiceService } from "./toast-service.service";

@Injectable({
    providedIn: "root"
})
export class BackupService {

    public wantedBackupsNumber: number = this.databaseCrudService.getWantedBackupsNumber();
    public jsonResponse;


    constructor(
        private databaseCrudService: DatabaseCrudService,
        private toastService: ToastServiceService,
        private translateService: TranslateService,
        ){
        
    }


    async checkIfBackupsFolderExistsAndCreateBackup() {
        const backupFolderExists = await this.checkIfBackupDirectoryExistsAndReturnBoolean();
  
        if (backupFolderExists === true) {
          this.onBackupClick();
        } else {
          await this.createBackupDirectory();
          this.onBackupClick();
        }
      }
  
      async checkIfBackupDirectoryExistsAndReturnBoolean(): Promise<boolean> {
        try {
          const directoryExists: any = await Filesystem.readdir({directory: Directory.External, path: "backups"});
          console.log(directoryExists);
          return !!directoryExists;
        } catch (error) {
          return false;
        }
      }
  
      async createBackupDirectory() {
        await Filesystem.mkdir({
          directory: Directory.External,
          path: "backups",
        }).then(response => {
          console.log(response);
        });
      }
  
      onBackupClick() {
         this.databaseCrudService.getDatabaseExport("full").then(
          response => {
            console.log(response);
            this.jsonResponse = response.export;
            console.log(this.jsonResponse);
            this.checkIfBackupDirectoryExists().then(
              () => {
                this.createBackupExport("Backup_" + moment().format("DD_MM_YYYY_HH_mm_ss") + ".ts", JSON.stringify(this.jsonResponse));
  
              }
            );
          });
      }
  
      async checkIfBackupDirectoryExists() {
        await Filesystem.readdir({
          directory: Directory.External,
          path: "backups",
        }).then(response => {
          console.log(response);
        }).catch(error => {
          console.log("Error:", error);
          this.createBackupDirectory().then(() => {
            this.checkIfBackupDirectoryExists();
          });
        });
      }
  
      async createBackupExport(name: string, exportData: any) {
        await Filesystem.writeFile({
          directory: Directory.External,
          path: "backups/" + name,
          data: exportData,
          encoding: Encoding.UTF16,
        }).then(response => {
          console.log(response);
        }, err => {
          console.log("Error: ", err);
          this.toastService.showErrorToast(this.translateService.instant("einstellungen.backup-creation-fail"));
        });
      }
  
    async deleteOldBackupsIfMoreThanWanted() {
      this.wantedBackupsNumber = this.databaseCrudService.getWantedBackupsNumber();
      console.log(this.wantedBackupsNumber);
      await Filesystem.readdir({
        directory: Directory.External,
        path: "backups",
      }).then(response => {
        console.log(response);
        console.log(response.files);
  
        if (response.files.length >= this.wantedBackupsNumber-1) {
          const backupArray = response.files.sort().reverse();
          backupArray.forEach((item: any, index: number) => {
            console.log(item + " " + index);
            if (index >= this.wantedBackupsNumber-1) {
              Filesystem.deleteFile({
                directory: Directory.External,
                path: "backups/" + item,
              });
            }
          }, error => {
            console.log("Error: ", error);
          });
        }
      });
  
    }
}