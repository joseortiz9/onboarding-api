
### Create needed certs for prisma connection to postgresql ssl secured container.

I'm debugging an issue I'm having with SSL connecting to a database (MySQL RDS) using an ORM called, [Prisma][1]. The
database connection string requires a PKCS12 (.p12) file (if interested, described [here][2]), which brought me here. I
know the question has been answered, but I found the following steps (in Github [Issue#2676][3]) to be helpful for
creating a .p12 file and wanted to share. Good luck!

1. Generate 2048-bit RSA private key:

`openssl genrsa -out key.pem 2048`

2. Generate a Certificate Signing Request:

`openssl req -new -sha256 -key key.pem -out csr.csr`

3. Generate a self-signed x509 certificate suitable for use on web servers.

`openssl req -x509 -sha256 -days 365 -key key.pem -in csr.csr -out certificate.pem`

4. Create SSL identity file in PKCS12 as mentioned here

`openssl pkcs12 -export -out client-identity.p12 -inkey key.pem -in certificate.pem`

[1]: https://github.com/prisma/prisma

[2]: https://www.prisma.io/docs/concepts/database-connectors/mysql

[3]: https://github.com/prisma/prisma/issues/2676
