document.addEventListener('DOMContentLoaded', async () => {
  const templateSrc = document.getElementById('template').innerHTML;
  const template = Handlebars.compile(templateSrc);

  Handlebars.registerHelper('dash', str => str.replace(/\s+/g, '-').toLowerCase());

  const response = await fetch('data/entities.csv');
  const csvText = await response.text();
  const entities = csvToJson(csvText);

  const html = template({ entities });
  document.getElementById('output').innerHTML = html;
});

function csvToJson(csv) {
  const [headerLine, ...lines] = csv.trim().split('\n');
  const headers = headerLine.split(',').map(h => h.trim());

  return lines.map(line => {
    const values = line.split(',');
    return headers.reduce((acc, header, i) => {
      acc[header.replace(/\s+/g, '')] = values[i] ? values[i].trim() : '';
      return acc;
    }, {});
  });
}
