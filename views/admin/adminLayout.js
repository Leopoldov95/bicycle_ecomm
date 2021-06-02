module.exports = ({ content }) => {
  return `
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Admin Panel</title>
    <link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap" rel="stylesheet"> 
<link rel="stylesheet"  href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" />
    <link rel="stylesheet" href="/css/utilities.css" />
    <link rel="stylesheet" href="/css/admin.css" />
    <link rel="stylesheet" href="/css/media.css" />
  </head>
  <body class="admin">
    <header>
      <nav class="navbar">
        <div>
          <h1 class="navbar-title">Admin Panel</h1>
        </div>
        <div>
          <ul>
            <a href="/admin/products"
              ><li><i class="fas fa-user-shield"></i>Admin</li></a
            >
            <a href="/bikes"
              ><li><i class="fas fa-bicycle"></i>Bikes</li></a
            >
          </ul>
        </div>
      </nav>
    </header>
    <div class="container">
    ${content}</div>
  </body>
</html>

    `;
};
