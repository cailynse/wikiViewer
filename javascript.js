/*jslint browser: true*/
/*global $, jQuery, alert*/

var wikipediaViewer = (function () {
	'use strict';

	function buildResultButton(resultObj) {
		var newButton = document.createElement("a"),
			resultClick = document.createTextNode("click");
		
		var newDivTitle = document.createElement("h2"),
			resultTitle = document.createTextNode(resultObj.title);
		newDivTitle.appendChild(resultTitle);
		
		var newDivSnip = document.createElement("p"),
			resultSnip = document.createTextNode(resultObj.snip);
		newDivSnip.appendChild(resultSnip);
		
		var newButton = document.createElement("a"),
			resultClick = document.createTextNode("click");
		
		var placeMarker = document.getElementById("pageEnd");
		document.body.insertBefore(newDivTitle, placeMarker);
		document.body.insertBefore(newDivSnip, placeMarker);
		document.body.insertBefore(newButton, placeMarker);
		newDivTitle.classList.add("resultTitle");
		newDivSnip.classList.add("resultSnip");
		newButton.setAttribute("href", resultObj.URL);
		newButton.innerHTML = "Go To Page";
		newButton.classList.add("goToWiki");

		return;
	}

	function displaySearchResults(resultArray) {
		var btn = document.createElement('a'),
			sniptxt = '',
			URL = '',
			j = 0;
		for (j = 0; j < resultArray.length; j = j + 1) {
			console.log(resultArray[j]);
			buildResultButton(resultArray[j]);
		}
	}

	function arrayOfPages(data) {
		var numberOfPages = data[1].length,
			allWikiResults = [],
			i = 0;
		for (i = 0; i < numberOfPages; i = i + 1) {
			var wikiPage = {};
			wikiPage.title = data[1][i];
			wikiPage.snip = data[2][i];
			wikiPage.URL = data[3][i];
			allWikiResults.push(wikiPage);
		}
		displaySearchResults(allWikiResults);
	}
	var handleData = function (data, textStatus, jqXHR) {
		arrayOfPages(data);

	};

	function searchWikipedia(searchTerm) {
		var wikiSearchURL = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + searchTerm + "&limit=10&namespace=0&format=json&origin=*";
		$.ajax({
			url: wikiSearchURL,
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			type: "GET",
			async: "false",
			success: handleData,
			error: function (errorMessage) {}
		});

	}

	function getSearchTerm() {
		var searchTerm = $('input').val(),
			cleanSearchTerm = searchTerm.split(' '),
			reallyCleanSearchTerm = cleanSearchTerm.join('_');
		console.log(reallyCleanSearchTerm);
		searchWikipedia(reallyCleanSearchTerm);
	}

	$(function () {
		$('#searchButton').on('keypress click', function (e) {
			var search = $('#usersSearch').val();
			if (e.which === 13 || e.type === 'click') {
				getSearchTerm();
			}
		});
	});

	function displaySnips(wikiSnips) {
		$('#snips').text(wikiSnips.articleSnip);
	}





}());
