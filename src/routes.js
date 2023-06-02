// This file was added by edgio init.
// You should commit this file to source control.
import zlib from 'zlib'
import CustomCacheKey from '@edgio/core/router/CustomCacheKey'
import responseBodyToString from '@edgio/core/utils/responseBodyToString'
import { Router } from '@edgio/core/router';
import { injectBrowserScript, starterRoutes } from "@edgio/starter";
import { edgioRoutes } from '@edgio/core';


export default new Router()
  .match(':path*', {
  origin: {
    set_origin: 'origin',
  },
  })
/*  .match(':path*', ({ cache, proxy }) => {
    cache({
      edge: {
        maxAgeSeconds: 60 * 60,
        forcePrivateCaching: true,
      },
      browser: {
        maxAgeSeconds: 60,
      },
      key: new CustomCacheKey().excludeQueryParameters('edgio_dt_pf', 'edgio_prefetch'),
    })
    proxy('origin', {
      transformResponse: (res, req) => {
        if (res.body) {
          injectBrowserScript(res)
          const $ = load(responseBodyToString(res))
          res.body = $.html()
            .replace(/https\:\/\/tangoaroma\.com\//g, '/')
            .replace(/https\:\/\/www\.tangoaroma\.com\//g, '/')
        }
      }
    })
  })
  */
  // caching stylesheets and scripts
  .match('/:path*/:file.:ext(js|mjs|css)', {
    headers: {
      set_response_headers: {
        'cache-control': 'public, max-age=86400',
      },
      remove_origin_response_headers: ['set-cookie'],
    },
    caching: {
      ignore_origin_no_cache: [200],
      bypass_client_cache: true,
    },
    origin: {
      set_origin: 'origin',
    },
  })

  // caching assets
  .match('/:path*/:file.:ext(png|ico|svg|jpg|jpeg|gif|ttf|woff|otf)', {
    headers: {
      set_response_headers: {
        'cache-control': 'public, max-age=86400',
      },
      remove_origin_response_headers: ['set-cookie'],
    },
    caching: {
      ignore_origin_no_cache: [200],
      bypass_client_cache: true,
    },
    origin: {
      set_origin: 'origin',
    },
  })
  .use(edgioRoutes)
  .static('node_modules/@edgio/devtools')
