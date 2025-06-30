document.addEventListener('DOMContentLoaded', async () => {
  // Load the handlebars template from file
  const templateSrc = await fetch('templates/metrics.hbs').then(res => res.text());
  const template = Handlebars.compile(templateSrc);

  // Helper to generate URL-safe IDs (for linking)
  Handlebars.registerHelper('dash', str => str.replace(/\s+/g, '-').toLowerCase());

  // Load the CSV
  const response = await fetch('data/metrics.csv');
  const csvText = await response.text();
  const metrics = csvToJson(csvText);

  // Render the compiled HTML
  const html = template({ metrics });
  document.getElementById('output').innerHTML = html;
});


// Utility function to convert CSV → JSON
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
