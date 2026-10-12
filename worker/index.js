const REPORT_URL = 'https://csp.gander.tools/';

export default {
    async fetch(request, env) {
        const response = await env.ASSETS.fetch(request);

        if (response.headers.get("Content-Type")?.includes("text/html")) {
            return withSecurityHeaders(response);
        }

        return response;
    },
};

function withSecurityHeaders(response) {
    const headers = new Headers(response.headers);
    headers.set('Reporting-Endpoints', `csp-endpoint="${REPORT_URL}"`);
    headers.set('Content-Security-Policy-Report-Only', `default-src 'self'; script-src 'self' 'unsafe-inline' http: https:; img-src 'self' data:; object-src 'none'; base-uri 'none'; connect-src 'self' https://medama.gander.tools/; style-src 'self' 'unsafe-inline'; report-to csp-endpoint; report-uri ${REPORT_URL}`);

    return new Response(response.body, {
        headers,
        status: response.status,
        statusText: response.statusText,
    });
}
