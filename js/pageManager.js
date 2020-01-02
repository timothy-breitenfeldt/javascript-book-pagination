"use strict";

const recordsPerPage = 6;
const numberOfPages = Math.ceil(books.length / recordsPerPage);

$(document).ready(init);

function init(event) {
  Object.defineProperty(window, "screenreader", {
    value: new Screenreader(),
    configurable: false,
    writable: false
  });

  changePage(event, 1);
  paginateRecords();
}

function nextPage(event) {
  let pageNumber = parseInt(
    $("#pagination-list").attr("data-currentPageNumber"),
    10
  );

  if (pageNumber + 1 <= numberOfPages) {
    changePage(event, pageNumber + 1);
  }
}

function previousPage(event) {
  let pageNumber = parseInt(
    $("#pagination-list").attr("data-currentPageNumber"),
    10
  );

  if (pageNumber - 1 >= 1) {
    changePage(event, pageNumber - 1);
  }
}

function changePage(event, pageNumber) {
  if (pageNumber < 1 || pageNumber > numberOfPages) {
    throw "Invalid page number";
  }

  $("#book-table tbody").empty();
  $("#pagination-list").attr("data-currentPageNumber", pageNumber.toString());
  $(event.target).attr("class", "page-item active");
  screenreader.speak(`Changed to page ${pageNumber}`);

  let startIndex = 0;
  let endIndex = 0;

  if (pageNumber == 1) {
    startIndex = 0;
  } else {
    startIndex = (pageNumber - 1) * recordsPerPage;
  }

  if (pageNumber == numberOfPages) {
    endIndex = books.length;
  } else {
    endIndex = startIndex + recordsPerPage;
  }

  for (let i = startIndex; i < endIndex; i++) {
    $("#book-table tbody").append(getBookHTMLRow(books[i]));
  }
}

function paginateRecords() {
  $("#pagination-list").append(
    getPageButtonItemHTML("Next", "nextPage(event)")
  );

  for (let i = 1; i <= numberOfPages; i++) {
    $("#pagination-list").append(
      getPageButtonItemHTML(i, `changePage(event, ${i})`)
    );
  }

  $("#pagination-list").append(
    getPageButtonItemHTML("Previous", "previousPage(event)")
  );
}

function getBookHTMLRow(book) {
  return `<tr><td>${book.isbn}</td> <td>${book.title}</td> <td>${book.author}</td></tr>`;
}

function getPageButtonItemHTML(name, showPageFunction) {
  return `<li class=\"page-item\"><button class=\"page-link\" onclick=\"${showPageFunction}\">${name}</button></li>`;
}
