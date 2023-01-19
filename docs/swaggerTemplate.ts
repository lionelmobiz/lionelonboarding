export const SwaggerTemplate = {
  getSwaggerUi(jsonData: JSON): string {
    return `<!DOCTYPE html>
      <!--Inspired by https://gist.github.com/buzztaiki/e243ccc3203f96777e2e8141d4993664-->
      <html lang="en">
      
      <head>
        <meta charset="UTF-8">
        <title>Mobiz API Documentation</title>
        <link rel="stylesheet" type="text/css" href="https://unpkg.com/swagger-ui-dist@3/swagger-ui.css">
      </head>
      
      <body>
        <div id="swagger-ui"></div>
        <script src="https://unpkg.com/swagger-ui-dist@3/swagger-ui-bundle.js"> </script>
        <script type="text/javascript">
          window.onload = function () {
            // Swagger-ui configuration goes here.
            // See further: https://github.com/swagger-api/swagger-ui/blob/master/docs/usage/configuration.md
            SwaggerUIBundle({
              deepLinking: true,
              dom_id: '#swagger-ui',
              showExtensions: true,
              showCommonExtensions: true,
              spec: ${JSON.stringify(jsonData)}
            });
          };
        </script>
      </body>
      </html>`;
  }
};
