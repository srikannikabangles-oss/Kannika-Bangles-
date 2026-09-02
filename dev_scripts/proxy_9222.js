const http = require('http');
const net = require('net');

const TARGET_PORT = 9222;
const TARGET_HOST = '127.0.0.1';

const server = http.createServer((req, res) => {
  const opt = {
    hostname: TARGET_HOST,
    port: TARGET_PORT,
    path: req.url,
    method: req.method,
    headers: { ...req.headers, host: `127.0.0.1:${TARGET_PORT}` }
  };
  const proxyReq = http.request(opt, proxyRes => {
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(res);
  });
  proxyReq.on('error', err => {
    res.writeHead(502);
    res.end('Proxy error: ' + err.message);
  });
  req.pipe(proxyReq);
});

server.on('upgrade', (req, socket, head) => {
  const proxySocket = net.connect(TARGET_PORT, TARGET_HOST, () => {
    proxySocket.write(`${req.method} ${req.url} HTTP/${req.httpVersion}\r\n`);
    for (let i = 0; i < req.rawHeaders.length; i += 2) {
      if (req.rawHeaders[i].toLowerCase() === 'host') {
        proxySocket.write(`Host: ${TARGET_HOST}:${TARGET_PORT}\r\n`);
      } else {
        proxySocket.write(`${req.rawHeaders[i]}: ${req.rawHeaders[i+1]}\r\n`);
      }
    }
    proxySocket.write('\r\n');
    if (head && head.length > 0) proxySocket.write(head);
    proxySocket.pipe(socket);
    socket.pipe(proxySocket);
  });
  proxySocket.on('error', () => socket.destroy());
  socket.on('error', () => proxySocket.destroy());
});

server.listen({ port: 9222, host: '::1', ipv6Only: true }, () => {
  console.log(`DevTools IPv6 [::1]:9222 proxying to IPv4 127.0.0.1:${TARGET_PORT}`);
});
