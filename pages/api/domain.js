export default function handler(req, res) {
  const domainName = req.headers.host.replace(/^www\./, ""); // Remove "www." from the beginning of the string
  res.status(200).json({ domainName });
}
