module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  try {
    const response = await fetch(
      "https://coingecko.com"
    );
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "API error" });
  }
};
