
import { Component } from '@angular/core';
import { read, utils } from 'xlsx';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private http: HttpClient) { }
  title = 'project';
  excelData: any;
  mapErr: any;
  parentSelector: boolean = true;
  filterArr: any


  ReadExcel(event: any) {
    let file = event.target.files[0];
    let fileReader = new FileReader();
    fileReader.readAsBinaryString(file);
    fileReader.onload = () => {
      var workBook = read(fileReader.result, { type: 'binary' });
      var sheetNames = workBook.SheetNames;
      this.excelData = utils.sheet_to_json(workBook.Sheets[sheetNames[0]])
      let myTick = true;

      this.mapErr = this.excelData.map((allData: any) => {
        return {
          ...allData, myTick
        }
      })
      // console.log(this.mapErr)

    }
  }


  isCheck($event: any) {

    let no = $event.target.value;
    let isChecked = $event.target.checked

    // console.warn(no, isChecked)


    this.mapErr = this.mapErr.map((d: any) => {
      if (d.no == no) {
        d.myTick = isChecked;
        this.parentSelector = false;
        return d;
      }

      if (no == -1) {
        d.myTick = this.parentSelector;
        return d;
      }

      return d;
    });
    // console.log(this.mapErr)


    this.filterArr = this.mapErr.map((mapErr: any) => {

      if (mapErr.myTick == true) {
        return `https://send2.digital/whatsapp/SHAH_INVESTOR/send_template_document.php?user=shahinvestor&apikey=shahsd6753ad643hsdkjasd44&mobile=${mapErr.mobile}&name=${mapErr.name}&atvalue=PICKOFMONTH.pdf&cname=${mapErr.name}&cnumber=${mapErr.mobile}&attachment=https://trader.sihlnettrade.com:8088/Download/PICKOFMONTH.pdf`
      }
      return
    })
    // console.log(this.filterArr)
  }


  lastData() {
    this.filterArr.forEach((filterArr: any) => {
      if (filterArr !== undefined) {

        this.http.get(filterArr).subscribe((res) => {
            console.log(res)
          })
  }

});
  }


}









