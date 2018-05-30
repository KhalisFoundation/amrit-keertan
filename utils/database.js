import React from "react";
import SQLite from "react-native-sqlite-storage";

var database_name = "amritkeertan.db";

let db = SQLite.openDatabase({ name: database_name, createFromLocation: 1 });

class Database {
  static getBaniList() {
    return new Promise(function(resolve) {
      db.executeSql(
        "SELECT HeaderID, Transliteration, Gurmukhi FROM AKHeaders;",
        [],
        results => {
          var totalResults = [];
          var len = results.rows.length;
          for (let i = 0; i < len; i++) {
            let row = results.rows.item(i);
            let folder = [];
            totalResults.push({
              id: row.HeaderID,
              gurmukhi: row.Gurmukhi,
              roman: row.Transliteration,
              folder
            });
          }
          resolve(totalResults);
        }
      );
    });
  }

  static getKirtanForFolder(headerId) {
    return new Promise(function(resolve) {
      db.executeSql(
        "SELECT ShabadID, Gurmukhi, Transliteration FROM mv_AK_Shabad WHERE HeaderID = " +
          headerId +
          " AND MainLine = 1 ORDER BY IndexID ASC;",
        [],
        results => {
          var totalResults = [];
          var len = results.rows.length;
          for (let i = 0; i < len; i++) {
            let row = results.rows.item(i);
            totalResults.push({
              id: row.ShabadID,
              gurmukhi: row.Gurmukhi,
              roman: row.Transliteration
            });
          }
          resolve(totalResults);
        }
      );
    });
  }

  static getShabadForId(shabadId, larivaar, visram) {
    return new Promise(function(resolve) {
      db.executeSql(
        "SELECT ID, Gurmukhi, GurmukhiBisram, Transliteration, English, MainLine FROM mv_AK_Shabad WHERE ShabadID = " +
        shabadId +
          " ORDER BY VerseID ASC;",
        [],
        results => {
          var totalResults = new Array(results.rows.length);
          var len = results.rows.length;

          var gurmukhi;
          var transliteration;
          var englishTranslation;
          for (let i = 0; i < len; i++) {
            let row = results.rows.item(i);

            var gurmukhiLine =
              visram && row.GurmukhiBisram ? row.GurmukhiBisram : row.Gurmukhi;

            var splitted = gurmukhiLine.split(" ");

            var arr = [];
            splitted.forEach(function(word) {
              if (word.indexOf(";") >= 0) {
                arr.push(
                  "<span style='color:orange'>" + word.slice(0, -1) + "</span>"
                );
              } else if (word.indexOf(",") >= 0) {
                arr.push(
                  "<span style='color:green'>" + word.slice(0, -1) + "</span>"
                );
              } else {
                arr.push(word);
              }
            });

            let curGurmukhi = larivaar ? arr.join("<wbr>") : arr.join(" ");

            row.English = row.English == "" ? " " : row.English;
            row.Transliteration =
              row.Transliteration == "" ? " " : row.Transliteration;

            totalResults[i] = {
              id: "" + row.ID,
              gurmukhi: curGurmukhi,
              roman: row.Transliteration,
              englishTranslations: row.English,
              header: row.MainLine
            };
          }
          resolve(totalResults);
        }
      );
    });
  }
}

export default Database;
