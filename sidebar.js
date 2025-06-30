document.addEventListener('DOMContentLoaded', () => {
  const sidebar = `
    <div class="sidebar">
      <h2>Navigation</h2>
      <ul>
        <li><a href="index.html">🏠 Home</a></li>
        <li><a href="metrics.html">📊 Metrics</a></li>
        <li><a href="entity.html">🗂️ Entities</a></li>
      </ul>
    </div>
  `;
  document.getElementById('sidebar').innerHTML = sidebar;
});
