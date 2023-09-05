const regionNamesInEnglish = new Intl.DisplayNames(['en'], { type: 'region' });

google.charts.load('current', {
  'packages':['geochart']
});
google.charts.setOnLoadCallback(drawRegionsMap);

function drawRegionsMap() {
  let data = google.visualization.arrayToDataTable([
    ['Country', 'Users'],
  ]);
  let chart = new google.visualization.GeoChart(document.getElementById('regions_div'));
  chart.draw(data, {});
}

const input = document.querySelector('input');
input.addEventListener('change', async function() {
  let file = input.files[0], text = await file.text();
  text = text.split(/\r?\n/);

  let chart = new google.visualization.GeoChart(document.getElementById('regions_div'));
  let ingredients = [['Country', 'Users']], countries = text[1].split(',');

  // For-loop every country
  for (let i = 1; i < countries.length; i++) {
    let country = countries[i], users = Number( text[text.length-2].split(',')[i] );
    try {
      country = regionNamesInEnglish.of(country);
    } catch (error) {
    }

    ingredients.push([country, users]);
  }

  let data = google.visualization.arrayToDataTable(ingredients);
  chart.draw(data, {
    colorAxis: {
        colors: ['#f6ebff', '#c37aff', '#be6eff']
    }
  });
});