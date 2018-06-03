import React from "react";
import SQLite from "react-native-sqlite-storage";

var database_name = "amritkeertanv1.db";

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
        "SELECT IndexID, Gurmukhi, Transliteration FROM mv_AK_Shabad WHERE HeaderID = " +
          headerId +
          " AND MainLine = 1 ORDER BY IndexID ASC;",
        [],
        results => {
          var totalResults = [];
          var len = results.rows.length;
          for (let i = 0; i < len; i++) {
            let row = results.rows.item(i);
            totalResults.push({
              id: row.IndexID,
              gurmukhi: row.Gurmukhi,
              roman: row.Transliteration
            });
          }
          resolve(totalResults);
        }
      );
    });
  }

  static getShabadForId(indexId, larivaar, paragraphMode, visram) {
    return new Promise(function(resolve) {
      db.executeSql(
        "SELECT ShabadID, VerseID, Gurmukhi, GurmukhiBisram, Transliteration, English, MainLine FROM mv_AK_Shabad WHERE IndexID = " +
          indexId +
          " ORDER BY VerseID ASC;",
        [],
        results => {
          var totalResults = new Array(results.rows.length);
          var paragraphResults = new Array();
          var len = results.rows.length;

          var gurmukhi;
          var paragraphId;
          var transliteration;
          var englishTranslation;
          var paragraphHeader;
          var prevParagraph;
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

            row.English =
              row.English == "" || row.English == null ? " " : row.English;
            row.Transliteration =
              row.Transliteration == "" || row.Transliteration == null
                ? " "
                : row.Transliteration;

            if (row.MainLine == 1) {
              curGurmukhi = "<u>" + curGurmukhi + "</u>";
              row.English = "<u>" + row.English + "</u>";
              row.Transliteration = "<u>" + row.Transliteration + "</u>";
            }

            if (paragraphMode) {
              if (prevParagraph !== row.ShabadID) {
                if (i !== 0) {
                  paragraphResults.push({
                    id: "" + paragraphId,
                    gurmukhi: gurmukhi,
                    roman: transliteration,
                    englishTranslations: englishTranslation,
                    header: paragraphHeader
                  });
                }
                paragraphId = row.VerseID;
                paragraphHeader = row.MainLine;
                gurmukhi = curGurmukhi;
                transliteration = row.Transliteration;
                englishTranslation = row.English;
                prevParagraph = row.ShabadID;
              } else {
                gurmukhi += larivaar ? curGurmukhi : " " + curGurmukhi;
                transliteration += " " + row.Transliteration;
                englishTranslation += " " + row.English;
              }

              if (i === len - 1) {
                paragraphResults.push({
                  id: "" + paragraphId,
                  gurmukhi: gurmukhi,
                  roman: transliteration,
                  englishTranslations: englishTranslation,
                  header: paragraphHeader
                });
              }
            } else {
              totalResults[i] = {
                id: row.VerseID,
                gurmukhi: curGurmukhi,
                roman: row.Transliteration,
                englishTranslations: row.English,
                header: row.MainLine
              };
            }
          }
          if (paragraphMode) {
            resolve(paragraphResults);
          } else {
            resolve(totalResults);
          }
        }
      );
    });
  }
}

export default Database;
