import { FilesystemDirectory, FilesystemEncoding, Plugins } from "@capacitor/core";
import { FileOpener } from "@ionic-native/file-opener";

const { Filesystem } = Plugins;

export async function writeCsvFile (list:any, keyCup: String) {
    const fileName = keyCup+".csv"
    const data = convertToCSV(list)
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: data,
      directory: FilesystemDirectory.Documents,
      encoding: FilesystemEncoding.UTF8
    }).then((writeFileResult) => {
      Filesystem.getUri({
          directory: FilesystemDirectory.Documents,
          path: fileName
      }).then((getUriResult) => {
          const path = getUriResult.uri;
          FileOpener.open(path,"text/csv")
          .then(() => console.log('File is opened'))
          .catch((error: any) => console.log('Error openening file', error));
      }, (error) => {
          console.log(error);
      });
    });
    console.log(savedFile)   
}

function convertToCSV(arr:any) {
    if (arr != null && arr != undefined) {
      const array = [Object.keys(arr[0])].concat(arr)
  
      return array.map(it => {
        return Object.values(it).toString()
      }).join('\n')
    } else {
      return "Estatistica Vazia"
    }
  }