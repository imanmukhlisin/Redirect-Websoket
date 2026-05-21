/**
 * Root handler — health check / landing
 * Vercel Serverless: GET /
 */
export default function handler(_req, res) {
    res.status(200).json({
        service: "Shopee Redirect Engine",
        status: "running",
        usage: "GET /r/:hash_code",
    });
}
