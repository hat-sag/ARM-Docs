document.addEventListener('DOMContentLoaded', async () => {
  const templateSrc = document.getElementById('template').innerHTML;
  const template = Handlebars.compile(templateSrc);

  // Helper to generate URL-safe IDs
  Handlebars.registerHelper('dash', str => str.replace(/\s+/g, '-').toLowerCase());

  // Load CSV and convert to JSON
  const response = await fetch('data.csv');
  const csvText = await response.text();
  const metrics = csvToJson(csvText);

  const html = template({ metrics });
  document.getElementById('output').innerHTML = html;
});

// Simple CSV to JSON parser
function csvToJson(csv) {
  const [header, ...rows] = csv.trim().split('\n').map(r => r.split(','));
  return rows.map(row => {
    return header.reduce((acc, key, i) => {
      acc[key.trim()] = row[i] ? row[i].trim().replace(/^"|"$/g, '') : '';
      return acc;
    }, {});
  });
}
