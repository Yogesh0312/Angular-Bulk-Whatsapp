
import { Component } from '@angular/core';
import { read, utils } from 'xlsx'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'project';
  excelData: any;

  ReadExcel(event: any) {
    let file = event.target.files[0];
    let fileReader = new FileReader();
    fileReader.readAsBinaryString(file);
    fileReader.onload = () => {
      var workBook = read(fileReader.result, { type: 'binary' });
      var sheetNames = workBook.SheetNames;
      this.excelData = utils.sheet_to_json(workBook.Sheets[sheetNames[0]])
      console.log(this.excelData)
    }
  }

  sendMsg() {
    let mapErr = this.excelData.map((excelData: any) => {
      return `https://send2.digital/whatsapp/SHAH_INVESTOR/send_template_document.php?user=shahinvestor&apikey=shahsd6753ad643hsdkjasd44&mobile=${excelData.mobile}&name=${excelData.name}&atvalue=PICKOFMONTH.pdf&cname=${excelData.name}&cnumber=${excelData.mobile}&attachment=https://trader.sihlnettrade.com:8088/Download/PICKOFMONTH.pdf`
    })
    console.warn(mapErr)
  }
}