export default {
    async fetch(request, env, ctx) {
        let url =  new URL(request.url);
        url.host = "beatsaver.com"
        let modifiedRequest = new Request(request)
        let workerDomain = new URL(request.url).hostname
        let resp = await fetch(url.href, {
            method: modifiedRequest.method,
            headers: modifiedRequest.headers,
            body: modifiedRequest.body,
            redirect: "manual"
        });

        let modifiedResponse = new Response(resp.body, resp);
        modifiedResponse.headers.set('Access-Control-Allow-Origin', 'http://localhost:3000');
        modifiedResponse.headers.set('Access-Control-Allow-Credentials',"true")
        try {
            if (resp.headers.get('Set-Cookie')) {
                let setCookieHeaders = resp.headers.get('Set-Cookie').split('; ')
                let modifiedSetCookieHeaders = setCookieHeaders.map(setCookie => {
                    return setCookie
                        .replace('SameSite=lax', 'SameSite=none')
                        .replace('Domain=beatsaver.com', `Domain=${workerDomain}`)
                })
                modifiedResponse.headers.set('Set-Cookie', modifiedSetCookieHeaders.join('; '))
            }
            return modifiedResponse;
        }catch (e) {
            console.log(e)
            return null
        }
    },
};