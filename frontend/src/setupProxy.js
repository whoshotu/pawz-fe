const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api/auth',
    createProxyMiddleware({
      target: 'https://qnpvbgczcqegsoehisjr.supabase.co/auth/v1',
      changeOrigin: true,
      pathRewrite: {
        '^/api/auth': '',
      },
      headers: {
        apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFucHZiZ2N6Y3FlZ3NvZWhpc2pyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIzMjE2NjAsImV4cCI6MjA3Nzg5NzY2MH0.FXqLnV-nZk5IT6PXsdWONQvs90-o0cukneaIH3FITlo',
      }
    })
  );
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://qnpvbgczcqegsoehisjr.supabase.co/rest/v1',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
      headers: {
        apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFucHZiZ2N6Y3FlZ3NvZWhpc2pyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIzMjE2NjAsImV4cCI6MjA3Nzg5NzY2MH0.FXqLnV-nZk5IT6PXsdWONQvs90-o0cukneaIH3FITlo',
      }
    })
  );
};
