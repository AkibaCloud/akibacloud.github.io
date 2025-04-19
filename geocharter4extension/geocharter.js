google.charts.load('current', {
  'packages':['geochart']
});
google.charts.setOnLoadCallback(drawRegionsMap);

let chart, data, lastEvent, total = 0;

$('input').on('change', async function() {
  let regionNamesInEnglish = new Intl.DisplayNames(['en'], { type: 'region' }),
      file = this.files[0], 
      text = await file.text();
  text = text.split(/\r?\n/);
  total = 0;

  let ingredients = [['Country', 'Users']],
      countries = text[1].split(','),
      lastLine = text[text.length-2].split(',');

  if (emptyCheck(lastLine)) {
    lastLine = text[text.length-3].split(',');
  }

  // For-loop every country
  for (let i = 1; i < countries.length; i++) {
    let country = countries[i], users = Number(lastLine[i]);
    try {
      country = regionNamesInEnglish.of(country);
    } catch (error) {
    }
    if (users == 0) continue;
    ingredients.push([country, users]);
    total = total + users;
  }

  $('#date').text(`As of ${lastLine[0]}, ${total} users in total.`);

  data = google.visualization.arrayToDataTable(ingredients);
  chart.draw(data, {
    colorAxis: {
      colors: ['#f6ebff', '#c37aff', '#be6eff']
    }
  });

  renderSortedList(ingredients);

  google.visualization.events.addListener(chart, 'select', myHandler);
});

function drawRegionsMap() {
  let data = google.visualization.arrayToDataTable([
    ['Country', 'Users'],
  ]);
  chart = new google.visualization.GeoChart($('#regions_div')[0]);
  chart.draw(data, {});
}

function emptyCheck([...array]) {
  array.splice(0, 1);

  for (let i in array) {
    array[i] = Number(array[i]);
  }

  return Math.max(...array) == 0;
}

function sortCountryList([...array]) {
  array.sort((a, b) => {
    // Make sure both items are not strings
    // [1] -> Access the second element (index 1) of each subarray.
    if (typeof a[1] === 'number' && typeof b[1] === 'number') {
      // Sort in descending order
      return b[1] - a[1];
    } else {
      return 1;
    }
  });
  return array;
}

function renderSortedList([...array]) {
  $('table').remove();

  let arr = sortCountryList(array), table = $('<table>').html('<tr><th>#</th><th>Country</th><th>Users</th></tr>');

  for (let i = 1; i < arr.length; i++) {
    let tr = $('<tr>');
    tr.append($('<td>').text(i));
    tr.append($('<td>').text(arr[i][0]));
    tr.append($('<td>').text(arr[i][1]));
    table.append(tr);
  }

  table.insertBefore('#regions_div');
}

function myHandler() {
  let selection = getSelectedItems();
  if (!selection) return;
  if (lastEvent.type == 'click') return;

  let country = data.getValue(selection[0].row, 0), el = $('td').filter(`:contains('${country}')`);
  el.css('font-weight', 'bold');
  el.parent().css('background-color', '#c37aff');
}

function getSelectedItems() {
  let selection = chart.getSelection();
  if (selection.length < 0) return null;
  if (!selection[0] || !selection[0].row) return null; 

  return selection;
}

$('#regions_div').on('click', function(e) {
  lastEvent = e;
});

$('#regions_div').on('mouseover', function(e) {
  lastEvent = e;

  let event = document.createEvent('SVGEvents');
  event.initEvent('click', true, true);
  e.target.dispatchEvent(event);
});

$('#regions_div').on('mouseout', function() {
  let selection = getSelectedItems();
  if (!selection) return;

  let country = data.getValue(selection[0].row, 0), el = $('td').filter(`:contains('${country}')`);
  el.css('font-weight', '');
  el.parent().css('background-color', '');
  chart.setSelection([]); // Without this line it acts unstable
});
