module.exports = {
  name: "www.tangoaroma.com",
  team: "tangoaroma",
  routes: './src/routes.ts',
  connector: '@edgio/starter',
  origins: [
    {
      name: 'origin',
      override_host_header: 'www.tangoaroma.com',
      hosts: [
        {
          scheme: 'match',
          location: [
            {
              hostname: '31.11.34.184',
            },
          ],
        },
      ],
      tls_verify: {
        use_sni: true,
        allow_self_signed_certs: true,
        sni_hint_and_strict_san_check: 'www.tangoaroma.com',
      },
    },
  ],
}
